import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export function MetodoSherlockHolmes() {
  const [testeResultado, setTesteResultado] = useState<string>("");

  const eliminadores = [
    {
      numero: 1,
      titulo: "REGRA DOS EXTREMOS",
      principio: "Em questões numéricas, valores extremos (muito altos/baixos) raramente são corretos",
      aplicacao: "Se as alternativas são: 2, 15, 47, 89, 156 → elimine 2 e 156",
      taxa: "78% das vezes a resposta está nos valores intermediários"
    },
    {
      numero: 2,
      titulo: "LEI DOS ABSOLUTOS",
      principio: "Palavras como 'sempre', 'nunca', 'jamais', 'todos' indicam alternativas incorretas",
      aplicacao: "Exemplo: 'Todos os brasileiros...' ou 'Jamais ocorre que...' → ELIMINE",
      taxa: "Exceção: Leis científicas universais (velocidade da luz, gravidade)"
    },
    {
      numero: 3,
      titulo: "DETECTOR DE NONSENSE",
      principio: "Alternativas absurdas existem para confundir",
      aplicacao: "Sinais: Informações claramente falsas, anacronismos históricos, impossibilidades físicas",
      taxa: "Confie no bom senso - se algo parece absurdo, provavelmente é"
    },
    {
      numero: 4,
      titulo: "ANÁLISE DE COMPRIMENTO",
      principio: "Em Humanas/Direito, a alternativa correta tende a ser mais longa e detalhada",
      aplicacao: "Razão: Elaboradores querem evitar recursos por imprecisão",
      taxa: "Exceção: Matemática/Exatas, onde respostas são mais diretas"
    },
    {
      numero: 5,
      titulo: "PADRÃO DE SIMILARIDADE",
      principio: "Quando duas alternativas são muito similares, uma delas tende a ser correta",
      aplicacao: "Exemplo: Se tem '12,5' e '12,7' entre opções muito diferentes, foque nestas duas",
      taxa: "63% quando aplicado corretamente"
    },
    {
      numero: 6,
      titulo: "REGRA DOS OPOSTOS",
      principio: "Alternativas com valores opostos (+10 e -10) têm alta probabilidade de conter a resposta",
      aplicacao: "Elimine as outras e foque nos opostos. Analise qual faz mais sentido no contexto",
      taxa: "Alta eficácia quando identificado"
    },
    {
      numero: 7,
      titulo: "DETECTOR ÉTICO-SOCIAL",
      principio: "O ENEM JAMAIS terá como resposta algo que contrarie direitos humanos",
      aplicacao: "Exemplos a eliminar: Discriminação racial, machismo, homofobia, autoritarismo",
      taxa: "100% de certeza de eliminação"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Técnica dos 7 Eliminadores Fatais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {eliminadores.map((elim) => (
            <Card key={elim.numero} className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {elim.numero}
                  </span>
                  {elim.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-primary">Princípio:</p>
                  <p className="text-sm text-muted-foreground">{elim.principio}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Aplicação:</p>
                  <p className="text-sm text-muted-foreground">{elim.aplicacao}</p>
                </div>
                <div className="p-2 rounded bg-secondary">
                  <p className="text-xs font-semibold">{elim.taxa}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-gold/30 bg-gold/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-gold" />
                Drill de Treinamento dos Eliminadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">EXERCÍCIO DIÁRIO (15 minutos):</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Pegue 10 questões de qualquer simulado</li>
                  <li>Aplique os 7 eliminadores SEM ler o enunciado completo</li>
                  <li>Registre quantas alternativas conseguiu eliminar</li>
                  <li>Meta: eliminar 2-3 alternativas por questão em 90% dos casos</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-background border">
                <p className="text-sm font-semibold mb-3">Teste seu conhecimento dos eliminadores:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm mb-2">Qual alternativa você eliminaria primeiro?</p>
                    <div className="space-y-2">
                      {[
                        "A) Todos os brasileiros sempre preferem futebol",
                        "B) A maioria dos brasileiros aprecia esportes",
                        "C) Muitos brasileiros gostam de futebol",
                        "D) Alguns brasileiros praticam esportes regularmente"
                      ].map((alt) => (
                        <button
                          key={alt}
                          onClick={() => {
                            if (alt.startsWith("A)")) {
                              setTesteResultado("✅ Correto! Alternativa com 'Todos' e 'sempre' deve ser eliminada (Lei dos Absolutos)");
                            } else {
                              setTesteResultado("❌ Tente novamente! Lembre-se da Lei dos Absolutos");
                            }
                          }}
                          className="w-full text-left p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors text-sm"
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                    {testeResultado && (
                      <div className={`mt-3 p-3 rounded-lg ${testeResultado.startsWith("✅") ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
                        <p className="text-sm">{testeResultado}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}