import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as logger from "@/utils/logger";

interface Question {
  id: string;
  prompt: string;
  alternatives: any;
  correct_index: number;
  explanation?: string;
}

interface QuizEngineProps {
  lessonId: string;
  onComplete?: (score: number, total: number) => void;
}

export const QuizEngine = ({ lessonId, onComplete }: QuizEngineProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());
  const { toast } = useToast();

  useEffect(() => {
    loadQuestions();
  }, [lessonId]);

  const loadQuestions = async () => {
    try {
      // Get chunks for this lesson
      const { data: chunks } = await supabase
        .from("chunks")
        .select("id")
        .eq("lesson_id", lessonId);

      if (!chunks || chunks.length === 0) {
        toast({
          title: "Sem questões disponíveis",
          description: "Ainda não há questões para esta lição.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const chunkIds = chunks.map(c => c.id);

      // Get questions for these chunks
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .in("chunk_id", chunkIds)
        .limit(10);

      if (error) throw error;
      
      setQuestions(data || []);
    } catch (error) {
      logger.error("Error loading questions:", error);
      toast({
        title: "Erro ao carregar questões",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === questions[currentIndex].correct_index) {
      setScore(score + 1);
    }
  };

  const nextQuestion = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          await supabase.from("quiz_results").insert({
            user_id: user.id,
            lesson_id: lessonId,
            score,
            total_questions: questions.length,
            time_spent_seconds: timeSpent,
          });
        }
      } catch (error) {
        logger.error("Error saving quiz result:", error);
      }

      if (onComplete) {
        onComplete(score, questions.length);
      }

      toast({
        title: "🎉 Quiz concluído!",
        description: `Você acertou ${score} de ${questions.length} questões (${Math.round((score / questions.length) * 100)}%)`,
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando questões...</div>;
  }

  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          Questões em desenvolvimento. Volte em breve!
        </p>
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Questão {currentIndex + 1} de {questions.length}
          </span>
          <span className="text-primary font-semibold">
            Acertos: {score}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{currentQuestion.prompt}</h3>
        
        <div className="space-y-3">
          {currentQuestion.alternatives.map((alt, index) => {
            const isCorrect = index === currentQuestion.correct_index;
            const isSelected = index === selectedAnswer;
            
            let className = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            
            if (!isAnswered) {
              className += "border-border hover:border-primary hover:bg-primary/5 cursor-pointer";
            } else {
              if (isCorrect) {
                className += "border-green-500 bg-green-500/10";
              } else if (isSelected && !isCorrect) {
                className += "border-red-500 bg-red-500/10";
              } else {
                className += "border-border opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={className}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between">
                  <span>{alt.text}</span>
                  {isAnswered && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : isSelected ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && currentQuestion.explanation && (
          <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm font-semibold mb-2">💡 Explicação:</p>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <Button onClick={nextQuestion} className="w-full mt-4 btn-premium">
            {currentIndex < questions.length - 1 ? "Próxima Questão" : "Finalizar Quiz"}
          </Button>
        )}
      </Card>
    </div>
  );
};
