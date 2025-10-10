import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy } from 'lucide-react';
import MarkdownContent from '@/components/MarkdownContent';
import { SimuladoEnem } from '@/hooks/useEnemAPI';
import { useSimuladoCache } from '@/hooks/useSimuladoCache';
import { useFreemiumLimits } from '@/hooks/useFreemiumLimits';

interface Props {
  simulado: SimuladoEnem;
  onFinalizar: () => void;
}

export const SimuladoInterface = ({ simulado, onFinalizar }: Props) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [startTime] = useState(Date.now());
  const [remaining, setRemaining] = useState(simulado.tempoLimite);
  const total = simulado.totalQuestoes;
  const { salvarResultado, salvarProgresso } = useSimuladoCache();
  const { incrementarSimulados } = useFreemiumLimits();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    salvarProgresso(simulado.id, {
      questaoAtual: index,
      tempoRestante: remaining,
      finalizado: false,
    });
  }, [index, remaining, simulado.id, salvarProgresso]);

  const progress = useMemo(() => Math.round(((index + 1) / total) * 100), [index, total]);

  const handleSelect = (altIndex: number) => {
    setAnswers((prev) => ({ ...prev, [index]: altIndex }));
  };

  const next = () => {
    if (index < total - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const finalizar = async () => {
    const elapsedMin = Math.ceil((Date.now() - startTime) / 60000);
    const acertos = simulado.questoes.reduce((acc, q, i) => {
      const a = answers[i];
      return acc + (a === q.correctAnswer ? 1 : 0);
    }, 0);
    const porcentagem = Math.round((acertos * 100) / total);

    salvarResultado({
      id: `res_${Date.now()}`,
      simuladoId: simulado.id,
      titulo: simulado.titulo,
      ano: simulado.ano,
      disciplina: simulado.disciplina,
      totalQuestoes: total,
      acertos,
      erros: total - acertos,
      porcentagem,
      tempoGastoMinutos: elapsedMin,
      data: new Date().toISOString(),
    });

    await incrementarSimulados();
    onFinalizar();
  };

  const q = simulado.questoes[index];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{simulado.titulo}</h2>
          <p className="text-muted-foreground">{total} questões • {simulado.tempoLimite} min</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Clock className="h-4 w-4 mr-1" /> {remaining} min
        </Badge>
      </div>

      <Progress value={progress} />

      <Card>
        <CardHeader>
          <CardTitle>
            {(() => {
              const numero = simulado.questoes[index]?.numero ?? (index + 1);
              const ano = simulado.questoes[index]?.year ?? simulado.ano;
              const numeroStr = String(numero).padStart(2, '0');
              return `${numeroStr}/${ano}`;
            })()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MarkdownContent content={q.enunciado} />
          <div className="space-y-2">
            {q.alternatives.map((alt, i) => (
              <Button
                key={i}
                variant={answers[index] === i ? 'default' : 'outline'}
                className="w-full justify-start text-left"
                onClick={() => handleSelect(i)}
              >
                <span className="mr-2">{String.fromCharCode(65 + i)}.</span>
                <MarkdownContent content={String(alt)} inline />
              </Button>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={prev} disabled={index === 0}>Anterior</Button>
            {index === total - 1 ? (
              <Button onClick={finalizar} className="ml-auto">
                <Trophy className="h-4 w-4 mr-2" /> Finalizar
              </Button>
            ) : (
              <Button onClick={next} className="ml-auto">Próxima</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};