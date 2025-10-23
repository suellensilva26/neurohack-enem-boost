import { registerSW } from 'virtual:pwa-register'
import * as logger from "@/utils/logger";

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