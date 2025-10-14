import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { EbookReader } from "@/components/EbookReader";
import { ArrowLeft, Lock, Play, Home, Target, Sparkles, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FlashcardsGratuitos } from "@/components/freemium/FlashcardsGratuitos";
import { ChecklistEssencial } from "@/components/freemium/ChecklistEssencial";
import { QuestaoDia } from "@/components/freemium/QuestaoDia";
import { NotificacoesBasicas } from "@/components/freemium/NotificacoesBasicas";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { GamificationSystem } from "@/components/gamification/GamificationSystem";
import { AdvancedAnalytics } from "@/components/analytics/AdvancedAnalytics";
import { IntelligentNotifications } from "@/components/notifications/IntelligentNotifications";
import { PersonalizedSchedule } from "@/components/schedule/PersonalizedSchedule";

interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
}

const FREE_TABS = {
  dashboard: {
    id: "dashboard",
    title: "Dashboard Inicial",
    description: "Seu centro de comando para os próximos 30 dias",
    icon: Home,
  },
  flashcards: {
    id: "flashcards",
    title: "Flashcards Gratuitos",
    description: "Revise com flashcards inteligentes por matéria",
    icon: Target,
  },
  checklist: {
    id: "checklist",
    title: "Checklist Essencial",
    description: "Tópicos com 80%+ de recorrência no ENEM",
    icon: Target,
  },
  "daily-question": {
    id: "daily-question",
    title: "Questão do Dia",
    description: "Uma questão recorrente do ENEM com explicação completa",
    icon: Target,
  },
  "ai-tip": {
    id: "ai-tip",
    title: "Dica da IA",
    description: "Dica diária de estudo gerada por IA personalizada",
    icon: Sparkles,
  },
  notificacoes: {
    id: "notificacoes",
    title: "Notificações Básicas",
    description: "Configure lembretes diários de estudo",
    icon: Sparkles,
  },
  gamificacao: {
    id: "gamificacao",
    title: "Gamificação",
    description: "Sistema de badges, XP e conquistas",
    icon: Target,
  },
  analytics: {
    id: "analytics",
    title: "Analytics Avançado",
    description: "Análise detalhada do seu progresso",
    icon: Target,
  },
  cronograma: {
    id: "cronograma",
    title: "Cronograma Personalizado",
    description: "Plano de estudos adaptado ao seu perfil",
    icon: Target,
  },
};

// Modo de teste: desbloquear abas premium sem checagem de compra
const TEST_UNLOCK = true;

const TabDetail = () => {
  const { tabId } = useParams();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAccess();
    checkOnboardingStatus();
  }, [tabId]);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      if (profile && !profile.onboarding_completed) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error("Erro ao verificar onboarding:", error);
    }
  };

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if it's a free tab
      if (tabId && tabId in FREE_TABS) {
        const freeTab = FREE_TABS[tabId as keyof typeof FREE_TABS];
        setEbook({
          id: freeTab.id,
          title: freeTab.title,
          description: freeTab.description,
          price: 0,
        });
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Load ebook data for premium tabs
      const { data: ebookData, error: ebookError } = await supabase
        .from("ebooks")
        .select("*")
        .eq("id", tabId)
        .maybeSingle();

      if (ebookError) throw ebookError;
      
      if (!ebookData) {
        setLoading(false);
        return;
      }
      
      setEbook(ebookData);

      // Test unlock: bypass entitlement checks for premium tabs
      if (TEST_UNLOCK) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check entitlements
      const { data: entitlements } = await supabase
        .from("user_entitlements")
        .select("entitlement")
        .eq("user_id", user.id);

      const userEntitlements = entitlements?.map(e => e.entitlement) || [];
      const access = userEntitlements.includes("full_access") || userEntitlements.includes(tabId || "");

      setHasAccess(access);
    } catch (error) {
      console.error("Error checking access:", error);
      toast({
        title: "Erro ao carregar conteúdo",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Conteúdo não encontrado</p>
          <Link to="/tabs">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/tabs" className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">
            <span className="text-gold">{ebook.title}</span>
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {!hasAccess ? (
          <div className="card-premium text-center max-w-2xl mx-auto">
            <Lock className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Conteúdo Bloqueado</h2>
            <p className="text-muted-foreground mb-6">{ebook.description}</p>
            <div className="mb-6">
              <div className="text-4xl font-bold text-gold mb-2">
                R$ {ebook.price?.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">pagamento único</p>
            </div>
            <Link to="/pricing">
              <Button className="btn-premium w-full max-w-sm">
                <Play className="h-4 w-4 mr-2" />
                Desbloquear Agora
              </Button>
            </Link>
          </div>
        ) : tabId && tabId in FREE_TABS ? (
          <div className="space-y-8">
            {tabId === "dashboard" && (
              <>
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
                <div className="card-premium">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Citação Motivacional do Dia</span>
                  </div>
                  <p className="italic text-foreground">
                    "O sucesso é a soma de pequenos esforços repetidos dia após dia."
                  </p>
                </div>
              </>
            )}
            {tabId === "daily-question" && (
              <div className="card-premium">
                <h3 className="mb-4 text-xl font-semibold">🎯 Questão Recorrente do Dia</h3>
                <p className="text-muted-foreground">
                  Conteúdo em desenvolvimento. Em breve você terá acesso a questões diárias do ENEM.
                </p>
              </div>
            )}
            {tabId === "flashcards" && <FlashcardsGratuitos />}
            {tabId === "checklist" && <ChecklistEssencial />}
            {tabId === "ai-tip" && (
              <div className="card-premium">
                <h3 className="mb-4 text-xl font-semibold">✨ Dica da IA</h3>
                <p className="text-muted-foreground">
                  Conteúdo em desenvolvimento. Em breve você receberá dicas personalizadas de estudo.
                </p>
              </div>
            )}
            {tabId === "notificacoes" && <NotificacoesBasicas />}
            {tabId === "gamificacao" && <GamificationSystem />}
            {tabId === "analytics" && <AdvancedAnalytics />}
            {tabId === "cronograma" && <PersonalizedSchedule />}
          </div>
        ) : (
          <EbookReader 
            ebookId={tabId || ""} 
            hasAccess={hasAccess}
            ebookPrice={ebook.price}
            ebookTitle={ebook.title}
          />
        )}
      </div>

      {/* Onboarding Wizard */}
      {showOnboarding && (
        <OnboardingWizard 
          onComplete={() => {
            setShowOnboarding(false);
            setOnboardingCompleted(true);
          }}
        />
      )}
    </div>
  );
};

export default TabDetail;
