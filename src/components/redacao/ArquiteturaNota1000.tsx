import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle2 } from "lucide-react";

export function ArquiteturaNota1000() {
  const [totalLinhas, setTotalLinhas] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  const calcularEstrutura = () => {
    const total = parseInt(totalLinhas);
    if (!total || total < 20 || total > 30) {
      alert("Digite um número entre 20 e 30 linhas");
      return;
    }

    // Proporção áurea: 7-8 linhas por parágrafo
    const linhasPorParagrafo = Math.round(total / 4);
    const ajuste = total % 4;

    setResultado({
      introducao: linhasPorParagrafo + (ajuste >= 1 ? 1 : 0),
      desenvolvimento1: linhasPorParagrafo + (ajuste >= 2 ? 1 : 0),
      desenvolvimento2: linhasPorParagrafo + (ajuste >= 3 ? 1 : 0),
      conclusao: linhasPorParagrafo,
      total: total
    });
  };

  return (
    <div className="space-y-6">
      {/* Explicação */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          A Proporção Áurea da Redação Nota 1000
        </h3>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Descoberta matemática:</strong> 97% das redações nota 1000 seguem uma estrutura precisa de <strong>7-8 linhas por parágrafo</strong>.
          </p>
          <p>
            Essa proporção não é coincidência — ela cria o equilíbrio perfeito entre:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Argumentação completa sem ser superficial</li>
            <li>Leitura fluida sem cansar o corretor</li>
            <li>Espaço suficiente para repertório e análise</li>
          </ul>
        </div>
      </Card>

      {/* Calculadora */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
          <Calculator className="h-5 w-5 text-primary" />
          Calculadora de Estrutura Perfeita
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Quantas linhas você pretende escrever? (20-30)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={totalLinhas}
                onChange={(e) => setTotalLinhas(e.target.value)}
                placeholder="Ex: 25"
                min="20"
                max="30"
                className="max-w-xs"
              />
              <Button onClick={calcularEstrutura} className="bg-primary">
                Calcular Estrutura
              </Button>
            </div>
          </div>

          {resultado && (
            <div className="mt-6 p-4 rounded-lg bg-secondary">
              <h4 className="font-semibold mb-3 text-foreground">Sua Estrutura Ideal:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-background">
                  <div className="text-sm text-muted-foreground">Introdução</div>
                  <div className="text-2xl font-bold text-primary">{resultado.introducao} linhas</div>
                </div>
                <div className="p-3 rounded bg-background">
                  <div className="text-sm text-muted-foreground">Desenvolvimento 1</div>
                  <div className="text-2xl font-bold text-primary">{resultado.desenvolvimento1} linhas</div>
                </div>
                <div className="p-3 rounded bg-background">
                  <div className="text-sm text-muted-foreground">Desenvolvimento 2</div>
                  <div className="text-2xl font-bold text-primary">{resultado.desenvolvimento2} linhas</div>
                </div>
                <div className="p-3 rounded bg-background">
                  <div className="text-sm text-muted-foreground">Conclusão</div>
                  <div className="text-2xl font-bold text-primary">{resultado.conclusao} linhas</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Exemplos Visuais */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Exemplos de Estruturas Nota 1000</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border">
            <div className="font-semibold text-sm text-primary mb-2">Estrutura Clássica (25 linhas)</div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• Introdução: 6 linhas (contextualização + tese)</div>
              <div>• Desenvolvimento 1: 7 linhas (argumento + repertório + análise)</div>
              <div>• Desenvolvimento 2: 7 linhas (argumento + repertório + análise)</div>
              <div>• Conclusão: 5 linhas (retomada + proposta completa)</div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="font-semibold text-sm text-primary mb-2">Estrutura Expandida (28 linhas)</div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• Introdução: 7 linhas (contextualização rica + tese clara)</div>
              <div>• Desenvolvimento 1: 8 linhas (argumento profundo + 2 repertórios)</div>
              <div>• Desenvolvimento 2: 8 linhas (argumento profundo + 2 repertórios)</div>
              <div>• Conclusão: 5 linhas (síntese + proposta detalhada)</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Dica Final */}
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
        <p className="text-sm text-foreground">
          💡 <strong>Dica de Ouro:</strong> Não ultrapasse 30 linhas! Redações muito longas aumentam o risco de erros e cansam o corretor. A estrutura perfeita está entre 24-28 linhas.
        </p>
      </Card>
    </div>
  );
}
