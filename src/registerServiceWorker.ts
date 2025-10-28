import { registerSW } from 'virtual:pwa-register'
import * as logger from "@/utils/logger";

// Em desenvolvimento, evitar registrar Service Worker para não interferir no Vite/HMR
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm('Nova versão disponível! Atualizar agora?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      logger.log('App pronto para uso offline')
    },
  })
} else {
  // No-op em dev
  logger.log('Service Worker desativado em desenvolvimento')
}