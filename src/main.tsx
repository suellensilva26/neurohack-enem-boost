import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/lazyImages";
import "./registerServiceWorker";

createRoot(document.getElementById("root")!).render(<App />);
