import { useState } from "react";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArquiteturaNota1000 } from "@/components/redacao/ArquiteturaNota1000";
import { RepertoriosUniversais } from "@/components/redacao/RepertoriosUniversais";
import { FormulaCoringa } from "@/components/redacao/FormulaCoringa";
import { TemasProvaveis } from "@/components/redacao/TemasProvaveis";
import { MemorizacaoTresDias } from "@/components/redacao/MemorizacaoTresDias";
import { TecnicasPsicologicas } from "@/components/redacao/TecnicasPsicologicas";
import { CasosSucesso } from "@/components/redacao/CasosSucesso";
import { ProtocoloEmergencia } from "@/components/redacao/ProtocoloEmergencia";

const MODULOS = [
  { id: 1, title: "Arquitetura Matemática da Nota 1000", component: ArquiteturaNota1000 },
  { id: 2, title: "Os 12 Repertórios Universais", component: RepertoriosUniversais },
  { id: 3, title: "A Fórmula Coringa Completa", component: FormulaCoringa },
  { id: 4, title: "Os 3 Temas Mais Prováveis 2025", component: TemasProvaveis },
  { id: 5, title: "Sistema de Memorização 3 Dias", component: MemorizacaoTresDias },
  { id: 6, title: "Técnicas Psicológicas", component: TecnicasPsicologicas },
  { id: 7, title: "Casos de Sucesso", component: CasosSucesso },
  { id: 8, title: "Protocolo de Emergência", component: ProtocoloEmergencia },
];

export default function RedacaoCompleta() {
  const [moduloAtual, setModuloAtual] = useState(1);
  const [modulosCompletos, setModulosCompletos] = useState<number[]>(() => {
    const saved = localStorage.getItem("redacao-modulos-completos");
    return saved ? JSON.parse(saved) : [];
  });

  const marcarComoCompleto = (moduloId: number) => {
    if (!modulosCompletos.includes(moduloId)) {
      const novosCompletos = [...modulosCompletos, moduloId];
      setModulosCompletos(novosCompletos);
      localStorage.setItem("redacao-modulos-completos", JSON.stringify(novosCompletos));
    }
  };

  const progresso = (modulosCompletos.length / MODULOS.length) * 100;
  const ModuloAtualComponent = MODULOS[moduloAtual - 1].component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/tabs"
              className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>

            <div className="flex flex-col items-start gap-1 sm:flex-1 sm:items-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <CheckCircle className="h-3.5 w-3.5" />
                Plano Nota 1000
              </span>
              <h1 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">
                Redação Nota Mil
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Estrutura, repertórios e modelos prontos para qualquer tema do ENEM.
              </p>
            </div>

            <div className="hidden sm:flex sm:min-w-[120px]" />
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Progresso Geral</span>
              <span className="font-semibold text-primary">{Math.round(progresso)}%</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm lg:sticky lg:top-28">
              <h2 className="mb-4 text-base font-semibold text-foreground">Módulos</h2>
              <nav className="flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-2">
                {MODULOS.map((modulo) => (
                  <button
                    key={modulo.id}
                    onClick={() => setModuloAtual(modulo.id)}
                    className={`flex min-w-[220px] flex-shrink-0 items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 lg:min-w-0 ${
                      moduloAtual === modulo.id
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border/60 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
                      {modulo.id}
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="font-medium leading-snug">{modulo.title}</span>
                      {modulosCompletos.includes(modulo.id) && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-500">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Completo
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* PDFs Section - Only on first module */}
            {moduloAtual === 1 && (
              <Card className="mb-6 border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Materiais de Apoio
                  </CardTitle>
                  <CardDescription>
                    Baixe os PDFs com modelos e fórmulas para acompanhar os módulos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="/pdfs/modelo-redacao-formula-coringa.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-4 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary hover:bg-primary/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex w-full items-center gap-3 sm:w-auto">
                      <FileText className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                      <div className="space-y-1">
                        <p className="font-semibold leading-tight">
                          Modelo de Redação - Fórmula Coringa
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Clique para visualizar o PDF
                        </p>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-primary sm:block hidden" />
                  </a>
                  
                  <a
                    href="/pdfs/modelo-coringa-redacao-enem.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-4 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary hover:bg-primary/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex w-full items-center gap-3 sm:w-auto">
                      <FileText className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                      <div className="space-y-1">
                        <p className="font-semibold leading-tight">
                          Modelo Coringa de Redação ENEM
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Clique para visualizar o PDF
                        </p>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-primary sm:block hidden" />
                  </a>
                </CardContent>
              </Card>
            )}

            <div className="mb-6 rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold leading-snug text-foreground">
                {MODULOS[moduloAtual - 1].title}
              </h2>
              
              <ModuloAtualComponent />

              {/* Navigation Buttons */}
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setModuloAtual(Math.max(1, moduloAtual - 1))}
                  disabled={moduloAtual === 1}
                  className="w-full sm:w-auto"
                >
                  ← Módulo Anterior
                </Button>

                <Button
                  onClick={() => {
                    marcarComoCompleto(moduloAtual);
                    if (moduloAtual < MODULOS.length) {
                      setModuloAtual(moduloAtual + 1);
                    }
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                >
                  {moduloAtual === MODULOS.length ? "Concluir Curso" : "Próximo Módulo →"}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
