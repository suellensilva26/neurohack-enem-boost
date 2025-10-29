import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/lazyImages";

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg =>
    console.log('✅ ServiceWorker registrado!', reg)
  ).catch(err =>
    console.error('❌ Erro ao registrar ServiceWorker:', err)
  );
}

// PWA Install Prompt - Remover para evitar conflito
// O componente InstallPrompt vai gerenciar isso

createRoot(document.getElementById("root")!).render(<App />);
