import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckSquare, Target, TrendingUp, Clock, AlertTriangle, 
  BookOpen, Zap, Trophy, Filter, Search, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChecklistItemComponent } from "@/components/checklist/ChecklistItem";
import { 
  checklistData, 
  calculateSubjectProgress, 
  calculateOverallProgress,
  getCriticalPendingItems,
  getRecommendedItems,
  SubjectChecklist,
  ChecklistItem
} from "@/data/checklistData";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

type FilterType = 'all' | 'critical' | 'high' | 'medium' | 'low';
type SortType = 'importance' | 'frequency' | 'alphabetical' | 'category';

export default function Checklist() {
  const navigate = useNavigate();
  const { isPremium } = useFreemiumLimits();
  const [subjects, setSubjects] = useState<SubjectChecklist[]>(checklistData);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('importance');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simular carregamento de dados do localStorage ou banco
    const savedData = localStorage.getItem('checklist-progress');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSubjects(parsed);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  }, []);

  const saveProgress = (newSubjects: SubjectChecklist[]) => {
    setSubjects(newSubjects);
    localStorage.setItem('checklist-progress', JSON.stringify(newSubjects));
  };

  const handleItemToggle = (itemId: string, completed: boolean) => {
    const newSubjects = subjects.map(subject => ({
      ...subject,
      items: subject.items.map(item => 
        item.id === itemId ? { ...item, completed } : item
      )
    }));
    
    // Recalcular estatísticas
    const updatedSubjects = newSubjects.map(subject => ({
      ...subject,
      completedItems: subject.items.filter(item => item.completed).length
    }));
    
    saveProgress(updatedSubjects);
  };

  const getFilteredItems = (): ChecklistItem[] => {
    let items: ChecklistItem[] = [];
    
    if (selectedSubject === 'all') {
      items = subjects.flatMap(subject => subject.items);
    } else {
      const subject = subjects.find(s => s.id === selectedSubject);
      items = subject ? subject.items : [];
    }

    // Aplicar filtros
    if (filter !== 'all') {
      items = items.filter(item => item.importance === filter);
    }

    if (searchTerm) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar ordenação
    items.sort((a, b) => {
      switch (sortBy) {
        case 'importance':
          const importanceWeight = { critical: 4, high: 3, medium: 2, low: 1 };
          return importanceWeight[b.importance] - importanceWeight[a.importance];
        case 'frequency':
          return b.frequency - a.frequency;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return items;
  };

  const overallProgress = calculateOverallProgress(subjects);
  const criticalPending = getCriticalPendingItems(subjects);
  const recommendedItems = getRecommendedItems(subjects, 5);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  Checklist de Tópicos Essenciais
                </h1>
                <p className="text-sm text-muted-foreground">
                  Tópicos com 80%+ de recorrência no ENEM
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {overallProgress}% concluído
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Estatísticas Gerais */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Progresso Geral</div>
              <Progress value={overallProgress} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{criticalPending.length}</div>
              <div className="text-sm text-muted-foreground">Críticos Pendentes</div>
              <div className="text-xs text-muted-foreground mt-1">Prioridade máxima</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {subjects.reduce((acc, s) => acc + s.completedItems, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Tópicos Concluídos</div>
              <div className="text-xs text-muted-foreground mt-1">
                de {subjects.reduce((acc, s) => acc + s.totalItems, 0)} total
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{subjects.length}</div>
              <div className="text-sm text-muted-foreground">Matérias</div>
              <div className="text-xs text-muted-foreground mt-1">Disponíveis</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="subjects">Por Matéria</TabsTrigger>
            <TabsTrigger value="critical">Críticos</TabsTrigger>
            <TabsTrigger value="recommended">Recomendados</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progresso por Matéria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progresso por Matéria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => {
                    const progress = calculateSubjectProgress(subject);
                    return (
                      <Card key={subject.id} className="cursor-pointer hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${subject.color}`}>
                              <span className="text-xl">{subject.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{subject.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {subject.completedItems}/{subject.items.length} concluídos
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {progress}%
                            </Badge>
                          </div>
                          
                          <Progress value={progress} className="h-2 mb-2" />
                          
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{subject.criticalItems} críticos</span>
                            <span className={getProgressColor(progress)}>
                              {progress >= 80 ? 'Excelente' : 
                               progress >= 60 ? 'Bom' : 
                               progress >= 40 ? 'Regular' : 'Precisa melhorar'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tópicos Críticos Pendentes */}
            {criticalPending.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="h-5 w-5" />
                    Tópicos Críticos Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {criticalPending.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            {item.frequency}% recorrência
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => handleItemToggle(item.id, true)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckSquare className="h-3 w-3 mr-1" />
                            Concluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {criticalPending.length > 5 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" size="sm">
                        Ver todos os {criticalPending.length} tópicos críticos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      <option value="all">Todas as matérias</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as FilterType)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      <option value="all">Todas as importâncias</option>
                      <option value="critical">Crítico</option>
                      <option value="high">Alta</option>
                      <option value="medium">Média</option>
                      <option value="low">Baixa</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortType)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      <option value="importance">Por importância</option>
                      <option value="frequency">Por recorrência</option>
                      <option value="alphabetical">Alfabético</option>
                      <option value="category">Por categoria</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Itens */}
            <div className="space-y-4">
              {getFilteredItems().map((item) => (
                <ChecklistItemComponent
                  key={item.id}
                  item={item}
                  onToggle={handleItemToggle}
                  showTips={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="critical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Tópicos Críticos (80%+ recorrência ENEM)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.flatMap(subject => 
                    subject.items.filter(item => item.importance === 'critical')
                  ).map((item) => (
                    <ChecklistItemComponent
                      key={item.id}
                      item={item}
                      onToggle={handleItemToggle}
                      showTips={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Próximos Tópicos Recomendados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedItems.map((item) => (
                    <ChecklistItemComponent
                      key={item.id}
                      item={item}
                      onToggle={handleItemToggle}
                      showTips={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Banner de Conversão */}
        {!isPremium && (
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6 text-accent" />
                  Checklist Completo Premium
                </h3>
                <p className="text-sm text-muted-foreground">
                  Desbloqueie todos os tópicos essenciais com dicas detalhadas e cronograma personalizado
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-xs text-muted-foreground">Tópicos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">80%+</div>
                  <div className="text-xs text-muted-foreground">Recorrência ENEM</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Cobertura</div>
                </div>
              </div>

              <Button
                onClick={() => navigate('/pricing')}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                <Zap className="mr-2 h-4 w-4" />
                Desbloquear Checklist Completo - R$ 197
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


