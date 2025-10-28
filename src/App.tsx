import React, { Suspense, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DailyQuestion from "./pages/DailyQuestion";
import Checklist from "./pages/Checklist";
import { OfflineMessage } from "@/components/OfflineMessage";
import { PaymentGuard } from "@/components/PaymentGuard";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { toast } from "sonner";

// Lazy loaded pages (code splitting)
const Tabs = React.lazy(() => import("./pages/Tabs"));
const TabDetail = React.lazy(() => import("./pages/TabDetail"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Simulado = React.lazy(() => import("./pages/Simulado"));
const AprendizagemAceleradaFuncional = React.lazy(() => import("./pages/AprendizagemAceleradaFuncional"));
const RedacaoCompleta = React.lazy(() => import("./pages/RedacaoCompleta"));
const RevisaoExpress = React.lazy(() => import("./pages/RevisaoExpress"));
const EstrategiasSecretas = React.lazy(() => import("./pages/EstrategiasSecretas"));
const PadroesEnemFuncional = React.lazy(() => import("./pages/PadroesEnemFuncional"));
const QuestoesRecorrentes = React.lazy(() => import("./pages/QuestoesRecorrentes"));
const Flashcards = React.lazy(() => import("./pages/Flashcards"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const BancoQuestoes = React.lazy(() => import("./pages/BancoQuestoes"));

const queryClient = new QueryClient();

const Fallback = () => (
  <div className="p-6 text-center">Carregando...</div>
);

const App = () => {
  const isOnline = useOnlineStatus();
  const prevOnline = useRef<boolean>(isOnline);

  useEffect(() => {
    if (!prevOnline.current && isOnline) {
      toast.success("Conexão restaurada");
    }
    prevOnline.current = isOnline;
  }, [isOnline]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OfflineMessage />
          <Routes>
            <Route path="/" element={<Index />} />

            <Route
              path="/tabs"
              element={
                <Suspense fallback={<Fallback />}>
                  <Tabs />
                </Suspense>
              }
            />
            
            <Route
              path="/tab/:tabId"
              element={
                <Suspense fallback={<Fallback />}>
                  <TabDetail />
                </Suspense>
              }
            />
            
            <Route
              path="/aprendizagem-acelerada"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <AprendizagemAceleradaFuncional />
                  </Suspense>
                </PaymentGuard>
              }
            />
            
            <Route
              path="/redacao-completa"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <RedacaoCompleta />
                  </Suspense>
                </PaymentGuard>
              }
            />
            
            <Route
              path="/revisao-express"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <RevisaoExpress />
                  </Suspense>
                </PaymentGuard>
              }
            />
            
            <Route
              path="/estrategias-secretas"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <EstrategiasSecretas />
                  </Suspense>
                </PaymentGuard>
              }
            />
            
            <Route
              path="/padroes-enem"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <PadroesEnemFuncional />
                  </Suspense>
                </PaymentGuard>
              }
            />
            
            <Route
              path="/questoes-recorrentes"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <QuestoesRecorrentes />
                  </Suspense>
                </PaymentGuard>
              }
            />

            <Route
              path="/flashcards"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <Flashcards />
                  </Suspense>
                </PaymentGuard>
              }
            />

            <Route path="/checklist" element={<Checklist />} />
            <Route path="/daily-question" element={<DailyQuestion />} />

            <Route
              path="/dashboard"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <Dashboard />
                  </Suspense>
                </PaymentGuard>
              }
            />

            <Route
              path="/banco-questoes"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <BancoQuestoes />
                  </Suspense>
                </PaymentGuard>
              }
            />

            <Route
              path="/quiz/:lessonId"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <Quiz />
                  </Suspense>
                </PaymentGuard>
              }
            />

            <Route
              path="/simulado"
              element={
                <PaymentGuard>
                  <Suspense fallback={<Fallback />}>
                    <Simulado />
                  </Suspense>
                </PaymentGuard>
              }
            />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

 export default App;
