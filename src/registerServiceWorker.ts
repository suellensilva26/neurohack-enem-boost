import * as logger from "@/utils/logger";

// Registrar Service Worker manual
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('✅ Service Worker registrado:', registration);
        logger.log('✅ Service Worker registrado com sucesso');
        
        // Verificar atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                if (confirm('Nova versão disponível! Atualizar agora?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('❌ Erro ao registrar Service Worker:', error);
        logger.log('❌ Erro ao registrar Service Worker');
      });
  });

  // Detectar quando o app está pronto para uso offline
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('📱 App pronto para instalação');
    logger.log('📱 App pronto para instalação');
  });

  // Detectar quando o app foi instalado
  window.addEventListener('appinstalled', () => {
    console.log('🎉 App instalado com sucesso!');
    logger.log('🎉 App instalado com sucesso!');
  });
} else {
  logger.log('❌ Service Worker não suportado neste navegador');
}