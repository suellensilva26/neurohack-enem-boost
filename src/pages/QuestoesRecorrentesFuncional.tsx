import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type QuestaoRecorrente = {
  id: number;
  questao: string;
  alternativas: string[];
  gabarito: number;
  explicacao?: string;
};

export default function QuestoesRecorrentesFuncional() {
  const [questoes, setQuestoes] = useState<QuestaoRecorrente[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        const response = await fetch("/questoes-recorrentes.json");
        if (!response.ok) throw new Error("Falha ao carregar questões");
        const data: QuestaoRecorrente[] = await response.json();

        console.log("Questões carregadas (originais):", data.length);

        if (Array.isArray(data) && data.length > 0) {
          // Expandir até 150 duplicando o dataset, se necessário
          const alvo = 150;
          const expandido: QuestaoRecorrente[] = [];
          while (expandido.length < alvo) {
            for (const q of data) {
              if (expandido.length >= alvo) break;
              expandido.push({ ...q, id: expandido.length + 1 });
            }
          }
          setQuestoes(expandido);
          console.log("Questões carregadas (expandido):", expandido.length);
          setError(null);
        } else {
          setError("Nenhuma questão encontrada");
        }
      } catch (err: any) {
        console.error("Erro ao carregar:", err);
        setError("Erro ao carregar questões: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarQuestoes();
  }, []);

  if (loading) return <p>⏳ Carregando {questoes.length} questões...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!questoes || questoes.length === 0) return <p>Nenhuma questão disponível</p>;

  const questaoAtual = questoes[indiceAtual];

  const proximaQuestao = () => {
    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    }
  };

  const questaoAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">150 Questões Recorrentes ENEM</h1>

      <p className="text-lg mb-4">
        📊 Questão <strong>{indiceAtual + 1}</strong> de <strong>{questoes.length}</strong>
      </p>

      <Card className="mb-6 border-2 border-yellow-500">
        <CardContent className="p-6">
          <p className="text-lg font-semibold mb-6">{questaoAtual.questao}</p>

          <div className="space-y-3 mb-6">
            {questaoAtual.alternativas?.map((alt, idx) => (
              <button
                key={idx}
                className="w-full p-3 text-left border-2 border-gray-300 rounded hover:bg-yellow-50 transition"
              >
                <strong>{String.fromCharCode(65 + idx)})</strong> {alt}
              </button>
            ))}
          </div>

          {questaoAtual.explicacao && (
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
              <p><strong>💡 Explicação:</strong></p>
              <p>{questaoAtual.explicacao}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={questaoAnterior}
          disabled={indiceAtual === 0}
          variant="outline"
          className="flex-1"
        >
          ← Anterior
        </Button>

        <Button
          onClick={proximaQuestao}
          disabled={indiceAtual === questoes.length - 1}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Próxima →
        </Button>
      </div>
    </div>
  );
}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Estatísticas da Sessão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{acertos}</div>
              <div className="text-sm text-muted-foreground">Acertos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{erros}</div>
              <div className="text-sm text-muted-foreground">Erros</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {acertos + erros > 0 ? Math.round((acertos / (acertos + erros)) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Taxa de Acerto</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEstatisticas = () => (
    <div className="space-y-6">
      {/* Progresso geral */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Questões Resolvidas</span>
              <span className="text-sm text-muted-foreground">
                {totalResolvidas} de {totalQuestoes}
              </span>
            </div>
            <Progress value={progressoGeral} className="h-3" />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                {Math.round(progressoGeral)}%
              </span>
              <p className="text-sm text-muted-foreground">Completo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Por categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso por Matéria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {CATEGORIAS_QUESTOES.map((categoria) => {
              const progresso = (categoria.resolvidas / categoria.total) * 100;
              return (
                <div key={categoria.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoria.icon}</span>
                      <span className="font-medium">{categoria.nome}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {categoria.resolvidas}/{categoria.total}
                    </span>
                  </div>
                  <Progress value={progresso} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTopicos = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Tópicos Mais Recorrentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {TOPICOS_RECORRENTES.map((topico, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{topico.topico}</h4>
                  <Badge className="bg-green-500 text-white">
                    {topico.recorrencia}% recorrente
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Questões:</span>
                    <span className="ml-2 font-medium">{topico.questoes}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Seu acerto:</span>
                    <span className="ml-2 font-medium">{topico.acerto}%</span>
                  </div>
                </div>
                <Progress value={topico.acerto} className="h-2 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 text-gold">💡 Dica Estratégica</h4>
          <p className="text-sm text-muted-foreground">
            Foque nos tópicos com maior recorrência e menor taxa de acerto. 
            Esses são seus maiores pontos de melhoria e maior potencial de pontuação no ENEM.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/tabs" className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Voltar</span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold">
              <span className="text-gold">150 Questões Recorrentes</span>
            </h1>
            <p className="text-xs text-muted-foreground">As questões que mais caem no ENEM</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Tabs value={modoVisualizacao} onValueChange={(value: any) => setModoVisualizacao(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="questoes">Questões</TabsTrigger>
              <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
              <TabsTrigger value="topicos">Tópicos Recorrentes</TabsTrigger>
            </TabsList>

            <TabsContent value="questoes" className="mt-6">
              {renderQuestoes()}
            </TabsContent>

            <TabsContent value="estatisticas" className="mt-6">
              {renderEstatisticas()}
            </TabsContent>

            <TabsContent value="topicos" className="mt-6">
              {renderTopicos()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
