import { Card } from "@/components/ui/card";
import { Brain, Heart, Shield, Zap } from "lucide-react";

export function TecnicasPsicologicas() {
  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 text-foreground">
          Controle Mental: Técnicas para Maximizar Performance
        </h3>
        <p className="text-muted-foreground">
          Técnicas validadas por psicólogos esportivos e neurocientistas para gerenciar ansiedade, 
          manter foco e otimizar desempenho sob pressão.
        </p>
      </Card>

      {/* Técnica 1: Respiração 4-7-8 */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">1. Respiração 4-7-8 (Dr. Andrew Weil)</h4>
            <p className="text-sm text-muted-foreground">Para controlar ansiedade antes e durante a prova</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-secondary">
            <p className="font-medium mb-2 text-foreground">Como fazer:</p>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li><strong>1.</strong> Inspire pelo nariz contando até 4</li>
              <li><strong>2.</strong> Segure o ar contando até 7</li>
              <li><strong>3.</strong> Expire pela boca contando até 8</li>
              <li><strong>4.</strong> Repita 4 ciclos</li>
            </ol>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-foreground">
              <strong>Quando usar:</strong> Antes de entrar na sala de prova, ao ler o tema (para processar com calma), 
              se sentir branco durante a redação.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-foreground">
              <strong>Ciência:</strong> Ativa o sistema nervoso parassimpático, reduzindo cortisol (hormônio do estresse) 
              e aumentando oxigenação cerebral. Efeito em 2-3 minutos.
            </p>
          </div>
        </div>
      </Card>

      {/* Técnica 2: Ancoragem Emocional */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">2. Ancoragem Emocional (PNL)</h4>
            <p className="text-sm text-muted-foreground">Gatilho mental para acessar estado de confiança</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-secondary">
            <p className="font-medium mb-2 text-foreground">Criando sua âncora (faça ANTES do dia da prova):</p>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li><strong>1.</strong> Lembre-se de um momento em que você se sentiu extremamente confiante (aprovação, vitória, elogio)</li>
              <li><strong>2.</strong> Reviva essa memória intensamente: visualize detalhes, sons, sensações físicas</li>
              <li><strong>3.</strong> No auge da emoção positiva, pressione seu pulso esquerdo com 3 dedos por 10 segundos</li>
              <li><strong>4.</strong> Repita esse processo 5 vezes em dias diferentes</li>
            </ol>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-foreground">
              <strong>Quando usar:</strong> No dia da prova, antes de começar a redação, pressione o mesmo ponto. 
              Seu cérebro recriará o estado emocional de confiança automaticamente.
            </p>
          </div>
        </div>
      </Card>

      {/* Técnica 3: Visualização Detalhada */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">3. Visualização Mental de Sucesso</h4>
            <p className="text-sm text-muted-foreground">Técnica usada por atletas olímpicos</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-secondary">
            <p className="font-medium mb-2 text-foreground">Roteiro de visualização (pratique 5 min/dia por 1 semana antes da prova):</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Cena 1:</strong> Você entra na sala de prova calmo(a), encontra sua carteira, respira fundo.</p>
              <p><strong>Cena 2:</strong> Recebe o caderno, lê o tema com tranquilidade, imediatamente lembra de 2-3 repertórios.</p>
              <p><strong>Cena 3:</strong> Escreve fluidamente, respeitando a estrutura, confiante em cada parágrafo.</p>
              <p><strong>Cena 4:</strong> Revisa a redação, encontra pequenos ajustes, termina 5 minutos antes do fim.</p>
              <p><strong>Cena 5:</strong> Entrega a prova satisfeito(a), saindo com sensação de dever cumprido.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-foreground">
              <strong>Ciência:</strong> Neurônios-espelho: o cérebro não distingue perfeitamente entre experiência real e vividamente imaginada. 
              Você está literalmente treinando seu cérebro para o sucesso.
            </p>
          </div>
        </div>
      </Card>

      {/* Técnica 4: Protocolo Anti-Branco */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">4. Protocolo Anti-Branco</h4>
            <p className="text-sm text-muted-foreground">Se você "der branco" durante a prova</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="font-medium mb-2 text-destructive">⚠️ NUNCA faça isso:</p>
            <ul className="space-y-1 text-sm text-destructive">
              <li>• Entrar em pânico e pensar "não vou conseguir"</li>
              <li>• Ficar olhando para a folha em branco</li>
              <li>• Tentar forçar ideias</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="font-medium mb-2 text-foreground">✅ FAÇA isso (nesta ordem):</p>
            <ol className="space-y-2 text-sm text-foreground">
              <li><strong>1.</strong> Pare completamente. Feche os olhos. Faça 1 ciclo de respiração 4-7-8.</li>
              <li><strong>2.</strong> Releia o tema LENTAMENTE, circulando palavras-chave.</li>
              <li><strong>3.</strong> Não tente escrever a introdução ainda. Anote no rascunho apenas: 2 argumentos possíveis + 1 repertório para cada.</li>
              <li><strong>4.</strong> Escolha o argumento mais fácil de desenvolver e comece pelo DESENVOLVIMENTO 1 (não pela introdução).</li>
              <li><strong>5.</strong> Depois de escrever D1, volte e escreva a introdução (ficará mais fácil).</li>
            </ol>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-foreground">
              <strong>Lógica:</strong> Branco é bloqueio da memória de trabalho por excesso de cortisol. 
              Começar pelo desenvolvimento "destrava" o cérebro porque é tarefa mais concreta. 
              A introdução genérica fica mais fácil depois.
            </p>
          </div>
        </div>
      </Card>

      {/* Dicas Extras */}
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
        <h5 className="font-semibold mb-3 text-foreground">💡 Dicas Extras de Mindset</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>Antes da prova:</strong> Evite cafeína em excesso (aumenta ansiedade). Prefira chá verde ou água.</li>
          <li>• <strong>Noite anterior:</strong> NÃO estude até tarde. Priorize 7-8h de sono de qualidade.</li>
          <li>• <strong>Durante a prova:</strong> Se outros terminarem antes, ignore. Cada pessoa tem seu ritmo.</li>
          <li>• <strong>Diálogo interno:</strong> Substitua "E se eu errar?" por "Eu me preparei. Vou fazer meu melhor."</li>
        </ul>
      </Card>
    </div>
  );
}
