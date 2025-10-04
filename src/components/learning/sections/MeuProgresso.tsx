import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Brain, Zap, Eye, Target, Lightbulb, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MeuProgresso = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    neuroPrepSessions: [] as any[],
    feynmanRecordings: [] as any[],
    flashcards: [] as any[],
    dualCoding: [] as any[],
    errors: [] as any[],
    generatedContent: [] as any[],
    protocolSessions: [] as any[]
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [neuro, feynman, flashcards, dual, errors, generated, protocol] = await Promise.all([
        supabase.from('neuro_prep_sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('feynman_recordings').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('user_flashcards').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('dual_coding_content').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('error_tracking').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('generated_content').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('protocol_sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      setData({
        neuroPrepSessions: neuro.data || [],
        feynmanRecordings: feynman.data || [],
        flashcards: flashcards.data || [],
        dualCoding: dual.data || [],
        errors: errors.data || [],
        generatedContent: generated.data || [],
        protocolSessions: protocol.data || []
      });
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const deleteFlashcard = async (id: string) => {
    try {
      await supabase.from('user_flashcards').delete().eq('id', id);
      toast.success("Flashcard excluído");
      loadAllData();
    } catch (error) {
      toast.error("Erro ao excluir flashcard");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium text-center">
        <h2 className="text-3xl font-bold mb-4">📊 Meu Progresso</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Acompanhe todo o conteúdo que você criou durante suas sessões de aprendizado
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-premium text-center p-4">
          <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{data.neuroPrepSessions.length}</div>
          <div className="text-xs text-muted-foreground">Preparações</div>
        </div>
        <div className="card-premium text-center p-4">
          <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{data.flashcards.length}</div>
          <div className="text-xs text-muted-foreground">Flashcards</div>
        </div>
        <div className="card-premium text-center p-4">
          <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{data.dualCoding.length}</div>
          <div className="text-xs text-muted-foreground">Dual Coding</div>
        </div>
        <div className="card-premium text-center p-4">
          <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{data.protocolSessions.length}</div>
          <div className="text-xs text-muted-foreground">Protocolos</div>
        </div>
      </div>

      {/* Detailed Data Tabs */}
      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-card gap-2 p-2">
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="neuro">Preparações</TabsTrigger>
          <TabsTrigger value="feynman">Feynman</TabsTrigger>
          <TabsTrigger value="dual">Dual Coding</TabsTrigger>
          <TabsTrigger value="errors">Erros</TabsTrigger>
          <TabsTrigger value="protocol">Protocolos</TabsTrigger>
        </TabsList>

        {/* Flashcards */}
        <TabsContent value="flashcards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Meus Flashcards ({data.flashcards.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.flashcards.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum flashcard criado ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {data.flashcards.map((card) => (
                    <div key={card.id} className="p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-primary">Pergunta:</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFlashcard(card.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mb-3">{card.question}</div>
                      <div className="font-semibold text-primary mb-1">Resposta:</div>
                      <div className="mb-3">{card.answer}</div>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {card.tags?.map((tag: string, i: number) => (
                          <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Criado: {formatDate(card.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Neuro Prep Sessions */}
        <TabsContent value="neuro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Sessões de Preparação Neural ({data.neuroPrepSessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.neuroPrepSessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma sessão registrada ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {data.neuroPrepSessions.map((session) => (
                    <div key={session.id} className="p-4 rounded-xl border border-border bg-card/50">
                      <div className="font-semibold mb-2">Objetivo:</div>
                      <div className="mb-3">{session.objective}</div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Duração: {Math.floor(session.duration_seconds / 60)} min</span>
                        <span>{formatDate(session.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feynman Recordings */}
        <TabsContent value="feynman" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Gravações Feynman ({data.feynmanRecordings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.feynmanRecordings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma gravação ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {data.feynmanRecordings.map((recording) => (
                    <div key={recording.id} className="p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold mb-1">Gravação de Explicação</div>
                          <div className="text-sm text-muted-foreground">
                            Duração: {recording.duration_seconds}s
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(recording.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dual Coding */}
        <TabsContent value="dual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Conteúdo Dual Coding ({data.dualCoding.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.dualCoding.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum conteúdo criado ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {data.dualCoding.map((content) => (
                    <div key={content.id} className="p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                            {content.type}
                          </span>
                          {content.subject && (
                            <span className="ml-2 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">
                              {content.subject}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(content.created_at)}
                        </div>
                      </div>
                      <div className="font-semibold mb-2">{content.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {typeof content.content === 'object' ? content.content.text : content.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Error Tracking */}
        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Erros Rastreados ({data.errors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.errors.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum erro rastreado ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {data.errors.map((error) => (
                    <div key={error.id} className="p-4 rounded-xl border border-border bg-card/50">
                      <div className="grid md:grid-cols-3 gap-4 mb-2">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Matéria:</div>
                          <div className="font-semibold">{error.subject}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Tipo de Erro:</div>
                          <div>{error.error_type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Frequência:</div>
                          <div>{error.frequency}x</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">Estratégia:</div>
                      <div className="text-sm mb-2">{error.strategy}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(error.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protocol Sessions */}
        <TabsContent value="protocol" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Sessões Protocolo 60=10 ({data.protocolSessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.protocolSessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma sessão completa ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {data.protocolSessions.map((session) => (
                    <div key={session.id} className="p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-lg mb-1">Sessão Completa</div>
                          <div className="text-sm text-muted-foreground">
                            Duração: {Math.floor(session.total_duration_seconds / 60)} minutos
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {session.efficiency_score?.toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Eficiência</div>
                        </div>
                      </div>
                      {session.notes && (
                        <div className="mb-2">
                          <div className="text-xs text-muted-foreground mb-1">Anotações:</div>
                          <div className="text-sm">{session.notes}</div>
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {formatDate(session.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};