import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Target, Trophy } from 'lucide-react';
import { SimuladoEnem } from '@/hooks/useEnemAPI';
import { useSimuladoCache } from '@/hooks/useSimuladoCache';
import * as logger from '@/utils/logger';

export const SimuladoInterface = ({
  simulado,
  onFinalizar,
}: {
  simulado: SimuladoEnem;
  onFinalizar: () => void;
}) => {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>(() => new Array(simulado.questoes.length).fill(-1));
  const [tempoRestante, setTempoRestante] = useState(simulado.tempoLimite * 60);
  const [finalizado, setFinalizado] = useState(false);

  const { salvarResultado, salvarProgresso, limparProgresso } = useSimuladoCache();

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalizar();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Salva progresso a cada interação relevante
    try {
      salvarProgresso(simulado.id, {
        questaoAtual: indice,
        respostas,
        tempoRestante,
      });
    } catch (err) {
      logger.error('Falha ao salvar progresso', err);
    }
  }, [indice, respostas, tempoRestante, simulado.id, salvarProgresso]);

  const atual = simulado.questoes[indice];
  const progresso = useMemo(() => ((indice + 1) / simulado.questoes.length) * 100, [indice, simulado.questoes.length]);

  const selecionar = (i: number) => {
    const nova = [...respostas];
    nova[indice] = i;
    setRespostas(nova);
  };

  const proxima = () => {
    if (indice < simulado.questoes.length - 1) setIndice(indice + 1);
  };

  const anterior = () => {
    if (indice > 0) setIndice(indice - 1);
  };

  const handleFinalizar = () => {
    if (finalizado) return;
    setFinalizado(true);
    try {
      const acertos = respostas.reduce((acc, r, idx) => acc + (r === simulado.questoes[idx]?.correctAnswer ? 1 : 0), 0);
      const percentual = Math.round((acertos / simulado.questoes.length) * 100);
      const tempoGastoMin = Math.round((simulado.tempoLimite * 60 - tempoRestante) / 60);
      salvarResultado({
        id: simulado.id,
        titulo: simulado.titulo,
        ano: simulado.ano,
        disciplina: simulado.disciplina,
        tipo: simulado.tipo,
        totalQuestoes: simulado.questoes.length,
        acertos,
        percentual,
        tempoGastoMin,
        dataISO: new Date().toISOString(),
      });
      limparProgresso(simulado.id);
    } catch (err) {
      logger.error('Erro ao finalizar simulado', err);
    }
    onFinalizar();
  };

  if (finalizado) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Simulado ENEM</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="secondary">{simulado.titulo}</Badge>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{Math.floor(tempoRestante / 60)}min</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Progress value={progresso} className="mb-6" />

        <Card className="card-premium">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                <span>
                  Questão {indice + 1} de {simulado.questoes.length}
                </span>
              </div>
              <Badge>{simulado.disciplina ? simulado.disciplina : 'Geral'}</Badge>
            </div>

            <div className="text-lg whitespace-pre-wrap">{atual?.enunciado || atual?.context || ''}</div>

            <div className="space-y-3">
              {atual?.alternatives?.map((alt: string, i: number) => (
                <button
                  key={i}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    respostas[indice] === i ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/40'
                  }`}
                  onClick={() => selecionar(i)}
                >
                  {alt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                {respostas.filter((r) => r !== -1).length}/{simulado.questoes.length} respondidas
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={anterior} disabled={indice === 0}>
                  Anterior
                </Button>
                {indice < simulado.questoes.length - 1 ? (
                  <Button onClick={proxima}>Próxima</Button>
                ) : (
                  <Button className="btn-premium" onClick={handleFinalizar}>Finalizar Simulado</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};