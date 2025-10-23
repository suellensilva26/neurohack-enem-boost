import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Lock, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function PaywallModal({ open, onClose, price }: { open: boolean; onClose: () => void; price: number; }) {
  const PREMIUM_BUILD = (import.meta.env.VITE_PREMIUM_BUILD ?? 'true') === 'true';
  if (PREMIUM_BUILD) return null;

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Faça login para comprar", description: "Entre para concluir a compra." });
        return;
      }
      // lógica de compra...
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Desbloqueie acesso completo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Conteúdo Completo</span>: todas as aulas, resumos e materiais
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Garantia</span>: suporte e plano de revisão 15 dias — resultado orientado por dados
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
