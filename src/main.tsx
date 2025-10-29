import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/lazyImages";

// Detectar se é iOS
function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg =>
    console.log('✅ ServiceWorker registrado!', reg)
  ).catch(err =>
    console.error('❌ Erro ao registrar ServiceWorker:', err)
  );
}

// Mostrar alerta automático para usuários iOS
if (isIOS()) {
  // Aguardar um pouco para o app carregar
  setTimeout(() => {
    alert(
      'Para instalar o app no seu iPhone:\n\n1. Toque no ícone de compartilhamento (quadrado com seta).\n2. Escolha "Adicionar à Tela de Início".\n3. Pronto! O app estará instalado como nativo!'
    );
  }, 3000);
}

// PWA Install Prompt - Remover para evitar conflito
// O componente InstallPrompt vai gerenciar isso

createRoot(document.getElementById("root")!).render(<App />);
