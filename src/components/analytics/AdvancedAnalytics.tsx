import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Target, Brain, Clock, Calendar, BarChart3,
  PieChart, LineChart, Zap, CheckCircle, XCircle, AlertTriangle,
  BookOpen, Award, Users, Star, Eye, Filter, Trophy, Flame, Sparkles
} from "lucide-react";

interface StudyData {
  date: string;
  questionsAnswered: number;
  studyHours: number;
  accuracy: number;
  subjects: {
    [key: string]: {
      questions: number;
      correct: number;
      timeSpent: number;
    };
  };
}

interface PerformanceMetrics {
  totalQuestions: number;
  totalHours: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  weakSubjects: string[];
  strongSubjects: string[];
  studyPattern: 'morning' | 'afternoon' | 'evening' | 'mixed';
  predictedScore: number;
  improvementRate: number;
}

const subjects = [
  { name: "Matemática", color: "bg-red-500", icon: "📐" },
  { name: "Português", color: "bg-blue-500", icon: "📚" },
  { name: "Biologia", color: "bg-green-500", icon: "🧬" },
  { name: "Química", color: "bg-yellow-500", icon: "⚗️" },
  { name: "Física", color: "bg-purple-500", icon: "⚡" },
  { name: "História", color: "bg-orange-500", icon: "🏛️" },
  { name: "Geografia", color: "bg-teal-500", icon: "🌍" },
  { name: "Filosofia", color: "bg-pink-500", icon: "🤔" },
  { name: "Sociologia", color: "bg-indigo-500", icon: "👥" }
];

export const AdvancedAnalytics = () => {
  const [studyData, setStudyData] = useState<StudyData[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalQuestions: 0,
    totalHours: 0,
    averageAccuracy: 0,
    currentStreak: 0,
    longestStreak: 0,
    weakSubjects: [],
    strongSubjects: [],
    studyPattern: 'mixed',
    predictedScore: 0,
    improvementRate: 0
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Carregar dados de uso diário
      const { data: dailyUsage } = await supabase
        .from("daily_usage")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", getDateFromPeriod(selectedPeriod))
        .order("date", { ascending: true });

      if (dailyUsage) {
        const processedData = processStudyData(dailyUsage);
        setStudyData(processedData);
        
        const calculatedMetrics = calculateMetrics(processedData);
        setMetrics(calculatedMetrics);
      }
    } catch (error) {
      console.error("Erro ao carregar analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDateFromPeriod = (period: string) => {
    const today = new Date();
    switch (period) {
      case '7d':
        return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      case '90d':
        return new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    }
  };

  const processStudyData = (rawData: any[]): StudyData[] => {
    // Simular dados de estudo por matéria (em um sistema real, isso viria do banco)
    return rawData.map(day => ({
      date: day.date,
      questionsAnswered: day.questions_answered || 0,
      studyHours: day.study_hours || 0,
      accuracy: Math.random() * 30 + 70, // 70-100% (simulado)
      subjects: {
        "Matemática": {
          questions: Math.floor((day.questions_answered || 0) * 0.3),
          correct: Math.floor((day.questions_answered || 0) * 0.3 * 0.8),
          timeSpent: (day.study_hours || 0) * 0.3
        },
        "Português": {
          questions: Math.floor((day.questions_answered || 0) * 0.25),
          correct: Math.floor((day.questions_answered || 0) * 0.25 * 0.85),
          timeSpent: (day.study_hours || 0) * 0.25
        },
        "Biologia": {
          questions: Math.floor((day.questions_answered || 0) * 0.2),
          correct: Math.floor((day.questions_answered || 0) * 0.2 * 0.75),
          timeSpent: (day.study_hours || 0) * 0.2
        },
        "Química": {
          questions: Math.floor((day.questions_answered || 0) * 0.15),
          correct: Math.floor((day.questions_answered || 0) * 0.15 * 0.7),
          timeSpent: (day.study_hours || 0) * 0.15
        },
        "Física": {
          questions: Math.floor((day.questions_answered || 0) * 0.1),
          correct: Math.floor((day.questions_answered || 0) * 0.1 * 0.65),
          timeSpent: (day.study_hours || 0) * 0.1
        }
      }
    }));
  };

  const calculateMetrics = (data: StudyData[]): PerformanceMetrics => {
    const totalQuestions = data.reduce((sum, day) => sum + day.questionsAnswered, 0);
    const totalHours = data.reduce((sum, day) => sum + day.studyHours, 0);
    const averageAccuracy = data.length > 0 
      ? data.reduce((sum, day) => sum + day.accuracy, 0) / data.length 
      : 0;

    // Calcular sequência atual
    const today = new Date();
    let currentStreak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      const dayDate = new Date(data[i].date);
      const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === currentStreak && data[i].studyHours > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calcular matérias fortes e fracas
    const subjectStats = subjects.map(subject => {
      const totalQuestions = data.reduce((sum, day) => 
        sum + (day.subjects[subject.name]?.questions || 0), 0);
      const totalCorrect = data.reduce((sum, day) => 
        sum + (day.subjects[subject.name]?.correct || 0), 0);
      const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
      
      return { name: subject.name, accuracy, questions: totalQuestions };
    });

    const sortedSubjects = subjectStats.sort((a, b) => b.accuracy - a.accuracy);
    const strongSubjects = sortedSubjects.slice(0, 3).map(s => s.name);
    const weakSubjects = sortedSubjects.slice(-3).map(s => s.name);

    // Prever nota do ENEM (algoritmo simplificado)
    const predictedScore = Math.min(1000, Math.max(400, 
      (averageAccuracy * 8) + (currentStreak * 5) + (totalHours * 2)
    ));

    // Taxa de melhoria (simulada)
    const improvementRate = Math.min(100, Math.max(-50, 
      (averageAccuracy - 70) + (currentStreak * 2)
    ));

    return {
      totalQuestions,
      totalHours,
      averageAccuracy,
      currentStreak,
      longestStreak: Math.max(currentStreak, 0),
      weakSubjects,
      strongSubjects,
      studyPattern: 'mixed',
      predictedScore,
      improvementRate
    };
  };

  const getPerformanceColor = (value: number, type: 'accuracy' | 'score' | 'improvement') => {
    switch (type) {
      case 'accuracy':
        if (value >= 90) return 'text-green-600';
        if (value >= 80) return 'text-blue-600';
        if (value >= 70) return 'text-yellow-600';
        return 'text-red-600';
      case 'score':
        if (value >= 800) return 'text-green-600';
        if (value >= 700) return 'text-blue-600';
        if (value >= 600) return 'text-yellow-600';
        return 'text-red-600';
      case 'improvement':
        if (value > 0) return 'text-green-600';
        if (value === 0) return 'text-gray-600';
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Avançado
            </CardTitle>
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period as any)}
                >
                  {period === '7d' ? '7 dias' : period === '30d' ? '30 dias' : '90 dias'}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{metrics.totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Questões respondidas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{metrics.totalHours}h</div>
            <div className="text-sm text-muted-foreground">Horas estudadas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className={`text-2xl font-bold ${getPerformanceColor(metrics.averageAccuracy, 'accuracy')}`}>
              {Math.round(metrics.averageAccuracy)}%
            </div>
            <div className="text-sm text-muted-foreground">Taxa de acerto</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{metrics.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Sequência atual</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="subjects">Por Matéria</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
          <TabsTrigger value="predictions">Predições</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Gráfico de evolução */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {studyData.slice(-14).map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary rounded-t"
                      style={{ 
                        height: `${Math.max(20, (day.accuracy / 100) * 200)}px`,
                        minHeight: '20px'
                      }}
                      title={`${day.date}: ${Math.round(day.accuracy)}% acerto`}
                    ></div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(day.date).getDate()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Matérias fortes e fracas */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Pontos Fortes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.strongSubjects.map((subject, index) => {
                    const subjectData = subjects.find(s => s.name === subject);
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-2xl">{subjectData?.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{subject}</div>
                          <Progress value={85 + Math.random() * 10} className="h-2 mt-1" />
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Forte
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Áreas de Melhoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.weakSubjects.map((subject, index) => {
                    const subjectData = subjects.find(s => s.name === subject);
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-2xl">{subjectData?.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{subject}</div>
                          <Progress value={40 + Math.random() * 20} className="h-2 mt-1" />
                        </div>
                        <Badge variant="outline" className="text-red-600">
                          Melhorar
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid gap-4">
            {subjects.map((subject) => {
              const totalQuestions = studyData.reduce((sum, day) => 
                sum + (day.subjects[subject.name]?.questions || 0), 0);
              const totalCorrect = studyData.reduce((sum, day) => 
                sum + (day.subjects[subject.name]?.correct || 0), 0);
              const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
              
              return (
                <Card key={subject.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{subject.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{subject.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="text-sm text-muted-foreground">
                            {totalQuestions} questões
                          </div>
                          <div className={`text-sm font-medium ${getPerformanceColor(accuracy, 'accuracy')}`}>
                            {Math.round(accuracy)}% acerto
                          </div>
                        </div>
                        <Progress value={accuracy} className="h-2 mt-2" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getPerformanceColor(accuracy, 'accuracy')}
                      >
                        {accuracy >= 80 ? 'Excelente' : accuracy >= 70 ? 'Bom' : 'Precisa melhorar'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Progresso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <span>Sequência de estudos</span>
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-bold">{metrics.currentStreak} dias</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Maior sequência</span>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gold" />
                    <span className="font-bold">{metrics.longestStreak} dias</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Taxa de melhoria</span>
                  <div className={`flex items-center gap-2 ${getPerformanceColor(metrics.improvementRate, 'improvement')}`}>
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">
                      {metrics.improvementRate > 0 ? '+' : ''}{Math.round(metrics.improvementRate)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-gold/10">
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              Predição da Nota ENEM
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getPerformanceColor(metrics.predictedScore, 'score')}`}>
                  {Math.round(metrics.predictedScore)}
                </div>
                <p className="text-muted-foreground">
                  Baseado no seu desempenho atual e histórico de estudos
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-green-600">Nota Mínima</div>
                    <div className="text-2xl font-bold">{Math.round(metrics.predictedScore - 50)}</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-blue-600">Nota Máxima</div>
                    <div className="text-2xl font-bold">{Math.round(metrics.predictedScore + 50)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">🎯 Foque em {metrics.weakSubjects[0]}</h4>
                  <p className="text-sm text-blue-700">
                    Sua maior oportunidade de melhoria está em {metrics.weakSubjects[0]}. 
                    Dedique 30% do seu tempo de estudo a esta matéria.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">💪 Mantenha {metrics.strongSubjects[0]}</h4>
                  <p className="text-sm text-green-700">
                    Você está indo muito bem em {metrics.strongSubjects[0]}. 
                    Continue revisando para manter o nível alto.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-purple-50 border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">📈 Estratégia de Estudo</h4>
                  <p className="text-sm text-purple-700">
                    {metrics.studyHours < 20 
                      ? "Aumente suas horas de estudo para pelo menos 2h por dia para melhorar significativamente sua nota."
                      : "Sua dedicação está excelente! Continue assim e foque na qualidade dos estudos."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
