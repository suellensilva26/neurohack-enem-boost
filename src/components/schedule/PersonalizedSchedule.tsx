import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, Clock, Target, Brain, BookOpen, CheckCircle,
  TrendingUp, Zap, Star, AlertTriangle, Trophy, Users, Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScheduleQuestionnaire, QuestionnaireData } from "./ScheduleQuestionnaire";
import { ScheduleGenerator, GeneratedSchedule } from "./ScheduleGenerator";

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
  const [scheduleData, setScheduleData] = useState<GeneratedSchedule | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [needsRenewal, setNeedsRenewal] = useState(false);
  const [nextRenewalDate, setNextRenewalDate] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkQuestionnaireStatus();
  }, []);

  const checkQuestionnaireStatus = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Verificar se já existe um cronograma personalizado
      const { data: existingSchedule } = await supabase
        .from("user_schedules")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (existingSchedule && existingSchedule.questionnaire_data) {
        const questionnaireData = existingSchedule.questionnaire_data as QuestionnaireData;
        const generatedSchedule = ScheduleGenerator.generateSchedule(questionnaireData);
        setScheduleData(generatedSchedule);

        // Renovação semanal: próxima renovação em 7 dias após última atualização/criação
        const lastUpdateStr = (existingSchedule.updated_at || existingSchedule.created_at) as string | undefined;
        const lastUpdate = lastUpdateStr ? new Date(lastUpdateStr) : new Date();
        const nextRenew = new Date(lastUpdate.getTime() + 7 * 24 * 60 * 60 * 1000);
        setNextRenewalDate(nextRenew);
        const renewalDue = Date.now() >= nextRenew.getTime();
        setNeedsRenewal(renewalDue);

        if (renewalDue) {
          setShowQuestionnaire(true);
          setHasCompletedQuestionnaire(false);
        } else {
          setHasCompletedQuestionnaire(true);
        }
      } else {
        setShowQuestionnaire(true);
      }
    } catch (error) {
      console.error("Erro ao verificar questionário:", error);
      setShowQuestionnaire(true);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Gerar cronograma personalizado
      const generatedSchedule = ScheduleGenerator.generateSchedule(data);
      
      // Salvar no banco de dados
      await supabase
        .from("user_schedules")
        .upsert({
          user_id: user.id,
          questionnaire_data: data,
          schedule_data: generatedSchedule,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      setScheduleData(generatedSchedule);
      setHasCompletedQuestionnaire(true);
      setShowQuestionnaire(false);
      setNeedsRenewal(false);
      const nextRenew = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      setNextRenewalDate(nextRenew);
      
      toast({
        title: "Cronograma Personalizado Criado!",
        description: "Seu plano de estudos foi gerado com base nas suas respostas.",
      });
    } catch (error) {
      console.error("Erro ao salvar cronograma:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar seu cronograma. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuestionnaire = () => {
    setShowQuestionnaire(true);
    setHasCompletedQuestionnaire(false);
    setScheduleData(null);
  };

  const formatDateBR = (date?: Date | null) => {
    if (!date) return "-";
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
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
      title: "Dia concluído!",
      description: "Parabéns por completar seu cronograma de hoje.",
    });
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
          <p className="text-muted-foreground">
            {showQuestionnaire ? 'Carregando questionário...' : 'Gerando seu cronograma personalizado...'}
          </p>
        </div>
      </div>
    );
  }

  // Mostrar questionário se necessário
  if (showQuestionnaire) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Cronograma Personalizado
            </CardTitle>
            <p className="text-muted-foreground">
              Responda algumas perguntas para criarmos um cronograma de estudos personalizado para você.
            </p>
          </CardHeader>
        </Card>
        
        <ScheduleQuestionnaire onComplete={handleQuestionnaireComplete} />
      </div>
    );
  }

  if (!scheduleData) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
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
    <div className="space-y-4 px-4 sm:px-6">
      {/* Header com progresso e botão de reconfiguração */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold leading-tight">Seu Cronograma de 30 Dias</h2>
              <p className="text-sm text-muted-foreground">
                Personalizado para {scheduleData.studyDaysPerWeek} dias por semana
              </p>
              {nextRenewalDate && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Próxima renovação: {formatDateBR(nextRenewalDate)}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={resetQuestionnaire}
                className="flex items-center gap-2 w-full sm:w-auto h-10 touch-manipulation"
              >
                <Settings className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Reconfigurar</span>
              </Button>
              <Button
                variant={needsRenewal ? "default" : "outline"}
                size="sm"
                onClick={resetQuestionnaire}
                className="flex items-center gap-2 w-full sm:w-auto h-10 touch-manipulation"
              >
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Renovar Cronograma</span>
              </Button>
              <div className="text-center sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-primary">{completedDays} / {scheduleData.studyDays.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">dias concluídos</div>
              </div>
            </div>
          </div>
          
          <Progress value={overallProgress} className="h-2 sm:h-3 mb-2" />
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>Progresso geral</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Navegação por semanas */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span>Semana {selectedWeek} de {totalWeeks}</span>
            </CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
                disabled={selectedWeek === 1}
                className="flex-1 sm:flex-none h-9 text-xs sm:text-sm touch-manipulation"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.min(totalWeeks, selectedWeek + 1))}
                disabled={selectedWeek === totalWeeks}
                className="flex-1 sm:flex-none h-9 text-xs sm:text-sm touch-manipulation"
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dias da semana */}
      <div className="grid gap-3 sm:gap-4">
        {currentWeekDays.map((day, index) => (
          <Card key={day.day} className={`${day.completed ? 'border-green-200 bg-green-50' : 'border-border'}`}>
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2 leading-tight">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>Dia {day.day} - {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {day.totalHours}h de estudo • {day.subjects.length} matérias
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  {!day.completed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markDayCompleted((selectedWeek - 1) * 7 + index)}
                      className="w-full sm:w-auto h-9 text-xs sm:text-sm touch-manipulation"
                    >
                      Marcar como Concluído
                    </Button>
                  )}
                  {day.completed && (
                    <Badge className="bg-green-500 text-white text-xs sm:text-sm">
                      <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                      Concluído
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {day.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="p-3 sm:p-4 rounded-lg border bg-card">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm sm:text-base">{subject.name}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={subject.difficulty === 'easy' ? 'default' : subject.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-xs">
                          {subject.difficulty === 'easy' ? 'Fácil' : subject.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                        </Badge>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {formatDuration(subject.duration)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <strong>Tópicos:</strong> {subject.topics.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recomendações personalizadas */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* E-books recomendados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              E-books Recomendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleData.recommendedEbooks.map((ebook, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  <Star className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">{ebook}</p>
                    <p className="text-sm text-muted-foreground">Baseado no seu perfil</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Funcionalidades recomendadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Funcionalidades Recomendadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleData.recommendedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">{feature}</p>
                    <p className="text-sm text-muted-foreground">Ideal para seu estilo</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dicas personalizadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Dicas Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {scheduleData.personalizedTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <Target className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Áreas de Melhoria
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
