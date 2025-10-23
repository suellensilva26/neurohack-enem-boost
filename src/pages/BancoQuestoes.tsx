import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress"; // removido: não utilizado
import { 
  CheckCircle, XCircle, Clock, BarChart3
} from "lucide-react";
// import { useNavigate } from "react-router-dom"; // removido: não utilizado
import { useEnemAPI } from "@/hooks/useEnemAPI";
import { InstallBanner } from "@/components/InstallBanner";
import { toast } from "sonner";

const DISCIPLINAS_LABELS: Record<string, string> = {
  "matematica": "Matemática",
  "ciencias-natureza": "Ciências da Natureza",
  "ciencias-humanas": "Ciências Humanas",
  "linguagens": "Linguagens",
};

export default function BancoQuestoes() {
  // const navigate = useNavigate(); // removido: não utilizado
  const { loading, error, questoes, buscarQuestoes, listarAnos, listarDisciplinas } = useEnemAPI();

  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  // Filtros API
  const [anosDisponiveis, setAnosDisponiveis] = useState<number[]>([]);
  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState<string[]>([]);
  const [filtros, setFiltros] = useState({
    ano: undefined as number | undefined,
    disciplina: undefined as string | undefined,
    limite: 20 as number
  });

  // Timer
  const TEMPO_PADRAO_SEGUNDOS = 120; // 2 minutos por questão
  const [tempoRestante, setTempoRestante] = useState<number>(TEMPO_PADRAO_SEGUNDOS);

  // Carregar metadados e questões iniciais
  useEffect(() => {
    const init = async () => {
      const anos = await listarAnos();
      const disciplinas = await listarDisciplinas();
      setAnosDisponiveis(anos);
      setDisciplinasDisponiveis(disciplinas);

      const anoDefault = anos?.[0];
      const disciplinaDefault = disciplinas?.[0];
      setFiltros(prev => ({ ...prev, ano: anoDefault, disciplina: disciplinaDefault }));

      await buscarQuestoes({ year: anoDefault, discipline: disciplinaDefault, limit: filtros.limite });
      setQuestaoAtual(0);
      setTempoRestante(TEMPO_PADRAO_SEGUNDOS);
      setRespostaSelecionada(null);
      setMostrarResposta(false);
      setAcertos(0);
      setErros(0);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer para questão
  useEffect(() => {
    if (tempoRestante > 0 && !mostrarResposta) {
      const timer = setTimeout(() => setTempoRestante((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tempoRestante === 0 && !mostrarResposta) {
      setErros((e) => e + 1);
      setMostrarResposta(true);
    }
  }, [tempoRestante, mostrarResposta]);

  const carregarQuestoes = async () => {
    await buscarQuestoes({
      year: filtros.ano,
      discipline: filtros.disciplina,
      limit: filtros.limite
    });
    setQuestaoAtual(0);
    setTempoRestante(TEMPO_PADRAO_SEGUNDOS);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
    setAcertos(0);
    setErros(0);
  };

  const responderQuestao = () => {
    if (respostaSelecionada === null) return;
    const questao = questoes[questaoAtual];
    if (!questao) return;

    if (respostaSelecionada === questao.correctAnswer) {
      setAcertos((a) => a + 1);
    } else {
      setErros((e) => e + 1);
    }
    setMostrarResposta(true);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      const novoIndex = questaoAtual + 1;
      setQuestaoAtual(novoIndex);
      setRespostaSelecionada(null);
      setMostrarResposta(false);
      setTempoRestante(TEMPO_PADRAO_SEGUNDOS);
    } else {
      const totalAcertos = acertos + (respostaSelecionada === questoes[questaoAtual]?.correctAnswer ? 1 : 0);
      toast.success("Sessão finalizada!", {
        description: `Acertos: ${totalAcertos}, Erros: ${erros}`,
      });
    }
  };

  const reiniciarSessao = () => {
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
    setAcertos(0);
    setErros(0);
    setTempoRestante(TEMPO_PADRAO_SEGUNDOS);
  };

  const questao = questoes[questaoAtual];

  return (
    <div className="min-h-screen bg-background p-6">
      {(acertos + erros) >= 10 && <InstallBanner />}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Banco de Questões ENEM</h1>
            <p className="text-muted-foreground">
              {questoes.length > 0
                ? `Questão ${questaoAtual + 1} de ${questoes.length}`
                : "Carregue as questões pelos filtros abaixo"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              {acertos} acertos
            </Badge>
            <Badge variant="outline" className="text-lg">
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              {erros} erros
            </Badge>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm font-medium">Ano</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filtros.ano ?? ""}
                  onChange={(e) => setFiltros({ ...filtros, ano: Number(e.target.value) })}
                >
                  {anosDisponiveis.map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Disciplina</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filtros.disciplina ?? ""}
                  onChange={(e) => setFiltros({ ...filtros, disciplina: e.target.value })}
                >
                  {disciplinasDisponiveis.map((disc) => (
                    <option key={disc} value={disc}>{DISCIPLINAS_LABELS[disc] ?? disc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Limite</label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={filtros.limite}
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => setFiltros({ ...filtros, limite: Number(e.target.value) })}
                />
              </div>

              <div className="flex items-end">
                <Button className="w-full" onClick={carregarQuestoes} disabled={loading}>
                  {loading ? "Carregando..." : "Carregar Questões"}
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive mt-2">Erro ao carregar: {error}</p>
            )}
          </CardContent>
        </Card>

        {/* Questão */}
        {questao && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{DISCIPLINAS_LABELS[questao.discipline] || "Geral"}</Badge>
                  <Badge variant="secondary">ENEM {questao.year}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className={`font-bold ${tempoRestante <= 30 ? 'text-red-600' : ''}`}>
                    {tempoRestante}s
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Enunciado */}
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium leading-relaxed">
                  {questao.enunciado}
                </h3>
                {questao.context && (
                  <p className="mt-2 text-sm text-muted-foreground">{questao.context}</p>
                )}
              </div>

              {/* Imagem opcional */}
              {questao.image && (
                <img src={questao.image} alt="Imagem da questão" className="rounded-lg border" />
              )}

              {/* Alternativas */}
              <div className="space-y-3">
                {(questao.alternatives || []).map((alternativa, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start h-auto p-4 text-left ${
                      mostrarResposta 
                        ? index === questao.correctAnswer 
                          ? 'border-green-500 bg-green-50 text-green-800' 
                          : respostaSelecionada === index
                            ? 'border-red-500 bg-red-50 text-red-800'
                            : ''
                        : respostaSelecionada === index 
                          ? 'border-primary bg-primary/10' 
                          : 'hover;border-primary/50'
                    }`}
                    onClick={() => !mostrarResposta && setRespostaSelecionada(index)}
                    disabled={mostrarResposta}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                        mostrarResposta
                          ? index === questao.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : respostaSelecionada === index
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300'
                          : respostaSelecionada === index
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{alternativa}</span>
                      {mostrarResposta && index === questao.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {mostrarResposta && respostaSelecionada === index && index !== questao.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {/* Gabarito / Explicação */}
              {mostrarResposta && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-primary mb-2">Gabarito:</h4>
                    <p className="text-foreground">
                      Letra {String.fromCharCode(65 + (questao.correctAnswer ?? 0))} — {
                        (questao.alternatives || [])[questao.correctAnswer ?? 0] || 'Alternativa'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Botões de Ação */}
              <div className="flex gap-3">
                {!mostrarResposta ? (
                  <Button
                    onClick={responderQuestao}
                    disabled={respostaSelecionada === null}
                    className="flex-1"
                  >
                    Responder
                  </Button>
                ) : (
                  <Button
                    onClick={proximaQuestao}
                    className="flex-1"
                  >
                    {questaoAtual < questoes.length - 1 ? 'Próxima Questão' : 'Finalizar Sessão'}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={reiniciarSessao}
                >
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas da Sessão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{acertos}</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold text-red-600">{erros}</div>
                <div className="text-sm text-muted-foreground">Erros</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-primary">
                  {acertos + erros > 0 ? Math.round((acertos / (acertos + erros)) * 100) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Taxa de Acerto</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

