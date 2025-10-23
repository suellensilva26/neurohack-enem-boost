import { AlertTriangle, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

/**
 * Banner discreto exibido quando o usuário está offline.
 * Focado em UX: comunica, sugere instalar/atualizar e não bloqueia totalmente a navegação.
 */
export function OfflineMessage() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  const tryReconnect = () => {
    // Força tentativa de reconexão de forma simples
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-[560px] -translate-x-1/2">
      <div className="rounded-xl border border-yellow-400/40 bg-yellow-50/90 p-3 shadow backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-yellow-800">
              <WifiOff className="h-4 w-4" />
              Você está offline
            </div>
            <p className="mt-1 text-xs text-yellow-800/80">
              Alguns recursos que dependem de internet podem ficar indisponíveis. Conteúdos em cache continuarão funcionando.
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={tryReconnect} aria-label="Tentar reconectar">
              <RefreshCw className="mr-1 h-3 w-3" />
              Recarregar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}