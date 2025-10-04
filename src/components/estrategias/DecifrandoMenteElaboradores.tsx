import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Target, Scale, Heart } from "lucide-react";

export function DecifrandoMenteElaboradores() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            A Descoberta do "DNA Psicológico" das Provas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-primary/10">
            <p className="font-semibold text-primary mb-2">REVELAÇÃO CHOCANTE:</p>
            <p className="text-muted-foreground">
              Toda banca examinadora possui "assinaturas comportamentais" inconscientes que se repetem ano após ano. 
              O INEP, responsável pelo ENEM, não escapa dessa regra.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Viés da Resposta Segura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Elaboradores evitam colocar alternativas controversas ou que possam gerar recursos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Viés do Equilíbrio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Distribuição estatística das alternativas A, B, C, D, E segue padrões matemáticos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Viés da Complexidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Questões "difíceis" frequentemente têm respostas mais simples do que parecem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Viés Ético
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Alternativas que contrariam direitos humanos ou valores democráticos são sistematicamente incorretas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">Sistema de Reconhecimento Instantâneo</h3>
            <p className="text-sm text-muted-foreground">Técnica "SCANNER NEURAL" (30 segundos por questão)</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-sm">FASE 1 - Varredura Ética</CardTitle>
                  <p className="text-xs text-muted-foreground">5 segundos</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Elimine alternativas que contrariam direitos humanos</li>
                    <li>✓ Descarte opções discriminatórias ou antidemocráticas</li>
                    <li className="text-primary font-semibold">Taxa de eliminação: 15-20%</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-sm">FASE 2 - Análise de Padrão</CardTitle>
                  <p className="text-xs text-muted-foreground">10 segundos</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Identifique alternativas absurdamente longas ou curtas</li>
                    <li>✓ Procure números extremos vs. intermediários</li>
                    <li>✓ Detecte termos absolutos ("sempre", "nunca", "jamais")</li>
                    <li className="text-primary font-semibold">Taxa de eliminação: 20-30%</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-sm">FASE 3 - Lógica Contextual</CardTitle>
                  <p className="text-xs text-muted-foreground">15 segundos</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Analise qual alternativa melhor se encaixa no contexto</li>
                    <li>✓ Prefira respostas mais detalhadas e bem explicadas</li>
                    <li>✓ Escolha entre as 2-3 alternativas restantes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gold/10 border border-gold/30">
            <h4 className="font-semibold mb-2 text-gold">💡 Estatística Brutal:</h4>
            <p className="text-sm">
              Candidatos que aplicam essas técnicas acertam, em média, <strong>23 questões a mais</strong> do que aqueles que chutam aleatoriamente. 
              Isso equivale a <strong>150-200 pontos extras</strong> na nota final.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}