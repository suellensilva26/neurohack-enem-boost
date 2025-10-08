import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Target, Clock, BarChart3, Download, Share2,
  CheckCircle, XCircle, AlertCircle, TrendingUp,
  BookOpen, Home, RotateCcw, Star
} from 'lucide-react';
import { ResultadoSimulado } from '@/hooks/useSimuladoCache';
import { PremiumModal } from './PremiumModal';
import { useFreemiumLimits } from '@/hooks/useFreemiumLimits';

interface ResultadoModalProps {
  resultado: ResultadoSimulado;
  onClose: () => void;
  onNovoSimulado: () => void;
}

export const ResultadoModal = ({ resultado, onClose, onNovoSimulado }: ResultadoModalProps) => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { isPremium } = useFreemiumLimits();

  const percentualAcerto = Math.round((resultado.acertos / resultado.total) * 100);
  const tempoGastoMinutos = Math.round(resultado.tempoGasto / 60);
  const tempoTotalMinutos = Math.round(resultado.tempoTotal / 60);

  const getNotaColor = (nota: number) => {
    if (nota >= 800) return 'text-green-600';
    if (nota >= 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNotaLabel = (nota: number) => {
    if (nota >= 900) return 'Excelente';
    if (nota >= 800) return 'Muito Bom';
    if (nota >= 700) return 'Bom';
    if (nota >= 600) return 'Regular';
    return 'Precisa Melhorar';
  };

  const handleDownloadPDF = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    // Implementar download do PDF
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu resultado no ENEM 30 Dias',
        text: `Acabei de fazer um simulado e tirei ${resultado.nota} pontos! 🎉`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Resultado do Simulado</h2>
              <p className="text-muted-foreground">{resultado.titulo}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <Home className="h-4 w-4" />
            </Button>
          </div>

          {/* Nota Principal */}
          <div className="text-center">
            <div className={`text-6xl font-bold mb-2 ${getNotaColor(resultado.nota)}`}>
              {resultado.nota}
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {getNotaLabel(resultado.nota)}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="resumo" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="disciplinas">Por Disciplina</TabsTrigger>
              <TabsTrigger value="questoes">Questões</TabsTrigger>
              <TabsTrigger value="comparacao">
                Comparação
                {!isPremium && <Star className="h-3 w-3 ml-1" />}
              </TabsTrigger>
            </TabsList>

            {/* Tab: Resumo */}
            <TabsContent value="resumo" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{resultado.acertos}</div>
                    <div className="text-sm text-muted-foreground">
                      de {resultado.total} questões
                    </div>
                    <div className="text-lg font-medium text-primary">
                      {percentualAcerto}% de acerto
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{tempoGastoMinutos}min</div>
                    <div className="text-sm text-muted-foreground">
                      de {tempoTotalMinutos}min disponíveis
                    </div>
                    <Progress 
                      value={(resultado.tempoGasto / resultado.tempoTotal) * 100} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-gold" />
                    <div className="text-2xl font-bold">
                      {Math.round((resultado.tempoGasto / resultado.acertos) / 60 * 10) / 10}min
                    </div>
                    <div className="text-sm text-muted-foreground">
                      tempo médio por acerto
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Análise Rápida */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Análise do Desempenho
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Pontos Fortes
                      </h4>
                      <ul className="text-sm space-y-1">
                        {Object.entries(resultado.desempenhoPorDisciplina)
                          .filter(([_, dados]) => dados.percentual >= 70)
                          .map(([disciplina, dados]) => (
                            <li key={disciplina} className="flex justify-between">
                              <span className="capitalize">{disciplina.replace('-', ' ')}</span>
                              <span className="text-green-600 font-medium">{dados.percentual}%</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Precisa Melhorar
                      </h4>
                      <ul className="text-sm space-y-1">
                        {Object.entries(resultado.desempenhoPorDisciplina)
                          .filter(([_, dados]) => dados.percentual < 70)
                          .map(([disciplina, dados]) => (
                            <li key={disciplina} className="flex justify-between">
                              <span className="capitalize">{disciplina.replace('-', ' ')}</span>
                              <span className="text-orange-600 font-medium">{dados.percentual}%</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Por Disciplina */}
            <TabsContent value="disciplinas" className="space-y-4">
              {Object.entries(resultado.desempenhoPorDisciplina).map(([disciplina, dados]) => (
                <Card key={disciplina}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold capitalize">
                        {disciplina.replace('-', ' ')}
                      </h3>
                      <Badge variant={dados.percentual >= 70 ? 'default' : 'secondary'}>
                        {dados.percentual}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Acertos: {dados.acertos}/{dados.total}</span>
                        <span>{dados.percentual}% de aproveitamento</span>
                      </div>
                      <Progress value={dados.percentual} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Tab: Questões */}
            <TabsContent value="questoes" className="space-y-4">
              <div className="grid gap-2">
                {resultado.questoes.map((questao, index) => {
                  const resposta = resultado.respostas[index];
                  const acertou = resposta === questao.correctAnswer;
                  
                  return (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        resposta === null ? 'border-gray-200 bg-gray-50' :
                        acertou ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">
                              {questao.discipline} • {questao.year}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {questao.competence && `Competência ${questao.competence}`}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {resposta === null ? (
                            <Badge variant="outline">Não respondida</Badge>
                          ) : acertou ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Tab: Comparação (Premium) */}
            <TabsContent value="comparacao">
              {isPremium ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comparação com Outros Estudantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground">
                          Funcionalidade em desenvolvimento
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10">
                  <CardContent className="p-8 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-gold" />
                    <h3 className="text-xl font-bold mb-2">Funcionalidade Premium</h3>
                    <p className="text-muted-foreground mb-6">
                      Compare seu desempenho com outros estudantes e veja análises detalhadas
                    </p>
                    <Button onClick={() => setShowPremiumModal(true)}>
                      Desbloquear Premium
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Ações */}
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            <Button onClick={onNovoSimulado} className="flex-1 min-w-[200px]">
              <RotateCcw className="h-4 w-4 mr-2" />
              Novo Simulado
            </Button>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              PDF {!isPremium && <Star className="h-3 w-3 ml-1" />}
            </Button>
          </div>
        </div>
      </div>

      <PremiumModal 
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="relatorios"
      />
    </div>
  );
};