import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

export function InstallPrompt() {
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Verificar se está em modo standalone (iOS)
    if ((window.navigator as any).standalone === true) {
      return;
    }

    // Mostrar botão após um tempo
    const timer = setTimeout(() => {
      setShowInstall(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleInstall = async () => {
    if (window.deferredPrompt) {
      await window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ App instalado!');
        setShowInstall(false);
      }
      
      window.deferredPrompt = null;
    }
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        id="install-btn"
        onClick={handleInstall}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
      >
        <Download className="h-4 w-4" />
        Instalar App
      </Button>
    </div>
  );
}