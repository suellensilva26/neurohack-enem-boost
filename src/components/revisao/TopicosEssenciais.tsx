import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare } from "lucide-react";
import { useState } from "react";

export function TopicosEssenciais() {
  const [checkedTopics, setCheckedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem("revisao-topicos-checked");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleTopic = (topic: string) => {
    const newChecked = checkedTopics.includes(topic)
      ? checkedTopics.filter(t => t !== topic)
      : [...checkedTopics, topic];
    setCheckedTopics(newChecked);
    localStorage.setItem("revisao-topicos-checked", JSON.stringify(newChecked));
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Os 240 Tópicos Que Salvam Sua Vida</CardTitle>
          <p className="text-sm text-muted-foreground">
            Apenas estes tópicos respondem por <strong>85% das questões do ENEM</strong>
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="matematica" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="matematica">Matemática</TabsTrigger>
              <TabsTrigger value="portugues">Português</TabsTrigger>
              <TabsTrigger value="natureza">Natureza</TabsTrigger>
              <TabsTrigger value="humanas">Humanas</TabsTrigger>
            </TabsList>

            <TabsContent value="matematica" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">MATEMÁTICA - 40 Conceitos Inegociáveis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 1 - Funções e Gráficos (12 tópicos)</h4>
                    <div className="space-y-2">
                      {[
                        "Função do 1º grau - f(x) = ax + b",
                        "Função do 2º grau - vértice, raízes, concavidade",
                        "Função exponencial - crescimento e decrescimento",
                        "Função logarítmica - propriedades básicas",
                        "Interpretação de gráficos - máximos, mínimos, intervalos",
                        "Função modular - gráfico em V",
                        "Função inversa - reflexão pela bissetriz",
                        "Composição de funções - f(g(x))",
                        "Domínio e imagem - conjuntos de definição",
                        "Taxa de variação - interpretação geométrica",
                        "Sistemas lineares - método de substituição",
                        "Inequações - resolução gráfica"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 2 - Geometria Essencial (15 tópicos)</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {[
                        "Área de triângulos - fórmula de Heron",
                        "Área de quadriláteros",
                        "Área de círculo - π × r²",
                        "Perímetro de figuras",
                        "Teorema de Pitágoras - a² + b² = c²",
                        "Relações trigonométricas - sen, cos, tg",
                        "Lei dos senos e cossenos",
                        "Volume de prismas",
                        "Volume de pirâmides",
                        "Volume de cilindros",
                        "Volume de cones",
                        "Volume de esferas",
                        "Semelhança de triângulos",
                        "Geometria analítica - distância entre pontos",
                        "Equações de retas"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 3 - Estatística e Combinatória (8 tópicos)</h4>
                    <div className="space-y-2">
                      {[
                        "Média aritmética",
                        "Mediana - valor central",
                        "Moda - valor mais frequente",
                        "Desvio padrão",
                        "Princípio fundamental da contagem",
                        "Arranjos - ordem importa",
                        "Combinações - ordem não importa",
                        "Probabilidade básica"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 4 - Aplicações Práticas (5 tópicos)</h4>
                    <div className="space-y-2">
                      {[
                        "Regra de três simples",
                        "Regra de três composta",
                        "Porcentagem - aumentos e descontos",
                        "Juros simples - J = C × i × t",
                        "Progressões - PA e PG"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portugues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PORTUGUÊS - 50 Pontos de Ouro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 1 - Interpretação Textual (15 tópicos)</h4>
                    <div className="space-y-2">
                      {[
                        "Ideia central do texto",
                        "Argumentos principais",
                        "Inferências diretas e complexas",
                        "Função dos parágrafos",
                        "Conectivos lógicos",
                        "Referenciação - pronomes",
                        "Polissemia",
                        "Ironia e sarcasmo",
                        "Linguagem figurada",
                        "Registro linguístico",
                        "Variação linguística",
                        "Intertextualidade",
                        "Tipologia textual",
                        "Gêneros textuais",
                        "Ambiguidade"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 2 - Gramática Aplicada (15 tópicos)</h4>
                    <div className="space-y-2">
                      {[
                        "Concordância verbal",
                        "Concordância nominal",
                        "Regência verbal",
                        "Regência nominal",
                        "Crase - fusão de preposições",
                        "Pronomes relativos",
                        "Colocação pronominal",
                        "Verbos irregulares",
                        "Modo subjuntivo",
                        "Vozes verbais",
                        "Figuras de linguagem",
                        "Vícios de linguagem",
                        "Pontuação",
                        "Acentuação",
                        "Ortografia"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">BLOCO 3 - Literatura Brasileira (20 tópicos)</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {[
                        "Barroco - Gregório de Matos",
                        "Arcadismo",
                        "Romantismo - José de Alencar",
                        "Realismo - Machado de Assis",
                        "Naturalismo",
                        "Parnasianismo",
                        "Simbolismo - Cruz e Sousa",
                        "Pré-Modernismo",
                        "Modernismo 1ª fase - Oswald",
                        "Modernismo 2ª fase - Drummond",
                        "Modernismo 3ª fase - Guimarães Rosa",
                        "Literatura contemporânea",
                        "Tropicalismo",
                        "Concretismo",
                        "Teatro brasileiro",
                        "Literatura afro-brasileira",
                        "Literatura feminina",
                        "Literatura indígena",
                        "Literatura regional",
                        "Poesia marginal"
                      ].map((topic) => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded text-sm">
                          <input
                            type="checkbox"
                            checked={checkedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <span className={checkedTopics.includes(topic) ? "line-through text-muted-foreground" : ""}>
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="natureza" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CIÊNCIAS DA NATUREZA - 75 Conceitos Vitais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Física (25) + Química (25) + Biologia (25) = Aprovação garantida
                  </p>
                  <div className="p-4 rounded-lg bg-primary/10">
                    <p className="text-sm">
                      Conteúdo completo de todos os 75 conceitos disponível no PDF para download
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="humanas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CIÊNCIAS HUMANAS - 75 Marcos Históricos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    História do Brasil (40) + História Mundial (35) = Domínio completo
                  </p>
                  <div className="p-4 rounded-lg bg-primary/10">
                    <p className="text-sm">
                      Linha do tempo completa com todos os marcos históricos disponível no PDF
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-between p-4 rounded-lg bg-secondary">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold">Seu Progresso:</span>
            </div>
            <span className="text-2xl font-bold text-primary">
              {checkedTopics.length}/240
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}