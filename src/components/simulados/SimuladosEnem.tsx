import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, Clock, Trophy, Target, Play, History, 
  Settings, BarChart3, Download, Lock, Star, Flame,
  CheckCircle, XCircle, AlertCircle, Calendar
} from 'lucide-react';
import { useEnemAPI, SimuladoEnem } from '@/hooks/useEnemAPI';
import { useSimuladoCache, ResultadoSimulado } from '@/hooks/useSimuladoCache';
import { useFreemiumLimits } from '@/hooks/useFreemiumLimits';
import { useToast } from '@/hooks/use-toast';
import { SimuladoInterface } from './SimuladoInterface';
import { HistoricoSimulados } from './HistoricoSimulados';
import { PremiumModal } from './PremiumModal';

const DISCIPLINAS_OPCOES = [
  { value: 'matematica', label: 'Matemática', icon: '📐', color: 'bg-blue-100 text-blue-800' },
  { value: 'ciencias-natureza', label: 'Ciências da Natureza', icon: '🧪', color: 'bg-green-100 text-green-800' },
  { value: 'ciencias-humanas', label: 'Ciências Humanas', icon: '🌍', color: 'bg-purple-100 text-purple-800' },
  { value: 'linguagens', label: 'Linguagens', icon: '📚', color: 'bg-orange-100 text-orange-800' }
];

const TIPOS_SIMULADO = [
  {
    id: 'completo',
    titulo: 'Simulado Completo',
    descricao: '180 questões • 5h30min',
    questoes: 180,
    tempo: 330,
    icon: BookOpen,
    premium: false
  },
  {
    id: 'por_disciplina',
    titulo: 'Por Disciplina',
    descricao: '45 questões • 1h30min',
    questoes: 45,
    tempo: 90,
    icon: Target,
    premium: false
  },
  {
    id: 'personalizado',
    titulo: 'Personalizado',
    descricao: 'Escolha quantidade • Tempo flexível',
    questoes: 20,
    tempo: 50,
    icon: Settings,
    premium: true
  }
];

export const SimuladosEnem = () => {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2023);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<string>('');
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('completo');
  const [simuladoAtivo, setSimuladoAtivo] = useState<SimuladoEnem | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { 
    loading: apiLoading, 
    error: apiError, 
    gerarSimulado, 
    listarAnos, 
    listarDisciplinas 
  } = useEnemAPI();
  
  const { 
    carregarProgresso, 
    carregarHistorico, 
    obterEstatisticas 
  } = useSimuladoCache();
  
  const { 
    simuladosRealizados, 
    simuladosLimite, 
    isPremium, 
    incrementarSimulados 
  } = useFreemiumLimits();

  const { toast } = useToast();

  const [anos, setAnos] = useState<number[]>([]);
  const [historico, setHistorico] = useState<ResultadoSimulado[]>([]);
  const [estatisticas, setEstatisticas] = useState({
    totalSimulados: 0,
    mediaGeral: 0,
    melhorNota: 0,
    tempoMedioGasto: 0,
    disciplinaForte: 'N/A',
    disciplinaFraca: 'N/A'
  });

  useEffect(() => {
    const carregarDados = async () => {
      const anosDisponiveis = await listarAnos();
      setAnos(anosDisponiveis);
      
      const historicoSalvo = carregarHistorico();
      setHistorico(historicoSalvo);
      
      const stats = obterEstatisticas();
      setEstatisticas(stats);
    };

    carregarDados();
  }, [listarAnos, carregarHistorico, obterEstatisticas]);

  const verificarProgressoSalvo = () => {
    // Verificar se há simulados em progresso
    const keys = Object.keys(localStorage);
    const progressoKeys = keys.filter(key => key.startsWith('simulado_progresso_'));
    
    if (progressoKeys.length > 0) {
      const ultimoProgresso = progressoKeys[progressoKeys.length - 1];
      const simuladoId = ultimoProgresso.replace('simulado_progresso_', '');
      const progresso = carregarProgresso(simuladoId);
      
      if (progresso && !progresso.finalizado) {
        return progresso;
      }
    }
    return null;
  };

  const iniciarSimulado = async () => {
    // Verificar limites freemium
    if (!isPremium && simuladosRealizados >= simuladosLimite) {
      setShowPremiumModal(true);
      return;
    }

    // Verificar se tipo é premium
    const tipo = TIPOS_SIMULADO.find(t => t.id === tipoSelecionado);
    if (tipo?.premium && !isPremium) {
      setShowPremiumModal(true);
      return;
    }

    setLoading(true);
    
    try {
      const simulado = await gerarSimulado({
        ano: anoSelecionado,
        disciplina: tipoSelecionado === 'por_disciplina' ? disciplinaSelecionada : undefined,
        tipo: tipoSelecionado as 'completo' | 'por_disciplina' | 'personalizado'
      });

      console.log('Simulado gerado:', simulado); // Debug

      if (!simulado || !simulado.questoes || simulado.questoes.length === 0) {
        throw new Error('Nenhuma questão encontrada para os parâmetros selecionados');
      }

      setSimuladoAtivo(simulado);
      incrementarSimulados();
      
      toast({
        title: "Simulado iniciado!",
        description: `${simulado.questoes.length} questões carregadas com sucesso.`,
      });
    } catch (error) {
      console.error('Erro completo ao iniciar simulado:', error);
      console.error('Tipo do erro:', typeof error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro ao iniciar simulado",
        description: `Detalhes: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const continuarSimulado = () => {
    const progresso = verificarProgressoSalvo();
    if (progresso) {
      // Carregar simulado do progresso
      // Implementar lógica para recriar simulado a partir do progresso
    }
  };

  const finalizarSimulado = () => {
    setSimuladoAtivo(null);
    // Recarregar dados
    const historicoAtualizado = carregarHistorico();
    setHistorico(historicoAtualizado);
    const statsAtualizadas = obterEstatisticas();
    setEstatisticas(statsAtualizadas);
  };

  if (simuladoAtivo) {
    return (
      <SimuladoInterface 
        simulado={simuladoAtivo}
        onFinalizar={finalizarSimulado}
      />
    );
  }

  const progressoSalvo = verificarProgressoSalvo();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Simulados ENEM</h1>
          <p className="text-muted-foreground">
            Acesso a mais de 2.700 questões oficiais dos anos 2009-2023
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Trophy className="mr-2 h-5 w-5" />
          {isPremium ? 'Premium' : `${simuladosRealizados}/${simuladosLimite} simulados`}
        </Badge>
      </div>

      {/* Progresso Salvo */}
      {progressoSalvo && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Simulado em Progresso</h3>
                  <p className="text-sm text-muted-foreground">
                    Questão {progressoSalvo.questaoAtual + 1} • {Math.floor(progressoSalvo.tempoRestante / 60)}min restantes
                  </p>
                </div>
              </div>
              <Button onClick={continuarSimulado}>
                <Play className="mr-2 h-4 w-4" />
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="novo" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="novo">Novo Simulado</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
        </TabsList>

        {/* Tab: Novo Simulado */}
        <TabsContent value="novo" className="space-y-6">
          {/* Configurações */}
          <Card>
            <CardHeader>
              <CardTitle>Configurar Simulado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ano</label>
                  <Select value={anoSelecionado.toString()} onValueChange={(value) => setAnoSelecionado(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {anos.map(ano => (
                        <SelectItem key={ano} value={ano.toString()}>
                          ENEM {ano}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {tipoSelecionado === 'por_disciplina' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Disciplina</label>
                    <Select value={disciplinaSelecionada} onValueChange={setDisciplinaSelecionada}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISCIPLINAS_OPCOES.map(disciplina => (
                          <SelectItem key={disciplina.value} value={disciplina.value}>
                            <div className="flex items-center gap-2">
                              <span>{disciplina.icon}</span>
                              {disciplina.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tipos de Simulado */}
          <div className="grid gap-4 md:grid-cols-3">
            {TIPOS_SIMULADO.map(tipo => (
              <Card 
                key={tipo.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  tipoSelecionado === tipo.id ? 'ring-2 ring-primary' : ''
                } ${tipo.premium && !isPremium ? 'opacity-60' : ''}`}
                onClick={() => setTipoSelecionado(tipo.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <tipo.icon className="h-12 w-12 text-primary" />
                    {tipo.premium && !isPremium && (
                      <Lock className="h-4 w-4 text-muted-foreground ml-2" />
                    )}
                  </div>
                  <h3 className="font-bold mb-2">{tipo.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tipo.descricao}</p>
                  {tipo.premium && !isPremium && (
                    <Badge variant="secondary" className="text-xs">
                      Premium
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão Iniciar */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={iniciarSimulado}
              disabled={loading || apiLoading || (tipoSelecionado === 'por_disciplina' && !disciplinaSelecionada)}
              className="px-8"
            >
              {loading || apiLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Preparando...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Iniciar Simulado
                </>
              )}
            </Button>
          </div>

          {/* Informação sobre questões reais */}
          <Card className="border-green/20 bg-green/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">
                  <strong>✅ QUESTÕES OFICIAIS ENEM:</strong> Sistema integrado com questões reais dos anos 
                  2022, 2023 e 2024, compiladas de fontes oficiais com gabaritos corretos.
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Histórico */}
        <TabsContent value="historico">
          <HistoricoSimulados historico={historico} />
        </TabsContent>

        {/* Tab: Estatísticas */}
        <TabsContent value="estatisticas" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-gold" />
                <div className="text-2xl font-bold">{estatisticas.totalSimulados}</div>
                <div className="text-sm text-muted-foreground">Simulados Realizados</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{estatisticas.mediaGeral}</div>
                <div className="text-sm text-muted-foreground">Nota Média</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{estatisticas.melhorNota}</div>
                <div className="text-sm text-muted-foreground">Melhor Nota</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{estatisticas.tempoMedioGasto}min</div>
                <div className="text-sm text-muted-foreground">Tempo Médio</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-bold">{estatisticas.disciplinaForte}</div>
                <div className="text-sm text-muted-foreground">Disciplina Forte</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-lg font-bold">{estatisticas.disciplinaFraca}</div>
                <div className="text-sm text-muted-foreground">Precisa Melhorar</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Premium Modal */}
      <PremiumModal 
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="simulados"
      />
    </div>
  );
};