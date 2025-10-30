import React, { Suspense, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DailyQuestion from "./pages/DailyQuestion";
import Checklist from "./pages/Checklist";
import { OfflineMessage } from "@/components/OfflineMessage";
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
  const PUBLIC_MODE = (import.meta.env.VITE_PUBLIC_MODE ?? 'false') === 'true';
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
                <Suspense fallback={<Fallback />}>
                  <AprendizagemAceleradaFuncional />
                </Suspense>
              }
            />
            
            <Route
              path="/redacao-completa"
              element={
                <Suspense fallback={<Fallback />}>
                  <RedacaoCompleta />
                </Suspense>
              }
            />
            
            <Route
              path="/revisao-express"
              element={
                <Suspense fallback={<Fallback />}>
                  <RevisaoExpress />
                </Suspense>
              }
            />
            
            <Route
              path="/estrategias-secretas"
              element={
                <Suspense fallback={<Fallback />}>
                  <EstrategiasSecretas />
                </Suspense>
              }
            />
            
            <Route
              path="/padroes-enem"
              element={
                <Suspense fallback={<Fallback />}>
                  <PadroesEnemFuncional />
                </Suspense>
              }
            />
            
            <Route
              path="/questoes-recorrentes"
              element={
                <Suspense fallback={<Fallback />}>
                  <QuestoesRecorrentes />
                </Suspense>
              }
            />

            <Route
              path="/flashcards"
              element={
                <Suspense fallback={<Fallback />}>
                  <Flashcards />
                </Suspense>
              }
            />

            <Route path="/checklist" element={<Checklist />} />
            <Route path="/daily-question" element={<DailyQuestion />} />

            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<Fallback />}>
                  <Dashboard />
                </Suspense>
              }
            />

            <Route
              path="/banco-questoes"
              element={
                <Suspense fallback={<Fallback />}>
                  <BancoQuestoes />
                </Suspense>
              }
            />

            <Route
              path="/quiz/:lessonId"
              element={
                <Suspense fallback={<Fallback />}>
                  <Quiz />
                </Suspense>
              }
            />

            <Route
              path="/simulado"
              element={
                <Suspense fallback={<Fallback />}>
                  <Simulado />
                </Suspense>
              }
            />

            <Route path="/auth" element={PUBLIC_MODE ? <Navigate to="/tabs" replace /> : <Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

 export default App;
