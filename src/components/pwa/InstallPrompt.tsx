import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Verificar se está em modo standalone (iOS)
    if ((window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ App instalado com sucesso!');
        setVisible(false);
        setIsInstalled(true);
      } else {
        console.log('❌ Instalação cancelada pelo usuário');
        setVisible(false);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('❌ Erro na instalação:', error);
    }
  };

  const dismiss = () => {
    setVisible(false);
    setDeferredPrompt(null);
  };

  // Não mostrar se já está instalado ou se não está visível
  if (isInstalled || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="rounded-xl border border-primary/30 bg-background/95 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img 
              src="/icons/nh-icon-192x192.png" 
              alt="NeuroHack" 
              className="h-12 w-12 rounded-lg"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground mb-1">
              Instalar NeuroHack ENEM
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Instale o app para acesso rápido e funcionalidade offline
            </p>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={install}
                className="flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                Instalar
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={dismiss}
                className="flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Agora não
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}