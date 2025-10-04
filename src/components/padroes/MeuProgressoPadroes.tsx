import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Calculator, BookOpen, Atom, Globe, TrendingUp, CheckCircle2 } from "lucide-react";

export const MeuProgressoPadroes = () => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('pattern_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('last_studied_at', { ascending: false });

      if (data) {
        setProgressData(data);
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleStats = (module: string) => {
    const moduleData = progressData.filter(p => p.module === module);
    const completed = moduleData.filter(p => p.completed).length;
    const total = moduleData.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const modules = [
    { id: 'matematica', name: 'Matemática', icon: Calculator },
    { id: 'portugues', name: 'Português', icon: BookOpen },
    { id: 'ciencias', name: 'Ciências', icon: Atom },
    { id: 'humanas', name: 'Humanas', icon: Globe }
  ];

  if (loading) {
    return (
      <Card className="card-premium">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Carregando seu progresso...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            Meu Domínio dos Padrões
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {modules.map((module) => {
          const stats = getModuleStats(module.id);
          const Icon = module.icon;
          
          return (
            <Card key={module.id} className="card-premium">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                  <CardTitle className="text-xs md:text-sm">{module.name}</CardTitle>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] md:text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-bold">{stats.percentage}%</span>
                  </div>
                  <Progress value={stats.percentage} className="h-1.5 md:h-2" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    {stats.completed} de {stats.total} padrões
                  </p>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Detailed Progress by Module */}
      <Tabs defaultValue="matematica" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <TabsTrigger key={module.id} value={module.id} className="text-[10px] md:text-sm">
                <Icon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="hidden md:inline">{module.name}</span>
                <span className="md:hidden">{module.name.slice(0, 4)}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id} className="space-y-3 md:space-y-4">
            {progressData
              .filter(p => p.module === module.id)
              .map((pattern) => (
                <Card key={pattern.id} className="card-premium">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {pattern.completed && (
                            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                          )}
                          <CardTitle className="text-xs md:text-base">
                            Padrão: {pattern.pattern_id}
                          </CardTitle>
                        </div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                          Estudado em: {new Date(pattern.last_studied_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs md:text-sm font-semibold">
                          {pattern.exercises_completed || 0} exercícios
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  {pattern.notes && (
                    <CardContent>
                      <div className="bg-muted p-2 md:p-3 rounded">
                        <p className="text-[10px] md:text-xs font-semibold mb-1">Suas Anotações:</p>
                        <p className="text-[10px] md:text-xs whitespace-pre-wrap">{pattern.notes}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            
            {progressData.filter(p => p.module === module.id).length === 0 && (
              <Card className="card-premium">
                <CardContent className="py-8 text-center">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Nenhum padrão estudado ainda neste módulo
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
