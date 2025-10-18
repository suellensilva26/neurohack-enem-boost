import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // Oculta após escolha
    setVisible(false);
    setDeferredPrompt(null);
    // Opcional: enviar analítico de instalação via supabase
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-primary/30 bg-background/90 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 text-sm">Instale o app para acesso rápido</div>
      <div className="flex gap-2">
        <Button size="sm" onClick={install}>Instalar App</Button>
        <Button size="sm" variant="outline" onClick={() => setVisible(false)}>Agora não</Button>
      </div>
    </div>
  );
}