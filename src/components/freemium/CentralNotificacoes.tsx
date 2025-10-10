import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, Clock, Target, Brain, CheckSquare, Settings, 
  Plus, Trash2, Calendar, BookOpen, Sparkles, AlertTriangle,
  MessageSquare, Zap, RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { safeNotify, requestNotificationPermission } from "@/lib/notifications";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  hora: string;
  ativa: boolean;
  tipo: "flashcards" | "checklist" | "questao" | "motivacional" | "cronograma" | "simulado" | "personalizada";
  icone: React.ReactNode;
  dias?: string[]; // dias da semana (seg, ter, qua, qui, sex, sab, dom)
  lida?: boolean;
  data?: string; // para notificações recebidas
}

const notificacoesPadrao: Notificacao[] = [
  {
    id: "flashcards-manha",
    titulo: "Flashcards da Manhã",
    descricao: "Hora de revisar seus flashcards! Comece o dia com 5 cards.",
    hora: "08:00",
    ativa: true,
    tipo: "flashcards",
    icone: <Brain className="h-4 w-4" />,
    dias: ["seg", "ter", "qua", "qui", "sex"]
  },
  {
    id: "questao-dia",
    titulo: "Questão do Dia",
    descricao: "Resolva sua questão diária e mantenha sua sequência!",
    hora: "14:00",
    ativa: true,
    tipo: "questao",
    icone: <Target className="h-4 w-4" />,
    dias: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]
  },
  {
    id: "checklist-noite",
    titulo: "Checklist da Noite",
    descricao: "Revise os tópicos estudados hoje no seu checklist.",
    hora: "20:00",
    ativa: true,
    tipo: "checklist",
    icone: <CheckSquare className="h-4 w-4" />,
    dias: ["seg", "ter", "qua", "qui", "sex"]
  },
  {
    id: "motivacional",
    titulo: "Dica Motivacional",
    descricao: "Mantenha o foco! Cada estudo te aproxima da aprovação.",
    hora: "18:00",
    ativa: true,
    tipo: "motivacional",
    icone: <Bell className="h-4 w-4" />,
    dias: ["seg", "qua", "sex"]
  },
  {
    id: "cronograma-semanal",
    titulo: "Atualização do Cronograma",
    descricao: "Seu cronograma semanal foi atualizado! Confira as novidades.",
    hora: "07:00",
    ativa: true,
    tipo: "cronograma",
    icone: <Calendar className="h-4 w-4" />,
    dias: ["seg"]
  }
];

// Notificações recebidas de exemplo
const notificacoesRecebidasExemplo: Notificacao[] = [
  {
    id: "notif-1",
    titulo: "Novo Simulado Disponível",
    descricao: "Um novo simulado de Ciências da Natureza foi adicionado. Teste seus conhecimentos!",
    hora: "09:30",
    ativa: true,
    tipo: "simulado",
    icone: <Target className="h-4 w-4" />,
    lida: false,
    data: new Date().toISOString()
  },
  {
    id: "notif-2",
    titulo: "Cronograma Atualizado",
    descricao: "Seu cronograma semanal foi atualizado com base no seu desempenho recente.",
    hora: "07:15",
    ativa: true,
    tipo: "cronograma",
    icone: <Calendar className="h-4 w-4" />,
    lida: true,
    data: new Date(Date.now() - 86400000).toISOString() // ontem
  },
  {
    id: "notif-3",
    titulo: "Lembrete de Estudo",
    descricao: "Não esqueça de revisar Matemática hoje! Você tem questões pendentes.",
    hora: "16:00",
    ativa: true,
    tipo: "motivacional",
    icone: <Bell className="h-4 w-4" />,
    lida: false,
    data: new Date(Date.now() - 172800000).toISOString() // 2 dias atrás
  }
];

const diasSemana = [
  { valor: "seg", label: "Segunda" },
  { valor: "ter", label: "Terça" },
  { valor: "qua", label: "Quarta" },
  { valor: "qui", label: "Quinta" },
  { valor: "sex", label: "Sexta" },
  { valor: "sab", label: "Sábado" },
  { valor: "dom", label: "Domingo" }
];

const tiposNotificacao = [
  { valor: "flashcards", label: "Flashcards", icone: <Brain className="h-4 w-4" /> },
  { valor: "questao", label: "Questão do Dia", icone: <Target className="h-4 w-4" /> },
  { valor: "checklist", label: "Checklist", icone: <CheckSquare className="h-4 w-4" /> },
  { valor: "motivacional", label: "Motivacional", icone: <Bell className="h-4 w-4" /> },
  { valor: "cronograma", label: "Cronograma", icone: <Calendar className="h-4 w-4" /> },
  { valor: "simulado", label: "Simulado", icone: <BookOpen className="h-4 w-4" /> },
  { valor: "personalizada", label: "Personalizada", icone: <Settings className="h-4 w-4" /> }
];

export const CentralNotificacoes = () => {
  const { isPremium } = useFreemiumLimits();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(() => {
    const saved = localStorage.getItem('notificacoesCentral');
    return saved ? JSON.parse(saved) : notificacoesPadrao;
  });
  const [notificacoesRecebidas, setNotificacoesRecebidas] = useState<Notificacao[]>(() => {
    const saved = localStorage.getItem('notificacoesRecebidas');
    return saved ? JSON.parse(saved) : notificacoesRecebidasExemplo;
  });
  const [permissaoNotificacao, setPermissaoNotificacao] = useState<NotificationPermission>("default");
  const [novaNotificacao, setNovaNotificacao] = useState<Partial<Notificacao>>({
    titulo: "",
    descricao: "",
    hora: "08:00",
    tipo: "personalizada",
    ativa: true,
    dias: ["seg", "ter", "qua", "qui", "sex"]
  });
  const [activeTab, setActiveTab] = useState("recebidas");
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('notificacoesCentral', JSON.stringify(notificacoes));
  }, [notificacoes]);

  useEffect(() => {
    localStorage.setItem('notificacoesRecebidas', JSON.stringify(notificacoesRecebidas));
  }, [notificacoesRecebidas]);

  useEffect(() => {
    // Verificar permissão de notificação
    if ("Notification" in window) {
      setPermissaoNotificacao(Notification.permission);
    }
  }, []);

  const solicitarPermissao = async () => {
    const permission = await requestNotificationPermission();
    setPermissaoNotificacao(permission);
    if (permission === "granted") {
      toast({ title: "Permissão concedida! 🔔", description: "Você receberá notificações de estudo." });
      const res = safeNotify("ENEM 30x Boost", { body: "Notificações ativadas! Continue seus estudos.", icon: "/favicon.ico" });
      if (!res.ok) {
        const reason = res.reason === "insecure_context" ?
          "Contexto não seguro (http). Use https ou localhost." :
          res.reason === "unsupported" ? "Navegador não suporta Notifications." :
          "Falha ao enviar notificação de teste.";
        toast({ title: "Aviso", description: reason, variant: "destructive" });
      }
    } else {
      toast({ title: "Permissão negada", description: "Ative nas configurações do navegador.", variant: "destructive" });
    }
  };

  const toggleNotificacao = (id: string) => {
    setNotificacoes(notificacoes.map(notif => 
      notif.id === id ? { ...notif, ativa: !notif.ativa } : notif
    ));
  };

  const marcarComoLida = (id: string) => {
    setNotificacoesRecebidas(notificacoesRecebidas.map(notif => 
      notif.id === id ? { ...notif, lida: true } : notif
    ));
  };

  const excluirNotificacao = (id: string) => {
    setNotificacoes(notificacoes.filter(notif => notif.id !== id));
    toast({
      title: "Notificação excluída",
      description: "A notificação foi removida com sucesso.",
    });
  };

  const excluirNotificacaoRecebida = (id: string) => {
    setNotificacoesRecebidas(notificacoesRecebidas.filter(notif => notif.id !== id));
  };

  const limparTodasLidas = () => {
    setNotificacoesRecebidas(notificacoesRecebidas.filter(notif => !notif.lida));
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações lidas foram removidas.",
    });
  };

  const marcarTodasComoLidas = () => {
    setNotificacoesRecebidas(notificacoesRecebidas.map(notif => ({ ...notif, lida: true })));
    toast({
      title: "Notificações marcadas",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  const adicionarNotificacao = () => {
    if (!novaNotificacao.titulo || !novaNotificacao.descricao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o título e a descrição da notificação.",
        variant: "destructive",
      });
      return;
    }

    const icone = tiposNotificacao.find(tipo => tipo.valor === novaNotificacao.tipo)?.icone || <Bell className="h-4 w-4" />;
    
    const novaNot: Notificacao = {
      id: `notif-${Date.now()}`,
      titulo: novaNotificacao.titulo,
      descricao: novaNotificacao.descricao,
      hora: novaNotificacao.hora || "08:00",
      ativa: true,
      tipo: (novaNotificacao.tipo as any) || "personalizada",
      icone,
      dias: novaNotificacao.dias || ["seg"]
    };

    setNotificacoes([...notificacoes, novaNot]);
    
    // Limpar formulário
    setNovaNotificacao({
      titulo: "",
      descricao: "",
      hora: "08:00",
      tipo: "personalizada",
      ativa: true,
      dias: ["seg", "ter", "qua", "qui", "sex"]
    });

    toast({
      title: "Notificação adicionada",
      description: "Sua nova notificação foi configurada com sucesso.",
    });
  };

  const toggleDia = (dia: string) => {
    if (!novaNotificacao.dias) {
      setNovaNotificacao({ ...novaNotificacao, dias: [dia] });
      return;
    }

    if (novaNotificacao.dias.includes(dia)) {
      setNovaNotificacao({ 
        ...novaNotificacao, 
        dias: novaNotificacao.dias.filter(d => d !== dia) 
      });
    } else {
      setNovaNotificacao({ 
        ...novaNotificacao, 
        dias: [...novaNotificacao.dias, dia] 
      });
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);
    
    if (data.toDateString() === hoje.toDateString()) {
      return "Hoje";
    } else if (data.toDateString() === ontem.toDateString()) {
      return "Ontem";
    } else {
      return data.toLocaleDateString('pt-BR');
    }
  };

  const notificacoesNaoLidas = notificacoesRecebidas.filter(n => !n.lida).length;

  return (
    <div className="space-y-6">
      {/* Status de Permissão */}
      {permissaoNotificacao !== "granted" && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-amber-800">Permissão de notificações</h3>
              <p className="text-sm text-amber-700 mb-2">
                Ative as notificações para receber lembretes de estudo e atualizações importantes.
              </p>
              <Button 
                onClick={solicitarPermissao} 
                variant="outline" 
                className="bg-white border-amber-200 text-amber-800 hover:bg-amber-100"
              >
                <Bell className="mr-2 h-4 w-4" />
                Ativar Notificações
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Abas */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="recebidas" className="relative">
            Recebidas
            {notificacoesNaoLidas > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-[10px]">
                {notificacoesNaoLidas}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="configurar">Configurar</TabsTrigger>
          <TabsTrigger value="adicionar" disabled={!isPremium}>
            {isPremium ? "Adicionar" : <Lock className="h-3.5 w-3.5" />}
          </TabsTrigger>
        </TabsList>

        {/* Aba de Notificações Recebidas */}
        <TabsContent value="recebidas" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Notificações Recebidas</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={marcarTodasComoLidas}
                className="h-8 text-xs"
              >
                <CheckSquare className="mr-1 h-3.5 w-3.5" />
                Marcar todas como lidas
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={limparTodasLidas}
                className="h-8 text-xs"
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Limpar lidas
              </Button>
            </div>
          </div>

          {notificacoesRecebidas.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium text-lg">Nenhuma notificação</h3>
                <p className="text-sm text-muted-foreground">
                  Você não tem notificações no momento.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notificacoesRecebidas.map((notif) => (
                <Card key={notif.id} className={`overflow-hidden ${notif.lida ? 'bg-muted/30' : 'border-primary/20'}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        notif.lida ? 'bg-muted' : 'bg-primary/10'
                      }`}>
                        {notif.icone}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-medium ${notif.lida ? 'text-muted-foreground' : ''}`}>
                            {notif.titulo}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-[10px] whitespace-nowrap">
                              {formatarData(notif.data || '')}
                            </Badge>
                            {!notif.lida && (
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.descricao}</p>
                        <div className="flex justify-end mt-2 gap-2">
                          {!notif.lida && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => marcarComoLida(notif.id)}
                              className="h-7 text-xs"
                            >
                              <CheckSquare className="mr-1 h-3.5 w-3.5" />
                              Marcar como lida
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => excluirNotificacaoRecebida(notif.id)}
                            className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Aba de Configuração */}
        <TabsContent value="configurar" className="space-y-4">
          <h2 className="text-lg font-semibold">Configurar Notificações</h2>
          
          <div className="space-y-3">
            {notificacoes.map((notif) => (
              <Card key={notif.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        notif.ativa ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        {notif.icone}
                      </div>
                      <div>
                        <h3 className="font-medium">{notif.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{notif.descricao}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-[10px]">
                            <Clock className="mr-1 h-3 w-3" />
                            {notif.hora}
                          </Badge>
                          {notif.dias && notif.dias.map(dia => (
                            <Badge key={dia} variant="secondary" className="text-[10px]">
                              {dia.charAt(0).toUpperCase() + dia.slice(1, 3)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={notif.ativa} 
                        onCheckedChange={() => toggleNotificacao(notif.id)} 
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => excluirNotificacao(notif.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba de Adicionar Notificação (Premium) */}
        <TabsContent value="adicionar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Nova Notificação
              </CardTitle>
              <CardDescription>
                Crie notificações personalizadas para seus estudos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input 
                    id="titulo" 
                    value={novaNotificacao.titulo} 
                    onChange={(e) => setNovaNotificacao({...novaNotificacao, titulo: e.target.value})}
                    placeholder="Ex: Revisão de Matemática"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input 
                    id="descricao" 
                    value={novaNotificacao.descricao} 
                    onChange={(e) => setNovaNotificacao({...novaNotificacao, descricao: e.target.value})}
                    placeholder="Ex: Hora de revisar equações do 2º grau"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hora">Horário</Label>
                    <Input 
                      id="hora" 
                      type="time" 
                      value={novaNotificacao.hora} 
                      onChange={(e) => setNovaNotificacao({...novaNotificacao, hora: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select 
                      value={novaNotificacao.tipo} 
                      onValueChange={(value) => setNovaNotificacao({...novaNotificacao, tipo: value as any})}
                    >
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposNotificacao.map((tipo) => (
                          <SelectItem key={tipo.valor} value={tipo.valor}>
                            <div className="flex items-center gap-2">
                              {tipo.icone}
                              <span>{tipo.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Dias da Semana</Label>
                  <div className="flex flex-wrap gap-2">
                    {diasSemana.map((dia) => (
                      <Button
                        key={dia.valor}
                        type="button"
                        variant={novaNotificacao.dias?.includes(dia.valor) ? "default" : "outline"}
                        onClick={() => toggleDia(dia.valor)}
                        className="h-8 text-xs"
                      >
                        {dia.label.substring(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button onClick={adicionarNotificacao} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Notificação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Banner Premium */}
      {!isPremium && (
        <Card className="border-2 border-amber-200 bg-amber-50/50 mt-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-800 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  Desbloqueie Notificações Premium
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  Crie notificações personalizadas, receba lembretes inteligentes baseados no seu desempenho
                  e muito mais com o plano Premium.
                </p>
                <ul className="mt-3 space-y-1">
                  <li className="text-sm flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Notificações personalizadas ilimitadas</span>
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Lembretes inteligentes baseados no seu desempenho</span>
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Sincronização com seu calendário pessoal</span>
                  </li>
                </ul>
              </div>
              <Button 
                onClick={() => window.location.href = '/pricing'}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 w-full sm:w-auto"
              >
                <Zap className="mr-2 h-4 w-4" />
                Assinar Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};