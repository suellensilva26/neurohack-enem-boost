import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Brain, GraduationCap, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuestoesResolvidasSection from "@/components/questoes/QuestoesResolvidasSection";
import SimuladoSection from "@/components/questoes/SimuladoSection";

const QuestoesRecorrentes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </button>
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              150 Questões Recorrentes
            </span>
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="resolvidas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="resolvidas" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">50 Questões</span>
              <span className="sm:hidden">Resolvidas</span>
            </TabsTrigger>
            <TabsTrigger value="simulado" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">100 Questões</span>
              <span className="sm:hidden">Simulado</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resolvidas" className="space-y-6">
            <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  50 Questões Resolvidas com Explicações Completas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Questões com <strong>dupla explicação</strong>: técnica (para quem estudou) 
                  e lógica (para quem não estudou). Selecione sua resposta e veja a resolução completa!
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>Explicação Técnica</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4 text-accent" />
                    <span>Explicação Lógica</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <QuestoesResolvidasSection />
          </TabsContent>

          <TabsContent value="simulado" className="space-y-6">
            <Card className="border-accent/20 bg-gradient-to-br from-card/50 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Simulado: 100 Questões Recorrentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pratique com as 100 questões que mais caem no ENEM! Teste seus conhecimentos 
                  e veja seu desempenho ao final.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <BookOpen className="h-4 w-4" />
                  <span>Gabarito disponível ao finalizar</span>
                </div>
              </CardContent>
            </Card>

            <SimuladoSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuestoesRecorrentes;
