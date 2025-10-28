import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/lazyImages";

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg =>
    console.log('ServiceWorker registrado!', reg)
  );
}

// PWA Install Prompt
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  window.deferredPrompt = e;
  // Mostre o botão #install-btn se quiser!
  const btn = document.getElementById('install-btn');
  if (btn) btn.style.display = 'block';
});

createRoot(document.getElementById("root")!).render(<App />);
