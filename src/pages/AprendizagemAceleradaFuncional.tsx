import { useState } from "react";
import { ArrowLeft, CheckCircle, FileText, Brain, Target, Zap, Clock, BookOpen, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TECNICAS_APRENDIZAGEM = [
  {
    id: 1,
    nome: "Técnica Pomodoro ENEM",
    descricao: "25 minutos de foco + 5 minutos de pausa",
    eficiencia: 95,
    tempo: "25min",
    icon: "🍅"
  },
  {
    id: 2,
    nome: "Spaced Repetition",
    descricao: "Revisão em intervalos crescentes",
    eficiencia: 92,
    tempo: "15min",
    icon: "🔄"
  },
  {
    id: 3,
    nome: "Active Recall",
    descricao: "Teste ativo da memória",
    eficiencia: 88,
    tempo: "20min",
    icon: "🧠"
  },
  {
    id: 4,
    nome: "Feynman Technique",
    descricao: "Explicar como se fosse para uma criança",
    eficiencia: 90,
    tempo: "30min",
    icon: "👶"
  }
];

const MODULOS_APRENDIZAGEM = [
  {
    id: 1,
    titulo: "Fundamentos da Aprendizagem Acelerada",
    duracao: "45 min",
    concluido: true,
    progresso: 100,
    topicos: [
      "Como o cérebro aprende",
      "Técnicas de memorização",
      "Gestão de tempo",
      "Motivação e foco"
    ]
  },
  {
    id: 2,
    titulo: "Técnicas de Memorização",
    duracao: "60 min",
    concluido: true,
    progresso: 100,
    topicos: [
      "Palácio da memória",
      "Associações visuais",
      "Acrônimos e siglas",
      "Histórias e narrativas"
    ]
  },
  {
    id: 3,
    titulo: "Leitura Dinâmica",
    duracao: "40 min",
    concluido: false,
    progresso: 65,
    topicos: [
      "Técnicas de skimming",
      "Leitura seletiva",
      "Identificação de palavras-chave",
      "Compreensão rápida"
    ]
  },
  {
    id: 4,
    titulo: "Aplicação Prática",
    duracao: "90 min",
    concluido: false,
    progresso: 0,
    topicos: [
      "Simulação de estudo",
      "Cronômetro de técnicas",
      "Avaliação de eficiência",
      "Planejamento personalizado"
    ]
  }
];

const ESTATISTICAS_USUARIO = {
  tempoEconomizado: "2h 30min",
  eficienciaAtual: 78,
  tecnicaFavorita: "Pomodoro ENEM",
  diasConsecutivos: 12,
  metaDiaria: "3h",
  tempoRealizado: "2h 45min"
};

const EXERCICIOS_PRATICOS = [
  {
    id: 1,
    titulo: "Memorização de Fórmulas",
    descricao: "Memorize 10 fórmulas de matemática em 15 minutos",
    dificuldade: "Médio",
    tempo: "15min",
    pontuacao: 85,
    concluido: true
  },
  {
    id: 2,
    titulo: "Leitura Dinâmica de Texto",
    descricao: "Leia e compreenda um texto em tempo recorde",
    dificuldade: "Fácil",
    tempo: "10min",
    pontuacao: 92,
    concluido: true
  },
  {
    id: 3,
    titulo: "Active Recall de Biologia",
    descricao: "Teste sua memória sobre ecologia",
    dificuldade: "Difícil",
    tempo: "20min",
    pontuacao: 0,
    concluido: false
  }
];

export default function AprendizagemAceleradaFuncional() {
  const [moduloAtual, setModuloAtual] = useState(3);
  const [tecnicaSelecionada, setTecnicaSelecionada] = useState<number | null>(null);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(25 * 60); // 25 minutos em segundos
  const [visualizacaoAtiva, setVisualizacaoAtiva] = useState<'modulos' | 'tecnicas' | 'pratico' | 'estatisticas'>('modulos');

  const modulo = MODULOS_APRENDIZAGEM[moduloAtual - 1];
  const progressoGeral = MODULOS_APRENDIZAGEM.reduce((acc, mod) => acc + mod.progresso, 0) / MODULOS_APRENDIZAGEM.length;

  const iniciarTecnica = (tecnicaId: number) => {
    setTecnicaSelecionada(tecnicaId);
    const tecnica = TECNICAS_APRENDIZAGEM.find(t => t.id === tecnicaId);
    if (tecnica) {
      setTempoRestante(parseInt(tecnica.tempo) * 60);
      setCronometroAtivo(true);
    }
  };

  const pararTecnica = () => {
    setCronometroAtivo(false);
    setTecnicaSelecionada(null);
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderModulos = () => (
    <div className="space-y-6">
      {/* Header com progresso geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Módulos de Aprendizagem
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso Geral</span>
              <span>{Math.round(progressoGeral)}%</span>
            </div>
            <Progress value={progressoGeral} className="h-3" />
          </div>
        </CardHeader>
      </Card>

      {/* Lista de módulos */}
      <div className="grid gap-4">
        {MODULOS_APRENDIZAGEM.map((modulo) => (
          <Card key={modulo.id} className={`${modulo.concluido ? 'border-green-200 bg-green-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    modulo.concluido ? 'bg-green-500' : 'bg-primary'
                  }`}>
                    {modulo.concluido ? <CheckCircle className="h-4 w-4" /> : modulo.id}
                  </div>
                  <div>
                    <h3 className="font-semibold">{modulo.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{modulo.duracao}</p>
                  </div>
                </div>
                <Badge variant={modulo.concluido ? "default" : "outline"}>
                  {modulo.concluido ? "Concluído" : "Em Andamento"}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progresso</span>
                  <span>{modulo.progresso}%</span>
                </div>
                <Progress value={modulo.progresso} className="h-2" />
              </div>

              <div>
                <h4 className="font-medium mb-2">Tópicos:</h4>
                <div className="flex flex-wrap gap-2">
                  {modulo.topicos.map((topico, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topico}
                    </Badge>
                  ))}
                </div>
              </div>

              {!modulo.concluido && (
                <Button className="w-full mt-4">
                  {modulo.progresso > 0 ? "Continuar" : "Iniciar"} Módulo
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTecnicas = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Técnicas de Aprendizagem Acelerada
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {TECNICAS_APRENDIZAGEM.map((tecnica) => (
          <Card key={tecnica.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{tecnica.icon}</div>
                  <div>
                    <h3 className="font-semibold">{tecnica.nome}</h3>
                    <p className="text-sm text-muted-foreground">{tecnica.descricao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{tecnica.eficiencia}%</div>
                  <div className="text-xs text-muted-foreground">Eficiência</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tecnica.tempo}</span>
                </div>
                <Button 
                  onClick={() => iniciarTecnica(tecnica.id)}
                  disabled={cronometroAtivo}
                  size="sm"
                >
                  Iniciar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cronômetro */}
      {cronometroAtivo && tecnicaSelecionada && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {TECNICAS_APRENDIZAGEM.find(t => t.id === tecnicaSelecionada)?.nome}
              </h3>
              <div className="text-4xl font-mono font-bold text-primary">
                {formatarTempo(tempoRestante)}
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={pararTecnica}>
                  Parar
                </Button>
                <Button onClick={() => setTempoRestante(25 * 60)}>
                  Reiniciar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPratico = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Exercícios Práticos
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {EXERCICIOS_PRATICOS.map((exercicio) => (
          <Card key={exercicio.id} className={`${exercicio.concluido ? 'border-green-200 bg-green-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{exercicio.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{exercicio.descricao}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    exercicio.dificuldade === "Fácil" ? "default" :
                    exercicio.dificuldade === "Médio" ? "secondary" : "destructive"
                  }>
                    {exercicio.dificuldade}
                  </Badge>
                  <Badge variant="outline">
                    {exercicio.tempo}
                  </Badge>
                </div>
              </div>

              {exercicio.concluido && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Concluído! Pontuação: {exercicio.pontuacao}%
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{exercicio.tempo}</span>
                </div>
                <Button 
                  variant={exercicio.concluido ? "outline" : "default"}
                  disabled={exercicio.concluido}
                >
                  {exercicio.concluido ? "Concluído" : "Iniciar Exercício"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEstatisticas = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Suas Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {ESTATISTICAS_USUARIO.tempoEconomizado}
              </div>
              <div className="text-sm text-muted-foreground">Tempo Economizado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {ESTATISTICAS_USUARIO.eficienciaAtual}%
              </div>
              <div className="text-sm text-muted-foreground">Eficiência Atual</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {ESTATISTICAS_USUARIO.diasConsecutivos}
              </div>
              <div className="text-sm text-muted-foreground">Dias Consecutivos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progresso Diário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meta Diária</span>
              <span className="text-sm text-muted-foreground">
                {ESTATISTICAS_USUARIO.tempoRealizado} / {ESTATISTICAS_USUARIO.metaDiaria}
              </span>
            </div>
            <Progress value={92} className="h-3" />
            <div className="text-center">
              <span className="text-2xl font-bold text-green-600">92%</span>
              <p className="text-sm text-muted-foreground">da meta cumprida hoje</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 text-gold">🏆 Técnica Favorita</h4>
          <p className="text-sm text-muted-foreground">
            Sua técnica mais eficiente é <strong>{ESTATISTICAS_USUARIO.tecnicaFavorita}</strong>. 
            Continue praticando para maximizar seus resultados!
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
              <span className="text-gold">Aprendizagem Acelerada</span>
            </h1>
            <p className="text-xs text-muted-foreground">Aprenda 3x mais rápido com técnicas comprovadas</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Tabs value={visualizacaoAtiva} onValueChange={(value: any) => setVisualizacaoAtiva(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="modulos">Módulos</TabsTrigger>
              <TabsTrigger value="tecnicas">Técnicas</TabsTrigger>
              <TabsTrigger value="pratico">Prático</TabsTrigger>
              <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="modulos" className="mt-6">
              {renderModulos()}
            </TabsContent>

            <TabsContent value="tecnicas" className="mt-6">
              {renderTecnicas()}
            </TabsContent>

            <TabsContent value="pratico" className="mt-6">
              {renderPratico()}
            </TabsContent>

            <TabsContent value="estatisticas" className="mt-6">
              {renderEstatisticas()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
