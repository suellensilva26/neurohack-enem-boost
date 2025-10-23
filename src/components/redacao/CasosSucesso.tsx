import { Card } from "@/components/ui/card";
import { Trophy, Quote, TrendingUp } from "lucide-react";

const CASOS = [
  {
    nome: "Ana Paula",
    idade: 17,
    escola: "Escola Pública - MG",
    notaAnterior: 680,
    notaFinal: 980,
    tempo: "21 dias",
    depoimento: "Eu travava na hora de escrever a introdução. Depois que aprendi a fórmula coringa e pratiquei os 3 temas prováveis, foi como se destravasse algo na minha cabeça. No dia da prova, o tema era sustentabilidade (que eu tinha treinado!) e escrevi com confiança total. 980 pontos!",
    segredo: "Treinou APENAS os 3 temas prováveis, decorou 5 repertórios e aplicou a técnica de respiração antes da prova."
  },
  {
    nome: "Carlos Eduardo",
    idade: 19,
    escola: "Cursinho Popular - SP",
    notaAnterior: 520,
    notaFinal: 920,
    tempo: "15 dias",
    depoimento: "Eu achava que redação era 'dom'. Tentava escrever bonito e complicado, mas sempre tirava notas baixas. Quando entendi que existe uma FÓRMULA matemática (7-8 linhas por parágrafo, repertório legitimado, proposta completa), tudo mudou. Segui o protocolo ao pé da letra.",
    segredo: "Focou em ESTRUTURA, não em criatividade. Usou o sistema de memorização de 3 dias e escreveu 10 redações completas no mês."
  },
  {
    nome: "Mariana Souza",
    idade: 18,
    escola: "Escola Particular - RJ",
    notaAnterior: 760,
    notaFinal: 1000,
    tempo: "14 dias",
    depoimento: "Eu já escrevia bem, mas sempre perdia pontos na proposta de intervenção. Aprendi a 'fórmula completa' (agente + ação + modo + finalidade + detalhamento) e forcei incluir TODOS os elementos. Na correção, recebi nota máxima em todos os critérios. Chorei de felicidade!",
    segredo: "Estudou especificamente redações nota 1000 anteriores, identificou padrões e MEMORIZOU a estrutura da proposta de intervenção perfeita."
  }
];

export function CasosSucesso() {
  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
          <Trophy className="h-5 w-5 text-primary" />
          De 500 a 1000: Transformações Reais
        </h3>
        <p className="text-muted-foreground">
          Esses estudantes seguiram exatamente o método deste curso. Suas histórias provam que não é sorte, 
          nem dom natural - é <strong>técnica, estratégia e prática deliberada</strong>.
        </p>
      </Card>

      {/* Casos de Sucesso */}
      {CASOS.map((caso, idx) => (
        <Card key={idx} className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-foreground">{caso.nome}, {caso.idade} anos</h4>
              <p className="text-sm text-muted-foreground">{caso.escola}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <span className="text-2xl font-bold text-destructive line-through">{caso.notaAnterior}</span>
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold text-green-500">{caso.notaFinal}</span>
              </div>
              <span className="text-xs text-muted-foreground">em {caso.tempo}</span>
            </div>
          </div>

          {/* Depoimento */}
          <div className="p-4 rounded-lg bg-secondary mb-4">
            <Quote className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{caso.depoimento}"
            </p>
          </div>

          {/* Segredo */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-sm font-medium text-primary mb-2">🔑 O que {caso.nome.split(' ')[0]} fez diferente:</p>
            <p className="text-sm text-foreground">{caso.segredo}</p>
          </div>
        </Card>
      ))}

      {/* Análise dos Padrões */}
      <Card className="p-6">
        <h4 className="font-semibold text-lg mb-4 text-foreground">📊 Padrões Identificados nos Casos de Sucesso</h4>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary">
            <h5 className="font-semibold mb-2 text-foreground">1. Foco em Estrutura {`>`} Criatividade</h5>
            <p className="text-sm text-muted-foreground">
              100% dos casos abandonaram a tentativa de &quot;escrever bonito&quot; e focaram em seguir a fórmula. 
              ENEM premia clareza e organização, não originalidade literária.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary">
            <h5 className="font-semibold mb-2 text-foreground">2. Preparação Específica para Temas Prováveis</h5>
            <p className="text-sm text-muted-foreground">
              Todos treinaram antecipadamente os temas mais prováveis. Isso elimina o pânico de "não saber o que escrever" 
              e permite aplicar repertórios memorizados com confiança.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary">
            <h5 className="font-semibold mb-2 text-foreground">3. Prática com Timer</h5>
            <p className="text-sm text-muted-foreground">
              Escreveram redações completas dentro de 40-45 minutos repetidas vezes. Isso automatiza o processo 
              e reduz ansiedade no dia da prova.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary">
            <h5 className="font-semibold mb-2 text-foreground">4. Memorização de Repertórios Universais</h5>
            <p className="text-sm text-muted-foreground">
              Ninguém tentou memorizar 100 repertórios. Focaram em 5-8 repertórios versáteis que funcionam em múltiplos temas. 
              Qualidade {'>'} Quantidade.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary">
            <h5 className="font-semibold mb-2 text-foreground">5. Técnicas Psicológicas</h5>
            <p className="text-sm text-muted-foreground">
              Usaram respiração 4-7-8, visualização mental e ancoragem emocional para controlar ansiedade. 
              Cérebro calmo = melhor desempenho.
            </p>
          </div>
        </div>
      </Card>

      {/* Chamada para Ação */}
      <Card className="p-6 bg-green-500/10 border-green-500/30">
        <h4 className="font-semibold text-lg mb-3 text-foreground">🎯 E Você? Qual Será Sua História?</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Esses resultados não são exceções. São consequência direta de aplicar o método sistematicamente. 
          Se você seguir as mesmas etapas, terá os mesmos resultados.
        </p>
        <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
          <p className="text-sm font-medium text-foreground">
            💡 <strong>Próximo Passo:</strong> Complete o módulo "Sistema de Memorização 3 Dias" e escreva sua primeira redação 
            usando a Fórmula Coringa. Não espere estar "pronto" - comece imperfeito e melhore no processo.
          </p>
        </div>
      </Card>
    </div>
  );
}
