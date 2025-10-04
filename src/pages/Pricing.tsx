import { Link } from "react-router-dom";
import { Check, ArrowLeft, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const individualTabs = [
    {
      title: "Redação Nota 1000",
      price: 149,
      features: [
        "Fórmula coringa para qualquer tema",
        "Repertórios socioculturais versáteis",
        "8 módulos completos",
        "Videoaulas com avatar IA",
        "Exercícios práticos",
        "Modelos de redação",
      ],
    },
    {
      title: "Kit Revisão Express",
      price: 119,
      features: [
        "240 tópicos essenciais",
        "Cobre 85% das questões",
        "12 módulos organizados",
        "Sistema trifásico 30 dias",
        "Cronogramas personalizados",
        "Checklists de revisão",
      ],
    },
    {
      title: "Estratégias Secretas",
      price: 89,
      features: [
        "Técnicas de chute estratégico",
        "7 eliminadores fatais",
        "Scanner neural 30s/questão",
        "Acerte sem saber o conteúdo",
        "Padrões psicológicos",
        "Exercícios de reconhecimento",
      ],
    },
    {
      title: "Aprendizado Acelerado",
      price: 99,
      features: [
        "Absorva 10x mais rápido",
        "Método Feynman aplicado",
        "Reset neurológico",
        "9 módulos práticos",
        "Técnicas de memorização",
        "Flashcards visuais",
      ],
    },
    {
      title: "Padrões do ENEM",
      price: 129,
      features: [
        "Acerte 40% a mais",
        "Identificador de padrões",
        "10 módulos especializados",
        "Drill personalizado",
        "Simulador preditivo",
        "Análise TRI",
      ],
    },
    {
      title: "100 Questões Recorrentes",
      price: 79,
      features: [
        "Banco completo com gabarito",
        "Questões que mais caem",
        "Explicações detalhadas",
        "Filtros por disciplina",
        "Modo estudo ativo",
        "Acompanhamento de desempenho",
      ],
    },
  ];

  const totalIndividual = individualTabs.reduce((acc, tab) => acc + tab.price, 0);
  const savings = totalIndividual - 297;

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
            <span className="text-gold">Planos & Preços</span>
          </h1>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Oferta Limitada - 30 Dias para o ENEM
          </div>
          <h1 className="mb-4">
            Escolha seu <span className="text-gold">caminho</span> para a aprovação
          </h1>
          <p className="text-xl text-muted-foreground">
            Compre abas individuais ou economize com o pacote completo
          </p>
        </div>

        {/* Featured - Full Package */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary bg-gradient-to-br from-[hsl(0,0%,6%)] to-[hsl(0,0%,9%)] p-8 shadow-[0_0_60px_hsl(45,100%,51%,0.2)]">
            <div className="absolute right-0 top-0 rounded-bl-3xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground">
              MELHOR VALOR
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Pacote Completo</h2>
                </div>
                
                <p className="mb-6 text-lg text-muted-foreground">
                  Acesso ilimitado a todas as 6 abas premium + todas as funcionalidades gratuitas
                </p>

                <div className="mb-6">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gold">R$ 297</span>
                    <span className="text-muted-foreground line-through">R$ {totalIndividual}</span>
                  </div>
                  <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
                    Economize R$ {savings} ({Math.round((savings / totalIndividual) * 100)}% OFF)
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  {[
                    "6 E-books premium completos",
                    "Videoaulas com avatares IA",
                    "Tutores IA personalizados por aba",
                    "Exercícios interativos ilimitados",
                    "100 questões recorrentes do ENEM",
                    "Simulados adaptativos",
                    "Cronogramas personalizados",
                    "Suporte prioritário",
                    "Atualizações gratuitas",
                    "Garantia de 7 dias",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="btn-premium w-full text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Começar Agora - R$ 297
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Pagamento único • Acesso vitalício • Garantia de 7 dias
                </p>
              </div>

              <div className="rounded-2xl bg-card/50 p-6">
                <h3 className="mb-4 font-semibold">O que você recebe:</h3>
                <div className="space-y-4">
                  {individualTabs.map((tab, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-background/50 p-3">
                      <span className="text-sm">{tab.title}</span>
                      <span className="text-sm font-semibold text-primary">R$ {tab.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total Individual:</span>
                      <span className="text-lg font-bold text-muted-foreground line-through">
                        R$ {totalIndividual}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-semibold text-primary">Pacote Completo:</span>
                      <span className="text-2xl font-bold text-gold">R$ 297</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Tabs */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Ou compre abas <span className="text-gold">individuais</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {individualTabs.map((tab, index) => (
              <div key={index} className="card-premium flex flex-col">
                <h3 className="mb-4 text-xl">{tab.title}</h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gold">R$ {tab.price}</span>
                </div>

                <div className="mb-6 flex-grow space-y-2">
                  {tab.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="btn-premium w-full">
                  Comprar Aba
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card-premium mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-primary">Por quanto tempo tenho acesso?</h3>
              <p className="text-sm text-muted-foreground">
                O acesso é vitalício! Você pode revisar o conteúdo quantas vezes quiser, mesmo após o ENEM.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-primary">Posso comprar mais de uma aba individual?</h3>
              <p className="text-sm text-muted-foreground">
                Sim! Mas se você pretende comprar 3 ou mais abas, recomendamos o pacote completo - sai muito mais barato.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-primary">Há garantia de devolução?</h3>
              <p className="text-sm text-muted-foreground">
                Sim! Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-primary">Como funciona a IA personalizada?</h3>
              <p className="text-sm text-muted-foreground">
                Cada aba premium tem um tutor de IA treinado especificamente no conteúdo daquela aba. Você pode fazer perguntas, pedir explicações e receber dicas personalizadas 24/7.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-primary">Funciona em celular?</h3>
              <p className="text-sm text-muted-foreground">
                Sim! O app é 100% responsivo e funciona perfeitamente em qualquer dispositivo - computador, tablet ou smartphone.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            Ainda com dúvidas? Comece gratuitamente!
          </p>
          <Link to="/tabs">
            <Button variant="outline" className="rounded-2xl border-primary/30 px-8">
              Experimentar Versão Gratuita
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
