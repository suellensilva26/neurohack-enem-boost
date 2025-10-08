import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Clock, Target, BookOpen, Brain, TrendingUp, 
  CheckCircle, Award, Zap, Play, FileText, BarChart3,
  AlertCircle, Flame, Trophy, Crown, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GamificationSystem } from "@/components/gamification/GamificationSystem";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Estado do app - dados reais salvos no localStorage
  const [userData, setUserData] = useState({
    nome: "Estudante",
    diasRestantes: 30,
    horasEstudadas: 0,
    questoesResolvidas: 0,
    simuladosFeitos: 0,
    notaMedia: 0,
    streak: 0,
    metaDiaria: {
      horas: 4,
      questoes: 50,
      materias: 3
    },
    progressoHoje: {
      horas: 0,
      questoes: 0,
      materias: []
    }
  });

  const [cronograma] = useState([
    { dia: 1, tema: "Matemática Básica", status: "concluido", tempo: "4h" },
    { dia: 2, tema: "Português e Literatura", status: "concluido", tempo: "4h" },
    { dia: 3, tema: "Biologia - Citologia", status: "em-progresso", tempo: "2h/4h" },
    { dia: 4, tema: "História do Brasil", status: "pendente", tempo: "0h/4h" },
    { dia: 5, tema: "Química - Estequiometria", status: "pendente", tempo: "0h/4h" }
  ]);

  const [proximasAtividades] = useState([
    { tipo: "simulado", titulo: "Simulado Completo - Matemática", prazo: "Hoje, 18:00", prioridade: "alta" },
    { tipo: "redacao", titulo: "Treino de Redação - Meio Ambiente", prazo: "Amanhã, 10:00", prioridade: "media" },
    { tipo: "revisao", titulo: "Revisão de Biologia", prazo: "Amanhã, 15:00", prioridade: "baixa" },
    { tipo: "questoes", titulo: "50 Questões de Física", prazo: "Hoje, 20:00", prioridade: "alta" }
  ]);

  // Calcular dias restantes até ENEM
  useEffect(() => {
    const enemDate = new Date("2025-11-09");
    const today = new Date();
    const diffTime = enemDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setUserData(prev => ({ ...prev, diasRestantes: diffDays }));
    
    // Carregar dados salvos
    const savedData = localStorage.getItem("enemAppData");
    if (savedData) {
      setUserData(prev => ({ ...prev, ...JSON.parse(savedData) }));
    }
  }, []);

  // Salvar dados
  useEffect(() => {
    localStorage.setItem("enemAppData", JSON.stringify(userData));
  }, [userData]);

  const progressoGeral = Math.min(
    ((userData.questoesResolvidas / 1500) * 100).toFixed(0),
    100
  );

  const progressoHoje = Math.min(
    ((userData.progressoHoje.horas / userData.metaDiaria.horas) * 100).toFixed(0),
    100
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard ENEM 30 Dias</h1>
            <p className="text-muted-foreground">Bem-vindo, {userData.nome}!</p>
          </div>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            <Calendar className="mr-2 h-5 w-5" />
            {userData.diasRestantes} dias até o ENEM
          </Badge>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Estudadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.horasEstudadas}h</div>
              <p className="text-xs text-muted-foreground">
                Meta: {userData.metaDiaria.horas * userData.diasRestantes}h total
              </p>
              <Progress value={progressoHoje} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questões Resolvidas</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.questoesResolvidas}</div>
              <p className="text-xs text-muted-foreground">
                Meta: 1500 questões
              </p>
              <Progress value={progressoGeral} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Simulados</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.simuladosFeitos}</div>
              <p className="text-xs text-muted-foreground">
                Meta: 15 simulados completos
              </p>
              <Progress value={(userData.simuladosFeitos / 15) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sequência</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.streak} dias</div>
              <p className="text-xs text-muted-foreground">
                Continue estudando todos os dias!
              </p>
              <Progress value={(userData.streak / 30) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Conteúdo */}
        <Tabs defaultValue="hoje" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="simulados">Simulados</TabsTrigger>
            <TabsTrigger value="redacao">Redação</TabsTrigger>
            <TabsTrigger value="gamificacao">
              <Trophy className="h-4 w-4 mr-2" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          </TabsList>

          {/* Tab: Hoje */}
          <TabsContent value="hoje" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Progresso do Dia */}
              <Card>
                <CardHeader>
                  <CardTitle>Meta de Hoje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Horas de Estudo</span>
                      <span className="text-sm font-medium">
                        {userData.progressoHoje.horas}h / {userData.metaDiaria.horas}h
                      </span>
                    </div>
                    <Progress value={progressoHoje} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Questões</span>
                      <span className="text-sm font-medium">
                        {userData.progressoHoje.questoes} / {userData.metaDiaria.questoes}
                      </span>
                    </div>
                    <Progress 
                      value={(userData.progressoHoje.questoes / userData.metaDiaria.questoes) * 100} 
                    />
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => navigate("/questoes")}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Começar Estudo
                  </Button>
                </CardContent>
              </Card>

              {/* Próximas Atividades */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Atividades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {proximasAtividades.map((atividade, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className={`p-2 rounded-full ${
                          atividade.prioridade === 'alta' ? 'bg-red-100' :
                          atividade.prioridade === 'media' ? 'bg-yellow-100' :
                          'bg-green-100'
                        }`}>
                          {atividade.tipo === 'simulado' && <BookOpen className="h-4 w-4" />}
                          {atividade.tipo === 'redacao' && <FileText className="h-4 w-4" />}
                          {atividade.tipo === 'revisao' && <Brain className="h-4 w-4" />}
                          {atividade.tipo === 'questoes' && <Target className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{atividade.titulo}</h4>
                          <p className="text-xs text-muted-foreground">{atividade.prazo}</p>
                        </div>
                        <Badge variant={
                          atividade.prioridade === 'alta' ? 'destructive' :
                          atividade.prioridade === 'media' ? 'default' : 'secondary'
                        }>
                          {atividade.prioridade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-4">
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => navigate("/banco-questoes")}
                  >
                    <div className="text-center">
                      <Target className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm">Resolver Questões</span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => navigate("/simulados-enem")}
                  >
                    <div className="text-center">
                      <BookOpen className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm">Simulados ENEM</span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => navigate("/redacao")}
                  >
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm">Treinar Redação</span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => navigate("/revisao")}
                  >
                    <div className="text-center">
                      <Brain className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm">Revisar Conteúdo</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Cronograma */}
          <TabsContent value="cronograma">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma dos Próximos 30 Dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cronograma.map((item) => (
                    <div key={item.dia} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold">Dia {item.dia}</div>
                        <Badge variant={
                          item.status === 'concluido' ? 'default' :
                          item.status === 'em-progresso' ? 'secondary' : 'outline'
                        }>
                          {item.status === 'concluido' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.tema}</h3>
                        <p className="text-sm text-muted-foreground">Tempo: {item.tempo}</p>
                      </div>
                      <Button size="sm">
                        {item.status === 'concluido' ? 'Revisar' : 'Iniciar'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Simulados */}
          <TabsContent value="simulados">
            <Card>
              <CardHeader>
                <CardTitle>Simulados Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <BookOpen className="h-12 w-12 mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">Simulado Completo</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        180 questões • 5h30min • Todas as áreas
                      </p>
                      <Button className="w-full" onClick={() => navigate("/simulados/completo")}>
                        Iniciar Simulado
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardContent className="p-6">
                      <Zap className="h-12 w-12 mb-4 text-yellow-500" />
                      <h3 className="text-xl font-bold mb-2">Simulado Relâmpago</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        45 questões • 1h30min • Por área
                      </p>
                      <Button className="w-full" variant="outline" onClick={() => navigate("/simulados/relampago")}>
                        Iniciar Simulado
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Redação */}
          <TabsContent value="redacao">
            <Card>
              <CardHeader>
                <CardTitle>Treino de Redação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-semibold mb-2">📝 Tema da Semana</h3>
                    <p className="text-lg">"Desafios para a preservação do meio ambiente no Brasil"</p>
                    <Button className="mt-4" onClick={() => navigate("/redacao/nova")}>
                      <Play className="mr-2 h-4 w-4" />
                      Escrever Redação
                    </Button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-4 border rounded-lg text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Redações Escritas</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="text-2xl font-bold">820</div>
                      <div className="text-sm text-muted-foreground">Nota Média</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold">+50</div>
                      <div className="text-sm text-muted-foreground">Evolução</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Desempenho */}
          <TabsContent value="desempenho">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-4">Matérias por Desempenho</h3>
                      <div className="space-y-3">
                        {[
                          { materia: "Português", nota: 85, cor: "bg-green-500" },
                          { materia: "Matemática", nota: 72, cor: "bg-yellow-500" },
                          { materia: "Biologia", nota: 78, cor: "bg-green-500" },
                          { materia: "Física", nota: 65, cor: "bg-orange-500" },
                          { materia: "Química", nota: 68, cor: "bg-yellow-500" }
                        ].map((item) => (
                          <div key={item.materia}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{item.materia}</span>
                              <span className="text-sm font-medium">{item.nota}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`${item.cor} h-2 rounded-full`}
                                style={{ width: `${item.nota}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-4">Recomendações</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Foco em Física</p>
                            <p className="text-xs text-muted-foreground">
                              Resolva mais 20 questões de mecânica
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Excelente em Português</p>
                            <p className="text-xs text-muted-foreground">
                              Continue praticando interpretação
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Pratique Química</p>
                            <p className="text-xs text-muted-foreground">
                              Faça simulado de química orgânica
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Gamificação */}
          <TabsContent value="gamificacao">
            <GamificationSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


