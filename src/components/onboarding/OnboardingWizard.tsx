import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, Target, Clock, Brain, BookOpen, 
  ChevronRight, ChevronLeft, CheckCircle, Star,
  Users, Trophy, Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  fullName: string;
  desiredCourse: string;
  targetUniversity: string;
  preparationLevel: "zero" | "basico" | "intermediario";
  studyDaysAvailable: number;
  mainDifficulty: string;
  studyGoal: string;
  motivation: string;
}

const onboardingSteps = [
  {
    id: "welcome",
    title: "Bem-vindo ao ENEM 30x Boost! 🚀",
    subtitle: "Vamos personalizar sua experiência de estudo",
    icon: <Star className="h-8 w-8 text-gold" />
  },
  {
    id: "personal",
    title: "Conta nos sobre você",
    subtitle: "Informações básicas para personalização",
    icon: <Users className="h-6 w-6" />
  },
  {
    id: "academic",
    title: "Seus objetivos acadêmicos",
    subtitle: "Onde você quer chegar?",
    icon: <GraduationCap className="h-6 w-6" />
  },
  {
    id: "preparation",
    title: "Seu nível atual",
    subtitle: "Como está sua preparação hoje?",
    icon: <Target className="h-6 w-6" />
  },
  {
    id: "schedule",
    title: "Sua rotina de estudos",
    subtitle: "Quando e quanto você pode estudar?",
    icon: <Clock className="h-6 w-6" />
  },
  {
    id: "difficulties",
    title: "Suas principais dificuldades",
    subtitle: "O que mais te preocupa no ENEM?",
    icon: <Brain className="h-6 w-6" />
  },
  {
    id: "motivation",
    title: "Sua motivação",
    subtitle: "O que te move a estudar?",
    icon: <Trophy className="h-6 w-6" />
  },
  {
    id: "complete",
    title: "Tudo pronto! 🎉",
    subtitle: "Seu cronograma personalizado está sendo criado",
    icon: <CheckCircle className="h-8 w-8 text-green-500" />
  }
];

const courses = [
  "Medicina", "Direito", "Engenharia", "Administração", "Psicologia",
  "Enfermagem", "Fisioterapia", "Odontologia", "Veterinária", "Arquitetura",
  "Ciência da Computação", "Jornalismo", "Publicidade", "Economia", "Outro"
];

const universities = [
  "USP", "UNICAMP", "UFMG", "UFRJ", "UNB", "UFRGS", "UFSC", "UFC",
  "UFPE", "UFBA", "UFCG", "UFRN", "UFPA", "UFAM", "UFPR", "Outra"
];

const difficulties = [
  "Matemática", "Português", "Redação", "Biologia", "Química", 
  "Física", "História", "Geografia", "Filosofia", "Sociologia"
];

const motivations = [
  "Realizar o sonho da família",
  "Ter uma carreira estável",
  "Fazer a diferença na sociedade",
  "Ganhar bem financeiramente",
  "Seguir minha paixão",
  "Provar minha capacidade"
];

export const OnboardingWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    desiredCourse: "",
    targetUniversity: "",
    preparationLevel: "zero",
    studyDaysAvailable: 5,
    mainDifficulty: "",
    studyGoal: "",
    motivation: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const updateData = (field: keyof OnboardingData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      // Atualizar perfil com dados do onboarding
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          desired_course: data.desiredCourse,
          target_university: data.targetUniversity,
          preparation_level: data.preparationLevel,
          study_days_available: data.studyDaysAvailable,
          main_difficulty: data.mainDifficulty,
          onboarding_completed: true
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Criar registro de uso diário
      const { error: usageError } = await supabase
        .from("daily_usage")
        .upsert({
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          questions_answered: 0,
          study_hours: 0,
          streak_days: 0
        });

      if (usageError) throw usageError;

      toast({
        title: "Onboarding concluído! 🎉",
        description: "Sua experiência foi personalizada com sucesso.",
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];

    switch (step.id) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl">🚀</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo ao futuro dos seus estudos!</h2>
              <p className="text-muted-foreground">
                Em apenas 30 dias, você estará pronto para conquistar sua vaga no ENEM.
                Vamos personalizar tudo para você!
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-gold" />
                <div className="text-2xl font-bold text-gold">95%</div>
                <div className="text-sm text-muted-foreground">Taxa de aprovação</div>
              </div>
              <div className="p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-blue-500">10k+</div>
                <div className="text-sm text-muted-foreground">Estudantes aprovados</div>
              </div>
              <div className="p-4 border rounded-lg">
                <Zap className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-green-500">30</div>
                <div className="text-sm text-muted-foreground">Dias para aprovação</div>
              </div>
            </div>
          </div>
        );

      case "personal":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Como você gostaria de ser chamado?</label>
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => updateData("fullName", e.target.value)}
                placeholder="Digite seu nome"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        );

      case "academic":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Qual curso você deseja?</label>
              <div className="grid grid-cols-2 gap-3">
                {courses.map((course) => (
                  <Button
                    key={course}
                    variant={data.desiredCourse === course ? "default" : "outline"}
                    onClick={() => updateData("desiredCourse", course)}
                    className="h-auto p-3"
                  >
                    {course}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Universidade dos seus sonhos?</label>
              <div className="grid grid-cols-2 gap-3">
                {universities.map((university) => (
                  <Button
                    key={university}
                    variant={data.targetUniversity === university ? "default" : "outline"}
                    onClick={() => updateData("targetUniversity", university)}
                    className="h-auto p-3"
                  >
                    {university}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case "preparation":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Como você avalia sua preparação atual?</label>
              <div className="space-y-3">
                {[
                  { value: "zero", label: "Zero - Estou começando do zero", desc: "Não tenho base sólida" },
                  { value: "basico", label: "Básico - Tenho alguma base", desc: "Conheço alguns tópicos" },
                  { value: "intermediario", label: "Intermediário - Estou bem preparado", desc: "Tenho boa base, preciso revisar" }
                ].map((level) => (
                  <div
                    key={level.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      data.preparationLevel === level.value ? "border-primary bg-primary/10" : "hover:bg-muted/50"
                    }`}
                    onClick={() => updateData("preparationLevel", level.value as any)}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm text-muted-foreground">{level.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Quantos dias por semana você pode estudar?
              </label>
              <div className="flex gap-2">
                {[3, 4, 5, 6, 7].map((days) => (
                  <Button
                    key={days}
                    variant={data.studyDaysAvailable === days ? "default" : "outline"}
                    onClick={() => updateData("studyDaysAvailable", days)}
                    className="flex-1"
                  >
                    {days} dias
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quantas horas por dia você pode dedicar aos estudos?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((hours) => (
                  <Button
                    key={hours}
                    variant="outline"
                    className="h-auto p-3"
                  >
                    {hours}h por dia
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case "difficulties":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Qual matéria você considera mais difícil?</label>
              <div className="grid grid-cols-2 gap-3">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={data.mainDifficulty === difficulty ? "default" : "outline"}
                    onClick={() => updateData("mainDifficulty", difficulty)}
                    className="h-auto p-3"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case "motivation":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">O que mais te motiva a estudar?</label>
              <div className="space-y-3">
                {motivations.map((motivation) => (
                  <div
                    key={motivation}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => updateData("motivation", motivation)}
                  >
                    <div className="font-medium">{motivation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Perfeito, {data.fullName}!</h2>
              <p className="text-muted-foreground mb-4">
                Com base nas suas respostas, criamos um cronograma personalizado para você conquistar sua vaga em {data.desiredCourse} na {data.targetUniversity}.
              </p>
            </div>
            
            <div className="grid gap-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Seu plano personalizado inclui:</h3>
                  <ul className="text-sm space-y-1 text-left">
                    <li>✅ Cronograma de {data.studyDaysAvailable} dias por semana</li>
                    <li>✅ Foco especial em {data.mainDifficulty}</li>
                    <li>✅ Simulados adaptados ao seu nível {data.preparationLevel}</li>
                    <li>✅ Lembretes personalizados de estudo</li>
                    <li>✅ Acompanhamento de progresso detalhado</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {onboardingSteps[currentStep].icon}
              <div>
                <CardTitle>{onboardingSteps[currentStep].title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {onboardingSteps[currentStep].subtitle}
                </p>
              </div>
            </div>
            <Badge variant="outline">
              {currentStep + 1} de {onboardingSteps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStepContent()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            <Button
              onClick={nextStep}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? "Salvando..." : currentStep === onboardingSteps.length - 1 ? "Finalizar" : "Próximo"}
              {!isLoading && currentStep < onboardingSteps.length - 1 && (
                <ChevronRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
