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
                <CardContent className="space-y-6">
                  {/* FÍSICA */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-primary">FÍSICA - 25 Conceitos Essenciais</h3>
                    
                    <div>
                      <h4 className="font-semibold mb-3">MECÂNICA (10 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Movimento uniforme - v = s/t",
                          "Movimento uniformemente variado - equações de Torricelli",
                          "Leis de Newton - inércia, F=ma, ação-reação",
                          "Energia cinética - Ec = mv²/2",
                          "Energia potencial - Ep = mgh",
                          "Conservação da energia - transformações energéticas",
                          "Impulso e quantidade de movimento - I = Ft",
                          "Gravitação universal - lei de Newton",
                          "Hidrostática - pressão, empuxo, densidade",
                          "Trabalho e potência - W = F·d"
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
                      <h4 className="font-semibold mb-3">TERMOLOGIA (5 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Calor sensível - Q = mcΔT",
                          "Calor latente - mudanças de estado",
                          "Dilatação térmica - linear, superficial, volumétrica",
                          "Gases ideais - transformações gasosas",
                          "Termodinâmica - primeira e segunda leis"
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
                      <h4 className="font-semibold mb-3">ONDULATÓRIA (5 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Características das ondas - amplitude, frequência, período",
                          "Velocidade das ondas - v = λf",
                          "Reflexão e refração - leis básicas",
                          "Interferência - construtiva e destrutiva",
                          "Som - características e propagação"
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
                      <h4 className="font-semibold mb-3">ELETROMAGNETISMO (5 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Lei de Coulomb - força elétrica",
                          "Campo elétrico - intensidade e direção",
                          "Potencial elétrico - trabalho e energia",
                          "Corrente elétrica - i = Q/t",
                          "Lei de Ohm - V = Ri"
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
                  </div>

                  {/* QUÍMICA */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-bold text-primary">QUÍMICA - 25 Conceitos Essenciais</h3>
                    
                    <div>
                      <h4 className="font-semibold mb-3">QUÍMICA GERAL (10 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Estrutura atômica - prótons, nêutrons, elétrons",
                          "Tabela periódica - grupos, períodos, propriedades",
                          "Ligações químicas - iônica, covalente, metálica",
                          "Geometria molecular - formas espaciais",
                          "Polaridade - moléculas polares e apolares",
                          "Forças intermoleculares - van der Waals, pontes de hidrogênio",
                          "Estados físicos - sólido, líquido, gasoso",
                          "Mudanças de estado - fusão, vaporização, sublimação",
                          "Soluções - concentração, diluição, mistura",
                          "pH e pOH - escala de acidez e basicidade"
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
                      <h4 className="font-semibold mb-3">FÍSICO-QUÍMICA (8 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Termoquímica - calor de reação, entalpia",
                          "Cinética química - velocidade das reações",
                          "Equilíbrio químico - constantes, deslocamento",
                          "Eletrólise - decomposição por corrente elétrica",
                          "Pilhas e baterias - oxidação e redução",
                          "Radioatividade - emissões alfa, beta, gama",
                          "Meia-vida - tempo de decaimento",
                          "Energia nuclear - fissão e fusão"
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
                      <h4 className="font-semibold mb-3">QUÍMICA ORGÂNICA (7 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Hidrocarbonetos - alcanos, alcenos, alcinos",
                          "Funções orgânicas - álcool, aldeído, cetona, ácido",
                          "Isomeria - estrutural e espacial",
                          "Reações orgânicas - substituição, adição, eliminação",
                          "Polímeros - adição e condensação",
                          "Petróleo - frações e derivados",
                          "Biomoléculas - carboidratos, lipídios, proteínas"
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
                  </div>

                  {/* BIOLOGIA */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-bold text-primary">BIOLOGIA - 25 Conceitos Essenciais</h3>
                    
                    <div>
                      <h4 className="font-semibold mb-3">CITOLOGIA (8 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Membrana plasmática - permeabilidade, transporte",
                          "Núcleo celular - DNA, RNA, cromossomos",
                          "Ribossomos - síntese de proteínas",
                          "Mitocôndrias - respiração celular, ATP",
                          "Retículo endoplasmático - liso e rugoso",
                          "Aparelho de Golgi - modificação e secreção",
                          "Lisossomos - digestão intracelular",
                          "Divisão celular - mitose e meiose"
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
                      <h4 className="font-semibold mb-3">GENÉTICA (9 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Leis de Mendel - primeira e segunda leis",
                          "Cruzamentos - monoibridismo e diibridismo",
                          "Codominância - alelos múltiplos",
                          "Herança ligada ao sexo - cromossomos X e Y",
                          "Mutações - gênicas e cromossômicas",
                          "Biotecnologia - clonagem, transgênicos",
                          "Projeto Genoma - sequenciamento do DNA",
                          "Terapia gênica - correção de defeitos genéticos",
                          "Células-tronco - tipos e aplicações"
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
                      <h4 className="font-semibold mb-3">ECOLOGIA (8 tópicos)</h4>
                      <div className="space-y-2">
                        {[
                          "Cadeias alimentares - produtores, consumidores, decompositores",
                          "Pirâmides ecológicas - energia, biomassa, números",
                          "Ciclos biogeoquímicos - carbono, nitrogênio, fósforo",
                          "Sucessão ecológica - primária e secundária",
                          "Biomas brasileiros - Amazônia, Cerrado, Caatinga, Mata Atlântica",
                          "Poluição ambiental - ar, água, solo",
                          "Aquecimento global - efeito estufa, mudanças climáticas",
                          "Desenvolvimento sustentável - recursos renováveis e não renováveis"
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="humanas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CIÊNCIAS HUMANAS - 75 Marcos Históricos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* HISTÓRIA DO BRASIL */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-primary">HISTÓRIA DO BRASIL - 40 Eventos Cruciais</h3>
                    
                    <div>
                      <h4 className="font-semibold mb-3">BRASIL COLONIAL (12 marcos)</h4>
                      <div className="space-y-2">
                        {[
                          "1500 - Descobrimento - Pedro Álvares Cabral",
                          "1534 - Capitanias hereditárias - sistema de colonização",
                          "1549 - Governo-geral - centralização administrativa",
                          "1580-1640 - União Ibérica - domínio espanhol",
                          "Invasões holandesas (1624-1654) - Nordeste açucareiro",
                          "Entradas e bandeiras (séc. XVII) - expansão territorial",
                          "Guerra dos Emboabas (1707-1709) - conflito nas Minas",
                          "Guerra dos Mascates (1710-1711) - Pernambuco",
                          "Revolução de 1817 - republicanismo em Pernambuco",
                          "Transferência da corte (1808) - família real no Brasil",
                          "Revolução Pernambucana (1817) - primeiro movimento republicano",
                          "1822 - Independência - 7 de setembro"
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
                      <h4 className="font-semibold mb-3">BRASIL IMPÉRIO (13 marcos)</h4>
                      <div className="space-y-2">
                        {[
                          "Primeiro Reinado (1822-1831) - Dom Pedro I",
                          "Abdicação (1831) - crise política",
                          "Período Regencial (1831-1840) - regências e revoltas",
                          "Cabanagem (1835-1840) - Pará",
                          "Sabinada (1837-1838) - Bahia",
                          "Balaiada (1838-1841) - Maranhão",
                          "Revolução Farroupilha (1835-1845) - Rio Grande do Sul",
                          "Segundo Reinado (1840-1889) - Dom Pedro II",
                          "Guerra do Paraguai (1864-1870) - Tríplice Aliança",
                          "Lei Áurea (1888) - abolição da escravidão",
                          "Questão religiosa - conflito Estado-Igreja",
                          "Questão militar - Exército vs. Governo",
                          "Proclamação da República (1889) - 15 de novembro"
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
                      <h4 className="font-semibold mb-3">BRASIL REPÚBLICA (15 marcos)</h4>
                      <div className="space-y-2">
                        {[
                          "República da Espada (1889-1894) - militares no poder",
                          "República Oligárquica (1894-1930) - café com leite",
                          "Guerra de Canudos (1896-1897) - Antônio Conselheiro",
                          "Revolta da Vacina (1904) - Rio de Janeiro",
                          "Semana de Arte Moderna (1922) - modernismo",
                          "Revolução de 1930 - fim da República Velha",
                          "Era Vargas (1930-1945) - autoritarismo e trabalhismo",
                          "Estado Novo (1937-1945) - ditadura varguista",
                          "Redemocratização (1945-1964) - período democrático",
                          "Golpe de 1964 - início da ditadura militar",
                          "AI-5 (1968) - endurecimento da ditadura",
                          "Abertura política (1979-1985) - distensão gradual",
                          "Diretas Já (1984) - movimento pelas eleições diretas",
                          "Nova República (1985) - fim da ditadura",
                          "Constituição de 1988 - promulgação da Carta Cidadã"
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
                  </div>

                  {/* HISTÓRIA MUNDIAL */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-bold text-primary">HISTÓRIA MUNDIAL - 35 Eventos Essenciais</h3>
                    
                    <div>
                      <h4 className="font-semibold mb-3">IDADE MODERNA (15 eventos)</h4>
                      <div className="space-y-2">
                        {[
                          "Renascimento (séc. XV-XVI) - humanismo, arte",
                          "Grandes navegações (séc. XV-XVI) - expansão marítima",
                          "Reforma Protestante (1517) - Martinho Lutero",
                          "Absolutismo (séc. XVI-XVIII) - poder real centralizado",
                          "Iluminismo (séc. XVIII) - razão e liberdade",
                          "Revolução Inglesa (1640-1688) - monarquia constitucional",
                          "Independência dos EUA (1776) - primeira república moderna",
                          "Revolução Francesa (1789) - liberdade, igualdade, fraternidade",
                          "Era Napoleônica (1799-1815) - expansão francesa",
                          "Congresso de Viena (1815) - reorganização da Europa",
                          "Revolução Industrial (séc. XVIII-XIX) - mecanização",
                          "Nacionalismo (séc. XIX) - unificações alemã e italiana",
                          "Imperialismo (séc. XIX) - partilha da África e Ásia",
                          "Guerra Franco-Prussiana (1870-1871) - unificação alemã",
                          "Belle Époque (1871-1914) - prosperidade europeia"
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
                      <h4 className="font-semibold mb-3">IDADE CONTEMPORÂNEA (20 eventos)</h4>
                      <div className="space-y-2">
                        {[
                          "Primeira Guerra Mundial (1914-1918) - Grande Guerra",
                          "Revolução Russa (1917) - fim do czarismo",
                          "Crise de 1929 - quebra da bolsa de Nova York",
                          "Fascismo e nazismo (1920-1945) - totalitarismo",
                          "Segunda Guerra Mundial (1939-1945) - maior conflito da história",
                          "Holocausto (1941-1945) - genocídio judeu",
                          "Guerra Fria (1947-1991) - EUA vs. URSS",
                          "Descolonização (1945-1975) - independência afro-asiática",
                          "Revolução Cubana (1959) - socialismo na América",
                          "Construção do Muro de Berlim (1961) - divisão alemã",
                          "Revolução Sexual (1960) - mudanças comportamentais",
                          "Chegada à Lua (1969) - corrida espacial",
                          "Crise do petróleo (1973) - choque energético",
                          "Revolução Iraniana (1979) - teocracia islâmica",
                          "Queda do Muro de Berlim (1989) - fim da Guerra Fria",
                          "Fim da URSS (1991) - dissolução soviética",
                          "Atentado de 11 de setembro (2001) - terrorismo global",
                          "Crise de 2008 - colapso financeiro mundial",
                          "Primavera Árabe (2010-2012) - revoltas no mundo árabe",
                          "Pandemia de COVID-19 (2020-2022) - crise sanitária global"
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