import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, Clock, Target, Brain, BookOpen, CheckCircle,
  TrendingUp, Zap, Star, AlertTriangle, Trophy, Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudyDay {
  day: number;
  date: string;
  subjects: {
    name: string;
    topics: string[];
    duration: number; // em minutos
    difficulty: 'easy' | 'medium' | 'hard';
    priority: 'high' | 'medium' | 'low';
  }[];
  totalHours: number;
  completed: boolean;
  progress: number;
}

interface ScheduleData {
  totalDays: number;
  currentDay: number;
  studyDays: StudyDay[];
  weakSubjects: string[];
  strongSubjects: string[];
  studyHoursPerDay: number;
  studyDaysPerWeek: number;
}

const subjects = [
  { name: "Matemática", icon: "📐", color: "bg-red-500" },
  { name: "Português", icon: "📚", color: "bg-blue-500" },
  { name: "Biologia", icon: "🧬", color: "bg-green-500" },
  { name: "Química", icon: "⚗️", color: "bg-yellow-500" },
  { name: "Física", icon: "⚡", color: "bg-purple-500" },
  { name: "História", color: "bg-orange-500" },
  { name: "Geografia", icon: "🌍", color: "bg-teal-500" },
  { name: "Filosofia", icon: "🤔", color: "bg-pink-500" },
  { name: "Sociologia", icon: "👥", color: "bg-indigo-500" }
];

const topicsBySubject = {
  "Matemática": [
    "Funções do 1º grau", "Funções do 2º grau", "Progressões", "Geometria Plana",
    "Geometria Espacial", "Trigonometria", "Estatística", "Probabilidade"
  ],
  "Português": [
    "Interpretação de texto", "Gramática", "Literatura", "Redação",
    "Figuras de linguagem", "Variação linguística", "Gêneros textuais"
  ],
  "Biologia": [
    "Citologia", "Genética", "Ecologia", "Evolução", "Fisiologia humana",
    "Botânica", "Zoologia", "Biologia molecular"
  ],
  "Química": [
    "Química orgânica", "Química inorgânica", "Físico-química", "Estequiometria",
    "Termoquímica", "Eletroquímica", "Cinética química"
  ],
  "Física": [
    "Mecânica", "Termodinâmica", "Eletromagnetismo", "Óptica", "Ondas",
    "Física moderna", "Eletrostática", "Magnetismo"
  ]
};

export const PersonalizedSchedule = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPersonalizedSchedule();
  }, []);

  const loadPersonalizedSchedule = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Carregar dados do perfil do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        const schedule = generatePersonalizedSchedule(profile);
        setScheduleData(schedule);
      }
    } catch (error) {
      console.error("Erro ao carregar cronograma:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePersonalizedSchedule = (profile: any): ScheduleData => {
    const totalDays = 30; // ENEM em 30 dias
    const studyDaysPerWeek = profile.study_days_available || 5;
    const studyHoursPerDay = 2; // Baseado no perfil
    const weakSubjects = [profile.main_difficulty || "Matemática"];
    const strongSubjects = ["Português", "História"]; // Simulado

    const studyDays: StudyDay[] = [];
    
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day - 1);
      
      // Pular fins de semana se necessário
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      if (isWeekend && studyDaysPerWeek < 7) {
        continue;
      }

      const daySubjects = generateDaySubjects(day, weakSubjects, strongSubjects, studyHoursPerDay);
      
      studyDays.push({
        day,
        date: date.toISOString().split('T')[0],
        subjects: daySubjects,
        totalHours: studyHoursPerDay,
        completed: false,
        progress: 0
      });
    }

    return {
      totalDays,
      currentDay: 1,
      studyDays,
      weakSubjects,
      strongSubjects,
      studyHoursPerDay,
      studyDaysPerWeek
    };
  };

  const generateDaySubjects = (day: number, weakSubjects: string[], strongSubjects: string[], totalHours: number) => {
    const subjectsForDay = [];
    
    // Priorizar matérias fracas nos primeiros dias
    if (day <= 15) {
      // 60% tempo em matérias fracas, 40% em outras
      const weakSubject = weakSubjects[0];
      subjectsForDay.push({
        name: weakSubject,
        topics: getRandomTopics(weakSubject, 3),
        duration: Math.floor(totalHours * 60 * 0.6), // 60% do tempo
        difficulty: 'hard' as const,
        priority: 'high' as const
      });
      
      // Adicionar outras matérias
      const otherSubjects = subjects.filter(s => s.name !== weakSubject);
      const selectedSubject = otherSubjects[Math.floor(Math.random() * otherSubjects.length)];
      
      subjectsForDay.push({
        name: selectedSubject.name,
        topics: getRandomTopics(selectedSubject.name, 2),
        duration: Math.floor(totalHours * 60 * 0.4),
        difficulty: 'medium' as const,
        priority: 'medium' as const
      });
    } else {
      // Últimos 15 dias: mais balanceado
      const subject1 = subjects[Math.floor(Math.random() * subjects.length)];
      const subject2 = subjects[Math.floor(Math.random() * subjects.length)];
      
      subjectsForDay.push(
        {
          name: subject1.name,
          topics: getRandomTopics(subject1.name, 2),
          duration: Math.floor(totalHours * 60 * 0.5),
          difficulty: 'medium' as const,
          priority: 'high' as const
        },
        {
          name: subject2.name,
          topics: getRandomTopics(subject2.name, 2),
          duration: Math.floor(totalHours * 60 * 0.5),
          difficulty: 'medium' as const,
          priority: 'medium' as const
        }
      );
    }

    return subjectsForDay;
  };

  const getRandomTopics = (subjectName: string, count: number): string[] => {
    const topics = topicsBySubject[subjectName as keyof typeof topicsBySubject] || [];
    const shuffled = topics.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const markDayCompleted = (dayIndex: number) => {
    if (!scheduleData) return;
    
    const updatedDays = [...scheduleData.studyDays];
    updatedDays[dayIndex].completed = true;
    updatedDays[dayIndex].progress = 100;
    
    setScheduleData({
      ...scheduleData,
      studyDays: updatedDays
    });

    toast({
      title: "Dia concluído! 🎉",
      description: "Parabéns por completar mais um dia de estudos!",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Gerando seu cronograma personalizado...</p>
        </div>
      </div>
    );
  }

  if (!scheduleData) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-lg font-semibold mb-2">Cronograma não disponível</h3>
          <p className="text-muted-foreground">
            Complete o onboarding primeiro para gerar seu cronograma personalizado.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentWeekDays = scheduleData.studyDays.slice((selectedWeek - 1) * 7, selectedWeek * 7);
  const totalWeeks = Math.ceil(scheduleData.studyDays.length / 7);
  const completedDays = scheduleData.studyDays.filter(day => day.completed).length;
  const overallProgress = (completedDays / scheduleData.studyDays.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header com progresso geral */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Seu Cronograma de 30 Dias</h2>
              <p className="text-muted-foreground">
                Personalizado para {scheduleData.studyDaysPerWeek} dias por semana
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{completedDays}/{scheduleData.studyDays.length}</div>
              <div className="text-sm text-muted-foreground">dias concluídos</div>
            </div>
          </div>
          
          <Progress value={overallProgress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progresso geral</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Navegação por semanas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Semana {selectedWeek} de {totalWeeks}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
                disabled={selectedWeek === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.min(totalWeeks, selectedWeek + 1))}
                disabled={selectedWeek === totalWeeks}
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dias da semana */}
      <div className="grid gap-4">
        {currentWeekDays.map((day, index) => (
          <Card key={day.day} className={`${day.completed ? 'border-green-200 bg-green-50' : 'border-border'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    day.completed ? 'bg-green-500' : 'bg-primary'
                  }`}>
                    {day.completed ? <CheckCircle className="h-4 w-4" /> : day.day}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Dia {day.day} - {new Date(day.date).toLocaleDateString('pt-BR')}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {day.totalHours}h de estudo • {day.subjects.length} matérias
                    </p>
                  </div>
                </div>
                {!day.completed && (
                  <Button
                    size="sm"
                    onClick={() => markDayCompleted((selectedWeek - 1) * 7 + index)}
                  >
                    Marcar como Concluído
                  </Button>
                )}
                {day.completed && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Concluído
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {day.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {subjects.find(s => s.name === subject.name)?.icon || '📚'}
                        </span>
                        <h4 className="font-medium">{subject.name}</h4>
                        {getPriorityIcon(subject.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getDifficultyColor(subject.difficulty)}`}>
                          {subject.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDuration(subject.duration)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <strong>Tópicos:</strong> {subject.topics.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dicas e estatísticas */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Foco Principal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scheduleData.weakSubjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{subject}</span>
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Prioridade Alta
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" />
              Suas Forças
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scheduleData.strongSubjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{subject}</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Forte
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
