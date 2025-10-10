import { useEffect, useRef, useState } from "react";
import PremiumOverlay from "@/components/freemium/PremiumOverlay";
import { useNavigate } from "react-router-dom";

type FreemiumBlockerProps = {
  children: React.ReactNode;
  redirectPath?: string; // default: "/pricing"
};

// Wrapper que captura qualquer interação dentro do conteúdo premium.
// Ao clicar ou rolar, abre o overlay e oferece CTA para compra.
export default function FreemiumBlocker({ children, redirectPath = "/pricing" }: FreemiumBlockerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onInteraction = (e: Event) => {
      // Bloqueia interação e mostra overlay
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };

    // Captura múltiplos tipos de interação
    const events: (keyof GlobalEventHandlersEventMap)[] = [
      "click",
      "touchstart",
      "wheel",
      "scroll",
      "keydown",
    ];

    events.forEach((evt) => el.addEventListener(evt, onInteraction, { passive: false } as any));

    // Bloqueia rolagem quando overlay estiver aberto
    const blockScroll = (ev: Event) => {
      if (open) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    };
    el.addEventListener("wheel", blockScroll, { passive: false } as any);
    el.addEventListener("touchmove", blockScroll, { passive: false } as any);

    return () => {
      events.forEach((evt) => el.removeEventListener(evt, onInteraction as EventListener));
      el.removeEventListener("wheel", blockScroll as EventListener);
      el.removeEventListener("touchmove", blockScroll as EventListener);
    };
  }, [open]);

  // Quando clicar no CTA do overlay, redireciona para página de compra
  const handleUpgrade = () => {
    navigate(redirectPath);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Camada transparente acima do conteúdo para garantir bloqueio de clique */}
      {open && (
        <div className="absolute inset-0 z-40" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} />
      )}

      {/* Conteúdo real renderizado */}
      <div className="pointer-events-auto">
        {children}
      </div>

      {/* Overlay Premium com CTA */}
      <PremiumOverlay 
        open={open} 
        onClose={() => setOpen(false)} 
        onUpgradeClick={handleUpgrade}
      />
    </div>
  );
}