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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Verificar se está em modo standalone (iOS)
    if ((window.navigator as any).standalone === true) {
      return;
    }

    // Escutar o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      console.log('📱 beforeinstallprompt disparado!');
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Mostrar botão após um tempo mesmo sem o evento
    const timer = setTimeout(() => {
      console.log('⏰ Mostrando botão após timeout');
      setShowInstall(true);
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    console.log('🔧 Tentando instalar...');
    
    if (deferredPrompt) {
      console.log('✅ Usando deferredPrompt');
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log('📱 Resultado da instalação:', outcome);
        
        if (outcome === 'accepted') {
          console.log('✅ App instalado com sucesso!');
          setShowInstall(false);
        } else {
          console.log('❌ Instalação cancelada');
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('❌ Erro na instalação:', error);
      }
    } else {
      console.log('❌ deferredPrompt não disponível');
      // Tentar método alternativo para iOS
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        alert('Para instalar no iOS: Toque no botão de compartilhar e selecione "Adicionar à Tela de Início"');
      } else {
        alert('Instalação não disponível. Tente usar Chrome ou Edge.');
      }
    }
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/95 backdrop-blur-sm border border-primary/30 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <img src="/logo.png" alt="NeuroHack" className="h-6 w-6 rounded" />
          <span className="text-sm font-medium">Instalar App</span>
        </div>
        <Button 
          id="install-btn"
          onClick={handleInstall}
          className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90"
          size="sm"
        >
          <Download className="h-4 w-4" />
          Instalar
        </Button>
      </div>
    </div>
  );
}