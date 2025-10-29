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

// Remover alerta automático - agora só aparece no botão

createRoot(document.getElementById("root")!).render(<App />);
