import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle2, Brain } from "lucide-react";

const CRONOGRAMA = {
  dia1: {
    titulo: "Dia 1: Dominar a Estrutura",
    objetivo: "Internalizar a arquitetura da redação",
    tarefas: [
      { id: "d1-1", texto: "Desenhar o esquema visual dos 4 parágrafos (7-8 linhas cada)" },
      { id: "d1-2", texto: "Memorizar a função de cada parágrafo (Intro, D1, D2, Conclusão)" },
      { id: "d1-3", texto: "Escrever 3 introduções diferentes usando a fórmula coringa" },
      { id: "d1-4", texto: "Praticar conectores entre parágrafos 10 vezes" },
      { id: "d1-5", texto: "Fazer quiz: identificar estrutura em redações exemplo" }
    ]
  },
  dia2: {
    titulo: "Dia 2: Memorizar Repertórios",
    objetivo: "Fixar os 12 repertórios universais",
    tarefas: [
      { id: "d2-1", texto: "Criar flashcards com os 12 repertórios (autor + ideia central)" },
      { id: "d2-2", texto: "Associar cada repertório a 3 temas diferentes" },
      { id: "d2-3", texto: "Escrever 1 parágrafo de desenvolvimento usando cada repertório" },
      { id: "d2-4", texto: "Testar: dado um tema aleatório, listar 3 repertórios aplicáveis" },
      { id: "d2-5", texto: "Revisar repertórios antes de dormir (consolidação da memória)" }
    ]
  },
  dia3: {
    titulo: "Dia 3: Automatizar a Escrita",
    objetivo: "Escrever redações completas no tempo",
    tarefas: [
      { id: "d3-1", texto: "Redação 1: 50 minutos (sem pressão)" },
      { id: "d3-2", texto: "Revisar erros estruturais e de repertório" },
      { id: "d3-3", texto: "Redação 2: 45 minutos (tempo de prova)" },
      { id: "d3-4", texto: "Redação 3: 40 minutos (desafio)" },
      { id: "d3-5", texto: "Fazer checklist final: estrutura + repertórios + proposta" }
    ]
  }
};

export function MemorizacaoTresDias() {
  const [tarefasCompletas, setTarefasCompletas] = useState<string[]>(() => {
    const saved = localStorage.getItem("memoriza-tarefas");
    return saved ? JSON.parse(saved) : [];
  });

  const [diaAtivo, setDiaAtivo] = useState<keyof typeof CRONOGRAMA>("dia1");

  const toggleTarefa = (id: string) => {
    const novas = tarefasCompletas.includes(id)
      ? tarefasCompletas.filter(t => t !== id)
      : [...tarefasCompletas, id];
    
    setTarefasCompletas(novas);
    localStorage.setItem("memoriza-tarefas", JSON.stringify(novas));
  };

  const totalTarefas = Object.values(CRONOGRAMA).reduce((sum, dia) => sum + dia.tarefas.length, 0);
  const progresso = (tarefasCompletas.length / totalTarefas) * 100;

  const tarefasDia = CRONOGRAMA[diaAtivo].tarefas;
  const completasDia = tarefasDia.filter(t => tarefasCompletas.includes(t.id)).length;

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          Sistema de Memorização em 3 Dias
        </h3>
        <p className="text-muted-foreground">
          Baseado em estudos de neurociência sobre consolidação de memória. Este método garante que você 
          internalize estrutura, repertórios e timing em apenas 72 horas antes da prova.
        </p>
      </Card>

      {/* Progresso Geral */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progresso Total</span>
          <span className="text-sm font-bold text-primary">{Math.round(progresso)}%</span>
        </div>
        <Progress value={progresso} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {tarefasCompletas.length} de {totalTarefas} tarefas concluídas
        </p>
      </Card>

      {/* Seletor de Dia */}
      <div className="grid grid-cols-3 gap-4">
        {(Object.keys(CRONOGRAMA) as Array<keyof typeof CRONOGRAMA>).map((dia, idx) => {
          const info = CRONOGRAMA[dia];
          const tarefas = info.tarefas;
          const completas = tarefas.filter(t => tarefasCompletas.includes(t.id)).length;
          const todoCompleto = completas === tarefas.length;

          return (
            <Button
              key={dia}
              variant={diaAtivo === dia ? "default" : "outline"}
              onClick={() => setDiaAtivo(dia)}
              className="h-auto py-4 relative"
            >
              <div className="text-left w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Dia {idx + 1}</span>
                  {todoCompleto && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                </div>
                <div className="text-xs opacity-90">{completas}/{tarefas.length} tarefas</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Detalhes do Dia */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-6">
          <Calendar className="h-6 w-6 text-primary mt-1" />
          <div>
            <h4 className="text-xl font-bold text-foreground">{CRONOGRAMA[diaAtivo].titulo}</h4>
            <p className="text-sm text-muted-foreground mt-1">{CRONOGRAMA[diaAtivo].objetivo}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between p-3 rounded-lg bg-secondary">
          <span className="text-sm font-medium text-foreground">Progresso do Dia</span>
          <span className="text-lg font-bold text-primary">{completasDia}/{tarefasDia.length}</span>
        </div>

        <div className="space-y-3">
          {tarefasDia.map((tarefa, idx) => (
            <div
              key={tarefa.id}
              className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <Checkbox
                checked={tarefasCompletas.includes(tarefa.id)}
                onCheckedChange={() => toggleTarefa(tarefa.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <span className={`text-sm ${tarefasCompletas.includes(tarefa.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  <strong>{idx + 1}.</strong> {tarefa.texto}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Dicas por Dia */}
      <Card className="p-4 bg-blue-500/10 border-blue-500/30">
        <h5 className="font-semibold mb-2 text-foreground">💡 Dica para o {CRONOGRAMA[diaAtivo].titulo.split(':')[0]}</h5>
        {diaAtivo === "dia1" && (
          <p className="text-sm text-muted-foreground">
            Não tente memorizar exemplos completos. Foque em entender a LÓGICA da estrutura. 
            Use papel e desenhe os 4 blocos várias vezes. A repetição visual é mais eficiente que leitura.
          </p>
        )}
        {diaAtivo === "dia2" && (
          <p className="text-sm text-muted-foreground">
            Não decore frases prontas! Entenda a IDEIA CENTRAL de cada repertório. 
            Pratique reformular com suas próprias palavras. Isso evita "decoreba" detectável pelos corretores.
          </p>
        )}
        {diaAtivo === "dia3" && (
          <p className="text-sm text-muted-foreground">
            Foque em VELOCIDADE, não perfeição. É melhor terminar com pequenos erros que deixar incompleto. 
            Reserve sempre 5 minutos finais para revisar erros básicos (ortografia, concordância).
          </p>
        )}
      </Card>

      {/* Alerta Final */}
      {progresso === 100 && (
        <Card className="p-4 bg-green-500/10 border-green-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-foreground">Parabéns! Você completou o sistema de 3 dias!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Você está preparado(a). No dia da prova, confie no seu treinamento e aplique o que memorizou.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
