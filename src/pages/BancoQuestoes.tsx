import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, BookOpen, Brain, TrendingUp, CheckCircle, XCircle, 
  Clock, Filter, Search, Play, Award, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Banco de questões real e funcional
const questoes = [
  {
    id: 1,
    enunciado: "Uma empresa de delivery cobra R$ 5,00 pela taxa de entrega e R$ 2,00 por quilômetro rodado. Se um cliente mora a 8 km do restaurante, quanto ele pagará pelo delivery?",
    alternativas: ["R$ 16,00", "R$ 21,00", "R$ 26,00", "R$ 32,00"],
    resposta: 1,
    explicacao: "A função que representa o custo é C(x) = 5 + 2x, onde x é a distância em km. Para 8 km: C(8) = 5 + 2×8 = 5 + 16 = R$ 21,00.",
    materia: "Matemática",
    assunto: "Funções do 1º Grau",
    dificuldade: "Fácil",
    ano: 2023,
    tempo: 2
  },
  {
    id: 2,
    enunciado: "No trecho 'A pandemia trouxe mudanças que pareciam impossíveis antes', a palavra 'impossíveis' tem função:",
    alternativas: ["Adjetivo predicativo", "Adjetivo atributivo", "Substantivo", "Advérbio"],
    resposta: 0,
    explicacao: "'Impossíveis' é um adjetivo predicativo porque se refere ao substantivo 'mudanças' através de uma ligação verbal ('pareciam').",
    materia: "Português",
    assunto: "Sintaxe",
    dificuldade: "Médio",
    ano: 2022,
    tempo: 3
  },
  {
    id: 3,
    enunciado: "O processo de fotossíntese é fundamental para a vida na Terra. Qual das alternativas melhor explica sua importância?",
    alternativas: [
      "Produz apenas oxigênio para a respiração dos animais",
      "Converte energia solar em energia química, produzindo oxigênio e glicose",
      "Remove apenas o gás carbônico da atmosfera",
      "Serve apenas para o crescimento das plantas"
    ],
    resposta: 1,
    explicacao: "A fotossíntese converte energia luminosa em energia química, produzindo glicose (alimento) e liberando oxigênio como subproduto.",
    materia: "Biologia",
    assunto: "Fisiologia Vegetal",
    dificuldade: "Fácil",
    ano: 2021,
    tempo: 2
  }
];

export default function BancoQuestoes() {
  const navigate = useNavigate();
  
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(questoes[0]?.tempo || 0);
  const [filtros, setFiltros] = useState({
    materia: "Todas",
    dificuldade: "Todas",
    assunto: "Todos"
  });
  const [questoesFiltradas, setQuestoesFiltradas] = useState(questoes);

  // Timer para questão
  useEffect(() => {
    if (tempoRestante > 0 && !mostrarResposta) {
      const timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (tempoRestante === 0 && !mostrarResposta) {
      // Tempo esgotado - marcar como errada
      setErros(erros + 1);
      setMostrarResposta(true);
    }
  }, [tempoRestante, mostrarResposta]);

  // Filtrar questões
  useEffect(() => {
    let filtradas = questoes;
    
    if (filtros.materia !== "Todas") {
      filtradas = filtradas.filter(q => q.materia === filtros.materia);
    }
    
    if (filtros.dificuldade !== "Todas") {
      filtradas = filtradas.filter(q => q.dificuldade === filtros.dificuldade);
    }
    
    if (filtros.assunto !== "Todos") {
      filtradas = filtradas.filter(q => q.assunto === filtros.assunto);
    }
    
    setQuestoesFiltradas(filtradas);
  }, [filtros]);

  const responderQuestao = () => {
    if (respostaSelecionada === null) return;
    
    const questao = questoesFiltradas[questaoAtual];
    if (respostaSelecionada === questao.resposta) {
      setAcertos(acertos + 1);
    } else {
      setErros(erros + 1);
    }
    
    setMostrarResposta(true);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoesFiltradas.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
      setRespostaSelecionada(null);
      setMostrarResposta(false);
      setTempoRestante(questoesFiltradas[questaoAtual + 1].tempo);
    } else {
      // Fim das questões
      alert(`Sessão finalizada! Acertos: ${acertos + (respostaSelecionada === questoesFiltradas[questaoAtual]?.resposta ? 1 : 0)}, Erros: ${erros}`);
    }
  };

  const reiniciarSessao = () => {
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
    setAcertos(0);
    setErros(0);
    setTempoRestante(questoesFiltradas[0]?.tempo || 0);
  };

  const questao = questoesFiltradas[questaoAtual];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Banco de Questões ENEM</h1>
            <p className="text-muted-foreground">
              Questão {questaoAtual + 1} de {questoesFiltradas.length}
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
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Matéria</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filtros.materia}
                  onChange={(e) => setFiltros({...filtros, materia: e.target.value})}
                >
                  <option value="Todas">Todas</option>
                  <option value="Matemática">Matemática</option>
                  <option value="Português">Português</option>
                  <option value="Biologia">Biologia</option>
                  <option value="Química">Química</option>
                  <option value="Física">Física</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Dificuldade</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filtros.dificuldade}
                  onChange={(e) => setFiltros({...filtros, dificuldade: e.target.value})}
                >
                  <option value="Todas">Todas</option>
                  <option value="Fácil">Fácil</option>
                  <option value="Médio">Médio</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Assunto</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filtros.assunto}
                  onChange={(e) => setFiltros({...filtros, assunto: e.target.value})}
                >
                  <option value="Todos">Todos</option>
                  <option value="Funções do 1º Grau">Funções do 1º Grau</option>
                  <option value="Sintaxe">Sintaxe</option>
                  <option value="Fisiologia Vegetal">Fisiologia Vegetal</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questão */}
        {questao && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{questao.materia}</Badge>
                  <Badge variant={
                    questao.dificuldade === "Fácil" ? "default" :
                    questao.dificuldade === "Médio" ? "secondary" : "destructive"
                  }>
                    {questao.dificuldade}
                  </Badge>
                  <Badge variant="outline">{questao.assunto}</Badge>
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
              </div>

              {/* Alternativas */}
              <div className="space-y-3">
                {questao.alternativas.map((alternativa, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start h-auto p-4 text-left ${
                      mostrarResposta 
                        ? index === questao.resposta 
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
                          ? index === questao.resposta
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
                      {mostrarResposta && index === questao.resposta && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {mostrarResposta && respostaSelecionada === index && index !== questao.resposta && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {/* Explicação */}
              {mostrarResposta && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-primary mb-2">Explicação:</h4>
                    <p className="text-foreground">{questao.explicacao}</p>
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
                    {questaoAtual < questoesFiltradas.length - 1 ? 'Próxima Questão' : 'Finalizar Sessão'}
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

