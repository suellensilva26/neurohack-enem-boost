import { useState } from "react";
import { ArrowLeft, CheckCircle, FileText, Brain, Target, Zap, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FreemiumBlocker from "@/components/freemium/FreemiumBlocker";

const MODULOS = [
  { id: 1, title: "Identificação de Padrões Matemáticos", completed: false },
  { id: 2, title: "Padrões Linguísticos do ENEM", completed: false },
  { id: 3, title: "Ciclos Temáticos por Área", completed: false },
  { id: 4, title: "Estrutura das Questões", completed: false },
  { id: 5, title: "Padrões de Alternativas", completed: false },
  { id: 6, title: "Sazonalidade dos Conteúdos", completed: false },
  { id: 7, title: "Técnicas de Reconhecimento", completed: false },
  { id: 8, title: "Aplicação Prática", completed: false },
  { id: 9, title: "Simulado de Padrões", completed: false },
  { id: 10, title: "Estratégias Avançadas", completed: false },
];

const PADROES_MATEMATICOS = [
  {
    categoria: "Funções",
    padroes: [
      "Questões de função do 1º grau sempre apresentam crescimento/decrescimento linear",
      "Funções do 2º grau têm vértice calculado com fórmula -b/2a",
      "Funções exponenciais crescem mais rapidamente que as lineares",
      "Funções logarítmicas são sempre crescentes quando base > 1"
    ]
  },
  {
    categoria: "Geometria",
    padroes: [
      "Área do triângulo = (base × altura)/2",
      "Volume do cilindro = πr²h",
      "Teorema de Pitágoras: a² + b² = c²",
      "Área do círculo = πr²"
    ]
  },
  {
    categoria: "Probabilidade",
    padroes: [
      "P(A) = casos favoráveis / casos possíveis",
      "Probabilidade complementar: P(A') = 1 - P(A)",
      "Eventos independentes: P(A ∩ B) = P(A) × P(B)",
      "Probabilidade condicional: P(A|B) = P(A ∩ B) / P(B)"
    ]
  }
];

const PADROES_LINGUISTICOS = [
  {
    tipo: "Interpretação de Texto",
    caracteristicas: [
      "Textos sempre têm entre 15-25 linhas",
      "Questões pedem inferência, não informação explícita",
      "Respostas corretas são parafráseis do texto",
      "Alternativas incorretas contêm informações do texto fora de contexto"
    ]
  },
  {
    tipo: "Gramática",
    caracteristicas: [
      "Concordância verbal: sujeito + verbo no mesmo número",
      "Regência: verbo + preposição obrigatória",
      "Crase: antes de substantivo feminino",
      "Pontuação: vírgula separa adjunto adverbial"
    ]
  }
];

export default function PadroesEnemFuncional() {
  const [moduloAtual, setModuloAtual] = useState(1);
  const [progresso, setProgresso] = useState(0);
  const [modulosCompletos, setModulosCompletos] = useState<number[]>([]);

  const modulo = MODULOS[moduloAtual - 1];
  const progressoGeral = (modulosCompletos.length / MODULOS.length) * 100;

  const marcarModuloCompleto = () => {
    if (!modulosCompletos.includes(moduloAtual)) {
      setModulosCompletos([...modulosCompletos, moduloAtual]);
      setProgresso(100);
    }
  };

  const proximoModulo = () => {
    if (moduloAtual < MODULOS.length) {
      setModuloAtual(moduloAtual + 1);
      setProgresso(0);
    }
  };

  const moduloAnterior = () => {
    if (moduloAtual > 1) {
      setModuloAtual(moduloAtual - 1);
      setProgresso(modulosCompletos.includes(moduloAtual - 1) ? 100 : 0);
    }
  };

  const renderModuloContent = () => {
    switch (moduloAtual) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  Padrões Matemáticos Identificados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {PADROES_MATEMATICOS.map((categoria, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-lg mb-3 text-primary">{categoria.categoria}</h4>
                      <ul className="space-y-2">
                        {categoria.padroes.map((padrao, padraoIndex) => (
                          <li key={padraoIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{padrao}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/20 bg-gold/5">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gold mb-2">💡 Dica Prática</h4>
                <p className="text-sm text-muted-foreground">
                  Esses padrões aparecem em 85% das questões de matemática do ENEM. 
                  Memorize-os e você terá uma vantagem enorme na prova!
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                  Padrões Linguísticos do ENEM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {PADROES_LINGUISTICOS.map((tipo, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-lg mb-3 text-blue-500">{tipo.tipo}</h4>
                      <ul className="space-y-2">
                        {tipo.caracteristicas.map((caracteristica, charIndex) => (
                          <li key={charIndex} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{caracteristica}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercício Prático</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Leia o texto abaixo e identifique os padrões linguísticos:
                  </p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm italic">
                      "A sustentabilidade ambiental tornou-se uma preocupação central nas discussões contemporâneas. 
                      O desenvolvimento sustentável busca equilibrar crescimento econômico com preservação dos recursos naturais."
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Qual padrão linguístico está presente?</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="padrao" value="1" />
                        <span className="text-sm">Texto argumentativo com tese</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="padrao" value="2" />
                        <span className="text-sm">Texto expositivo com definições</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="padrao" value="3" />
                        <span className="text-sm">Texto narrativo com sequência temporal</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  Ciclos Temáticos por Área
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ciencias" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="ciencias">Ciências</TabsTrigger>
                    <TabsTrigger value="humanas">Humanas</TabsTrigger>
                    <TabsTrigger value="linguagens">Linguagens</TabsTrigger>
                    <TabsTrigger value="matematica">Matemática</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ciencias" className="space-y-4">
                    <FreemiumBlocker>
                      <div className="grid gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Biologia - Ciclo 2024-2025</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Ecologia e sustentabilidade (30% das questões)</li>
                            <li>• Genética e evolução (25% das questões)</li>
                            <li>• Fisiologia humana (20% das questões)</li>
                            <li>• Botânica e zoologia (15% das questões)</li>
                            <li>• Biologia molecular (10% das questões)</li>
                          </ul>
                        </div>
                      </div>
                    </FreemiumBlocker>
                  </TabsContent>

                  <TabsContent value="humanas" className="space-y-4">
                    <FreemiumBlocker>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">História - Tendências 2025</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Brasil República (35% das questões)</li>
                          <li>• História do Brasil Colônia (25% das questões)</li>
                          <li>• História Geral - Idade Moderna (20% das questões)</li>
                          <li>• História Contemporânea (20% das questões)</li>
                        </ul>
                      </div>
                    </FreemiumBlocker>
                  </TabsContent>

                  <TabsContent value="linguagens" className="space-y-4">
                    <FreemiumBlocker>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Português - Padrões Recorrentes</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Interpretação de texto (40% das questões)</li>
                          <li>• Gramática aplicada (30% das questões)</li>
                          <li>• Literatura e artes (20% das questões)</li>
                          <li>• Variação linguística (10% das questões)</li>
                        </ul>
                      </div>
                    </FreemiumBlocker>
                  </TabsContent>

                  <TabsContent value="matematica" className="space-y-4">
                    <FreemiumBlocker>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Matemática - Distribuição 2025</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Funções e gráficos (25% das questões)</li>
                          <li>• Geometria plana e espacial (20% das questões)</li>
                          <li>• Estatística e probabilidade (20% das questões)</li>
                          <li>• Álgebra e aritmética (20% das questões)</li>
                          <li>• Trigonometria (15% das questões)</li>
                        </ul>
                      </div>
                    </FreemiumBlocker>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Módulo {moduloAtual}: {modulo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Conteúdo do módulo em desenvolvimento. Este módulo contém estratégias avançadas 
                para identificar e aplicar padrões específicos do ENEM.
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Objetivos do Módulo:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Compreender os padrões específicos desta área</li>
                    <li>• Aplicar técnicas de identificação rápida</li>
                    <li>• Praticar com exemplos reais do ENEM</li>
                    <li>• Desenvolver estratégias de resolução</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">🎯 Resultado Esperado</h4>
                  <p className="text-sm text-muted-foreground">
                    Ao final deste módulo, você será capaz de identificar e aplicar padrões 
                    específicos, aumentando significativamente sua taxa de acerto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

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
              <span className="text-gold">Padrões do ENEM</span>
            </h1>
            <p className="text-xs text-muted-foreground">Acerte 40% a mais identificando padrões recorrentes</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar com módulos */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Módulos
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progresso Geral</span>
                    <span>{Math.round(progressoGeral)}%</span>
                  </div>
                  <Progress value={progressoGeral} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {MODULOS.map((modulo) => (
                    <div
                      key={modulo.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        modulo.id === moduloAtual
                          ? "bg-primary text-primary-foreground"
                          : modulosCompletos.includes(modulo.id)
                          ? "bg-green-50 border border-green-200"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        setModuloAtual(modulo.id);
                        setProgresso(modulosCompletos.includes(modulo.id) ? 100 : 0);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {modulosCompletos.includes(modulo.id) ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-current" />
                        )}
                        <span className="text-sm font-medium">{modulo.id}. {modulo.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-6 w-6 text-primary" />
                      {modulo.title}
                    </CardTitle>
                    <CardDescription>
                      Módulo {moduloAtual} de {MODULOS.length}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    {progressoGeral > 0 ? "Em Progresso" : "Não Iniciado"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progresso do Módulo</span>
                    <span>{progresso}%</span>
                  </div>
                  <Progress value={progresso} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderModuloContent()}

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={moduloAnterior}
                    disabled={moduloAtual === 1}
                  >
                    Módulo Anterior
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={marcarModuloCompleto}
                      disabled={modulosCompletos.includes(moduloAtual)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marcar como Completo
                    </Button>
                    
                    <Button
                      onClick={proximoModulo}
                      disabled={moduloAtual === MODULOS.length}
                    >
                      {moduloAtual === MODULOS.length ? "Finalizar" : "Próximo Módulo"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
