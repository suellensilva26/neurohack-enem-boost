import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, AlertCircle, Rocket } from "lucide-react";

export function ProtocoloFinal() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            Protocolo "TERRA ARRASADA" (Últimas 2 Semanas)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            CENÁRIO: Você procrastinou TANTO que só restam 15 dias
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-sm">DIAS 14-10</CardTitle>
                <p className="text-xs text-muted-foreground">Foco Laser nas Técnicas</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 4 horas diárias APENAS nas estratégias</li>
                  <li>• Treine eliminação em 500 questões (sem resolver)</li>
                  <li>• Memorize os padrões de cada área</li>
                  <li>• ZERO tempo estudando conteúdo tradicional</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-sm">DIAS 9-5</CardTitle>
                <p className="text-xs text-muted-foreground">Simulação Intensiva</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 2 simulados completos por dia</li>
                  <li>• Aplique TODAS as técnicas</li>
                  <li>• Meça tempo de aplicação</li>
                  <li>• Identifique quais funcionam melhor</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-sm">DIAS 4-1</CardTitle>
                <p className="text-xs text-muted-foreground">Calibragem Final</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 1 simulado diário</li>
                  <li>• Ajuste fino das técnicas</li>
                  <li>• Memorização dos "padrões dourados"</li>
                  <li>• Preparação psicológica</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gold/30 bg-gold/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold" />
                A Matemática da Vitória
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-4 rounded-lg bg-background">
                  <div className="text-3xl font-bold text-primary mb-2">60</div>
                  <p className="text-xs text-muted-foreground">Questões que você sabe</p>
                  <p className="text-xs mt-1">Método tradicional</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-background">
                  <div className="text-3xl font-bold text-primary mb-2">50</div>
                  <p className="text-xs text-muted-foreground">Questões que pode descobrir</p>
                  <p className="text-xs mt-1">Usando eliminação inteligente</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-background">
                  <div className="text-3xl font-bold text-primary mb-2">70</div>
                  <p className="text-xs text-muted-foreground">Questões que pode chutar</p>
                  <p className="text-xs mt-1">Estrategicamente</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gold/20 border-2 border-gold">
                  <div className="text-3xl font-bold text-gold mb-2">180</div>
                  <p className="text-xs font-bold">TOTAL REALISTA</p>
                  <p className="text-xs mt-1">Acertos de 180 questões</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-background">
                <p className="text-center text-sm font-semibold text-gold">
                  ISSO EQUIVALE A: 700-800 pontos nas áreas objetivas
                </p>
                <p className="text-center text-xs text-muted-foreground mt-1">
                  Suficiente para a maioria dos cursos superiores do país
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Técnica "GPS MENTAL" para Não Se Perder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                PROBLEMA: Em provas longas, é fácil perder o foco e começar a cometer erros bobos.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">CHECKPOINT 1</p>
                  <p className="text-xs text-muted-foreground mb-2">Após 45 questões (1,5h)</p>
                  <ul className="space-y-1 text-xs">
                    <li>→ 10 respirações profundas</li>
                    <li>→ Beba água</li>
                    <li>→ "Estou no ritmo certo?"</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">CHECKPOINT 2</p>
                  <p className="text-xs text-muted-foreground mb-2">Após 90 questões (3h)</p>
                  <ul className="space-y-1 text-xs">
                    <li>→ Alongue pescoço</li>
                    <li>→ Avalie quantas chutou vs. soube</li>
                    <li>→ "Meu perfil TRI está coerente?"</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="font-semibold text-sm mb-2">CHECKPOINT 3</p>
                  <p className="text-xs text-muted-foreground mb-2">Após 135 questões (4,5h)</p>
                  <ul className="space-y-1 text-xs">
                    <li>→ Momento crítico - fadiga mental</li>
                    <li>→ Force hidratação</li>
                    <li>→ "Ainda consigo eliminar?"</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-primary bg-primary/5">
                  <p className="font-semibold text-sm mb-2">CHECKPOINT FINAL</p>
                  <p className="text-xs text-muted-foreground mb-2">Últimas 45 questões</p>
                  <ul className="space-y-1 text-xs">
                    <li>→ Máxima concentração</li>
                    <li>→ Revisão de marcadas</li>
                    <li>→ Zero questões em branco</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/30">
            <h3 className="font-bold text-xl mb-3">🎯 O Segredo Final</h3>
            <p className="text-sm mb-3">
              O maior segredo não está em saber tudo, mas em <strong>maximizar o que você consegue extrair do pouco que sabe</strong>. 
              Estas estratégias transformam conhecimento limitado em pontuação máxima através de inteligência aplicada.
            </p>
            <p className="text-sm italic">
              "O ENEM não mede apenas o que você sabe. Mede o quão estratégico você é para usar o que sabe. 
              E agora, você é um mestre na arte da guerra intelectual."
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div className="p-3 rounded-lg bg-background">
                <div className="text-2xl font-bold text-primary">15</div>
                <p className="text-xs text-muted-foreground">anos de análise</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <div className="text-2xl font-bold text-primary">3.000+</div>
                <p className="text-xs text-muted-foreground">padrões mapeados</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <div className="text-2xl font-bold text-primary">5.000+</div>
                <p className="text-xs text-muted-foreground">estudantes validados</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}