export type NotifyResult = {
  ok: boolean;
  reason?:
    | "unsupported"
    | "denied"
    | "default"
    | "insecure_context"
    | "error";
};

export function canUseNotifications(): NotifyResult {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { ok: false, reason: "unsupported" };
  }
  // Notifications require a secure context (https or localhost)
  // In some browsers, calling new Notification in non-secure contexts throws "Illegal constructor"
  const isSecure = window.isSecureContext || location.hostname === "localhost";
  if (!isSecure) {
    return { ok: false, reason: "insecure_context" };
  }
  const perm = Notification.permission;
  if (perm === "denied") return { ok: false, reason: "denied" };
  if (perm === "default") return { ok: false, reason: "default" };
  return { ok: true };
}

// Mantém a assinatura esperada pelos componentes: retorna NotificationPermission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied";
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch (e) {
    return "denied";
  }
}

export function safeNotify(title: string, options?: NotificationOptions): NotifyResult {
  const check = canUseNotifications();
  if (!check.ok) return check;

  // Prefer Service Worker notifications; aguarda registro existente, sem tentar registrar manualmente.
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    // Usa navigator.serviceWorker.ready para evitar erros em dev quando /sw.js não existe ainda.
    navigator.serviceWorker.ready
      .then((reg) => {
        try {
          reg.showNotification(title, options);
        } catch {
          // Evita quebrar a UI em caso de erro; não precisamos lançar.
        }
      })
      .catch(() => {
        // Silencia erros de readiness.
      });
    return { ok: true };
  }

  // Fallback: se Service Workers não forem suportados, tenta usar Notification diretamente
  try {
    new Notification(title, options);
    return { ok: true };
  } catch {
    return { ok: false, reason: "error" };
  }
}