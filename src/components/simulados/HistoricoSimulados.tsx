import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock } from 'lucide-react';
import { ResultadoSimulado } from '@/hooks/useSimuladoCache';

interface Props {
  historico: ResultadoSimulado[];
}

export const HistoricoSimulados = ({ historico }: Props) => {
  if (!historico || historico.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Nenhum simulado realizado ainda.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {historico.map((h) => (
        <Card key={h.id} className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{h.titulo}</span>
              <Badge variant="secondary">{new Date(h.data).toLocaleDateString()}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <div>
                <div className="text-2xl font-bold">{h.porcentagem}%</div>
                <div className="text-sm text-muted-foreground">{h.acertos}/{h.totalQuestoes} acertos</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" /> {h.tempoGastoMinutos} min
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};