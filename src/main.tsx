import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register Service Worker for Notifications in secure contexts
if ("serviceWorker" in navigator) {
  const isSecure = window.isSecureContext || location.hostname === "localhost";
  if (isSecure) {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // ignore registration errors
    });
  }
}
