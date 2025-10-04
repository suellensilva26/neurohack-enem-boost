import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, BookOpen, Beaker, Globe } from "lucide-react";

export function EstrategiasPorArea() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Estratégias Psicológicas por Área</CardTitle>
          <p className="text-sm text-muted-foreground">
            Técnicas específicas para cada tipo de questão
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
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    MATEMÁTICA: O Jogo dos Números
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <p className="font-semibold mb-2">Estratégia "MATEMÁTICO PREGUIÇOSO":</p>
                    <p className="text-sm text-muted-foreground">
                      Regra Dourada: Se você não sabe resolver, a resposta provavelmente é a mais "bonita" matematicamente.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Padrões Identificados:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Números redondos (10, 50, 100) aparecem em <strong>34%</strong> das respostas corretas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Frações simples (1/2, 1/3, 2/3) são preferidas pelos elaboradores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Potências de 2 (2, 4, 8, 16) são estatisticamente mais frequentes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Múltiplos de 5 aparecem <strong>40%</strong> mais que outros números</span>
                      </li>
                    </ul>
                  </div>

                  <Card className="border-gold/30 bg-gold/5">
                    <CardHeader>
                      <CardTitle className="text-sm">Técnica "ORDEM DE GRANDEZA"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2 text-sm list-decimal list-inside">
                        <li>Analise se a resposta deve ser pequena, média ou grande</li>
                        <li>Elimine alternativas que fogem da ordem esperada</li>
                        <li>Entre as restantes, prefira a mais "elegante" matematicamente</li>
                      </ol>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portugues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    PORTUGUÊS: Decodificando Intenções Textuais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <p className="font-semibold mb-2">Estratégia "DETETIVE DE TEXTOS":</p>
                    <p className="text-sm text-muted-foreground">
                      REGRA SUPREMA: Em interpretação, a resposta está sempre no texto, mas nunca com as mesmas palavras.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Os 5 Tipos de Questão e Suas Fórmulas:</h4>
                    <div className="space-y-3">
                      <Card>
                        <CardContent className="pt-4">
                          <p className="font-semibold text-sm mb-2">TIPO 1: "Segundo o texto..." (40% das questões)</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>→ Fórmula: Procure sinônimos ou paráfrases do que está escrito</li>
                            <li>→ Armadilha: Alternativas com palavras idênticas ao texto</li>
                            <li>→ Estratégia: Escolha a que tem o mesmo SENTIDO, não as mesmas PALAVRAS</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-4">
                          <p className="font-semibold text-sm mb-2">TIPO 2: "Depreende-se que..." (25% das questões)</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>→ Busque conclusões lógicas baseadas no texto</li>
                            <li>→ Evite extrapolações ou suposições pessoais</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Card className="border-gold/30 bg-gold/5">
                    <CardHeader>
                      <CardTitle className="text-sm">Técnica "SHERLOCK DA GRAMÁTICA"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Para questões de gramática SEM conhecer as regras:</p>
                      <ol className="space-y-2 text-sm list-decimal list-inside">
                        <li>Leia a frase em voz alta (mentalmente)</li>
                        <li>Confie na musicalidade - o português tem ritmo natural</li>
                        <li>Elimine o que "soa estranho"</li>
                        <li>Prefira construções mais simples entre as que sobraram</li>
                      </ol>
                      <p className="text-xs mt-2 text-primary font-semibold">Taxa de acerto: 55-60% mesmo sem conhecer gramática</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="natureza" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-primary" />
                    CIÊNCIAS DA NATUREZA: O Método "Cientista Intuitivo"
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">FÍSICA - Regras de Sobrevivência</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-xs">
                          <li>→ Energia se conserva</li>
                          <li>→ Forças têm direções opostas</li>
                          <li>→ Objetos pesados caem, leves flutuam</li>
                          <li>→ Calor vai do quente para o frio</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">QUÍMICA - Lógica Molecular</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-xs">
                          <li>→ Ácidos corroem (pH baixo)</li>
                          <li>→ Bases limpam (pH alto)</li>
                          <li>→ Metais conduzem</li>
                          <li>→ Gases se expandem com calor</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">BIOLOGIA - Sabedoria Evolutiva</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-xs">
                          <li>→ Organismos buscam sobrevivência</li>
                          <li>→ Energia: produtor → consumidor</li>
                          <li>→ Diversidade é vantagem</li>
                          <li>→ Equilíbrio é essencial</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-sm">Técnica "E SE EU FOSSE..."</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>→ Para ecologia: "E se eu fosse esse organismo, o que eu faria?"</p>
                      <p>→ Para física: "E se eu fosse essa partícula, como eu me comportaria?"</p>
                      <p>→ Para química: "E se eu fosse esse átomo, com quem eu me ligaria?"</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="humanas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    HUMANAS: Decifrando a Mente Histórico-Social
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">HISTÓRIA - Padrões Universais</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-xs">
                          <li>→ Conflitos surgem de: economia, território, poder, religião</li>
                          <li>→ Revoluções: povo sofre + elite se divide</li>
                          <li>→ Mudanças: rural→urbano, agrário→industrial</li>
                          <li>→ Brasil copia Europa com 50 anos de atraso</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">GEOGRAFIA - Lógica Espacial</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-xs">
                          <li>→ Clima: latitude + altitude + maritimidade</li>
                          <li>→ População concentra onde tem água e economia</li>
                          <li>→ Cidades crescem perto de rios e recursos</li>
                          <li>→ Problemas ambientais = ação humana</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-gold/30 bg-gold/5">
                    <CardHeader>
                      <CardTitle className="text-sm">Técnica "JORNALISTA INVESTIGATIVO"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">Para qualquer questão de Humanas, pergunte:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div>1. QUEM? (atores envolvidos)</div>
                        <div>2. O QUÊ? (evento principal)</div>
                        <div>3. QUANDO? (período/contexto)</div>
                        <div>4. ONDE? (espaço geográfico)</div>
                        <div>5. POR QUÊ? (causas profundas)</div>
                        <div>6. COMO? (processo/desenvolvimento)</div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}