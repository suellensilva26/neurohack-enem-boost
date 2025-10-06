import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, ChevronDown, ChevronRight, Lock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Topico {
  id: string;
  nome: string;
  revisado: boolean;
  importancia: "Alta" | "Média" | "Baixa";
}

interface Sessao {
  id: string;
  nome: string;
  materia: string;
  topicos: Topico[];
  revisados: number;
  total: number;
  aberta: boolean;
}

const checklistData: Sessao[] = [
  {
    id: "mat-algebra",
    nome: "Álgebra e Funções",
    materia: "Matemática",
    aberta: false,
    revisados: 0,
    total: 8,
    topicos: [
      { id: "mat1", nome: "Funções do 1º grau", revisado: false, importancia: "Alta" },
      { id: "mat2", nome: "Funções do 2º grau", revisado: false, importancia: "Alta" },
      { id: "mat3", nome: "Função exponencial", revisado: false, importancia: "Alta" },
      { id: "mat4", nome: "Função logarítmica", revisado: false, importancia: "Média" },
      { id: "mat5", nome: "Progressões aritméticas", revisado: false, importancia: "Média" },
      { id: "mat6", nome: "Progressões geométricas", revisado: false, importancia: "Média" },
      { id: "mat7", nome: "Matrizes", revisado: false, importancia: "Baixa" },
      { id: "mat8", nome: "Determinantes", revisado: false, importancia: "Baixa" }
    ]
  },
  {
    id: "mat-geometria",
    nome: "Geometria",
    materia: "Matemática",
    aberta: false,
    revisados: 0,
    total: 7,
    topicos: [
      { id: "mat9", nome: "Geometria plana", revisado: false, importancia: "Alta" },
      { id: "mat10", nome: "Geometria espacial", revisado: false, importancia: "Alta" },
      { id: "mat11", nome: "Trigonometria", revisado: false, importancia: "Média" },
      { id: "mat12", nome: "Geometria analítica", revisado: false, importancia: "Média" },
      { id: "mat13", nome: "Áreas e perímetros", revisado: false, importancia: "Alta" },
      { id: "mat14", nome: "Volumes", revisado: false, importancia: "Alta" },
      { id: "mat15", nome: "Semelhança de triângulos", revisado: false, importancia: "Média" }
    ]
  },
  {
    id: "port-interpretacao",
    nome: "Interpretação de Texto",
    materia: "Português",
    aberta: false,
    revisados: 0,
    total: 6,
    topicos: [
      { id: "port1", nome: "Leitura e compreensão", revisado: false, importancia: "Alta" },
      { id: "port2", nome: "Inferência e dedução", revisado: false, importancia: "Alta" },
      { id: "port3", nome: "Coesão e coerência", revisado: false, importancia: "Alta" },
      { id: "port4", nome: "Tipos de texto", revisado: false, importancia: "Média" },
      { id: "port5", nome: "Funções da linguagem", revisado: false, importancia: "Média" },
      { id: "port6", nome: "Figuras de linguagem", revisado: false, importancia: "Média" }
    ]
  },
  {
    id: "port-gramatica",
    nome: "Gramática",
    materia: "Português",
    aberta: false,
    revisados: 0,
    total: 8,
    topicos: [
      { id: "port7", nome: "Classes de palavras", revisado: false, importancia: "Alta" },
      { id: "port8", nome: "Concordância verbal", revisado: false, importancia: "Alta" },
      { id: "port9", nome: "Concordância nominal", revisado: false, importancia: "Alta" },
      { id: "port10", nome: "Regência verbal", revisado: false, importancia: "Alta" },
      { id: "port11", nome: "Regência nominal", revisado: false, importancia: "Média" },
      { id: "port12", nome: "Crase", revisado: false, importancia: "Média" },
      { id: "port13", nome: "Pontuação", revisado: false, importancia: "Média" },
      { id: "port14", nome: "Ortografia", revisado: false, importancia: "Baixa" }
    ]
  },
  {
    id: "bio-celula",
    nome: "Biologia Celular",
    materia: "Biologia",
    aberta: false,
    revisados: 0,
    total: 5,
    topicos: [
      { id: "bio1", nome: "Estrutura celular", revisado: false, importancia: "Alta" },
      { id: "bio2", nome: "Metabolismo celular", revisado: false, importancia: "Alta" },
      { id: "bio3", nome: "Respiração celular", revisado: false, importancia: "Alta" },
      { id: "bio4", nome: "Fotossíntese", revisado: false, importancia: "Alta" },
      { id: "bio5", nome: "Divisão celular", revisado: false, importancia: "Média" }
    ]
  },
  {
    id: "bio-ecologia",
    nome: "Ecologia",
    materia: "Biologia",
    aberta: false,
    revisados: 0,
    total: 6,
    topicos: [
      { id: "bio6", nome: "Ecossistemas", revisado: false, importancia: "Alta" },
      { id: "bio7", nome: "Cadeias alimentares", revisado: false, importancia: "Alta" },
      { id: "bio8", nome: "Ciclos biogeoquímicos", revisado: false, importancia: "Média" },
      { id: "bio9", nome: "Biodiversidade", revisado: false, importancia: "Alta" },
      { id: "bio10", nome: "Conservação ambiental", revisado: false, importancia: "Média" },
      { id: "bio11", nome: "Impactos ambientais", revisado: false, importancia: "Média" }
    ]
  }
];

export const ChecklistEssencial = () => {
  const [sessoes, setSessoes] = useState<Sessao[]>(() => {
    const saved = localStorage.getItem('checklistSessoes');
    return saved ? JSON.parse(saved) : checklistData;
  });
  const [topicosRevisados, setTopicosRevisados] = useState<number>(() => {
    const saved = localStorage.getItem('topicosRevisados');
    return saved ? parseInt(saved) : 0;
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('checklistSessoes', JSON.stringify(sessoes));
    localStorage.setItem('topicosRevisados', topicosRevisados.toString());
  }, [sessoes, topicosRevisados]);

  const toggleSessao = (sessaoId: string) => {
    setSessoes(prev => prev.map(sessao => 
      sessao.id === sessaoId 
        ? { ...sessao, aberta: !sessao.aberta }
        : sessao
    ));
  };

  const toggleTopico = (sessaoId: string, topicoId: string) => {
    setSessoes(prev => prev.map(sessao => {
      if (sessao.id === sessaoId) {
        const topicosAtualizados = sessao.topicos.map(topico => 
          topico.id === topicoId 
            ? { ...topico, revisado: !topico.revisado }
            : topico
        );
        const revisados = topicosAtualizados.filter(t => t.revisado).length;
        return { ...sessao, topicos: topicosAtualizados, revisados };
      }
      return sessao;
    }));

    // Atualizar contador global
    const totalRevisados = sessoes.reduce((acc, sessao) => {
      if (sessao.id === sessaoId) {
        const topico = sessao.topicos.find(t => t.id === topicoId);
        return acc + (topico?.revisado ? 1 : -1);
      }
      return acc + sessao.revisados;
    }, 0);
    
    setTopicosRevisados(totalRevisados);
  };

  const totalTopicos = sessoes.reduce((acc, sessao) => acc + sessao.total, 0);
  const progressoGeral = (topicosRevisados / totalTopicos) * 100;

  const getImportanciaColor = (importancia: string) => {
    switch (importancia) {
      case "Alta": return "text-red-600 bg-red-50 border-red-200";
      case "Média": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Baixa": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com progresso geral */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            Checklist de Revisão Essencial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progresso Geral</span>
              <span className="text-sm text-muted-foreground">
                {topicosRevisados} de {totalTopicos} tópicos
              </span>
            </div>
            <Progress value={progressoGeral} className="h-3" />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                {Math.round(progressoGeral)}%
              </span>
              <p className="text-sm text-muted-foreground">Completo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessões */}
      {sessoes.map((sessao) => (
        <Card key={sessao.id} className="border-border">
          <CardHeader 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSessao(sessao.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {sessao.aberta ? (
                  <ChevronDown className="h-4 w-4 text-primary" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <CardTitle className="text-lg">{sessao.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{sessao.materia}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {sessao.revisados}/{sessao.total}
                </div>
                <Progress 
                  value={(sessao.revisados / sessao.total) * 100} 
                  className="w-20 h-2 mt-1" 
                />
              </div>
            </div>
          </CardHeader>

          {sessao.aberta && (
            <CardContent className="pt-0">
              <div className="space-y-3">
                {sessao.topicos.map((topico) => (
                  <div 
                    key={topico.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${
                          topico.revisado 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'border-2 border-gray-300 hover:border-primary'
                        }`}
                        onClick={() => toggleTopico(sessao.id, topico.id)}
                      >
                        {topico.revisado && <CheckSquare className="h-4 w-4" />}
                      </Button>
                      <span className={`font-medium ${topico.revisado ? 'line-through text-muted-foreground' : ''}`}>
                        {topico.nome}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getImportanciaColor(topico.importancia)}`}
                    >
                      {topico.importancia}
                    </Badge>
                  </div>
                ))}
              </div>

              {sessao.revisados === sessao.total && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Sessão completa! 🎉
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      ))}

      {/* Dicas de estudo */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Lock className="h-4 w-4 text-gold" />
            Dicas Avançadas (Premium)
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Com o upgrade você terá acesso a:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Cronograma personalizado baseado no seu progresso</li>
            <li>• Simulados específicos por tópico</li>
            <li>• Análise de pontos fracos</li>
            <li>• Lembretes inteligentes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
