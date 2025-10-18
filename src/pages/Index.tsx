import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Brain, Target, Zap, Lock, CheckCircle, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/freemium/OnboardingModal";
import { FloatingCTA } from "@/components/freemium/FloatingCTA";
import { UrgencyBanner } from "@/components/freemium/UrgencyBanner";
import { useOnboarding } from "@/hooks/useOnboarding";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { needsOnboarding, loading, completeOnboarding } = useOnboarding();
  const PREMIUM_BUILD = (import.meta.env.VITE_PREMIUM_BUILD ?? 'true') === 'true';

  useEffect(() => {
    const targetDate = new Date("2025-11-03T00:00:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const motivationalQuotes = [
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "Você está mais perto do que imagina. Continue!",
    "Cada questão resolvida é um passo em direção à aprovação.",
    "30 dias podem mudar sua vida inteira.",
  ];

  const [quote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  return (
    <div className="min-h-screen bg-background">
      {!PREMIUM_BUILD && <UrgencyBanner />}
      {!PREMIUM_BUILD && <FloatingCTA />}
      {!PREMIUM_BUILD && <OnboardingModal open={needsOnboarding && !loading} onComplete={completeOnboarding} />}
      <InstallPrompt />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(45,100%,51%,0.05)] to-transparent" />
        
        <div className="container relative mx-auto max-w-6xl">
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Sistema Acelerado de Aprovação
            </div>
            
            <h1 className="mb-6 animate-slide-up">
              <span className="text-gold">ENEM 30 Dias</span>
              <br />
              <span className="text-foreground">Acelerador de Aprovação</span>
            </h1>

            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Método científico para quem procrastinou o ano todo
              <br />
              <span className="text-primary">e ainda quer passar no ENEM 2025</span>
            </p>

            {/* Countdown */}
            <div className="mb-12 flex justify-center gap-4">
              <div className="countdown-box animate-glow">
                <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">DIAS</div>
              </div>
              <div className="countdown-box">
                <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
                <div className="text-xs text-muted-foreground">HORAS</div>
              </div>
              <div className="countdown-box">
                <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                <div className="text-xs text-muted-foreground">MIN</div>
              </div>
              <div className="countdown-box">
                <div className="text-3xl font-bold text-primary">{timeLeft.seconds}</div>
                <div className="text-xs text-muted-foreground">SEG</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/auth">
                <Button className="btn-premium w-full sm:w-auto">
                  Começar Agora Grátis
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="w-full rounded-2xl border-primary/30 text-foreground hover:border-primary sm:w-auto">
                  Ver Planos Premium
                </Button>
              </Link>
            </div>

            {/* Quote */}
            <div className="mt-12 rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
              <p className="text-lg italic text-muted-foreground">"{quote}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center">
            Por que o <span className="text-gold">ENEM 30 Dias</span> funciona?
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="card-premium group">
              <Brain className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl">IA Personalizada</h3>
              <p className="text-muted-foreground">
                Tutores de IA treinados especificamente no conteúdo de cada aba para ajudar você 24/7
              </p>
            </div>

            <div className="card-premium group">
              <Zap className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl">Aprendizado Acelerado</h3>
              <p className="text-muted-foreground">
                Técnicas comprovadas de neurociência para absorver em 1 hora o que levaria 10
              </p>
            </div>

            <div className="card-premium group">
              <Target className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl">Padrões do ENEM</h3>
              <p className="text-muted-foreground">
                Identificação de padrões que se repetem ano após ano para acertar 40% a mais
              </p>
            </div>

            <div className="card-premium group">
              <BookOpen className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl">6 E-books Premium</h3>
              <p className="text-muted-foreground">
                Material exclusivo com estratégias secretas testadas por milhares de aprovados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Preview */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-4 text-center">Conteúdo do Programa</h2>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Abas gratuitas para começar + 6 abas premium com conteúdo completo
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Free Tab */}
            <div className="card-premium border-primary/50">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">GRÁTIS</span>
              </div>
              <h3 className="mb-2">Dashboard Inicial</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Countdown, citação motivacional, progresso básico e acesso à questão do dia
              </p>
              <Link to="/tabs">
                <Button variant="outline" className="w-full rounded-xl border-primary/30">
                  Acessar Grátis
                </Button>
              </Link>
            </div>

            {/* Premium Tabs */}
            {[
              { title: "Redação Nota 1000", price: "R$ 149", icon: Award },
              { title: "Kit Revisão Express", price: "R$ 119", icon: Zap },
              { title: "Estratégias Secretas", price: "R$ 89", icon: Target },
              { title: "Aprendizado Acelerado", price: "R$ 99", icon: Brain },
              { title: "Padrões do ENEM", price: "R$ 129", icon: TrendingUp },
              { title: "150 Questões Recorrentes", price: "R$ 99", icon: CheckCircle },
            ].map((tab, index) => (
              <div key={index} className="card-premium relative">
                {/* Remover lock e preço em build premium */}
                {(!PREMIUM_BUILD) && (
                  <div className="absolute right-4 top-4">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                )}
                <tab.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2">{tab.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  E-book completo + Videoaulas com IA + Exercícios interativos
                </p>
                {!PREMIUM_BUILD && <div className="mb-3 text-2xl font-bold text-gold">{tab.price}</div>}
                <Link to="/tabs">
                  <Button className="w-full text-sm">
                    {PREMIUM_BUILD ? 'Acessar Agora' : 'Desbloquear Aba'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Remover bloco de pacote completo no build premium */}
          {!PREMIUM_BUILD && (
            <div className="mt-12 text-center">
              <div className="mb-4 text-sm text-muted-foreground">Ou desbloqueie tudo por:</div>
              <div className="mb-6 text-4xl font-bold text-gold">R$ 297,00</div>
              <Link to="/pricing">
                <Button className="btn-premium">
                  Ver Pacote Completo
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="card-premium text-center">
            <div className="mb-6 text-6xl">🎯</div>
            <h2 className="mb-4">
              <span className="text-gold">+15.000</span> estudantes
            </h2>
            <p className="text-xl text-muted-foreground">
              já conquistaram sua aprovação usando nosso método
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-primary/10 p-4">
                <div className="mb-1 text-3xl font-bold text-primary">847</div>
                <div className="text-sm text-muted-foreground">Nota média</div>
              </div>
              <div className="rounded-xl bg-primary/10 p-4">
                <div className="mb-1 text-3xl font-bold text-primary">92%</div>
                <div className="text-sm text-muted-foreground">Taxa de aprovação</div>
              </div>
              <div className="rounded-xl bg-primary/10 p-4">
                <div className="mb-1 text-3xl font-bold text-primary">30</div>
                <div className="text-sm text-muted-foreground">Dias de estudo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6">
            Pronto para mudar sua história?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Comece agora gratuitamente e veja a diferença em 24 horas
          </p>
          <Link to="/tabs">
            <Button className="btn-premium">
              Começar Minha Jornada de 30 Dias
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
