import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tabs from "./pages/Tabs";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import TabDetail from "./pages/TabDetail";
import Quiz from "./pages/Quiz";
import Simulado from "./pages/Simulado";
import AprendizagemAcelerada from "./pages/AprendizagemAcelerada";
import RedacaoCompleta from "./pages/RedacaoCompleta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tabs" element={<Tabs />} />
          <Route path="/tab/:tabId" element={<TabDetail />} />
          <Route path="/aprendizagem-acelerada" element={<AprendizagemAcelerada />} />
          <Route path="/redacao-completa" element={<RedacaoCompleta />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
          <Route path="/simulado" element={<Simulado />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
