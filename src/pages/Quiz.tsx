import { Link, useParams } from "react-router-dom";
import { QuizEngine } from "@/components/QuizEngine";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

const QuizPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  const handleComplete = () => {
    navigate("/tabs");
  };

  return (
    <div className="min-h-screen bg-background">
      {!isOnline && (
        <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-sm p-2 text-center">
          Você está offline. O quiz pode limitar salvar progresso.
        </div>
      )}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-foreground hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </button>
          <h1 className="text-xl font-bold">
            <span className="text-gold">Quiz - Pratique</span>
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <QuizEngine lessonId={lessonId || ""} onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default QuizPage;
