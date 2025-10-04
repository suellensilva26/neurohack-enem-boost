import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, Zap, CheckCircle } from "lucide-react";

export function GestaoTempo() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            O Protocolo "CAÇADOR DE PONTOS"
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            180 questões em 5,5 horas - Sistema de gestão estratégica
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  FASE 1
                </CardTitle>
                <p className="text-sm text-muted-foreground">Colheita Rápida</p>
                <p className="text-2xl font-bold text-primary">90 min</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Passe por TODAS as 180 questões</li>
                  <li>✓ Responda apenas as que souber com certeza</li>
                  <li>✓ Marque as duvidosas para revisão</li>
                  <li className="text-xs text-primary font-semibold mt-3">Meta: 60-80 questões</li>
                  <li className="text-xs text-muted-foreground">Objetivo: Base sólida rápida</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  FASE 2
                </CardTitle>
                <p className="text-sm text-muted-foreground">Caça Seletiva</p>
                <p className="text-2xl font-bold text-primary">120 min</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Volte às questões marcadas</li>
                  <li>✓ Aplique técnicas de eliminação</li>
                  <li>✓ Foque nas que conseguir reduzir para 2-3 alternativas</li>
                  <li className="text-xs text-muted-foreground mt-3">Objetivo: Chute educado</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  FASE 3
                </CardTitle>
                <p className="text-sm text-muted-foreground">Operação Limpeza</p>
                <p className="text-2xl font-bold text-primary">60 min</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Finalize questões em branco</li>
                  <li>✓ Revisão rápida das que têm maior peso (TRI)</li>
                  <li>✓ Chute estratégico nas impossíveis</li>
                  <li className="text-xs text-muted-foreground mt-3">Objetivo: Zero em branco</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  FASE 4
                </CardTitle>
                <p className="text-sm text-muted-foreground">Polimento</p>
                <p className="text-2xl font-bold text-primary">60 min</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Revisão das respostas com menor confiança</li>
                  <li>✓ Checagem de erros bobos em questões fáceis</li>
                  <li>✓ Ajustes finais baseados na "assinatura TRI"</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="p-6 rounded-lg bg-gold/10 border-2 border-gold/30">
            <h3 className="font-bold text-lg mb-2 text-gold">⚠️ REGRA DE OURO:</h3>
            <p className="text-sm">
              Nunca passe mais de <strong>4 minutos</strong> em uma questão. O ENEM premia consistência, não perfeccionismo.
            </p>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Entendendo o "ANTI-CHUTE" do ENEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="font-semibold mb-2">REVELAÇÃO TÉCNICA:</p>
                <p className="text-sm text-muted-foreground">
                  O TRI (Teoria de Resposta ao Item) não apenas pune chutes aleatórios - ele PREMIA padrões coerentes de acerto.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2 text-sm">Questões Fáceis</h4>
                  <p className="text-xs text-muted-foreground">Valem menos, mas são "teste de coerência"</p>
                </div>
                <div className="p-4 rounded-lg border border-primary">
                  <h4 className="font-semibold mb-2 text-sm text-primary">Questões Médias</h4>
                  <p className="text-xs text-muted-foreground">Valem mais, são o "core" da avaliação</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2 text-sm">Questões Difíceis</h4>
                  <p className="text-xs text-muted-foreground">Valem muito, mas só contam se você acertou as fáceis</p>
                </div>
              </div>

              <Card className="bg-secondary">
                <CardHeader>
                  <CardTitle className="text-sm">Estratégia "HACKER DO TRI":</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li>NUNCA erre questões óbvias (use eliminação mesmo sem saber)</li>
                    <li>Foque 70% do tempo nas médias (maior ROI de pontos)</li>
                    <li>Chute estrategicamente nas difíceis (só depois de garantir as fáceis)</li>
                  </ol>
                </CardContent>
              </Card>

              <div className="p-4 rounded-lg bg-gold/10">
                <h4 className="font-semibold mb-3">Técnica "PERFIL DE APROVADO"</h4>
                <p className="text-sm mb-3 text-muted-foreground">O TRI reconhece padrões de candidatos competentes. Simule esse perfil:</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gold">85-95%</div>
                    <p className="text-xs text-muted-foreground">Acerta fáceis</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gold">60-75%</div>
                    <p className="text-xs text-muted-foreground">Acerta médias</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gold">30-50%</div>
                    <p className="text-xs text-muted-foreground">Acerta difíceis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}