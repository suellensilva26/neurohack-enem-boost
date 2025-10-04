import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { EbookReader } from "@/components/EbookReader";
import { ArrowLeft, Lock, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
}

const TabDetail = () => {
  const { tabId } = useParams();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAccess();
  }, [tabId]);

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      // Load ebook data
      const { data: ebookData, error: ebookError } = await supabase
        .from("ebooks")
        .select("*")
        .eq("id", tabId)
        .single();

      if (ebookError) throw ebookError;
      setEbook(ebookData);

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
        ) : (
          <EbookReader ebookId={tabId || ""} />
        )}
      </div>
    </div>
  );
};

export default TabDetail;
