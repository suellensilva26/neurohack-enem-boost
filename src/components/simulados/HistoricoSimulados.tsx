import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, Calendar } from 'lucide-react';
import { ResultadoSimulado } from '@/hooks/useSimuladoCache';

export const HistoricoSimulados = ({ historico }: { historico: ResultadoSimulado[] }) => {
  if (!historico || historico.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Nenhum simulado realizado ainda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {historico.map((r) => (
        <Card key={`${r.id}-${r.dataISO}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">{r.titulo}</CardTitle>
            <Badge variant="secondary">{r.tipo}</Badge>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <Trophy className="h-6 w-6 mx-auto mb-1 text-gold" />
              <div className="text-xl font-bold">{r.acertos}/{r.totalQuestoes}</div>
              <div className="text-xs text-muted-foreground">Acertos</div>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 mx-auto mb-1 text-primary" />
              <div className="text-xl font-bold">{r.percentual}%</div>
              <div className="text-xs text-muted-foreground">Aproveitamento</div>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-1 text-blue-500" />
              <div className="text-xl font-bold">{r.tempoGastoMin}min</div>
              <div className="text-xs text-muted-foreground">Tempo</div>
            </div>
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
              <div className="text-sm">{new Date(r.dataISO).toLocaleDateString()}</div>
              <div className="text-xs text-muted-foreground">Data</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};