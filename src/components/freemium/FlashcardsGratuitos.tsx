import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronLeft, ChevronRight, CheckCircle, XCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModalUpgrade } from "./ModalUpgrade";

interface Flashcard {
  id: string;
  pergunta: string;
  resposta: string;
  materia: string;
  dificuldade: "Fácil" | "Médio" | "Difícil";
}

const flashcardsData: Flashcard[] = [
  // Matemática - 20 cards
  { id: "mat1", pergunta: "Qual é a fórmula da área do triângulo?", resposta: "A = (base × altura) / 2", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat2", pergunta: "O que é uma função do primeiro grau?", resposta: "f(x) = ax + b, onde a ≠ 0", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat3", pergunta: "Como calcular a distância entre dois pontos?", resposta: "d = √[(x₂-x₁)² + (y₂-y₁)²]", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat4", pergunta: "Qual é a fórmula do teorema de Pitágoras?", resposta: "a² + b² = c²", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat5", pergunta: "O que é uma progressão aritmética?", resposta: "Sequência onde cada termo é o anterior + uma constante (razão)", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat6", pergunta: "Como calcular a probabilidade de um evento?", resposta: "P(A) = casos favoráveis / casos possíveis", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat7", pergunta: "Qual é a fórmula da circunferência?", resposta: "C = 2πr", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat8", pergunta: "O que é uma função quadrática?", resposta: "f(x) = ax² + bx + c, onde a ≠ 0", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat9", pergunta: "Como calcular a área do círculo?", resposta: "A = πr²", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat10", pergunta: "O que é logaritmo?", resposta: "Operação inversa da exponenciação: logₐ(b) = c significa a^c = b", materia: "Matemática", dificuldade: "Difícil" },
  { id: "mat11", pergunta: "Como calcular o volume do cilindro?", resposta: "V = πr²h", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat12", pergunta: "O que é uma matriz?", resposta: "Tabela retangular de números organizados em linhas e colunas", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat13", pergunta: "Como calcular a média aritmética?", resposta: "Soma de todos os valores ÷ quantidade de valores", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat14", pergunta: "O que é uma função exponencial?", resposta: "f(x) = aˣ, onde a > 0 e a ≠ 1", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat15", pergunta: "Como calcular a área do trapézio?", resposta: "A = (base maior + base menor) × altura / 2", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat16", pergunta: "O que é uma inequação?", resposta: "Desigualdade com uma ou mais variáveis", materia: "Matemática", dificuldade: "Médio" },
  { id: "mat17", pergunta: "Como calcular a hipotenusa?", resposta: "c = √(a² + b²)", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat18", pergunta: "O que é uma função trigonométrica?", resposta: "Função que relaciona ângulos com razões trigonométricas", materia: "Matemática", dificuldade: "Difícil" },
  { id: "mat19", pergunta: "Como calcular a área do losango?", resposta: "A = (diagonal maior × diagonal menor) / 2", materia: "Matemática", dificuldade: "Fácil" },
  { id: "mat20", pergunta: "O que é uma derivada?", resposta: "Taxa de variação instantânea de uma função", materia: "Matemática", dificuldade: "Difícil" },

  // Português - 20 cards
  { id: "port1", pergunta: "O que é um substantivo?", resposta: "Palavra que nomeia seres, objetos, lugares, sentimentos", materia: "Português", dificuldade: "Fácil" },
  { id: "port2", pergunta: "O que é um adjetivo?", resposta: "Palavra que qualifica ou caracteriza o substantivo", materia: "Português", dificuldade: "Fácil" },
  { id: "port3", pergunta: "O que é um verbo?", resposta: "Palavra que indica ação, estado ou fenômeno", materia: "Português", dificuldade: "Fácil" },
  { id: "port4", pergunta: "O que é uma preposição?", resposta: "Palavra invariável que liga termos da oração", materia: "Português", dificuldade: "Médio" },
  { id: "port5", pergunta: "O que é uma conjunção?", resposta: "Palavra que liga orações ou termos da mesma função", materia: "Português", dificuldade: "Médio" },
  { id: "port6", pergunta: "O que é sujeito?", resposta: "Termo da oração sobre o qual se fala", materia: "Português", dificuldade: "Fácil" },
  { id: "port7", pergunta: "O que é predicado?", resposta: "Parte da oração que informa algo sobre o sujeito", materia: "Português", dificuldade: "Fácil" },
  { id: "port8", pergunta: "O que é complemento verbal?", resposta: "Termo que completa o sentido do verbo transitivo", materia: "Português", dificuldade: "Médio" },
  { id: "port9", pergunta: "O que é adjunto adnominal?", resposta: "Termo que modifica o substantivo", materia: "Português", dificuldade: "Médio" },
  { id: "port10", pergunta: "O que é adjunto adverbial?", resposta: "Termo que modifica o verbo, adjetivo ou advérbio", materia: "Português", dificuldade: "Médio" },
  { id: "port11", pergunta: "O que é aposto?", resposta: "Termo que explica ou especifica outro termo", materia: "Português", dificuldade: "Médio" },
  { id: "port12", pergunta: "O que é vocativo?", resposta: "Termo usado para chamar ou invocar alguém", materia: "Português", dificuldade: "Fácil" },
  { id: "port13", pergunta: "O que é período composto?", resposta: "Período com mais de uma oração", materia: "Português", dificuldade: "Médio" },
  { id: "port14", pergunta: "O que é oração coordenada?", resposta: "Oração independente sintaticamente", materia: "Português", dificuldade: "Médio" },
  { id: "port15", pergunta: "O que é oração subordinada?", resposta: "Oração que depende sintaticamente de outra", materia: "Português", dificuldade: "Difícil" },
  { id: "port16", pergunta: "O que é metáfora?", resposta: "Figura de linguagem que estabelece comparação implícita", materia: "Português", dificuldade: "Médio" },
  { id: "port17", pergunta: "O que é metonímia?", resposta: "Figura que substitui uma palavra por outra com relação próxima", materia: "Português", dificuldade: "Difícil" },
  { id: "port18", pergunta: "O que é hipérbole?", resposta: "Figura de linguagem que exagera a expressão", materia: "Português", dificuldade: "Médio" },
  { id: "port19", pergunta: "O que é eufemismo?", resposta: "Figura que atenua uma expressão desagradável", materia: "Português", dificuldade: "Médio" },
  { id: "port20", pergunta: "O que é ironia?", resposta: "Figura que expressa o contrário do que se pensa", materia: "Português", dificuldade: "Médio" },

  // Biologia - 20 cards
  { id: "bio1", pergunta: "O que é fotossíntese?", resposta: "Processo pelo qual plantas produzem glicose usando luz solar", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio2", pergunta: "O que é respiração celular?", resposta: "Processo de quebra da glicose para produção de ATP", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio3", pergunta: "O que é DNA?", resposta: "Ácido desoxirribonucleico - material genético", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio4", pergunta: "O que é RNA?", resposta: "Ácido ribonucleico - participa da síntese proteica", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio5", pergunta: "O que é mitose?", resposta: "Divisão celular que produz células idênticas", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio6", pergunta: "O que é meiose?", resposta: "Divisão celular que produz gametas", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio7", pergunta: "O que é ecossistema?", resposta: "Conjunto formado por comunidade + ambiente", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio8", pergunta: "O que é cadeia alimentar?", resposta: "Sequência de organismos onde um serve de alimento para outro", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio9", pergunta: "O que é biodiversidade?", resposta: "Variedade de vida na Terra", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio10", pergunta: "O que é seleção natural?", resposta: "Mecanismo da evolução que favorece características vantajosas", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio11", pergunta: "O que é mutação?", resposta: "Alteração no material genético", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio12", pergunta: "O que é adaptação?", resposta: "Característica que melhora a sobrevivência do organismo", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio13", pergunta: "O que é homeostase?", resposta: "Manutenção do equilíbrio interno do organismo", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio14", pergunta: "O que é metabolismo?", resposta: "Conjunto de reações químicas do organismo", materia: "Biologia", dificuldade: "Médio" },
  { id: "bio15", pergunta: "O que é tecido?", resposta: "Conjunto de células com função específica", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio16", pergunta: "O que é órgão?", resposta: "Conjunto de tecidos com função específica", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio17", pergunta: "O que é sistema?", resposta: "Conjunto de órgãos que trabalham juntos", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio18", pergunta: "O que é organismo?", resposta: "Ser vivo completo", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio19", pergunta: "O que é população?", resposta: "Grupo de indivíduos da mesma espécie em uma área", materia: "Biologia", dificuldade: "Fácil" },
  { id: "bio20", pergunta: "O que é comunidade?", resposta: "Conjunto de populações que vivem na mesma área", materia: "Biologia", dificuldade: "Fácil" }
];

export const FlashcardsGratuitos = () => {
  const [flashcardsUsados, setFlashcardsUsados] = useState<number>(() => {
    const saved = localStorage.getItem('flashcardsUsados');
    return saved ? parseInt(saved) : 0;
  });
  const [acertos, setAcertos] = useState<number>(() => {
    const saved = localStorage.getItem('acertosFlashcards');
    return saved ? parseInt(saved) : 0;
  });
  const [erros, setErros] = useState<number>(() => {
    const saved = localStorage.getItem('errosFlashcards');
    return saved ? parseInt(saved) : 0;
  });
  const [materiaAtual, setMateriaAtual] = useState("Matemática");
  const [cardAtual, setCardAtual] = useState(0);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);
  const [modalUpgrade, setModalUpgrade] = useState(false);
  const { toast } = useToast();

  const LIMITE_GRATUITO = 5;
  const materias = ["Matemática", "Português", "Biologia"];
  
  const flashcardsFiltrados = flashcardsData.filter(card => card.materia === materiaAtual);

  useEffect(() => {
    localStorage.setItem('flashcardsUsados', flashcardsUsados.toString());
    localStorage.setItem('acertosFlashcards', acertos.toString());
    localStorage.setItem('errosFlashcards', erros.toString());
  }, [flashcardsUsados, acertos, erros]);

  const verificarLimite = () => {
    if (flashcardsUsados >= LIMITE_GRATUITO) {
      setModalUpgrade(true);
      return true;
    }
    return false;
  };

  const proximoCard = () => {
    if (verificarLimite()) return;
    
    setFlashcardsUsados(prev => prev + 1);
    setCardAtual(prev => (prev + 1) % flashcardsFiltrados.length);
    setMostrarResposta(false);
    setRespostaCorreta(null);
  };

  const cardAnterior = () => {
    setCardAtual(prev => prev === 0 ? flashcardsFiltrados.length - 1 : prev - 1);
    setMostrarResposta(false);
    setRespostaCorreta(null);
  };

  const revelarResposta = () => {
    if (verificarLimite()) return;
    
    setMostrarResposta(true);
    setRespostaCorreta(true); // Simulando acerto
    setAcertos(prev => prev + 1);
  };

  const marcarErro = () => {
    if (verificarLimite()) return;
    
    setRespostaCorreta(false);
    setErros(prev => prev + 1);
  };

  const progresso = (flashcardsUsados / LIMITE_GRATUITO) * 100;

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Flashcards Gratuitos</h3>
                <p className="text-sm text-muted-foreground">{flashcardsUsados}/{LIMITE_GRATUITO} usados hoje</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600">
              {acertos} acertos
            </Badge>
          </div>
          <Progress value={progresso} className="h-2" />
          {flashcardsUsados >= LIMITE_GRATUITO && (
            <div className="mt-3 p-3 bg-gold/10 border border-gold/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Limite atingido! Upgrade para continuar</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seletor de matéria */}
      <div className="flex gap-2">
        {materias.map((materia) => (
          <Button
            key={materia}
            variant={materiaAtual === materia ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setMateriaAtual(materia);
              setCardAtual(0);
              setMostrarResposta(false);
              setRespostaCorreta(null);
            }}
          >
            {materia}
          </Button>
        ))}
      </div>

      {/* Flashcard */}
      {flashcardsFiltrados.length > 0 && (
        <Card className="min-h-[300px] border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant={
                flashcardsFiltrados[cardAtual]?.dificuldade === "Fácil" ? "default" :
                flashcardsFiltrados[cardAtual]?.dificuldade === "Médio" ? "secondary" : "destructive"
              }>
                {flashcardsFiltrados[cardAtual]?.dificuldade}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {cardAtual + 1} de {flashcardsFiltrados.length}
              </span>
            </div>

            <div className="text-center space-y-6">
              <div className="min-h-[100px] flex items-center justify-center">
                <h4 className="text-lg font-medium leading-relaxed">
                  {flashcardsFiltrados[cardAtual]?.pergunta}
                </h4>
              </div>

              {mostrarResposta && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-primary font-medium">
                    {flashcardsFiltrados[cardAtual]?.resposta}
                  </p>
                  {respostaCorreta !== null && (
                    <div className="mt-2 flex items-center justify-center gap-2">
                      {respostaCorreta ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${respostaCorreta ? 'text-green-600' : 'text-red-600'}`}>
                        {respostaCorreta ? 'Acertou!' : 'Errou'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 justify-center">
                {!mostrarResposta ? (
                  <Button onClick={revelarResposta} disabled={flashcardsUsados >= LIMITE_GRATUITO}>
                    Revelar Resposta
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={marcarErro} disabled={flashcardsUsados >= LIMITE_GRATUITO}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Errei
                    </Button>
                    <Button onClick={proximoCard} disabled={flashcardsUsados >= LIMITE_GRATUITO}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Acertei
                    </Button>
                  </>
                )}
              </div>

              <div className="flex gap-2 justify-center">
                <Button variant="ghost" size="sm" onClick={cardAnterior}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={proximoCard} disabled={flashcardsUsados >= LIMITE_GRATUITO}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estatísticas */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Seu Progresso</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{acertos}</div>
              <div className="text-xs text-muted-foreground">Acertos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{erros}</div>
              <div className="text-xs text-muted-foreground">Erros</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {acertos + erros > 0 ? Math.round((acertos / (acertos + erros)) * 100) : 0}%
              </div>
              <div className="text-xs text-muted-foreground">Taxa Acerto</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Upgrade */}
      <ModalUpgrade 
        isOpen={modalUpgrade}
        onClose={() => setModalUpgrade(false)}
        tipo="flashcards"
        limiteUsado={flashcardsUsados}
        limiteMaximo={LIMITE_GRATUITO}
      />
    </div>
  );
};
