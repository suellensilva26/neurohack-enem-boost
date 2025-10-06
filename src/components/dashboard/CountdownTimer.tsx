import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Target, Zap } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      // ENEM 2025 - 9 e 16 de novembro (assumindo primeiro dia)
      const enemDate = new Date("2025-11-09T00:00:00");
      const now = new Date();
      const difference = enemDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
      setIsUrgent(time.days <= 7);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <Card className={`${isUrgent ? 'border-red-500/50 bg-red-500/5 animate-pulse' : 'border-primary/20 bg-primary/5'} transition-all duration-300`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <Calendar className="h-6 w-6 text-primary" />
          <span className={isUrgent ? 'text-red-600' : 'text-primary'}>
            {isUrgent ? '🚨 TEMPO CRÍTICO' : '⏰ Tempo Restante'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary'}`}>
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Dias
            </div>
          </div>
          <div className="space-y-2">
            <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary'}`}>
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Horas
            </div>
          </div>
          <div className="space-y-2">
            <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary'}`}>
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Min
            </div>
          </div>
          <div className="space-y-2">
            <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary'}`}>
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Seg
            </div>
          </div>
        </div>

        {isUrgent && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
              <Zap className="h-4 w-4" />
              MODO EMERGÊNCIA ATIVADO
            </div>
            <p className="text-xs text-red-600/80 mt-1">
              Faltam menos de 7 dias! Ative o protocolo de estudo intensivo.
            </p>
          </div>
        )}

        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            ENEM 2025 • 9 e 16 de novembro
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


