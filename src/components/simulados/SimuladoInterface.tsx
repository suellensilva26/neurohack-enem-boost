import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Clock, ChevronLeft, ChevronRight, Flag, Pause, Play,
  AlertTriangle, CheckCircle, XCircle, SkipForward,
  BookOpen, Target, Trophy, Home
} from 'lucide-react';
import { SimuladoEnem, QuestaoEnem } from '@/hooks/useEnemAPI';
import { useSimuladoCache, SimuladoProgresso, ResultadoSimulado } from '@/hooks/useSimuladoCache';
import { useAchievementNotifications } from '@/components/notifications/AchievementToast';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ResultadoModal } from './ResultadoModal';

interface SimuladoInterfaceProps {
  simulado: SimuladoEnem;
  onFinalizar: () => void;
}

export const SimuladoInterface = ({ simulado, onFinalizar }: SimuladoInterfaceProps) => {
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>(
    new Array(simulado.questoes.length).fill(null)
  );
  const [tempoRestante, setTempoRestante] = useState(simulado.tempoLimite * 60); // em segundos
  const [pausado, setPausado] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [resultado, setResultado] = useState<ResultadoSimulado | null>(null);
  const [inicioSimulado] = useState(new Date().toISOString());

  const { salvarProgresso, salvarResultado, removerProgresso } = useSimuladoCache();
  const { showAchievement, showStreakMilestone } = useAchievementNotifications();

  // Timer do simulado
  useEffect(() => {
    if (pausado || tempoRestante <= 0) return;

    const timer = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          finalizarSimulado();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pausado, tempoRestante]);

  // Auto-save do progresso
  useEffect(() => {
    const progresso: SimuladoProgresso = {
      simuladoId: simulado.id,
      questaoAtual,
      respostas,
      tempoRestante,
      iniciado: inicioSimulado,
      pausado: pausado ? new Date().toISOString() : undefined
    };

    salvarProgresso(progresso);
  }, [questaoAtual, respostas, tempoRestante, pausado, simulado.id, inicioSimulado, salvarProgresso]);

  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    
    if (horas > 0) {
      return `${horas}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    }
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  };

  const selecionarResposta = (questaoIndex: number, alternativa: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoIndex] = alternativa;
    setRespostas(novasRespostas);
  };

  const proximaQuestao = () => {
    if (questaoAtual < simulado.questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  };

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const irParaQuestao = (index: number) => {
    setQuestaoAtual(index);
  };

  const calcularDesempenho = useCallback(() => {
    const acertos = respostas.reduce((acc, resposta, index) => {
      if (resposta === null) return acc;
      return acc + (resposta === simulado.questoes[index].correctAnswer ? 1 : 0);
    }, 0);

    const total = simulado.questoes.length;
    const nota = Math.round((acertos / total) * 1000);
    const tempoGasto = (simulado.tempoLimite * 60) - tempoRestante;

    // Calcular desempenho por disciplina
    const desempenhoPorDisciplina: { [key: string]: { acertos: number; total: number; percentual: number } } = {};
    
    simulado.questoes.forEach((questao, index) => {
      const disciplina = questao.discipline;
      if (!desempenhoPorDisciplina[disciplina]) {
        desempenhoPorDisciplina[disciplina] = { acertos: 0, total: 0, percentual: 0 };
      }
      
      desempenhoPorDisciplina[disciplina].total++;
      if (respostas[index] === questao.correctAnswer) {
        desempenhoPorDisciplina[disciplina].acertos++;
      }
    });

    // Calcular percentuais
    Object.keys(desempenhoPorDisciplina).forEach(disciplina => {
      const dados = desempenhoPorDisciplina[disciplina];
      dados.percentual = Math.round((dados.acertos / dados.total) * 100);
    });

    const resultado: ResultadoSimulado = {
      id: `resultado_${Date.now()}`,
      simuladoId: simulado.id,
      titulo: simulado.titulo,
      ano: simulado.ano,
      disciplina: simulado.disciplina,
      nota,
      acertos,
      total,
      tempoGasto,
      tempoTotal: simulado.tempoLimite * 60,
      dataRealizacao: new Date().toISOString(),
      respostas,
      questoes: simulado.questoes,
      desempenhoPorDisciplina
    };

    return resultado;
  }, [respostas, simulado, tempoRestante]);

  const finalizarSimulado = () => {
    const resultadoFinal = calcularDesempenho();
    setResultado(resultadoFinal);
    salvarResultado(resultadoFinal);
    removerProgresso(simulado.id);

    // Gamificação - verificar conquistas
    if (resultadoFinal.nota >= 900) {
      showAchievement({
        id: 'high_score',
        name: 'Nota Excelente',
        description: 'Conseguiu mais de 900 pontos!',
        icon: <Trophy className="h-5 w-5" />,
        rarity: 'epic',
        xpReward: 500
      });
    }

    if (resultadoFinal.acertos === resultadoFinal.total) {
      showAchievement({
        id: 'perfect_score',
        name: 'Perfeição Total',
        description: 'Acertou todas as questões!',
        icon: <Target className="h-5 w-5" />,
        rarity: 'legendary',
        xpReward: 1000
      });
    }
  };

  const sairSimulado = () => {
    setShowConfirmExit(true);
  };

  const confirmarSaida = () => {
    // Salvar progresso antes de sair
    const progresso: SimuladoProgresso = {
      simuladoId: simulado.id,
      questaoAtual,
      respostas,
      tempoRestante,
      iniciado: inicioSimulado,
      pausado: new Date().toISOString()
    };
    salvarProgresso(progresso);
    onFinalizar();
  };

  if (resultado) {
    return (
      <ResultadoModal 
        resultado={resultado}
        onClose={onFinalizar}
        onNovoSimulado={onFinalizar}
      />
    );
  }

  const questao = simulado.questoes[questaoAtual];
  const progressoPercentual = ((questaoAtual + 1) / simulado.questoes.length) * 100;
  const questoesRespondidas = respostas.filter(r => r !== null).length;
  const tempoPercentual = ((simulado.tempoLimite * 60 - tempoRestante) / (simulado.tempoLimite * 60)) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={sairSimulado}>
                <Home className="h-4 w-4 mr-2" />
                Sair
              </Button>
              <div>
                <h1 className="font-bold">{simulado.titulo}</h1>
                <p className="text-sm text-muted-foreground">
                  Questão {questaoAtual + 1} de {simulado.questoes.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                tempoRestante < 600 ? 'bg-red-100 text-red-800' : 
                tempoRestante < 1800 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono font-bold">
                  {formatarTempo(tempoRestante)}
                </span>
              </div>

              {/* Controles */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPausado(!pausado)}
              >
                {pausado ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => setShowConfirmFinish(true)}
              >
                <Flag className="h-4 w-4 mr-2" />
                Finalizar
              </Button>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-3 space-y-2">
            <Progress value={progressoPercentual} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{questoesRespondidas} respondidas</span>
              <span>{Math.round(progressoPercentual)}% concluído</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Questão Principal */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Questão {questaoAtual + 1}
                  </CardTitle>
                  <Badge variant="outline">
                    {questao.discipline} • {questao.year}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enunciado */}
                <div className="prose max-w-none">
                  <div 
                    className="text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: questao.enunciado }}
                  />
                </div>

                {/* Imagem se houver */}
                {questao.image && (
                  <div className="flex justify-center">
                    <img 
                      src={questao.image} 
                      alt="Imagem da questão"
                      className="max-w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {/* Alternativas */}
                <RadioGroup
                  value={respostas[questaoAtual]?.toString() || ''}
                  onValueChange={(value) => selecionarResposta(questaoAtual, parseInt(value))}
                >
                  <div className="space-y-3">
                    {questao.alternatives.map((alternativa, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`alt-${index}`}
                          className="mt-1"
                        />
                        <Label 
                          htmlFor={`alt-${index}`}
                          className="flex-1 cursor-pointer text-base leading-relaxed"
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + index)})
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: alternativa }} />
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Navegação */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={questaoAnterior}
                    disabled={questaoAtual === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-2">
                    {respostas[questaoAtual] === null && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={proximaQuestao}
                        disabled={questaoAtual === simulado.questoes.length - 1}
                      >
                        <SkipForward className="h-4 w-4 mr-2" />
                        Pular
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={proximaQuestao}
                    disabled={questaoAtual === simulado.questoes.length - 1}
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Mapa de Questões */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Mapa de Questões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {simulado.questoes.map((_, index) => (
                    <Button
                      key={index}
                      variant={questaoAtual === index ? 'default' : 'outline'}
                      size="sm"
                      className={`h-8 w-8 p-0 text-xs ${
                        respostas[index] !== null ? 'bg-green-100 border-green-300' : ''
                      }`}
                      onClick={() => irParaQuestao(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded" />
                    <span>Atual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded" />
                    <span>Respondida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border rounded" />
                    <span>Não respondida</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progresso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Questões</span>
                    <span>{questoesRespondidas}/{simulado.questoes.length}</span>
                  </div>
                  <Progress value={(questoesRespondidas / simulado.questoes.length) * 100} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tempo</span>
                    <span>{Math.round(tempoPercentual)}%</span>
                  </div>
                  <Progress value={tempoPercentual} />
                </div>

                <div className="text-center pt-2">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((questoesRespondidas / simulado.questoes.length) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Concluído</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs de Confirmação */}
      <ConfirmDialog
        open={showConfirmFinish}
        onClose={() => setShowConfirmFinish(false)}
        onConfirm={() => {
          setShowConfirmFinish(false);
          finalizarSimulado();
        }}
        title="Finalizar Simulado"
        description={`Você respondeu ${questoesRespondidas} de ${simulado.questoes.length} questões. Deseja realmente finalizar o simulado?`}
        confirmText="Finalizar"
        cancelText="Continuar"
      />

      <ConfirmDialog
        open={showConfirmExit}
        onClose={() => setShowConfirmExit(false)}
        onConfirm={confirmarSaida}
        title="Sair do Simulado"
        description="Seu progresso será salvo e você poderá continuar depois. Deseja sair?"
        confirmText="Sair"
        cancelText="Continuar"
      />
    </div>
  );
};