import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface Questao {
  id: number;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  eliminador: string;
  explicacao: string;
}

export function DrillEliminadores() {
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>(Array(15).fill(null));
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [acertos, setAcertos] = useState(0);

  const questoes: Questao[] = [
    {
      id: 1,
      enunciado: "Sobre a colonização portuguesa no Brasil, qual alternativa deve ser eliminada primeiro?",
      alternativas: [
        "A) Todos os indígenas sempre aceitaram pacificamente a colonização",
        "B) A colonização portuguesa teve forte influência da Igreja Católica",
        "C) Muitos conflitos ocorreram entre colonizadores e povos nativos",
        "D) A economia colonial era baseada principalmente na agricultura"
      ],
      respostaCorreta: 0,
      eliminador: "Lei dos Absolutos",
      explicacao: "Alternativa A usa 'Todos' e 'sempre', indicando generalização absoluta - deve ser eliminada imediatamente."
    },
    {
      id: 2,
      enunciado: "Em uma questão de Física sobre velocidade, as alternativas são: 2 m/s, 18 m/s, 45 m/s, 89 m/s, 156 m/s. Qual princípio aplicar?",
      alternativas: [
        "A) Eliminar os valores intermediários (18, 45, 89)",
        "B) Eliminar os valores extremos (2 e 156)",
        "C) Escolher sempre o maior valor",
        "D) Escolher sempre o menor valor"
      ],
      respostaCorreta: 1,
      eliminador: "Regra dos Extremos",
      explicacao: "A Regra dos Extremos diz que em questões numéricas, valores extremos (muito altos/baixos) raramente são corretos. 78% das vezes a resposta está nos valores intermediários."
    },
    {
      id: 3,
      enunciado: "Qual das seguintes afirmações sobre direitos humanos deve ser eliminada automaticamente?",
      alternativas: [
        "A) Os direitos humanos são universais e inalienáveis",
        "B) A discriminação racial pode ser justificada em alguns contextos históricos",
        "C) A dignidade humana é um princípio fundamental",
        "D) Todos têm direito à educação e saúde"
      ],
      respostaCorreta: 1,
      eliminador: "Detector Ético-Social",
      explicacao: "O ENEM JAMAIS terá como resposta algo que contrarie direitos humanos. Qualquer forma de discriminação deve ser eliminada com 100% de certeza."
    },
    {
      id: 4,
      enunciado: "Sobre fotossíntese, qual alternativa parece absurda?",
      alternativas: [
        "A) As plantas convertem luz solar em energia química",
        "B) A fotossíntese ocorre principalmente nas folhas",
        "C) As plantas realizam fotossíntese durante a noite sem luz",
        "D) O oxigênio é um dos produtos da fotossíntese"
      ],
      respostaCorreta: 2,
      eliminador: "Detector de Nonsense",
      explicacao: "Alternativa C é claramente absurda - fotossíntese requer luz, não pode ocorrer sem ela. Confie no bom senso."
    },
    {
      id: 5,
      enunciado: "Em História do Brasil, qual afirmação deve ser eliminada?",
      alternativas: [
        "A) Jamais houve resistência escrava no período colonial",
        "B) Diversos quilombos foram formados como resistência",
        "C) A escravidão foi abolida em 1888",
        "D) Houve várias revoltas e levantes populares"
      ],
      respostaCorreta: 0,
      eliminador: "Lei dos Absolutos",
      explicacao: "'Jamais' é uma palavra absoluta que indica alternativa incorreta. A história comprova extensas resistências escravas."
    },
    {
      id: 6,
      enunciado: "Em Química, as alternativas mostram pH: 1,5 / 7,2 / 7,4 / 11,5 / 14,0. Qual princípio usar?",
      alternativas: [
        "A) Eliminar 7,2 e 7,4 por serem similares",
        "B) Focar em 7,2 e 7,4 por serem similares",
        "C) Escolher sempre o pH neutro",
        "D) Eliminar todos os valores intermediários"
      ],
      respostaCorreta: 1,
      eliminador: "Padrão de Similaridade",
      explicacao: "Quando duas alternativas são muito similares (7,2 e 7,4), uma delas tende a ser correta. Taxa de sucesso: 63%."
    },
    {
      id: 7,
      enunciado: "Sobre o aquecimento global, qual alternativa eliminar?",
      alternativas: [
        "A) Nunca houve variações climáticas naturais na Terra",
        "B) As atividades humanas contribuem para mudanças climáticas",
        "C) O aumento de CO2 está relacionado ao efeito estufa",
        "D) Há debates científicos sobre as causas das mudanças"
      ],
      respostaCorreta: 0,
      eliminador: "Lei dos Absolutos",
      explicacao: "'Nunca' é absoluto e cientificamente incorreto - a Terra teve várias eras glaciais e períodos quentes naturalmente."
    },
    {
      id: 8,
      enunciado: "Questão sobre população: as alternativas são +15%, +12%, -8%, -12%, -15%. Que estratégia usar?",
      alternativas: [
        "A) Escolher o maior valor positivo",
        "B) Focar nos valores opostos (-12% e +12%, -15% e +15%)",
        "C) Eliminar todos os valores negativos",
        "D) Escolher sempre valores positivos"
      ],
      respostaCorreta: 1,
      eliminador: "Regra dos Opostos",
      explicacao: "Alternativas com valores opostos têm alta probabilidade de conter a resposta. Elimine as outras e foque nos opostos."
    },
    {
      id: 9,
      enunciado: "Em Matemática, qual tipo de resposta geralmente NÃO segue a regra da alternativa mais longa?",
      alternativas: [
        "A) Questões de Humanas e Direito",
        "B) Questões de interpretação de texto",
        "C) Questões de cálculo e Exatas",
        "D) Questões dissertativas"
      ],
      respostaCorreta: 2,
      eliminador: "Análise de Comprimento",
      explicacao: "Em Matemática/Exatas, respostas são mais diretas. A regra da alternativa mais longa funciona melhor em Humanas/Direito."
    },
    {
      id: 10,
      enunciado: "Sobre a democracia brasileira, qual alternativa deve ser descartada?",
      alternativas: [
        "A) O Brasil é uma república federativa presidencialista",
        "B) Todos os brasileiros sempre votam conscientemente",
        "C) A Constituição de 1988 estabeleceu direitos fundamentais",
        "D) O voto no Brasil é obrigatório para a maioria da população"
      ],
      respostaCorreta: 1,
      eliminador: "Lei dos Absolutos",
      explicacao: "'Todos' e 'sempre' juntos formam um absoluto impossível. Deve ser eliminado imediatamente."
    },
    {
      id: 11,
      enunciado: "Sobre evolução biológica, qual afirmação é absurda?",
      alternativas: [
        "A) As girafas desenvolveram pescoços longos para alcançar folhas",
        "B) A seleção natural favorece características vantajosas",
        "C) Os seres humanos evoluíram diretamente dos macacos modernos",
        "D) As mutações são uma fonte de variabilidade genética"
      ],
      respostaCorreta: 2,
      eliminador: "Detector de Nonsense",
      explicacao: "Humanos não evoluíram 'diretamente dos macacos modernos' - compartilhamos um ancestral comum. É um erro conceitual clássico."
    },
    {
      id: 12,
      enunciado: "Em uma questão de Literatura, qual alternativa sobre o Modernismo eliminar?",
      alternativas: [
        "A) Jamais houve ruptura com padrões estéticos anteriores",
        "B) A Semana de Arte Moderna de 1922 foi um marco importante",
        "C) Oswald de Andrade foi um dos principais representantes",
        "D) O movimento buscava uma identidade cultural brasileira"
      ],
      respostaCorreta: 0,
      eliminador: "Lei dos Absolutos",
      explicacao: "'Jamais' é absoluto. O Modernismo foi justamente marcado pela ruptura com padrões anteriores."
    },
    {
      id: 13,
      enunciado: "Valores de temperatura: -273°C, -50°C, 25°C, 100°C, 5000°C. Qual estratégia?",
      alternativas: [
        "A) Escolher a temperatura ambiente (25°C)",
        "B) Eliminar extremos (-273°C e 5000°C)",
        "C) Focar nos valores negativos",
        "D) Sempre escolher temperaturas positivas"
      ],
      respostaCorreta: 1,
      eliminador: "Regra dos Extremos",
      explicacao: "Valores extremos raramente são corretos. -273°C (zero absoluto) e 5000°C são extremos improváveis na maioria dos contextos."
    },
    {
      id: 14,
      enunciado: "Sobre direitos das mulheres, qual alternativa deve ser eliminada?",
      alternativas: [
        "A) A luta feminista conquistou direitos ao longo da história",
        "B) A discriminação de gênero ainda é um problema social",
        "C) As mulheres são naturalmente inferiores em capacidade intelectual",
        "D) A igualdade de gênero é um objetivo da sociedade moderna"
      ],
      respostaCorreta: 2,
      eliminador: "Detector Ético-Social",
      explicacao: "Machismo e discriminação de gênero NUNCA serão resposta correta no ENEM. Eliminação com 100% de certeza."
    },
    {
      id: 15,
      enunciado: "Questão de Geografia com valores: +2,5%, +2,3%, -1,8%, -10,5%, +15,2%. Que fazer?",
      alternativas: [
        "A) Eliminar os extremos e focar em valores intermediários",
        "B) Escolher sempre valores positivos",
        "C) Ignorar sinais e escolher o maior número",
        "D) Escolher o menor valor absoluto"
      ],
      respostaCorreta: 0,
      eliminador: "Regra dos Extremos",
      explicacao: "Elimine extremos (-10,5% e +15,2%) e foque nos valores intermediários (+2,5%, +2,3%, -1,8%). Taxa de acerto: 78%."
    }
  ];

  const handleResposta = (alternativaIndex: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = alternativaIndex;
    setRespostas(novasRespostas);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      calcularResultado();
    }
  };

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const calcularResultado = () => {
    let pontos = 0;
    respostas.forEach((resposta, index) => {
      if (resposta === questoes[index].respostaCorreta) {
        pontos++;
      }
    });
    setAcertos(pontos);
    setMostrarResultado(true);
  };

  const reiniciar = () => {
    setQuestaoAtual(0);
    setRespostas(Array(15).fill(null));
    setMostrarResultado(false);
    setAcertos(0);
  };

  const progresso = ((questaoAtual + 1) / questoes.length) * 100;
  const questao = questoes[questaoAtual];
  const respostaSelecionada = respostas[questaoAtual];
  const jaRespondeu = respostaSelecionada !== null;

  if (mostrarResultado) {
    const porcentagem = (acertos / questoes.length) * 100;
    const aprovado = porcentagem >= 70;

    return (
      <div className="space-y-6">
        <Card className={`border-2 ${aprovado ? "border-green-500" : "border-yellow-500"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {aprovado ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <Target className="h-8 w-8 text-yellow-500" />
              )}
              Resultado do Drill de Eliminadores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">
                {acertos}/{questoes.length}
              </div>
              <div className="text-2xl font-semibold">
                {porcentagem.toFixed(0)}% de acerto
              </div>
              
              <div className={`p-6 rounded-lg ${aprovado ? "bg-green-500/10 border-2 border-green-500" : "bg-yellow-500/10 border-2 border-yellow-500"}`}>
                {aprovado ? (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-500">🎉 Excelente! Você dominou os eliminadores!</p>
                    <p className="text-muted-foreground">
                      Você está pronto para aplicar essas técnicas no ENEM. Continue praticando!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-yellow-500">📚 Continue estudando!</p>
                    <p className="text-muted-foreground">
                      Revise os conceitos dos eliminadores e tente novamente. Recomendamos acertar pelo menos 70%.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Análise por Eliminador:</h3>
              {Object.entries(
                questoes.reduce((acc, q, idx) => {
                  const eliminador = q.eliminador;
                  if (!acc[eliminador]) {
                    acc[eliminador] = { total: 0, acertos: 0 };
                  }
                  acc[eliminador].total++;
                  if (respostas[idx] === q.respostaCorreta) {
                    acc[eliminador].acertos++;
                  }
                  return acc;
                }, {} as Record<string, { total: number; acertos: number }>)
              ).map(([eliminador, dados]) => (
                <div key={eliminador} className="p-3 rounded-lg bg-secondary">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{eliminador}</span>
                    <span className="text-sm">
                      {dados.acertos}/{dados.total}
                    </span>
                  </div>
                  <Progress 
                    value={(dados.acertos / dados.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={reiniciar}
                className="flex-1 p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-colors"
              >
                🔄 Fazer Novamente
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Drill de Treinamento dos Eliminadores
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            15 questões práticas para dominar as técnicas de eliminação
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Questão {questaoAtual + 1} de {questoes.length}
              </span>
              <span className="font-semibold text-primary">
                {Math.round(progresso)}%
              </span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>

          {/* Questão */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  {questao.id}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-medium">{questao.enunciado}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Eliminador testado: <span className="font-semibold text-primary">{questao.eliminador}</span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {questao.alternativas.map((alt, index) => {
                const selecionada = respostaSelecionada === index;
                const correta = index === questao.respostaCorreta;
                
                let estilo = "border hover:border-primary hover:bg-primary/5";
                if (jaRespondeu) {
                  if (correta) {
                    estilo = "border-2 border-green-500 bg-green-500/10";
                  } else if (selecionada && !correta) {
                    estilo = "border-2 border-red-500 bg-red-500/10";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !jaRespondeu && handleResposta(index)}
                    disabled={jaRespondeu}
                    className={`w-full text-left p-4 rounded-lg transition-all ${estilo} ${jaRespondeu ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-3">
                      {jaRespondeu && correta && (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      )}
                      {jaRespondeu && selecionada && !correta && (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                      <span className="text-sm">{alt}</span>
                    </div>
                  </button>
                );
              })}

              {/* Explicação */}
              {jaRespondeu && (
                <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <p className="text-sm font-semibold text-blue-500 mb-2">💡 Explicação:</p>
                  <p className="text-sm text-muted-foreground">{questao.explicacao}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={questaoAnterior}
              disabled={questaoAtual === 0}
              className="px-6 py-2 rounded-lg border hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>

            {jaRespondeu && (
              <button
                onClick={proximaQuestao}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
              >
                {questaoAtual === questoes.length - 1 ? "Ver Resultado 🎯" : "Próxima →"}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
