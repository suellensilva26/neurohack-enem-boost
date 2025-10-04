import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function ChuteCientifico() {
  const alternativas = [
    { letra: "A", percentual: 18, descricao: "Tendência de evitar por ser 'primeira impressão'" },
    { letra: "B", percentual: 22, descricao: "Posição psicologicamente confortável" },
    { letra: "C", percentual: 24, descricao: "Preferida inconscientemente por elaboradores" },
    { letra: "D", percentual: 21, descricao: "Equilíbrio natural" },
    { letra: "E", percentual: 15, descricao: "Tendência de evitar por ser 'última opção'" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Chute Científico por Alternativa
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Estatística das Alternativas (Análise de 15 anos)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {alternativas.map((alt) => (
              <div key={alt.letra} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {alt.letra}
                    </div>
                    <div>
                      <p className="font-semibold">Alternativa {alt.letra}</p>
                      <p className="text-sm text-muted-foreground">{alt.descricao}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{alt.percentual}%</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      alt.letra === "C" ? "bg-primary" : "bg-primary/70"
                    }`}
                    style={{ width: `${alt.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Card className="border-gold/30 bg-gold/5">
            <CardHeader>
              <CardTitle className="text-base">Estratégia "APOSTADOR PROFISSIONAL"</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 text-muted-foreground">
                Se tiver que chutar completamente no escuro (situação de emergência):
              </p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>Elimine <strong>A</strong> e <strong>E</strong> por serem estatisticamente menos prováveis</li>
                <li>Entre B, C, D, prefira <strong>C</strong> por ter ligeira vantagem histórica</li>
                <li>Varie entre B e D se já marcou muitas alternativas C</li>
              </ol>
            </CardContent>
          </Card>

          <div className="p-4 rounded-lg bg-primary/10">
            <h4 className="font-semibold mb-2">⚠️ Importante:</h4>
            <p className="text-sm text-muted-foreground">
              Esta técnica deve ser usada APENAS como último recurso, quando você não conseguiu aplicar 
              nenhuma das outras estratégias de eliminação. O ideal é sempre tentar eliminar alternativas 
              obviamente incorretas primeiro.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sistemas de Emergência para Cada Área</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">MATEMÁTICA - Protocolo "SOS NÚMEROS"</h4>
                <p className="text-sm text-muted-foreground mb-2">Quando não souber absolutamente nada:</p>
                <ol className="space-y-1 text-sm list-decimal list-inside">
                  <li>Identifique o tipo de pergunta (valor ou conceito)</li>
                  <li>Analise ordens de grandeza (pequeno vs normal vs grande)</li>
                  <li>Teste da substituição: qual faz mais sentido?</li>
                </ol>
              </div>

              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-sm font-semibold mb-2">Exemplo Emergencial:</p>
                <p className="text-sm mb-2">"A função f(x) = 2x + 3 tem qual valor quando x = 5?"</p>
                <p className="text-sm text-muted-foreground">
                  Sem saber o que é função: Vejo "2x + 3" e "x = 5" → Intuitivamente: 2×5 + 3 = 13 → Procuro 13 nas alternativas
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}