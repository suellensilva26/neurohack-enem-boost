import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

// Detectar se é iOS
function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function InstallPrompt() {
  const [showInstall, setShowInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const ios = isIOS();
    setIsIOSDevice(ios);

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
    
    if (isIOSDevice) {
      // Mostrar instruções específicas para iOS
      alert(
        'Para instalar o app no seu iPhone:\n\n1. Toque no ícone de compartilhamento (quadrado com seta).\n2. Escolha "Adicionar à Tela de Início".\n3. Pronto! O app estará instalado como nativo!'
      );
      return;
    }
    
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
      alert('Instalação não disponível. Tente usar Chrome ou Edge.');
    }
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/95 backdrop-blur-sm border border-primary/30 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <img src="/logo.png" alt="NeuroHack" className="h-6 w-6 rounded" />
          <span className="text-sm font-medium">
            {isIOSDevice ? 'Instalar no iPhone' : 'Instalar App'}
          </span>
        </div>
        <Button 
          id="install-btn"
          onClick={handleInstall}
          className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90"
          size="sm"
        >
          {isIOSDevice ? (
            <Smartphone className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isIOSDevice ? 'Ver Instruções' : 'Instalar'}
        </Button>
      </div>
    </div>
  );
}