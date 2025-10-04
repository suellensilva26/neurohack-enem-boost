import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, BookOpen, Atom, Globe, TrendingUp, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { PadroesMatematica } from "@/components/padroes/PadroesMatematica";
import { PadroesPortugues } from "@/components/padroes/PadroesPortugues";
import { PadroesCiencias } from "@/components/padroes/PadroesCiencias";
import { PadroesHumanas } from "@/components/padroes/PadroesHumanas";
import { MeuProgressoPadroes } from "@/components/padroes/MeuProgressoPadroes";

const PadroesEnem = () => {
  const [stats, setStats] = useState({
    totalPatterns: 0,
    completedPatterns: 0,
    totalExercises: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: progress } = await supabase
        .from('pattern_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progress) {
        const completed = progress.filter(p => p.completed).length;
        const exercises = progress.reduce((acc, p) => acc + (p.exercises_completed || 0), 0);
        
        setStats({
          totalPatterns: progress.length,
          completedPatterns: completed,
          totalExercises: exercises
        });
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const sections = [
    {
      id: "matematica",
      title: "Matemática",
      icon: Calculator,
      description: "5 padrões que dominam 82%"
    },
    {
      id: "portugues",
      title: "Português",
      icon: BookOpen,
      description: "4 padrões que nunca mudam"
    },
    {
      id: "ciencias",
      title: "Ciências",
      icon: Atom,
      description: "6 super-padrões essenciais"
    },
    {
      id: "humanas",
      title: "Humanas",
      icon: Globe,
      description: "5 super-temas imbatíveis"
    },
    {
      id: "progresso",
      title: "Progresso",
      icon: TrendingUp,
      description: "Acompanhe seu domínio"
    }
  ];

  const completionRate = stats.totalPatterns > 0 
    ? Math.round((stats.completedPatterns / stats.totalPatterns) * 100) 
    : 0;

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
              <span className="text-gold">Padrões do ENEM</span>
            </h1>
            <p className="text-xs text-muted-foreground">Acerte 40% a mais • Padrões que se repetem</p>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="container mx-auto max-w-7xl px-3 md:px-4 py-4 md:py-8">
        <div className="grid gap-2 md:gap-4 grid-cols-3 mb-4 md:mb-8">
          <div className="card-premium text-center p-3 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stats.totalPatterns}</div>
            <div className="text-[10px] md:text-sm text-muted-foreground">Padrões</div>
          </div>
          <div className="card-premium text-center p-3 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{completionRate}%</div>
            <div className="text-[10px] md:text-sm text-muted-foreground">Dominados</div>
          </div>
          <div className="card-premium text-center p-3 md:p-6">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stats.totalExercises}</div>
            <div className="text-[10px] md:text-sm text-muted-foreground">Exercícios</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="matematica" className="w-full">
          <div className="mb-4 md:mb-8 overflow-x-auto">
            <TabsList className="inline-flex md:grid w-auto md:w-full md:grid-cols-5 bg-card gap-1 md:gap-2 p-1 md:p-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex flex-col items-center gap-0.5 md:gap-1 py-2 md:py-3 rounded-lg md:rounded-xl min-w-[70px] flex-shrink-0"
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-[9px] md:text-xs leading-tight text-center">{section.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Section Contents */}
          <TabsContent value="matematica">
            <PadroesMatematica onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="portugues">
            <PadroesPortugues onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="ciencias">
            <PadroesCiencias onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="humanas">
            <PadroesHumanas onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="progresso">
            <MeuProgressoPadroes />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PadroesEnem;
