import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Target, Award, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
// import PaywallModal from "@/components/PaywallModal";

interface Question {
  id: string;
  prompt: string;
  alternatives: any;
  correct_index: number;
  explanation: string;
  tags: string[];
}

const Simulado = () => {
  const PREMIUM_BUILD = (import.meta.env.VITE_PREMIUM_BUILD ?? 'true') === 'true';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [showPaywall, setShowPaywall] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    checkAccessAndLoadQuestions();
  }, []);

  const checkAccessAndLoadQuestions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Em build premium, não exigir login
      if (!user && PREMIUM_BUILD) {
        setHasAccess(true);
      }

      if (!user && !PREMIUM_BUILD) {
        navigate("/auth");
        return;
      }

      // Check entitlements
      const { data: profile } = await supabase
        .from("profiles")
        .select("entitlements")
        .eq("id", user?.id)
        .single();

      const hasFullAccess = PREMIUM_BUILD || profile?.entitlements?.includes("full_access");
      setHasAccess(hasFullAccess);

      // Load priority questions
      const { data: questionsData, error } = await supabase
        .from("questions")
        .select("*")
        .eq("priority", true)
        .limit(hasFullAccess ? 100 : 10);

      if (error) throw error;

      setQuestions(questionsData || []);
      setAnswers(new Array(questionsData?.length || 0).fill(-1));
    } catch (error) {
      console.error("Error loading simulado:", error);
      toast({
        title: "Erro ao carregar simulado",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } // Removido paywall após 10 questões
  };

  const handleFinish = async () => {
    const timeSpentSeconds = Math.floor((Date.now() - startTime) / 1000);
    setTimeSpent(timeSpentSeconds);

    const score = answers.reduce((acc, answer, idx) => {
      return acc + (answer === questions[idx]?.correct_index ? 1 : 0);
    }, 0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from("quiz_results").insert({
          user_id: user.id,
          lesson_id: "simulado-100",
          score: (score / questions.length) * 100,
          total_questions: questions.length,
          time_spent_seconds: timeSpentSeconds,
        });
      }
    } catch (error) {
      console.error("Error saving results:", error);
    }

    setShowResults(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando simulado...</p>
      </div>
    );
  }

  if (showResults) {
    const score = answers.reduce((acc, answer, idx) => {
      return acc + (answer === questions[idx]?.correct_index ? 1 : 0);
    }, 0);
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Link to="/tabs" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Voltar</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-4 py-12">
          <Card className="card-premium text-center">
            <Award className="h-16 w-16 text-gold mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Simulado Concluído!</h1>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-primary/10 rounded-xl p-6">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary">{score}/{questions.length}</div>
                <div className="text-sm text-muted-foreground">Questões Corretas</div>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary">{percentage.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Aproveitamento</div>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary">{Math.floor(timeSpent / 60)}min</div>
                <div className="text-sm text-muted-foreground">Tempo Total</div>
              </div>
            </div>

            {!hasAccess && (
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-6 mb-6">
                <p className="text-foreground mb-4">
                  Você completou o teste demo! Desbloqueie as 100 questões completas e relatórios detalhados.
                </p>
                <Button className="btn-premium" onClick={() => setShowPaywall(true)}>
                  Ver Planos Premium
                </Button>
              </div>
            )}

            <div className="space-y-4 text-left">
              <h3 className="font-semibold text-lg">📊 Recomendações de Estudo</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Revise as questões de Matemática - área com maior índice de erros</li>
                <li>• Estude os tópicos de Interpretação de Texto para melhorar 15%</li>
                <li>• Foque em Ciências da Natureza nos próximos 7 dias</li>
              </ul>
            </div>

            <Button className="mt-6 w-full" onClick={() => navigate("/tabs")}>
              Voltar para as Abas
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </button>
          <h1 className="text-xl font-bold">
            <span className="text-gold">Simulado</span>
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {!isOnline && (
        <div className="bg-yellow-50 border-y border-yellow-200 text-yellow-800 text-sm p-2 text-center">
          Você está offline. O simulado pode necessitar conexão para carregar e salvar.
        </div>
      )}

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Progress value={progress} className="mb-8" />

        {questions[currentQuestion] && (
          <Card className="card-premium">
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {questions[currentQuestion].tags?.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-lg text-foreground whitespace-pre-wrap">
                {questions[currentQuestion].prompt}
              </p>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].alternatives?.map((alt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers[currentQuestion] === idx
                      ? "border-primary bg-primary/20"
                      : "border-border hover:border-primary/50 hover:bg-card"
                  }`}
                >
                  <span className="font-semibold text-primary mr-3">
                    {String.fromCharCode(65 + idx)})
                  </span>
                  {alt}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Anterior
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleFinish}>
                  Finalizar Simulado
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={answers[currentQuestion] === -1}
                >
                  Próxima
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Remover PaywallModal em build premium */}
      {/* <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        price={29700}
        productId="prod_full_access"
        tabName="Pacote Completo"
        ebookId="full_access"
      /> */}
    </div>
  );
};

export default Simulado;
