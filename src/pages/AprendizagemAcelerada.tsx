import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Zap, Eye, Target, Lightbulb, Clock, FileText, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundacaoNeural } from "@/components/learning/sections/FundacaoNeural";
import { TecnicaFeynman } from "@/components/learning/sections/TecnicaFeynman";
import { DualCodingSystem } from "@/components/learning/sections/DualCodingSystem";
import { TestingEffect } from "@/components/learning/sections/TestingEffect";
import { GenerationEffect } from "@/components/learning/sections/GenerationEffect";
import { Protocolo6010 } from "@/components/learning/sections/Protocolo6010";
import { MeuProgresso } from "@/components/learning/sections/MeuProgresso";
import { supabase } from "@/integrations/supabase/client";

const AprendizagemAcelerada = () => {
  const [stats, setStats] = useState({
    completedSessions: 0,
    averageEfficiency: 0,
    timeSaved: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load protocol sessions
      const { data: sessions } = await supabase
        .from('protocol_sessions')
        .select('efficiency_score, total_duration_seconds')
        .eq('user_id', user.id);

      if (sessions && sessions.length > 0) {
        const completedSessions = sessions.length;
        const avgEfficiency = sessions.reduce((acc, s) => acc + (s.efficiency_score || 0), 0) / completedSessions;
        const totalTime = sessions.reduce((acc, s) => acc + s.total_duration_seconds, 0);
        const timeSaved = (totalTime / 3600) * 9; // 1 hour = 10 hours saved

        setStats({
          completedSessions,
          averageEfficiency: Math.round(avgEfficiency),
          timeSaved: Math.round(timeSaved * 10) / 10
        });
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const sections = [
    {
      id: "fundacao",
      title: "Fundação Neural",
      icon: Brain,
      description: "Preparação neurológica e foco"
    },
    {
      id: "feynman",
      title: "Técnica Feynman",
      icon: Zap,
      description: "Explicação e compreensão profunda"
    },
    {
      id: "dual-coding",
      title: "Dual Coding",
      icon: Eye,
      description: "Visual + verbal = 2x retenção"
    },
    {
      id: "testing",
      title: "Testing Effect",
      icon: Target,
      description: "Recuperação ativa devastadora"
    },
    {
      id: "generation",
      title: "Generation Effect",
      icon: Lightbulb,
      description: "Crie para nunca esquecer"
    },
    {
      id: "protocolo",
      title: "Protocolo 60=10",
      icon: Clock,
      description: "60 minutos = 10 horas"
    },
    {
      id: "progresso",
      title: "Meu Progresso",
      icon: FileText,
      description: "Visualize tudo que você criou"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/tabs" className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold">
              <span className="text-gold">Aprendizagem Acelerada</span>
            </h1>
            <p className="text-xs text-muted-foreground">Protocolo 60=10 • Absorva em 1h o que outros levam 10h</p>
          </div>
          <a 
            href="/pdfs/aprendizagem-acelerada-enem.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold text-sm hidden md:inline">Ver PDF</span>
          </a>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="container mx-auto max-w-7xl px-3 md:px-4 py-4 md:py-8">
        <div className="grid gap-2 md:gap-4 grid-cols-3 mb-4 md:mb-8">
          <div className="card-premium text-center p-3 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stats.completedSessions}</div>
            <div className="text-[10px] md:text-sm text-muted-foreground">Sessões</div>
          </div>
          <div className="card-premium text-center p-3 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stats.averageEfficiency}%</div>
            <div className="text-[10px] md:text-sm text-muted-foreground">Eficiência</div>
          </div>
          <div className="card-premium text-center p-3 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stats.timeSaved}h</div>
            <div className="text-[10px] md:text-sm text-muted-foreground">Economizado</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="fundacao" className="w-full">
          <div className="mb-4 md:mb-8 overflow-x-auto">
            <TabsList className="inline-flex md:grid w-auto md:w-full md:grid-cols-7 bg-card gap-1 md:gap-2 p-1 md:p-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex flex-col items-center gap-0.5 md:gap-1 py-2 md:py-3 rounded-lg md:rounded-xl min-w-[70px] flex-shrink-0"
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-[9px] md:text-xs leading-tight text-center">{section.title.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Section Contents */}
          <TabsContent value="fundacao">
            <FundacaoNeural />
          </TabsContent>

          <TabsContent value="feynman">
            <TecnicaFeynman />
          </TabsContent>

          <TabsContent value="dual-coding">
            <DualCodingSystem />
          </TabsContent>

          <TabsContent value="testing">
            <TestingEffect />
          </TabsContent>

          <TabsContent value="generation">
            <GenerationEffect />
          </TabsContent>

          <TabsContent value="protocolo">
            <Protocolo6010 onSessionComplete={loadStats} />
          </TabsContent>

          <TabsContent value="progresso">
            <MeuProgresso />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AprendizagemAcelerada;