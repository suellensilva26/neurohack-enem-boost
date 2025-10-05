import { Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const UrgencyBanner = () => {
  const daysUntilEnem = Math.ceil((new Date("2025-11-09").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground py-2 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Faltam {daysUntilEnem} dias para o ENEM</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-destructive-foreground/30" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>2.847 estudantes já garantiram vaga este mês</span>
          </div>
          <Badge variant="secondary" className="bg-white text-destructive animate-pulse">
            127 vagas restantes
          </Badge>
        </div>
      </div>
    </div>
  );
};
