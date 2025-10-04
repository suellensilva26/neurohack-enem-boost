import { useState } from "react";
import { ArrowLeft, CheckCircle, FileText, Download } from "lucide-react";
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/tabs" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-primary">Redação Nota Mil</h1>
            <div className="w-20"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso Geral</span>
              <span className="font-semibold text-primary">{Math.round(progresso)}%</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-4 sticky top-24">
              <h2 className="font-semibold mb-4 text-foreground">Módulos</h2>
              <nav className="space-y-2">
                {MODULOS.map((modulo) => (
                  <button
                    key={modulo.id}
                    onClick={() => setModuloAtual(modulo.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      moduloAtual === modulo.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-foreground"
                    }`}
                  >
                    {modulosCompletos.includes(modulo.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                    <span className="text-sm">{modulo.id}. {modulo.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* PDFs Section - Only on first module */}
            {moduloAtual === 1 && (
              <Card className="mb-6 border-primary/20">
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
                    download
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">Modelo de Redação - Fórmula Coringa</p>
                        <p className="text-sm text-muted-foreground">Template completo para qualquer tema</p>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-primary" />
                  </a>
                  
                  <a
                    href="/pdfs/modelo-coringa-redacao-enem.pdf"
                    download
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">Modelo Coringa de Redação ENEM</p>
                        <p className="text-sm text-muted-foreground">Estrutura nota 1000 passo a passo</p>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-primary" />
                  </a>
                </CardContent>
              </Card>
            )}

            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                {MODULOS[moduloAtual - 1].title}
              </h2>
              
              <ModuloAtualComponent />

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setModuloAtual(Math.max(1, moduloAtual - 1))}
                  disabled={moduloAtual === 1}
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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
