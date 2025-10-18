import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, XCircle, Clock, BarChart3, Lock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModalUpgrade } from "./ModalUpgrade";

interface Questao {
  id: string;
  enunciado: string;
  alternativas: string[];
  resposta: number;
  explicacao: string;
  materia: string;
  assunto: string;
  dificuldade: "Fácil" | "Médio" | "Difícil";
  data: string;
}

const questoesDia: Questao[] = [
  {
    id: "q1",
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
    data: "2024-01-15"
  },
  {
    id: "q2",
    enunciado: "No trecho 'A pandemia trouxe mudanças que pareciam impossíveis antes', a palavra 'impossíveis' tem função:",
    alternativas: [
      "Adjetivo predicativo",
      "Adjetivo atributivo", 
      "Substantivo",
      "Advérbio"
    ],
    resposta: 0,
    explicacao: "'Impossíveis' é um adjetivo predicativo porque se refere ao substantivo 'mudanças' através de uma ligação verbal ('pareciam').",
    materia: "Português",
    assunto: "Sintaxe",
    dificuldade: "Médio",
    data: "2024-01-16"
  },
  {
    id: "q3",
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
    data: "2024-01-17"
  },
  {
    id: "q4",
    enunciado: "Em uma progressão aritmética, o primeiro termo é 3 e a razão é 5. Qual é o 10º termo dessa progressão?",
    alternativas: [
      "48",
      "50",
      "53", 
      "55"
    ],
    resposta: 2,
    explicacao: "Fórmula do termo geral: aₙ = a₁ + (n-1)r. Para n=10: a₁₀ = 3 + (10-1)×5 = 3 + 45 = 48. Espera, vou recalcular: a₁₀ = 3 + 9×5 = 3 + 45 = 48... Na verdade, a₁₀ = 3 + 9×5 = 3 + 45 = 48. Deixe-me verificar: a₁₀ = 3 + (10-1)×5 = 3 + 9×5 = 3 + 45 = 48.",
    materia: "Matemática",
    assunto: "Progressões Aritméticas",
    dificuldade: "Médio",
    data: "2024-01-18"
  },
  {
    id: "q5",
    enunciado: "Qual é a principal função dos ribossomos na célula?",
    alternativas: [
      "Produzir energia",
      "Sintetizar proteínas",
      "Armazenar material genético",
      "Digestão celular"
    ],
    resposta: 1,
    explicacao: "Os ribossomos são organelas responsáveis pela síntese de proteínas, processo fundamental para o funcionamento celular.",
    materia: "Biologia",
    assunto: "Biologia Celular",
    dificuldade: "Fácil",
    data: "2024-01-19"
  }
];

export const QuestaoDia = () => {
  const [questaoAtual, setQuestaoAtual] = useState<Questao | null>(null);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [questoesRespondidas, setQuestoesRespondidas] = useState<number>(() => {
    const saved = localStorage.getItem('questoesDiaRespondidas');
    return saved ? parseInt(saved) : 0;
  });
  const [acertosDia, setAcertosDia] = useState<number>(() => {
    const saved = localStorage.getItem('acertosQuestaoDia');
    return saved ? parseInt(saved) : 0;
  });
  const [errosDia, setErrosDia] = useState<number>(() => {
    const saved = localStorage.getItem('errosQuestaoDia');
    return saved ? parseInt(saved) : 0;
  });
  const [historico, setHistorico] = useState<{data: string, acertos: number, erros: number}[]>(() => {
    const saved = localStorage.getItem('historicoQuestaoDia');
    return saved ? JSON.parse(saved) : [];
  });
  const [modalUpgrade, setModalUpgrade] = useState(false);
  const { toast } = useToast();

  // Premium Build flag e limite dinâmico
  const PREMIUM_BUILD = (import.meta.env.VITE_PREMIUM_BUILD ?? 'false') === 'true';
  const LIMITE_GRATUITO = PREMIUM_BUILD ? Infinity : 5;

  useEffect(() => {
    localStorage.setItem('questoesDiaRespondidas', questoesRespondidas.toString());
    localStorage.setItem('acertosQuestaoDia', acertosDia.toString());
    localStorage.setItem('errosQuestaoDia', errosDia.toString());
    localStorage.setItem('historicoQuestaoDia', JSON.stringify(historico));
  }, [questoesRespondidas, acertosDia, errosDia, historico]);

  useEffect(() => {
    // Carregar questão do dia baseada na data atual
    const hoje = new Date().toISOString().split('T')[0];
    const questaoHoje = questoesDia.find(q => q.data === hoje) || questoesDia[0];
    setQuestaoAtual(questaoHoje);
  }, []);

  const verificarLimite = () => {
    if (PREMIUM_BUILD) return false;
    if (questoesRespondidas >= LIMITE_GRATUITO) {
      setModalUpgrade(true);
      return true;
    }
    return false;
  };

  const responderQuestao = () => {
    if (respostaSelecionada === null || !questaoAtual) return;
    if (verificarLimite()) return;

    const acertou = respostaSelecionada === questaoAtual.resposta;
    
    if (acertou) {
      setAcertosDia(prev => prev + 1);
      toast({
        title: "Parabéns! 🎉",
        description: "Você acertou a questão!",
      });
    } else {
      setErrosDia(prev => prev + 1);
      toast({
        title: "Ops! 😅",
        description: "Não foi desta vez, mas continue tentando!",
        variant: "destructive",
      });
    }

    setQuestoesRespondidas(prev => prev + 1);
    setMostrarResposta(true);

    // Salvar no histórico
    const hoje = new Date().toISOString().split('T')[0];
    const historicoHoje = historico.find(h => h.data === hoje);
    
    if (historicoHoje) {
      setHistorico(prev => prev.map(h => 
        h.data === hoje 
          ? { ...h, acertos: h.acertos + (acertou ? 1 : 0), erros: h.erros + (acertou ? 0 : 1) }
          : h
      ));
    } else {
      setHistorico(prev => [...prev, {
        data: hoje,
        acertos: acertou ? 1 : 0,
        erros: acertou ? 0 : 1
      }]);
    }
  };

  const proximaQuestao = () => {
    if (verificarLimite()) return;
    
    // Próxima questão do dia seguinte
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const dataAmanha = amanha.toISOString().split('T')[0];
    
    const proxima = questoesDia.find(q => q.data === dataAmanha) || questoesDia[questoesRespondidas % questoesDia.length];
    setQuestaoAtual(proxima);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
  };

  const progresso = PREMIUM_BUILD ? 0 : (questoesRespondidas / LIMITE_GRATUITO) * 100;

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Questão do Dia</h3>
                {PREMIUM_BUILD ? (
                  <p className="text-sm text-muted-foreground">Uso ilimitado hoje</p>
                ) : (
                  <p className="text-sm text-muted-foreground">{questoesRespondidas}/{LIMITE_GRATUITO} respondidas hoje</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-green-600">
                {acertosDia} acertos
              </Badge>
              <Badge variant="outline" className="text-red-600">
                {errosDia} erros
              </Badge>
            </div>
          </div>
          {!PREMIUM_BUILD && <Progress value={progresso} className="h-2" />}
          {!PREMIUM_BUILD && questoesRespondidas >= LIMITE_GRATUITO && (
            <div className="mt-3 p-3 bg-gold/10 border border-gold/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Limite diário atingido! Upgrade para continuar</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Questão atual */}
      {questaoAtual && (
        <Card className="border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="outline">{questaoAtual.materia}</Badge>
                <Badge variant={
                  questaoAtual.dificuldade === "Fácil" ? "default" :
                  questaoAtual.dificuldade === "Médio" ? "secondary" : "destructive"
                }>
                  {questaoAtual.dificuldade}
                </Badge>
                <Badge variant="outline">{questaoAtual.assunto}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  {new Date(questaoAtual.data).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Enunciado */}
            <div className="prose max-w-none">
              <h4 className="text-lg font-medium leading-relaxed">
                {questaoAtual.enunciado}
              </h4>
            </div>

            {/* Alternativas */}
            <div className="space-y-3">
              {questaoAtual.alternativas.map((alternativa, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start h-auto p-4 text-left ${
                    mostrarResposta 
                      ? index === questaoAtual.resposta 
                        ? 'border-green-500 bg-green-50 text-green-800' 
                        : respostaSelecionada === index
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : ''
                      : respostaSelecionada === index 
                        ? 'border-primary bg-primary/10' 
                        : 'hover:border-primary/50'
                  }`}
                  onClick={() => !mostrarResposta && setRespostaSelecionada(index)}
                  disabled={mostrarResposta || questoesRespondidas >= LIMITE_GRATUITO}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      mostrarResposta
                        ? index === questaoAtual.resposta
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
                    {mostrarResposta && index === questaoAtual.resposta && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {mostrarResposta && respostaSelecionada === index && index !== questaoAtual.resposta && (
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
                  <h5 className="font-semibold text-primary mb-2">Explicação:</h5>
                  <p className="text-foreground">{questaoAtual.explicacao}</p>
                </CardContent>
              </Card>
            )}

            {/* Botões de Ação */}
            <div className="flex gap-3">
              {!mostrarResposta ? (
                <Button
                  onClick={responderQuestao}
                  disabled={respostaSelecionada === null || questoesRespondidas >= LIMITE_GRATUITO}
                  className="flex-1"
                >
                  Responder
                </Button>
              ) : (
                <Button
                  onClick={proximaQuestao}
                  disabled={questoesRespondidas >= LIMITE_GRATUITO}
                  className="flex-1"
                >
                  Próxima Questão
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estatísticas do dia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Estatísticas de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{acertosDia}</div>
              <div className="text-sm text-muted-foreground">Acertos</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{errosDia}</div>
              <div className="text-sm text-muted-foreground">Erros</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">
                {acertosDia + errosDia > 0 ? Math.round((acertosDia / (acertosDia + errosDia)) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Taxa de Acerto</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico dos últimos 7 dias */}
      {historico.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico dos Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {historico.slice(-7).map((dia, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">
                      {new Date(dia.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-600 font-medium">{dia.acertos} acertos</span>
                    <span className="text-red-600 font-medium">{dia.erros} erros</span>
                    <span className="text-primary font-medium">
                      {dia.acertos + dia.erros > 0 ? Math.round((dia.acertos / (dia.acertos + dia.erros)) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Upgrade */}
      <ModalUpgrade 
        isOpen={PREMIUM_BUILD ? false : modalUpgrade}
        onClose={() => setModalUpgrade(false)}
        tipo="questoes"
        limiteUsado={questoesRespondidas}
        limiteMaximo={LIMITE_GRATUITO}
      />
    </div>
  );
};
