import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, X, Share, Plus } from "lucide-react";

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
  const [showIOSModal, setShowIOSModal] = useState(false);

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
      // Mostrar modal personalizado para iOS
      setShowIOSModal(true);
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
    <>
      {/* Botão de Instalação */}
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

      {/* Modal iOS */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-primary/30 rounded-2xl p-6 mx-4 max-w-sm w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="NeuroHack" className="h-8 w-8 rounded-lg" />
                <div>
                  <h3 className="text-lg font-bold text-primary">NeuroHack ENEM</h3>
                  <p className="text-sm text-muted-foreground">Instalar no iPhone</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIOSModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Instruções */}
            <div className="space-y-4 mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Siga estes passos para instalar o app no seu iPhone:
                </p>
              </div>

              {/* Passo 1 */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-black text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Share className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Toque no ícone de compartilhamento</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Procure pelo ícone quadrado com seta na barra de navegação
                  </p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-black text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Plus className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Escolha "Adicionar à Tela de Início"</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Role para baixo e selecione esta opção no menu
                  </p>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-black text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Pronto! App instalado</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    O NeuroHack ENEM estará na sua tela inicial como app nativo
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowIOSModal(false)}
                className="flex-1 border-primary/30 text-muted-foreground hover:text-foreground"
              >
                Entendi
              </Button>
              <Button
                onClick={() => setShowIOSModal(false)}
                className="flex-1 bg-primary hover:bg-primary/90 text-black"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}