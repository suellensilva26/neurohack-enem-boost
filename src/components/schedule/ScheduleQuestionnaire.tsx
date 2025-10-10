import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Brain, Clock, Target, BookOpen, Calendar, 
  TrendingUp, AlertTriangle, Star, CheckCircle 
} from "lucide-react";

export interface QuestionnaireData {
  // Perfil básico
  currentLevel: 'iniciante' | 'intermediario' | 'avancado';
  studyTime: number; // horas por dia
  studyDays: number; // dias por semana
  examDate: string;
  
  // Matérias
  weakSubjects: string[];
  strongSubjects: string[];
  prioritySubjects: string[];
  
  // Objetivos
  targetScore: number;
  desiredCourse: string;
  targetUniversity: string;
  
  // Preferências de estudo
  studyPeriod: 'manha' | 'tarde' | 'noite' | 'flexivel';
  studyStyle: 'teorico' | 'pratico' | 'misto';
  
  // Recursos do app
  useFlashcards: boolean;
  useSimulados: boolean;
  useEbooks: boolean;
  usePremiumFeatures: boolean;
  
  // Dificuldades específicas
  mainChallenges: string[];
  needsMotivation: boolean;
  hasStudySpace: boolean;
}

interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'radio' | 'checkbox' | 'slider' | 'multiselect';
  options?: { value: string; label: string; description?: string }[];
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
}

const questions: Question[] = [
  {
    id: 'currentLevel',
    title: 'Qual é o seu nível atual de preparação para o ENEM?',
    description: 'Seja honesto para recebermos o melhor cronograma',
    type: 'radio',
    options: [
      { value: 'iniciante', label: 'Iniciante', description: 'Começando agora ou com pouco conhecimento' },
      { value: 'intermediario', label: 'Intermediário', description: 'Já estudei algumas matérias, mas preciso revisar' },
      { value: 'avancado', label: 'Avançado', description: 'Boa base, focando em aperfeiçoamento' }
    ],
    required: true
  },
  {
    id: 'studyTime',
    title: 'Quantas horas por dia você pode dedicar aos estudos?',
    description: 'Considere um tempo realista que você consegue manter',
    type: 'slider',
    min: 1,
    max: 12,
    step: 0.5,
    required: true
  },
  {
    id: 'studyDays',
    title: 'Quantos dias por semana você pode estudar?',
    type: 'slider',
    min: 3,
    max: 7,
    step: 1,
    required: true
  },
  {
    id: 'weakSubjects',
    title: 'Quais são suas matérias com maior dificuldade?',
    description: 'Selecione até 3 matérias que você considera mais difíceis',
    type: 'multiselect',
    options: [
      { value: 'matematica', label: 'Matemática' },
      { value: 'portugues', label: 'Português' },
      { value: 'biologia', label: 'Biologia' },
      { value: 'quimica', label: 'Química' },
      { value: 'fisica', label: 'Física' },
      { value: 'historia', label: 'História' },
      { value: 'geografia', label: 'Geografia' },
      { value: 'filosofia', label: 'Filosofia' },
      { value: 'sociologia', label: 'Sociologia' },
      { value: 'redacao', label: 'Redação' }
    ],
    required: true
  },
  {
    id: 'strongSubjects',
    title: 'Quais são suas matérias mais fortes?',
    description: 'Selecione as matérias que você domina melhor',
    type: 'multiselect',
    options: [
      { value: 'matematica', label: 'Matemática' },
      { value: 'portugues', label: 'Português' },
      { value: 'biologia', label: 'Biologia' },
      { value: 'quimica', label: 'Química' },
      { value: 'fisica', label: 'Física' },
      { value: 'historia', label: 'História' },
      { value: 'geografia', label: 'Geografia' },
      { value: 'filosofia', label: 'Filosofia' },
      { value: 'sociologia', label: 'Sociologia' },
      { value: 'redacao', label: 'Redação' }
    ],
    required: false
  },
  {
    id: 'targetScore',
    title: 'Qual nota você pretende alcançar no ENEM?',
    description: 'Meta de pontuação geral (média das 4 provas + redação)',
    type: 'slider',
    min: 400,
    max: 1000,
    step: 50,
    required: true
  },
  {
    id: 'studyPeriod',
    title: 'Qual é o melhor período para você estudar?',
    type: 'radio',
    options: [
      { value: 'manha', label: 'Manhã', description: '6h às 12h' },
      { value: 'tarde', label: 'Tarde', description: '12h às 18h' },
      { value: 'noite', label: 'Noite', description: '18h às 24h' },
      { value: 'flexivel', label: 'Flexível', description: 'Varia conforme o dia' }
    ],
    required: true
  },
  {
    id: 'studyStyle',
    title: 'Qual é o seu estilo de aprendizagem preferido?',
    type: 'radio',
    options: [
      { value: 'teorico', label: 'Teórico', description: 'Prefiro ler e estudar conceitos' },
      { value: 'pratico', label: 'Prático', description: 'Aprendo melhor fazendo exercícios' },
      { value: 'misto', label: 'Misto', description: 'Combino teoria e prática' }
    ],
    required: true
  },
  {
    id: 'appFeatures',
    title: 'Quais recursos do app você pretende usar?',
    description: 'Marque todos que interessam',
    type: 'checkbox',
    options: [
      { value: 'todos', label: 'Todos para maximizar meus resultados', description: 'Usar todos os recursos disponíveis para otimizar meu desempenho' },
      { value: 'flashcards', label: 'Flashcards', description: 'Revisão rápida e memorização' },
      { value: 'simulados', label: 'Simulados', description: 'Testes cronometrados' },
      { value: 'ebooks', label: 'E-books', description: 'Material de estudo completo' },
      { value: 'questoes', label: 'Banco de Questões', description: 'Exercícios por matéria' },
      { value: 'redacao', label: 'Correção de Redação', description: 'Feedback detalhado' },
      { value: 'cronograma', label: 'Cronograma Personalizado', description: 'Planejamento automático' }
    ],
    required: false
  },
  {
    id: 'mainChallenges',
    title: 'Quais são seus principais desafios nos estudos?',
    type: 'multiselect',
    options: [
      { value: 'concentracao', label: 'Dificuldade de concentração' },
      { value: 'tempo', label: 'Falta de tempo' },
      { value: 'motivacao', label: 'Falta de motivação' },
      { value: 'organizacao', label: 'Desorganização nos estudos' },
      { value: 'ansiedade', label: 'Ansiedade com provas' },
      { value: 'disciplina', label: 'Falta de disciplina' },
      { value: 'material', label: 'Material de estudo inadequado' },
      { value: 'ambiente', label: 'Ambiente de estudo ruim' }
    ],
    required: false
  }
];

export const ScheduleQuestionnaire = ({ onComplete }: { onComplete: (data: QuestionnaireData) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: any) => {
    if (question.type === 'multiselect' || question.type === 'checkbox') {
      setAnswers(prev => ({
        ...prev,
        [question.id]: selectedOptions
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [question.id]: value
      }));
    }
  };

  const handleMultiSelect = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, value]);
    } else {
      setSelectedOptions(prev => prev.filter(item => item !== value));
    }
  };

  const nextQuestion = () => {
    handleAnswer(question.type === 'slider' ? answers[question.id as keyof QuestionnaireData] : 
                 question.type === 'multiselect' || question.type === 'checkbox' ? selectedOptions : 
                 answers[question.id as keyof QuestionnaireData]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOptions([]);
    } else {
      // Processar respostas finais
      const finalAnswers = { ...answers };
      
      // Processar recursos do app
      if (selectedOptions.includes('todos')) {
        // Se selecionou "todos", ativar todos os recursos
        finalAnswers.useFlashcards = true;
        finalAnswers.useSimulados = true;
        finalAnswers.useEbooks = true;
        finalAnswers.usePremiumFeatures = true;
      } else {
        // Processar seleções individuais
        if (selectedOptions.includes('flashcards')) finalAnswers.useFlashcards = true;
        if (selectedOptions.includes('simulados')) finalAnswers.useSimulados = true;
        if (selectedOptions.includes('ebooks')) finalAnswers.useEbooks = true;
      }
      
      // Definir valores padrão
      finalAnswers.examDate = '2025-11-09'; // Data do ENEM 2025
      finalAnswers.desiredCourse = 'Curso Superior';
      finalAnswers.targetUniversity = 'Universidade Pública';
      finalAnswers.usePremiumFeatures = finalAnswers.usePremiumFeatures || false;
      finalAnswers.needsMotivation = finalAnswers.mainChallenges?.includes('motivacao') || false;
      finalAnswers.hasStudySpace = !finalAnswers.mainChallenges?.includes('ambiente') || true;
      
      onComplete(finalAnswers as QuestionnaireData);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (!question.required) return true;
    
    const currentAnswer = answers[question.id as keyof QuestionnaireData];
    
    if (question.type === 'multiselect' || question.type === 'checkbox') {
      return selectedOptions.length > 0;
    }
    
    return currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== '';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 px-4 sm:px-6">
      {/* Header com progresso */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="leading-tight">Questionário de Personalização</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Pergunta {currentQuestion + 1} de {questions.length}
              </p>
            </div>
            <Badge variant="outline" className="self-start sm:self-center">
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
      </Card>

      {/* Pergunta atual */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg leading-tight">{question.title}</CardTitle>
          {question.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{question.description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          {question.type === 'radio' && (
            <RadioGroup
              value={answers[question.id as keyof QuestionnaireData] as string}
              onValueChange={(value) => handleAnswer(value)}
            >
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors touch-manipulation">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={option.value} className="font-medium cursor-pointer text-sm sm:text-base leading-tight">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{option.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'slider' && (
            <div className="space-y-6">
              <div className="px-4">
                <Slider
                  value={[answers[question.id as keyof QuestionnaireData] as number || question.min || 1]}
                  onValueChange={(value) => handleAnswer(value[0])}
                  min={question.min}
                  max={question.max}
                  step={question.step}
                  className="w-full touch-manipulation"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground px-2">
                <span className="text-xs sm:text-sm">{question.min}</span>
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium text-sm">
                  {answers[question.id as keyof QuestionnaireData] || question.min}
                  {question.id === 'studyTime' && 'h'}
                  {question.id === 'studyDays' && ' dias'}
                  {question.id === 'targetScore' && ' pontos'}
                </div>
                <span className="text-xs sm:text-sm">{question.max}</span>
              </div>
            </div>
          )}

          {(question.type === 'multiselect' || question.type === 'checkbox') && (
            <div className="grid gap-3">
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors touch-manipulation">
                  <Checkbox
                    id={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onCheckedChange={(checked) => handleMultiSelect(option.value, checked as boolean)}
                    className="mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={option.value} className="font-medium cursor-pointer text-sm sm:text-base leading-tight">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{option.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navegação */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-2">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
        >
          Anterior
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={!canProceed()}
          className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm bg-primary hover:bg-primary/90 touch-manipulation"
        >
          {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
};