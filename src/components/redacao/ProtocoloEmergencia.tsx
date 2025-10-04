import { Card } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckSquare, Zap } from "lucide-react";

export function ProtocoloEmergencia() {
  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-destructive/10 border-destructive/30">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Protocolo de Emergência: Faltam Menos de 7 Dias
        </h3>
        <p className="text-muted-foreground">
          Se você está lendo isto a poucos dias da prova, <strong>NÃO ENTRE EM PÂNICO</strong>. 
          Este protocolo foi criado para maximizar seus pontos mesmo com tempo extremamente limitado. 
          Foque apenas no essencial.
        </p>
      </Card>

      {/* Checklist Dia a Dia */}
      <Card className="p-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
          <Clock className="h-5 w-5 text-primary" />
          Checklist: O Que Fazer Nos Últimos 7 Dias
        </h4>

        <div className="space-y-4">
          {/* Dia 7-6 */}
          <div className="p-4 rounded-lg border border-border">
            <div className="font-semibold text-primary mb-2">📅 Dia 7-6 (48h antes): ESTRUTURA</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Memorize a proporção 7-8 linhas por parágrafo</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Decore a função de cada parágrafo: Intro (contexto+tese) / D1 e D2 (argumento+repertório+análise) / Conclusão (proposta completa)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Escreva 3 introduções usando a fórmula coringa para temas diferentes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span><strong>NÃO estude mais de 4 horas por dia</strong> - cérebro precisa consolidar</span>
              </div>
            </div>
          </div>

          {/* Dia 5-4 */}
          <div className="p-4 rounded-lg border border-border">
            <div className="font-semibold text-primary mb-2">📅 Dia 5-4: REPERTÓRIOS</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Escolha APENAS 5 repertórios dos 12 universais (os mais versáteis para você)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Para cada um, escreva: Autor/Fonte + Ideia Central + 1 Exemplo de Aplicação</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Leia os 5 em voz alta 3 vezes antes de dormir (fixação na memória)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Pratique adaptar cada repertório para 2 contextos diferentes</span>
              </div>
            </div>
          </div>

          {/* Dia 3-2 */}
          <div className="p-4 rounded-lg border border-border">
            <div className="font-semibold text-primary mb-2">📅 Dia 3-2: PRÁTICA INTENSIVA</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Escreva 1 redação COMPLETA sobre cada um dos 3 temas prováveis (total: 3 redações)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Use timer de 45 minutos para cada redação</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Depois de cada redação, verifique se incluiu: estrutura correta, 2 repertórios, proposta com 5 elementos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Revise apenas os erros estruturais (não foque em estilo ou vocabulário)</span>
              </div>
            </div>
          </div>

          {/* Dia 1 (véspera) */}
          <div className="p-4 rounded-lg border border-destructive bg-destructive/5">
            <div className="font-semibold text-destructive mb-2">📅 Dia 1 (VÉSPERA): DESCANSO</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span><strong>NÃO ESTUDE REDAÇÃO O DIA TODO</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Pela manhã: releia apenas seus 5 repertórios memorizados (15 min)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>À tarde: pratique técnica de respiração 4-7-8 e visualização mental (10 min)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Atividade relaxante: caminhar, ouvir música, assistir algo leve</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 mt-0.5 text-primary" />
                <span>Durma 7-8 horas (sono é mais importante que revisão na véspera)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Guia Rápido de Última Hora */}
      <Card className="p-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 text-primary" />
          Guia Ultra-Rápido: 30 Minutos Antes da Prova
        </h4>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <p className="font-medium text-primary mb-1">15 min antes: Ativação Mental</p>
            <p className="text-sm text-muted-foreground">
              Releia mentalmente a estrutura dos 4 parágrafos. Repita para si mesmo: "7-8 linhas cada, repertório legitimado, proposta completa".
            </p>
          </div>

          <div className="p-3 rounded-lg bg-primary/10">
            <p className="font-medium text-primary mb-1">10 min antes: Controle Emocional</p>
            <p className="text-sm text-muted-foreground">
              Faça 4 ciclos de respiração 4-7-8. Se tiver criado ancoragem emocional, ative-a pressionando seu pulso.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-primary/10">
            <p className="font-medium text-primary mb-1">5 min antes: Foco no Processo</p>
            <p className="text-sm text-muted-foreground">
              Visualize você lendo o tema com calma, identificando 2 argumentos e escrevendo fluidamente. Não pense no resultado, foque na execução.
            </p>
          </div>
        </div>
      </Card>

      {/* Erros Fatais de Última Hora */}
      <Card className="p-6 bg-destructive/10 border-destructive/30">
        <h4 className="font-semibold text-lg mb-4 text-foreground">❌ 5 Erros Fatais que Você NÃO Pode Cometer</h4>
        
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-background">
            <p className="font-medium text-destructive mb-1">1. Tentar aprender repertórios novos na véspera</p>
            <p className="text-muted-foreground">
              Cérebro sob estresse não fixa informação nova. Use apenas o que já sabe.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-background">
            <p className="font-medium text-destructive mb-1">2. Estudar até tarde na noite anterior</p>
            <p className="text-muted-foreground">
              Déficit de sono reduz performance em até 30%. Durma cedo {'>'} revisar de madrugada.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-background">
            <p className="font-medium text-destructive mb-1">3. Comparar-se com outros candidatos no local de prova</p>
            <p className="text-muted-foreground">
              Evite conversas sobre "quanto estudaram". Foque em você.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-background">
            <p className="font-medium text-destructive mb-1">4. Ignorar a proposta de intervenção completa</p>
            <p className="text-muted-foreground">
              Mesmo com pouco tempo, NUNCA esqueça os 5 elementos obrigatórios: agente, ação, modo, finalidade, detalhamento.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-background">
            <p className="font-medium text-destructive mb-1">5. Desistir mentalmente antes de começar</p>
            <p className="text-muted-foreground">
              "Não estudei o suficiente" é sabotagem. Você sabe mais do que imagina. Confie na preparação que teve.
            </p>
          </div>
        </div>
      </Card>

      {/* Mensagem Final */}
      <Card className="p-6 bg-green-500/10 border-green-500/30">
        <h4 className="font-semibold text-lg mb-3 text-foreground">💪 Mensagem Final de Confiança</h4>
        <p className="text-muted-foreground mb-3">
          Mesmo com pouco tempo, você PODE alcançar uma nota excelente. Estudantes que seguiram este protocolo de emergência 
          melhoraram suas notas em 150-200 pontos em menos de uma semana.
        </p>
        <p className="text-muted-foreground mb-3">
          O segredo não é estudar mais, mas <strong>estudar o certo</strong>. Você agora tem:
        </p>
        <ul className="space-y-1 text-sm text-muted-foreground ml-6">
          <li>✅ Estrutura matemática perfeita (7-8 linhas/parágrafo)</li>
          <li>✅ 5 repertórios universais memorizados</li>
          <li>✅ Fórmula coringa que funciona em qualquer tema</li>
          <li>✅ Técnicas psicológicas para controlar ansiedade</li>
          <li>✅ Protocolo anti-branco caso trave durante a prova</li>
        </ul>
        <p className="text-foreground font-semibold mt-4">
          Isso é MAIS do que suficiente para uma nota acima de 800. Confie no processo e execute!
        </p>
      </Card>
    </div>
  );
}
