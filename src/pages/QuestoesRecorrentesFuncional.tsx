import { useState } from "react";
import { ArrowLeft, CheckCircle, FileText, Brain, Target, Zap, Clock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FreemiumBlocker from "@/components/freemium/FreemiumBlocker";

const QUESTAO_EXEMPLO = {
  id: 1,
  enunciado: "Uma empresa de delivery cobra R$ 5,00 pela taxa de entrega e R$ 2,00 por quilômetro rodado. Se um cliente mora a 8 km do restaurante, quanto ele pagará pelo delivery?",
  alternativas: [
    "R$ 16,00",
    "R$ 21,00",
    "R$ 26,00", 
    "R$ 32,00"
  ],
  resposta: 1,
  explicacao: "A função que representa o custo é C(x) = 5 + 2x, onde x é a distância em km. Para 8 km: C(8) = 5 + 2×8 = 5 + 16 = R$ 21,00.",
  materia: "Matemática",
  assunto: "Funções do 1º Grau",
  dificuldade: "Fácil",
  ano: 2023,
  recorrencia: 85
};

const CATEGORIAS_QUESTOES = [
  {
    id: "matematica",
    nome: "Matemática",
    total: 50,
    resolvidas: 12,
    cor: "bg-red-500",
    icon: "📐"
  },
  {
    id: "portugues", 
    nome: "Português",
    total: 35,
    resolvidas: 8,
    cor: "bg-blue-500",
    icon: "📚"
  },
  {
    id: "biologia",
    nome: "Biologia", 
    total: 30,
    resolvidas: 15,
    cor: "bg-green-500",
    icon: "🧬"
  },
  {
    id: "quimica",
    nome: "Química",
    total: 25,
    resolvidas: 5,
    cor: "bg-yellow-500", 
    icon: "⚗️"
  },
  {
    id: "fisica",
    nome: "Física",
    total: 20,
    resolvidas: 3,
    cor: "bg-purple-500",
    icon: "⚡"
  }
];

const TOPICOS_RECORRENTES = [
  {
    topico: "Funções do 1º Grau",
    recorrencia: 95,
    questoes: 15,
    acerto: 78
  },
  {
    topico: "Interpretação de Texto", 
    recorrencia: 92,
    questoes: 25,
    acerto: 85
  },
  {
    topico: "Ecologia",
    recorrencia: 88,
    questoes: 12,
    acerto: 72
  },
  {
    topico: "Geometria Plana",
    recorrencia: 85,
    questoes: 18,
    acerto: 69
  },
  {
    topico: "Química Orgânica",
    recorrencia: 82,
    questoes: 8,
    acerto: 65
  }
];

export default function QuestoesRecorrentesFuncional() {
  const [questaoAtual, setQuestaoAtual] = useState(1);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempoGasto, setTempoGasto] = useState(0);
  const [modoVisualizacao, setModoVisualizacao] = useState<'questoes' | 'estatisticas' | 'topicos'>('questoes');

  const totalQuestoes = CATEGORIAS_QUESTOES.reduce((sum, cat) => sum + cat.total, 0);
  const totalResolvidas = CATEGORIAS_QUESTOES.reduce((sum, cat) => sum + cat.resolvidas, 0);
  const progressoGeral = (totalResolvidas / totalQuestoes) * 100;

  const responderQuestao = () => {
    if (respostaSelecionada === null) return;
    
    if (respostaSelecionada === QUESTAO_EXEMPLO.resposta) {
      setAcertos(acertos + 1);
    } else {
      setErros(erros + 1);
    }
    
    setMostrarResposta(true);
  };

  const proximaQuestao = () => {
    setQuestaoAtual(questaoAtual + 1);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
  };

  const renderQuestoes = () => (
    <div className="space-y-6">
      {/* Header da questão */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline">{QUESTAO_EXEMPLO.materia}</Badge>
              <Badge variant={
                QUESTAO_EXEMPLO.dificuldade === "Fácil" ? "default" :
                QUESTAO_EXEMPLO.dificuldade === "Médio" ? "secondary" : "destructive"
              }>
                {QUESTAO_EXEMPLO.dificuldade}
              </Badge>
              <Badge className="bg-green-500 text-white">
                {QUESTAO_EXEMPLO.recorrencia}% recorrente
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{tempoGasto}s</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Enunciado */}
          <div className="prose max-w-none">
            <h4 className="text-lg font-medium leading-relaxed">
              Questão {questaoAtual}: {QUESTAO_EXEMPLO.enunciado}
            </h4>
          </div>

          {/* Alternativas */}
          <div className="space-y-3">
            {QUESTAO_EXEMPLO.alternativas.map((alternativa, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start h-auto p-4 text-left ${
                  mostrarResposta 
                    ? index === QUESTAO_EXEMPLO.resposta 
                      ? 'border-green-500 bg-green-50 text-green-800' 
                      : respostaSelecionada === index
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : ''
                    : respostaSelecionada === index 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                }`}
                onClick={() => !mostrarResposta && setRespostaSelecionada(index)}
                disabled={mostrarResposta}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    mostrarResposta
                      ? index === QUESTAO_EXEMPLO.resposta
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
                  {mostrarResposta && index === QUESTAO_EXEMPLO.resposta && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* Explicação */}
          {mostrarResposta && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <h5 className="font-semibold text-primary mb-2">Explicação:</h5>
                <p className="text-foreground">{QUESTAO_EXEMPLO.explicacao}</p>
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Por que é recorrente:</strong> Este tipo de questão aparece em {QUESTAO_EXEMPLO.recorrencia}% 
                    das provas do ENEM, sempre testando a aplicação prática de funções.
                  </p>
                </div>
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
                Próxima Questão
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas da sessão */}
      <Card>
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
              <FreemiumBlocker>
                {renderQuestoes()}
              </FreemiumBlocker>
            </TabsContent>

            <TabsContent value="estatisticas" className="mt-6">
              <FreemiumBlocker>
                {renderEstatisticas()}
              </FreemiumBlocker>
            </TabsContent>

            <TabsContent value="topicos" className="mt-6">
              <FreemiumBlocker>
                {renderTopicos()}
              </FreemiumBlocker>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
