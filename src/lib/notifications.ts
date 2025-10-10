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
  // Prefer Service Worker notifications to avoid Illegal constructor in some browsers
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    // Fire and forget registration/show; avoid throwing to the app
    navigator.serviceWorker
      .getRegistration()
      .then(async (reg) => {
        try {
          if (!reg) {
            const newReg = await navigator.serviceWorker.register("/sw.js");
            await newReg.showNotification(title, options);
          } else {
            await reg.showNotification(title, options);
          }
        } catch (err) {
          // Swallow errors; we report ok=false via return value below if needed
          // But since this is async, no need to disrupt UI
        }
      })
      .catch(() => {
        // Ignore
      });
    return { ok: true };
  }
  // If Service Workers are unsupported, avoid using the Notification constructor to prevent Illegal constructor
  return { ok: false, reason: "unsupported" };
}