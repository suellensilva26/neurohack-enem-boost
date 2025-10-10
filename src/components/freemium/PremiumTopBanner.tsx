import { Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PremiumTopBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] py-4 px-4 shadow-[var(--shadow-gold)]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Sparkles className="h-6 w-6 text-[hsl(var(--primary-foreground))] animate-pulse" />
            <div className="text-center md:text-left">
              <p className="text-[hsl(var(--primary-foreground))] font-bold text-lg md:text-xl leading-tight">
                🔥 ÚLTIMA CHANCE: Acesso Completo + 7 E-books Interativos + IA Personalizada
              </p>
              <p className="text-[hsl(var(--primary-foreground))]/90 text-sm md:text-base">
                Acesso Completo por <span className="font-black text-xl">R$ 297</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[hsl(var(--primary-foreground))]/10 px-3 py-2 rounded-lg backdrop-blur-sm">
              <Clock className="h-4 w-4 text-[hsl(var(--primary-foreground))]" />
              <span className="text-[hsl(var(--primary-foreground))] font-semibold text-sm">
                Termina em 23:47:15
              </span>
            </div>
            
            <Button 
              size="lg"
              className="bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))]/90 font-bold shadow-lg hover:scale-105 transition-transform"
            >
              GARANTIR DESCONTO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
