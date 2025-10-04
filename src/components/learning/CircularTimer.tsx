import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CircularTimerProps {
  durationSeconds: number;
  onComplete?: () => void;
  label?: string;
  autoStart?: boolean;
}

export const CircularTimer = ({ 
  durationSeconds, 
  onComplete, 
  label,
  autoStart = false 
}: CircularTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const progress = ((durationSeconds - timeLeft) / durationSeconds) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setTimeLeft(durationSeconds);
    setIsRunning(false);
    setIsComplete(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg className="w-48 h-48 -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="90"
            className="fill-none stroke-secondary"
            strokeWidth="8"
          />
          <circle
            cx="96"
            cy="96"
            r="90"
            className="fill-none stroke-primary transition-all duration-300"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary">{formatTime(timeLeft)}</div>
          {label && <div className="text-sm text-muted-foreground mt-1">{label}</div>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          disabled={isComplete}
          className="rounded-xl"
          size="lg"
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          className="rounded-xl"
          size="lg"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};