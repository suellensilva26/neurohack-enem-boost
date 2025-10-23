import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Brain, Zap, Eye, Target, Lightbulb, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as logger from "@/utils/logger";

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
      logger.error("Error loading data:", error);
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
      <div className="card-premium text-center px-4">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">📊 Meu Progresso</h2>
        <p className="text-xs md:text-base text-muted-foreground max-w-3xl mx-auto">
          Acompanhe todo o conteúdo que você criou durante suas sessões de aprendizado
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div className="card-premium text-center p-3 md:p-4">
          <Brain className="h-5 w-5 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-bold">{data.neuroPrepSessions.length}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">Preparações</div>
        </div>
        <div className="card-premium text-center p-3 md:p-4">
          <Zap className="h-5 w-5 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-bold">{data.flashcards.length}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">Flashcards</div>
        </div>
        <div className="card-premium text-center p-3 md:p-4">
          <Eye className="h-5 w-5 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-bold">{data.dualCoding.length}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">Dual Coding</div>
        </div>
        <div className="card-premium text-center p-3 md:p-4">
          <Clock className="h-5 w-5 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-bold">{data.protocolSessions.length}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">Protocolos</div>
        </div>
      </div>

      {/* Detailed Data Tabs */}
      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-card gap-1 md:gap-2 p-1 md:p-2">
          <TabsTrigger value="flashcards" className="text-xs md:text-sm px-2 md:px-4">Cards</TabsTrigger>
          <TabsTrigger value="neuro" className="text-xs md:text-sm px-2 md:px-4">Prep</TabsTrigger>
          <TabsTrigger value="feynman" className="text-xs md:text-sm px-2 md:px-4">Feynman</TabsTrigger>
          <TabsTrigger value="dual" className="text-xs md:text-sm px-2 md:px-4">Dual</TabsTrigger>
          <TabsTrigger value="errors" className="text-xs md:text-sm px-2 md:px-4">Erros</TabsTrigger>
          <TabsTrigger value="protocol" className="text-xs md:text-sm px-2 md:px-4">60=10</TabsTrigger>
        </TabsList>

        {/* Flashcards */}
        <TabsContent value="flashcards" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Zap className="h-4 w-4 md:h-5 md:w-5" />
                Meus Flashcards ({data.flashcards.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {data.flashcards.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum flashcard criado ainda
                </p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {data.flashcards.map((card) => (
                    <div key={card.id} className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-primary text-sm md:text-base">Pergunta:</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFlashcard(card.id)}
                          className="h-7 w-7 md:h-8 md:w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                      <div className="mb-2 md:mb-3 text-sm md:text-base">{card.question}</div>
                      <div className="font-semibold text-primary mb-1 text-sm md:text-base">Resposta:</div>
                      <div className="mb-2 md:mb-3 text-sm md:text-base">{card.answer}</div>
                      <div className="flex gap-1 md:gap-2 flex-wrap mb-2">
                        {card.tags?.map((tag: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 md:py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">
                        Criado: {formatDate(card.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neuro" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Brain className="h-4 w-4 md:h-5 md:w-5" />
                Sessões de Preparação Neural ({data.neuroPrepSessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {data.neuroPrepSessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Nenhuma sessão registrada ainda
                </p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {data.neuroPrepSessions.map((session) => (
                    <div key={session.id} className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
                      <div className="font-semibold mb-2 text-sm md:text-base">Objetivo:</div>
                      <div className="mb-2 md:mb-3 text-sm md:text-base">{session.objective}</div>
                      <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground">
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
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Zap className="h-4 w-4 md:h-5 md:w-5" />
                Gravações Feynman ({data.feynmanRecordings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {data.feynmanRecordings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Nenhuma gravação ainda
                </p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {data.feynmanRecordings.map((recording) => (
                    <div key={recording.id} className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold mb-1 text-sm md:text-base">Gravação de Explicação</div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            Duração: {recording.duration_seconds}s
                          </div>
                        </div>
                        <div className="text-[10px] md:text-xs text-muted-foreground">
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
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Eye className="h-4 w-4 md:h-5 md:w-5" />
                Conteúdo Dual Coding ({data.dualCoding.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {data.dualCoding.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Nenhum conteúdo criado ainda
                </p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {data.dualCoding.map((content) => (
                    <div key={content.id} className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          <span className="px-2 py-0.5 md:py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs">
                            {content.type}
                          </span>
                          {content.subject && (
                            <span className="px-2 py-0.5 md:py-1 rounded-full bg-accent/10 text-accent text-[10px] md:text-xs">
                              {content.subject}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(content.created_at)}
                        </div>
                      </div>
                      <div className="font-semibold mb-2 text-sm md:text-base">{content.title}</div>
                      <div className="text-xs md:text-sm text-muted-foreground line-clamp-3">
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
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5" />
                Erros Rastreados ({data.errors.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {data.errors.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Nenhum erro rastreado ainda
                </p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {data.errors.map((error) => (
                    <div key={error.id} className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-2">
                        <div>
                          <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Matéria:</div>
                          <div className="font-semibold text-sm md:text-base">{error.subject}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Tipo:</div>
                          <div className="text-sm md:text-base">{error.error_type}</div>
                        </div>
                        <div>
                          <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Freq:</div>
                          <div className="text-sm md:text-base">{error.frequency}x</div>
                        </div>
                      </div>
                      <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Estratégia:</div>
                      <div className="text-xs md:text-sm mb-2">{error.strategy}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">
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
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                Sessões Protocolo 60=10 ({data.protocolSessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              {data.protocolSessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Nenhuma sessão completa ainda
                </p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {data.protocolSessions.map((session) => (
                    <div key={session.id} className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <div>
                          <div className="font-semibold text-base md:text-lg mb-1">Sessão Completa</div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            Duração: {Math.floor(session.total_duration_seconds / 60)} min
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl md:text-2xl font-bold text-primary">
                            {session.efficiency_score?.toFixed(0)}%
                          </div>
                          <div className="text-[10px] md:text-xs text-muted-foreground">Eficiência</div>
                        </div>
                      </div>
                      {session.notes && (
                        <div className="mb-2">
                          <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Anotações:</div>
                          <div className="text-xs md:text-sm">{session.notes}</div>
                        </div>
                      )}
                      <div className="text-[10px] md:text-xs text-muted-foreground">
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