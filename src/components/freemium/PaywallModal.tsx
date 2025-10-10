import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Users, Timer, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  triggerType?: string;
  title?: string;
  description?: string;
}

export const PaywallModal = ({
  open,
  onClose,
  triggerType = "generic",
  title = "Desbloqueie o Método Completo",
  description = "Acelere sua aprovação com acesso ilimitado a todas as funcionalidades"
}: PaywallModalProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(259200); // 72 horas em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (open) {
      trackTrigger();
    }
  }, [open]);

  const trackTrigger = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("conversion_triggers").insert({
        user_id: user.id,
        trigger_type: triggerType,
        clicked: false
      });
    } catch (error) {
      console.error("Erro ao rastrear trigger:", error);
    }
  };

  const handleUpgrade = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("conversion_triggers")
          .update({ clicked: true })
          .eq("user_id", user.id)
          .eq("trigger_type", triggerType)
          .order("shown_at", { ascending: false })
          .limit(1);
      }
    } catch (error) {
      console.error("Erro ao atualizar click:", error);
    }
    navigate("/pricing");
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const benefits = [
    "🎯 100 Questões Recorrentes com Explicação Completa",
    "🧠 Estratégias Secretas de Aprovação",
    "✍️ Fórmula Coringa da Redação Nota 1000",
    "⚡ Aprendizagem Acelerada com IA",
    "📊 Análise Personalizada de Desempenho",
    "🔥 Simulados Ilimitados",
    "🎓 Revisão Express para os 30 Dias Finais",
    "📱 Suporte Prioritário"
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-2 border-primary/20">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="destructive" className="animate-pulse">
              <Timer className="h-3 w-3 mr-1" />
              OFERTA EXPIRA EM {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </Badge>
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
              50% OFF
            </Badge>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {title}
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Prova Social */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary">2.847 estudantes</span>
              <span className="text-sm text-muted-foreground">já garantiram vaga este mês</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm">Usuários premium acertam <strong>67% mais questões</strong></span>
            </div>
          </div>

          {/* Benefícios */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Preço */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 text-center border border-primary/20">
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                R$ 297
              </div>
              <p className="text-sm text-muted-foreground">Pagamento único • Acesso vitalício</p>
              <Badge className="mt-2">
                <Zap className="h-3 w-3 mr-1" />
                Acesso imediato após confirmação
              </Badge>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg font-bold shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Acelerar Aprovação Agora
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
            >
              Continuar na versão gratuita
            </Button>
          </div>

          {/* Garantia */}
          <p className="text-xs text-center text-muted-foreground">
            🛡️ Garantia de 7 dias • Se não aprovar, devolvemos seu dinheiro
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
