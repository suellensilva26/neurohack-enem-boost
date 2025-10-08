import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, Clock, Target, Calendar, Search, Filter,
  TrendingUp, TrendingDown, Eye, Download, Trash2
} from 'lucide-react';
import { ResultadoSimulado } from '@/hooks/useSimuladoCache';
import { ResultadoModal } from './ResultadoModal';

interface HistoricoSimuladosProps {
  historico: ResultadoSimulado[];
}

export const HistoricoSimulados = ({ historico }: HistoricoSimuladosProps) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroAno, setFiltroAno] = useState<string>('todos');
  const [filtroDisciplina, setFiltroDisciplina] = useState<string>('todas');
  const [ordenacao, setOrdenacao] = useState<string>('data-desc');
  const [resultadoSelecionado, setResultadoSelecionado] = useState<ResultadoSimulado | null>(null);

  // Filtrar e ordenar histórico
  const historicoFiltrado = historico
    .filter(resultado => {
      const matchTexto = resultado.titulo.toLowerCase().includes(filtroTexto.toLowerCase());
      const matchAno = filtroAno === 'todos' || resultado.ano.toString() === filtroAno;
      const matchDisciplina = filtroDisciplina === 'todas' || resultado.disciplina === filtroDisciplina;
      
      return matchTexto && matchAno && matchDisciplina;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case 'data-desc':
          return new Date(b.dataRealizacao).getTime() - new Date(a.dataRealizacao).getTime();
        case 'data-asc':
          return new Date(a.dataRealizacao).getTime() - new Date(b.dataRealizacao).getTime();
        case 'nota-desc':
          return b.nota - a.nota;
        case 'nota-asc':
          return a.nota - b.nota;
        default:
          return 0;
      }
    });

  // Obter anos únicos do histórico
  const anosDisponiveis = [...new Set(historico.map(r => r.ano))].sort((a, b) => b - a);
  
  // Obter disciplinas únicas do histórico
  const disciplinasDisponiveis = [...new Set(historico.map(r => r.disciplina).filter(Boolean))];

  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 800) return 'text-green-600 bg-green-100';
    if (nota >= 600) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const calcularTendencia = (resultados: ResultadoSimulado[]) => {
    if (resultados.length < 2) return null;
    
    const ultimosDois = resultados.slice(0, 2);
    const diferenca = ultimosDois[0].nota - ultimosDois[1].nota;
    
    return diferenca;
  };

  if (historico.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nenhum simulado realizado</h3>
          <p className="text-muted-foreground">
            Faça seu primeiro simulado para ver o histórico aqui
          </p>
        </CardContent>
      </Card>
    );
  }

  const tendencia = calcularTendencia(historico);

  return (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{historico.length}</div>
            <div className="text-sm text-muted-foreground">Simulados</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">
              {Math.round(historico.reduce((acc, r) => acc + r.nota, 0) / historico.length)}
            </div>
            <div className="text-sm text-muted-foreground">Média Geral</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-gold" />
            <div className="text-2xl font-bold">
              {Math.max(...historico.map(r => r.nota))}
            </div>
            <div className="text-sm text-muted-foreground">Melhor Nota</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            {tendencia !== null && (
              <>
                {tendencia > 0 ? (
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                ) : tendencia < 0 ? (
                  <TrendingDown className="h-6 w-6 mx-auto mb-2 text-red-500" />
                ) : (
                  <Target className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                )}
                <div className="text-2xl font-bold">
                  {tendencia > 0 ? '+' : ''}{tendencia}
                </div>
                <div className="text-sm text-muted-foreground">Tendência</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar simulados..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ano</label>
              <Select value={filtroAno} onValueChange={setFiltroAno}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os anos</SelectItem>
                  {anosDisponiveis.map(ano => (
                    <SelectItem key={ano} value={ano.toString()}>
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Disciplina</label>
              <Select value={filtroDisciplina} onValueChange={setFiltroDisciplina}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  {disciplinasDisponiveis.map(disciplina => (
                    <SelectItem key={disciplina} value={disciplina!}>
                      {disciplina!.charAt(0).toUpperCase() + disciplina!.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ordenar por</label>
              <Select value={ordenacao} onValueChange={setOrdenacao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data-desc">Data (mais recente)</SelectItem>
                  <SelectItem value="data-asc">Data (mais antigo)</SelectItem>
                  <SelectItem value="nota-desc">Nota (maior)</SelectItem>
                  <SelectItem value="nota-asc">Nota (menor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Simulados */}
      <div className="space-y-4">
        {historicoFiltrado.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Nenhum simulado encontrado com os filtros aplicados
              </p>
            </CardContent>
          </Card>
        ) : (
          historicoFiltrado.map((resultado) => (
            <Card key={resultado.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{resultado.titulo}</h3>
                      {resultado.disciplina && (
                        <Badge variant="outline" className="text-xs">
                          {resultado.disciplina}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatarData(resultado.dataRealizacao)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {resultado.acertos}/{resultado.total} questões
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {Math.round(resultado.tempoGasto / 60)}min
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getNotaColor(resultado.nota)}`}>
                        {resultado.nota}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((resultado.acertos / resultado.total) * 100)}% acerto
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setResultadoSelecionado(resultado)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal de Resultado */}
      {resultadoSelecionado && (
        <ResultadoModal
          resultado={resultadoSelecionado}
          onClose={() => setResultadoSelecionado(null)}
          onNovoSimulado={() => setResultadoSelecionado(null)}
        />
      )}
    </div>
  );
};