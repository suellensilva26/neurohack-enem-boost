import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Home, BookOpen, Brain, Target, Zap, TrendingUp, Award, 
  Lock, CheckCircle, ArrowLeft, Sparkles, Clock, Calendar, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const TabsPage = () => {
  const [userAccess] = useState<string[]>(["full_access"]); // Modo teste: acesso completo
  const [ebooksFromDB, setEbooksFromDB] = useState<any[]>([]);

  const freeTabs = [
    {
      id: "dashboard",
      title: "Dashboard Inicial",
      icon: Home,
      description: "Seu centro de comando para os próximos 30 dias",
      content: "dashboard"
    },
    {
      id: "daily-question",
      title: "Questão do Dia",
      icon: Target,
      description: "Uma questão recorrente do ENEM com explicação completa",
      content: "question"
    },
    {
      id: "ai-tip",
      title: "Dica da IA",
      icon: Sparkles,
      description: "Dica diária de estudo gerada por IA personalizada",
      content: "ai-tip"
    },
  ];

  const premiumTabs = [
    {
      id: "redacao",
      title: "Redação Nota Mil",
      icon: Award,
      price: "R$ 149",
      description: "Fórmula coringa para qualquer tema + repertórios versáteis",
      modules: 8,
      hours: 4.5,
      isPremium: true,
      directLink: "/redacao-completa",
    },
    {
      id: "revisao",
      title: "Kit Revisão Express",
      icon: Zap,
      price: "R$ 119",
      description: "240 tópicos essenciais que cobrem 85% das questões",
      modules: 12,
      hours: 6,
      isPremium: true,
      directLink: "/revisao-express",
    },
    {
      id: "estrategias",
      title: "Estratégias Secretas",
      icon: Target,
      price: "R$ 89",
      description: "Técnicas de chute estratégico para acertar sem saber",
      modules: 7,
      hours: 3,
      isPremium: true,
      directLink: "/estrategias-secretas",
    },
    {
      id: "aprendizado",
      title: "Aprendizado Acelerado",
      icon: Brain,
      price: "R$ 99",
      description: "Absorva em 1 hora o que outros levam 10",
      modules: 9,
      hours: 5,
      directLink: "/aprendizagem-acelerada"
    },
    {
      id: "padroes",
      title: "Padrões do ENEM",
      icon: TrendingUp,
      price: "R$ 129",
      description: "Acerte 40% a mais identificando padrões recorrentes",
      modules: 10,
      hours: 5.5,
      directLink: "/padroes-enem",
    },
    {
      id: "banco-questoes",
      title: "100 Questões Recorrentes",
      icon: BookOpen,
      price: "R$ 79",
      description: "Banco completo com gabarito e explicações detalhadas",
      modules: 5,
      hours: 8,
    },
  ];

  const hasAccess = (tabId: string) => {
    return userAccess.includes("full_access") || userAccess.includes(tabId);
  };

  useEffect(() => {
    loadEbooks();
  }, []);

  const loadEbooks = async () => {
    const { data } = await supabase
      .from("ebooks")
      .select("*")
      .order("premium", { ascending: true });
    
    if (data) {
      setEbooksFromDB(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </Link>
          <h1 className="text-xl font-bold">
            <span className="text-gold">ENEM 30 Dias</span>
          </h1>
          <Link to="/pricing">
            <Button className="btn-premium text-sm">
              Upgrade
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Tabs defaultValue="free" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 bg-card">
            <TabsTrigger value="free" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Abas Gratuitas
            </TabsTrigger>
            <TabsTrigger value="premium" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Abas Premium
            </TabsTrigger>
          </TabsList>

          {/* Free Tabs Content */}
          <TabsContent value="free" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {freeTabs.map((tab) => (
                <div key={tab.id} className="card-premium border-primary/50">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/20 p-3">
                      <tab.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2">{tab.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{tab.description}</p>
                  <Link to={`/tab/${tab.id}`} className="block">
                    <Button className="w-full rounded-xl bg-primary/20 text-primary hover:bg-primary/30">
                      Acessar Conteúdo
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Dashboard Preview */}
            <div className="card-premium mt-8">
              <h2 className="mb-6 text-2xl">📊 Seu Dashboard</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-primary/10 p-6 text-center">
                  <Calendar className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold text-primary">30</div>
                  <div className="text-sm text-muted-foreground">Dias até o ENEM</div>
                </div>
                
                <div className="rounded-xl bg-primary/10 p-6 text-center">
                  <Target className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold text-primary">0%</div>
                  <div className="text-sm text-muted-foreground">Progresso Atual</div>
                </div>
                
                <div className="rounded-xl bg-primary/10 p-6 text-center">
                  <Clock className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold text-primary">0h</div>
                  <div className="text-sm text-muted-foreground">Horas de Estudo</div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Citação Motivacional do Dia</span>
                </div>
                <p className="italic text-foreground">
                  "O sucesso é a soma de pequenos esforços repetidos dia após dia. Cada questão que você resolve hoje é um passo em direção à sua aprovação."
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-card p-6">
                <h3 className="mb-4 font-semibold">🎯 Questão do Dia</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Resolva uma questão recorrente do ENEM todos os dias e acompanhe sua evolução
                </p>
                <Button className="w-full rounded-xl" variant="outline">
                  Resolver Questão do Dia
                </Button>
              </div>

              <div className="mt-6 rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="h-8 w-8 text-gold" />
                  <div>
                    <h3 className="font-bold text-lg text-gold">Simulado 100 Questões</h3>
                    <p className="text-sm text-muted-foreground">As questões que mais caem no ENEM</p>
                  </div>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Teste seu conhecimento com 100 questões recorrentes e receba relatório completo de desempenho
                </p>
                <Link to="/simulado">
                  <Button className="btn-premium w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Iniciar Simulado
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* Premium Tabs Content */}
          <TabsContent value="premium" className="space-y-6">
            <div className="mb-8 card-premium border-primary/50 text-center">
              <h2 className="mb-2">🔓 Desbloqueie Todo o Potencial</h2>
              <p className="mb-4 text-muted-foreground">
                Acesso completo a 6 abas premium com conteúdo exclusivo
              </p>
              <div className="mb-4">
                <span className="text-sm text-muted-foreground">Pacote Completo:</span>
                <div className="text-4xl font-bold text-gold">R$ 297,00</div>
                <span className="text-sm text-muted-foreground">ou compre abas individuais</span>
              </div>
              <Link to="/pricing">
                <Button className="btn-premium">
                  Ver Planos e Preços
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ebooksFromDB.filter(e => e.premium).map((ebook) => {
                const tabData = premiumTabs.find(t => t.id === ebook.id);
                const Icon = tabData?.icon || BookOpen;
                
                const linkTo = tabData?.directLink || `/tab/${ebook.id}`;
                
                return (
                  <Link
                    key={ebook.id}
                    to={linkTo}
                    className={`card-premium group hover:scale-105 transition-all ${!hasAccess(ebook.id) ? 'tab-locked' : ''}`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-gold/20 p-3 group-hover:bg-gold/30 transition-colors">
                        <Icon className="h-6 w-6 text-gold" />
                      </div>
                      {!hasAccess(ebook.id) && <Lock className="ml-auto h-5 w-5 text-gold" />}
                      {hasAccess(ebook.id) && <CheckCircle className="ml-auto h-5 w-5 text-primary" />}
                    </div>
                    
                    <h3 className="mb-2 group-hover:text-gold transition-colors">{ebook.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{ebook.description}</p>
                    
                    <div className="mb-4 flex gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {tabData?.modules || 3} módulos
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Questões
                      </div>
                    </div>

                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">R$ {ebook.price?.toFixed(2)}</span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-gold/20 text-gold font-semibold">Premium</span>
                    </div>
                    
                    <Button className={`w-full rounded-xl ${hasAccess(ebook.id) ? 'bg-primary' : 'btn-premium'}`}>
                      {hasAccess(ebook.id) ? 'Acessar Conteúdo' : 'Ver Mais →'}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsPage;
