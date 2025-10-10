import { useState } from "react";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import FreemiumBlocker from "@/components/freemium/FreemiumBlocker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DecifrandoMenteElaboradores } from "@/components/estrategias/DecifrandoMenteElaboradores";
import { MetodoSherlockHolmes } from "@/components/estrategias/MetodoSherlockHolmes";
import { DrillEliminadores } from "@/components/estrategias/DrillEliminadores";
import { EstrategiasPorArea } from "@/components/estrategias/EstrategiasPorArea";
import { GestaoTempo } from "@/components/estrategias/GestaoTempo";
import { ChuteCientifico } from "@/components/estrategias/ChuteCientifico";
import { ProtocoloFinal } from "@/components/estrategias/ProtocoloFinal";

const MODULOS = [
  { id: 1, title: "Decifrando a Mente dos Elaboradores", component: DecifrandoMenteElaboradores },
  { id: 2, title: "O Método Sherlock Holmes de Eliminação", component: MetodoSherlockHolmes },
  { id: 3, title: "Drill de Treinamento dos Eliminadores", component: DrillEliminadores },
  { id: 4, title: "Estratégias Psicológicas por Área", component: EstrategiasPorArea },
  { id: 5, title: "O Sistema TRI e Gestão do Tempo", component: GestaoTempo },
  { id: 6, title: "Chute Científico por Alternativa", component: ChuteCientifico },
  { id: 7, title: "Protocolo Final de Emergência", component: ProtocoloFinal },
];

export default function EstrategiasSecretas() {
  const [moduloAtual, setModuloAtual] = useState(1);
  const [modulosCompletos, setModulosCompletos] = useState<number[]>(() => {
    const saved = localStorage.getItem("estrategias-modulos-completos");
    return saved ? JSON.parse(saved) : [];
  });

  const marcarComoCompleto = (moduloId: number) => {
    if (!modulosCompletos.includes(moduloId)) {
      const novosCompletos = [...modulosCompletos, moduloId];
      setModulosCompletos(novosCompletos);
      localStorage.setItem("estrategias-modulos-completos", JSON.stringify(novosCompletos));
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
            <h1 className="text-xl font-bold text-primary">Estratégias Secretas</h1>
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
            <FreemiumBlocker>
              {/* PDF Section - Only on first module */}
              {moduloAtual === 1 && (
                <Card className="mb-6 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Material de Apoio
                    </CardTitle>
                    <CardDescription>
                      Baixe o PDF completo das Estratégias Secretas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="/pdfs/estrategias-secretas-enem.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">Estratégias Secretas para o ENEM</p>
                          <p className="text-sm text-muted-foreground">Clique para visualizar o PDF completo</p>
                        </div>
                      </div>
                      <FileText className="h-5 w-5 text-primary" />
                    </a>
                  </CardContent>
                </Card>
              )}

              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  {MODULOS[moduloAtual - 1].title}
                </h2>
                
                <ModuloAtualComponent key={moduloAtual} />

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
            </FreemiumBlocker>
          </main>
        </div>
      </div>
    </div>
  );
}