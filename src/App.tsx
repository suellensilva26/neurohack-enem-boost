import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tabs from "./pages/Tabs";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import TabDetail from "./pages/TabDetail";
import Quiz from "./pages/Quiz";
import Simulado from "./pages/Simulado";
import SimuladosEnem from "./pages/SimuladosEnem";
import AprendizagemAcelerada from "./pages/AprendizagemAcelerada";
import AprendizagemAceleradaFuncional from "./pages/AprendizagemAceleradaFuncional";
import RedacaoCompleta from "./pages/RedacaoCompleta";
import RevisaoExpress from "./pages/RevisaoExpress";
import EstrategiasSecretas from "./pages/EstrategiasSecretas";
import PadroesEnem from "./pages/PadroesEnem";
import PadroesEnemFuncional from "./pages/PadroesEnemFuncional";
import QuestoesRecorrentes from "./pages/QuestoesRecorrentes";
import QuestoesRecorrentesFuncional from "./pages/QuestoesRecorrentesFuncional";
import Flashcards from "./pages/Flashcards";
import Checklist from "./pages/Checklist";
import DailyQuestion from "./pages/DailyQuestion";
import Dashboard from "./pages/Dashboard";
import BancoQuestoes from "./pages/BancoQuestoes";

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
          <Route path="/aprendizagem-acelerada" element={<AprendizagemAceleradaFuncional />} />
          <Route path="/redacao-completa" element={<RedacaoCompleta />} />
          <Route path="/revisao-express" element={<RevisaoExpress />} />
          <Route path="/estrategias-secretas" element={<EstrategiasSecretas />} />
          <Route path="/padroes-enem" element={<PadroesEnemFuncional />} />
          <Route path="/questoes-recorrentes" element={<QuestoesRecorrentesFuncional />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/daily-question" element={<DailyQuestion />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/banco-questoes" element={<BancoQuestoes />} />
          <Route path="/simulados-enem" element={<SimuladosEnem />} />
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
