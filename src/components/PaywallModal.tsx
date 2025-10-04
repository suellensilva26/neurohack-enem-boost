import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Lock, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  price: number;
  productId: string;
  tabName: string;
  ebookId: string;
}

export default function PaywallModal({
  open,
  onClose,
  price,
  productId,
  tabName,
  ebookId,
}: PaywallModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Login necessário",
          description: "Faça login para comprar este conteúdo",
          variant: "destructive",
        });
        return;
      }

      // Log analytics
      await supabase.functions.invoke('log-analytics', {
        body: { 
          event: 'paywall_opened',
          userId: user.id,
          ebookId,
          timestamp: new Date().toISOString()
        }
      }).catch(console.error);

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { productId, userId: user.id, ebookId }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0b0b0b] border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold text-center mb-4">
            Quer transformar 30 dias em aprovação?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Lock className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-foreground text-lg">
              Desbloqueie <span className="font-semibold text-gold">{tabName}</span> e ganhe o método que milhares usaram para virar o ENEM.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Ebook + Vídeo-Avatar por lição</span> — aulas objetivas de 4–8 min
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Quizzes práticos, flashcards</span> e o simulado "100 questões que mais caem"
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Garantia</span>: suporte e plano de revisão 30 dias — resultado orientado por dados
              </p>
            </div>
          </div>

          <div className="bg-primary/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gold mb-2">
              R$ {(price / 100).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">pagamento único • acesso imediato</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              className="btn-premium w-full text-lg py-6"
              onClick={handleBuy}
              disabled={loading}
            >
              <Play className="h-5 w-5 mr-2" />
              {loading ? "Processando..." : `Comprar agora — R$ ${(price / 100).toFixed(2)}`}
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-border"
              onClick={onClose}
            >
              Ver preview gratuito
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Pagável em até 12x no cartão. Ao comprar você terá acesso imediato e personalizado ao conteúdo da aba.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
