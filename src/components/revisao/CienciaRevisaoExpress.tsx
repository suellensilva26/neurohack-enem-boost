import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

export function CienciaRevisaoExpress() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Descoberta Neurocientífica: O Poder dos Últimos 30 Dias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10">
            <p className="font-semibold text-primary mb-2">REVELAÇÃO CHOCANTE:</p>
            <p className="text-muted-foreground">
              Estudos mostram que estudantes que focam intensamente nos últimos 30 dias têm performance <strong>65% melhor</strong> do que aqueles que estudam &quot;devagar&quot; o ano todo.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Os 4 Pilares Neurológicos do Sucesso:</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-2">URGÊNCIA ADAPTATIVA</h4>
                  <p className="text-sm text-muted-foreground">
                    Pressão temporal ativa neurotransmissores de alta performance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-2">SELETIVIDADE EXTREMA</h4>
                  <p className="text-sm text-muted-foreground">
                    Foco apenas no que realmente cai nas provas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-2">REPETIÇÃO ESPAÇADA</h4>
                  <p className="text-sm text-muted-foreground">
                    Revisão científica nos intervalos certos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Brain className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-2">SIMULAÇÃO INTENSIVA</h4>
                  <p className="text-sm text-muted-foreground">
                    Treino nas condições reais da prova
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="font-semibold text-lg">Sistema Trifásico de 30 Dias:</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-base">FASE 1 - COLETA ESTRATÉGICA</CardTitle>
                  <p className="text-sm text-muted-foreground">Dias 1-10</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Absorção dos 240 tópicos essenciais</li>
                    <li>• Criação de resumos visuais</li>
                    <li>• Primeira bateria de simulados diagnósticos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-base">FASE 2 - CONSOLIDAÇÃO ATIVA</CardTitle>
                  <p className="text-sm text-muted-foreground">Dias 11-20</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Revisão espaçada dos pontos críticos</li>
                    <li>• Resolução de 1.000+ questões por área</li>
                    <li>• Refinamento de estratégias de prova</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-base">FASE 3 - OTIMIZAÇÃO FINAL</CardTitle>
                  <p className="text-sm text-muted-foreground">Dias 21-30</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Simulados cronometrados diários</li>
                    <li>• Revisão express dos gaps identificados</li>
                    <li>• Preparação psicológica e logística</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-secondary">
            <h4 className="font-semibold mb-2">A Matemática da Salvação:</h4>
            <ul className="space-y-2 text-sm">
              <li>✓ 30 dias divididos estrategicamente em 3 fases distintas</li>
              <li>✓ 240 tópicos essenciais que cobrem 85% das questões do ENEM</li>
              <li>✓ 90% de aproveitamento através de técnicas de memorização acelerada</li>
              <li>✓ Sistema fail-safe que funciona mesmo com 2-3 horas/dia</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}