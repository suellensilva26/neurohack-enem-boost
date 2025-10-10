import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, ArrowRight, Zap, Brain, Target, 
  Clock, BookOpen, MessageSquare, Bot, AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

// Dicas diárias de estudo
const DAILY_TIPS = [
  {
    id: 1,
    title: "Técnica Pomodoro Adaptada",
    content: "Estude por 25 minutos e descanse 5. Após 4 ciclos, faça uma pausa maior de 15-30 minutos. Esta técnica é especialmente eficaz para matérias que exigem concentração intensa como Matemática e Física.",
    category: "produtividade",
    icon: Clock
  },
  {
    id: 2,
    title: "Revisão Espaçada",
    content: "Revise o conteúdo estudado em intervalos crescentes: 1 dia depois, 3 dias depois, 1 semana depois e 2 semanas depois. Esta técnica comprovada cientificamente aumenta a retenção de informações em até 80%.",
    category: "memorização",
    icon: Brain
  },
  {
    id: 3,
    title: "Mapas Mentais para Redação",
    content: "Crie mapas mentais com os principais argumentos e exemplos para os temas mais prováveis da redação do ENEM. Isso ajuda a organizar ideias rapidamente durante a prova.",
    category: "redação",
    icon: BookOpen
  }
];

// Exemplos de dicas premium do agente de IA
const PREMIUM_AI_TIPS = [
  {
    id: "p1",
    title: "Plano de Estudos Personalizado",
    content: "Com base na sua análise de desempenho, recomendo focar 40% do seu tempo em Matemática, especialmente em Geometria Espacial e Funções, onde você apresenta maior dificuldade. Reserve 30% para Ciências da Natureza, com ênfase em Física Mecânica.",
    category: "personalizado"
  },
  {
    id: "p2",
    title: "Estratégia para Questões de Múltipla Escolha",
    content: "Nas questões de Ciências Humanas, identifiquei que você costuma errar quando há informações contraditórias. Recomendo usar a técnica de eliminação progressiva: primeiro descarte as alternativas claramente incorretas, depois compare as restantes buscando contradições com o texto-base.",
    category: "técnicas"
  },
  {
    id: "p3",
    title: "Análise de Desempenho Semanal",
    content: "Esta semana você melhorou 15% em Química, mas teve uma queda de 8% em Literatura. Recomendo revisar os conteúdos de Modernismo Brasileiro e fazer mais exercícios sobre interpretação de textos literários deste período.",
    category: "análise"
  }
];

export default function AITip() {
  const navigate = useNavigate();
  const { isPremium } = useFreemiumLimits();
  const [dailyTip, setDailyTip] = useState(DAILY_TIPS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Selecionar uma dica com base no dia do ano
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % DAILY_TIPS.length;
    
    setDailyTip(DAILY_TIPS[tipIndex]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const TipIcon = dailyTip.icon || Sparkles;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Dica do Dia */}
        <Card className="border-primary/20">
          <CardHeader className="pb-2 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Dica do Dia
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {dailyTip.category.charAt(0).toUpperCase() + dailyTip.category.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 sm:pt-2">
            <div className="bg-muted/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <TipIcon className="h-16 w-16 text-primary" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{dailyTip.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{dailyTip.content}</p>
            </div>
          </CardContent>
        </Card>

        {/* Agente de IA - Upsell */}
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-blue-800">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Agente de IA ENEM
              </CardTitle>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">NOVO</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 sm:pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-blue-800">Seu Mentor Pessoal de IA para o ENEM</h3>
                <p className="text-xs sm:text-sm text-blue-700 mb-2">
                  O Agente de IA está em atualização para se adequar às novas regras implementadas pelo INEP. 
                  Em breve, você terá acesso a um assistente personalizado que analisa seu desempenho e cria 
                  estratégias de estudo sob medida para você.
                </p>
                
                <div className="bg-white/60 rounded-lg p-3 mb-3 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <h4 className="font-medium text-sm text-blue-800">Oferta Especial de Pré-Lançamento</h4>
                  </div>
                  <p className="text-xs text-blue-700">
                    <strong>Assinantes Premium:</strong> Ganhe automaticamente <span className="text-green-600 font-bold">60% de desconto</span> no 
                    Agente de IA quando for lançado!
                  </p>
                </div>
              </div>
              
              <div className="w-full sm:w-auto">
                <Button 
                  onClick={() => navigate('/pricing')}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Zap className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Entrar na Lista de Espera
                </Button>
              </div>
            </div>
            
            {/* Exemplos de dicas premium */}
            <div>
              <h4 className="font-medium text-xs sm:text-sm text-blue-800 mb-2 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                Exemplos do que o Agente de IA poderá fazer:
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {PREMIUM_AI_TIPS.map(tip => (
                  <Card key={tip.id} className="bg-white/70 border-blue-100">
                    <CardContent className="p-3">
                      <h5 className="font-medium text-xs sm:text-sm text-blue-800 mb-1">{tip.title}</h5>
                      <p className="text-[10px] sm:text-xs text-blue-700 line-clamp-3">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}