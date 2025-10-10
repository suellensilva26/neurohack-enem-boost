import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index"));
const Tabs = lazy(() => import("./pages/Tabs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const TabDetail = lazy(() => import("./pages/TabDetail"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Simulado = lazy(() => import("./pages/Simulado"));
const AprendizagemAcelerada = lazy(() => import("./pages/AprendizagemAcelerada"));
const AprendizagemAceleradaFuncional = lazy(() => import("./pages/AprendizagemAceleradaFuncional"));
const RedacaoCompleta = lazy(() => import("./pages/RedacaoCompleta"));
const RevisaoExpress = lazy(() => import("./pages/RevisaoExpress"));
const EstrategiasSecretas = lazy(() => import("./pages/EstrategiasSecretas"));
const PadroesEnem = lazy(() => import("./pages/PadroesEnem"));
const PadroesEnemFuncional = lazy(() => import("./pages/PadroesEnemFuncional"));
const QuestoesRecorrentes = lazy(() => import("./pages/QuestoesRecorrentes"));
const QuestoesRecorrentesFuncional = lazy(() => import("./pages/QuestoesRecorrentesFuncional"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const Checklist = lazy(() => import("./pages/Checklist"));
const DailyQuestion = lazy(() => import("./pages/DailyQuestion"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BancoQuestoes = lazy(() => import("./pages/BancoQuestoes"));
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <InstallPrompt />
      <OfflineIndicator />
      <BrowserRouter>
        <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
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
          <Route path="/flashcards" element={<Navigate to="/tab/flashcards" replace />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/daily-question" element={<DailyQuestion />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/banco-questoes" element={<BancoQuestoes />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
          <Route path="/simulado" element={<Simulado />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
