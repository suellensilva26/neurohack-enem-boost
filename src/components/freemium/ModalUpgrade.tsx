import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Zap, Target, Brain, CheckSquare, Star, TrendingUp } from "lucide-react";

interface ModalUpgradeProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: "flashcards" | "questoes" | "geral";
  limiteUsado: number;
  limiteMaximo: number;
}

export const ModalUpgrade = ({ isOpen, onClose, tipo, limiteUsado, limiteMaximo }: ModalUpgradeProps) => {
  const PREMIUM_BUILD = (import.meta.env.VITE_PREMIUM_BUILD ?? 'false') === 'true';
  if (PREMIUM_BUILD) return null;
  const getTitulo = () => {
    switch (tipo) {
      case "flashcards": return "Limite de Flashcards Atingido!";
      case "questoes": return "Limite de Questões Atingido!";
      default: return "Limite Gratuito Atingido!";
    }
  };

  const getDescricao = () => {
    switch (tipo) {
      case "flashcards": return `Você já usou ${limiteUsado}/${limiteMaximo} flashcards gratuitos hoje.`;
      case "questoes": return `Você já respondeu ${limiteUsado}/${limiteMaximo} questões gratuitas hoje.`;
      default: return `Você atingiu o limite de uso gratuito.`;
    }
  };

  const beneficios = [
    {
      icone: <Zap className="h-5 w-5" />,
      titulo: "Uso Ilimitado",
      descricao: "Acesso a todos os flashcards e questões sem limite"
    },
    {
      icone: <Target className="h-5 w-5" />,
      titulo: "Simulados Completos",
      descricao: "180 questões cronometradas com relatórios detalhados"
    },
    {
      icone: <Brain className="h-5 w-5" />,
      titulo: "IA Personalizada",
      descricao: "Cronograma inteligente baseado no seu desempenho"
    },
    {
      icone: <CheckSquare className="h-5 w-5" />,
      titulo: "Analytics Avançado",
      descricao: "Gráficos de evolução e identificação de pontos fracos"
    },
    {
      icone: <Star className="h-5 w-5" />,
      titulo: "Redação Nota Mil",
      descricao: "Fórmula coringa + 50 temas + correção automática"
    },
    {
      icone: <TrendingUp className="h-5 w-5" />,
      titulo: "Garantia de Aprovação",
      descricao: "Sistema testado com 95% de aprovação no ENEM"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gold flex items-center justify-center gap-2">
            <Lock className="h-6 w-6" />
            {getTitulo()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Descrição */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {getDescricao()} Com o upgrade, você terá acesso ilimitado a todo o conteúdo!
            </p>
            <Badge variant="outline" className="text-gold border-gold">
              Aprovação em 15 dias garantida
            </Badge>
          </div>

          {/* Benefícios */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">🚀 O que você ganha com o upgrade:</h3>
            <div className="grid gap-3">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="text-gold mt-0.5">
                    {beneficio.icone}
                  </div>
                  <div>
                    <h4 className="font-medium">{beneficio.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{beneficio.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preço */}
          <div className="text-center p-6 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg">
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">Pacote Completo</span>
            </div>
            <div className="text-4xl font-bold text-gold mb-2">R$ 297</div>
            <div className="text-sm text-muted-foreground mb-4">
              Pagamento único • Acesso vitalício
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <Star className="h-4 w-4" />
              <span>Economize R$ 400 comparado aos cursos tradicionais</span>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="space-y-3">
            <h4 className="font-medium text-center">💬 O que nossos alunos dizem:</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                <p className="text-sm italic">"Passei no ENEM em 28 dias usando apenas este app!"</p>
                <p className="text-xs text-muted-foreground mt-1">- Maria S., aprovada em Medicina</p>
              </div>
              <div className="p-3 border rounded-lg bg-blue-50 border-blue-200">
                <p className="text-sm italic">"Os flashcards me ajudaram a memorizar tudo rapidamente."</p>
                <p className="text-xs text-muted-foreground mt-1">- João P., aprovado em Engenharia</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Link to="/pricing" className="flex-1">
              <Button className="w-full btn-premium text-lg py-6">
                <Zap className="h-5 w-5 mr-2" />
                Fazer Upgrade Agora
              </Button>
            </Link>
            <Button variant="outline" onClick={onClose} className="px-6">
              Voltar
            </Button>
          </div>

          {/* Garantia */}
          <div className="text-center text-sm text-muted-foreground">
            <p>✅ Garantia de 7 dias ou seu dinheiro de volta</p>
            <p>🔒 Pagamento 100% seguro</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
