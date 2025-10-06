import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  RotateCcw, CheckCircle, XCircle, Eye, EyeOff, 
  ArrowLeft, ArrowRight, Shuffle, Target 
} from "lucide-react";
import { Flashcard } from "@/data/flashcardsData";

interface CardSwiperProps {
  cards: Flashcard[];
  onCardComplete: (cardId: string, correct: boolean) => void;
  onSessionComplete: (stats: { correct: number; total: number }) => void;
  subjectName: string;
}

export const CardSwiper = ({ cards, onCardComplete, onSessionComplete, subjectName }: CardSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [cardFeedback, setCardFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setShuffledCards([...cards].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setShowAnswer(false);
    setSessionStats({ correct: 0, total: 0 });
  }, [cards]);

  const currentCard = shuffledCards[currentIndex];
  const progress = shuffledCards.length > 0 ? ((currentIndex + 1) / shuffledCards.length) * 100 : 0;
  const isLastCard = currentIndex >= shuffledCards.length - 1;

  const handleAnswer = (correct: boolean) => {
    if (!currentCard) return;

    setCardFeedback(correct ? 'correct' : 'incorrect');
    
    const newStats = {
      correct: sessionStats.correct + (correct ? 1 : 0),
      total: sessionStats.total + 1
    };
    setSessionStats(newStats);

    onCardComplete(currentCard.id, correct);

    // Auto advance after showing feedback
    setTimeout(() => {
      if (isLastCard) {
        onSessionComplete(newStats);
      } else {
        nextCard();
      }
    }, 1500);
  };

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
    setShowAnswer(false);
    setCardFeedback(null);
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
      setCardFeedback(null);
    }
  };

  const shuffleCards = () => {
    setShuffledCards(prev => [...prev].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setShowAnswer(false);
    setCardFeedback(null);
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setSessionStats({ correct: 0, total: 0 });
    setCardFeedback(null);
    shuffleCards();
  };

  // Touch/Mouse events for swipe
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    const { x } = dragOffset;

    if (Math.abs(x) > threshold) {
      if (x > 0) {
        handleAnswer(true); // Swipe right = correct
      } else {
        handleAnswer(false); // Swipe left = incorrect
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Target className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Nenhum flashcard disponível</h3>
        <p className="text-muted-foreground text-center">
          Não há flashcards para {subjectName} no momento.
        </p>
      </div>
    );
  }

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300);

  return (
    <div className="space-y-6">
      {/* Header com Progresso */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {subjectName}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {currentCard.category}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {shuffledCards.length}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-600 font-medium">
            ✓ {sessionStats.correct} corretas
          </span>
          <span className="text-red-600 font-medium">
            ✗ {sessionStats.total - sessionStats.correct} incorretas
          </span>
        </div>
      </div>

      {/* Card Principal */}
      <div className="relative">
        <Card 
          ref={cardRef}
          className={`h-80 w-full transition-all duration-300 cursor-grab active:cursor-grabbing ${
            cardFeedback === 'correct' ? 'border-green-500 bg-green-50' : 
            cardFeedback === 'incorrect' ? 'border-red-500 bg-red-50' : 
            'border-primary/20'
          }`}
          style={{
            transform: `translateX(${dragOffset.x}px) rotate(${rotation}deg)`,
            opacity,
            boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.2)' : undefined
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleEnd}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            {/* Pergunta */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge 
                  variant={
                    currentCard.difficulty === 'easy' ? 'secondary' :
                    currentCard.difficulty === 'medium' ? 'default' : 'destructive'
                  }
                  className="text-xs"
                >
                  {currentCard.difficulty === 'easy' ? 'Fácil' : 
                   currentCard.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                </Badge>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-relaxed">
                  {currentCard.question}
                </h3>

                {showAnswer && (
                  <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-primary">Resposta:</h4>
                    <p className="text-foreground">{currentCard.answer}</p>
                    
                    {currentCard.explanation && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm text-muted-foreground">Explicação:</h5>
                        <p className="text-sm text-muted-foreground">{currentCard.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Instruções de Swipe */}
            {!showAnswer && (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  👈 Arraste para a esquerda se errou
                </p>
                <p className="text-sm text-muted-foreground">
                  👉 Arraste para a direita se acertou
                </p>
              </div>
            )}

            {/* Botões de Ação */}
            {showAnswer && (
              <div className="flex gap-3">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleAnswer(false)}
                  disabled={cardFeedback !== null}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Errei
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleAnswer(true)}
                  disabled={cardFeedback !== null}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Acertei
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feedback Visual */}
        {cardFeedback && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`text-6xl ${
              cardFeedback === 'correct' ? 'text-green-500' : 'text-red-500'
            }`}>
              {cardFeedback === 'correct' ? '✓' : '✗'}
            </div>
          </div>
        )}
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextCard}
            disabled={isLastCard}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleCards}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetSession}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};


