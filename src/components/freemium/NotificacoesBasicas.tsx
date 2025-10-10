import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, Target, Brain, CheckSquare, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { safeNotify, requestNotificationPermission } from "@/lib/notifications";

interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  hora: string;
  ativa: boolean;
  tipo: "flashcards" | "checklist" | "questao" | "motivacional";
  icone: React.ReactNode;
}

const notificacoesPadrao: Notificacao[] = [
  {
    id: "flashcards-manha",
    titulo: "Flashcards da Manhã",
    descricao: "Hora de revisar seus flashcards! Comece o dia com 5 cards.",
    hora: "08:00",
    ativa: true,
    tipo: "flashcards",
    icone: <Brain className="h-4 w-4" />
  },
  {
    id: "questao-dia",
    titulo: "Questão do Dia",
    descricao: "Resolva sua questão diária e mantenha sua sequência!",
    hora: "14:00",
    ativa: true,
    tipo: "questao",
    icone: <Target className="h-4 w-4" />
  },
  {
    id: "checklist-noite",
    titulo: "Checklist da Noite",
    descricao: "Revise os tópicos estudados hoje no seu checklist.",
    hora: "20:00",
    ativa: true,
    tipo: "checklist",
    icone: <CheckSquare className="h-4 w-4" />
  },
  {
    id: "motivacional",
    titulo: "Dica Motivacional",
    descricao: "Mantenha o foco! Cada estudo te aproxima da aprovação.",
    hora: "18:00",
    ativa: true,
    tipo: "motivacional",
    icone: <Bell className="h-4 w-4" />
  }
];

export const NotificacoesBasicas = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(() => {
    const saved = localStorage.getItem('notificacoesBasicas');
    return saved ? JSON.parse(saved) : notificacoesPadrao;
  });
  const [permissaoNotificacao, setPermissaoNotificacao] = useState<NotificationPermission>("default");
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('notificacoesBasicas', JSON.stringify(notificacoes));
  }, [notificacoes]);

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
    setNotificacoes(prev => prev.map(notif => 
      notif.id === id ? { ...notif, ativa: !notif.ativa } : notif
    ));
  };

  const alterarHorario = (id: string, novoHorario: string) => {
    setNotificacoes(prev => prev.map(notif => 
      notif.id === id ? { ...notif, hora: novoHorario } : notif
    ));
  };

  const testarNotificacao = (notif: Notificacao) => {
    const res = safeNotify(notif.titulo, { body: notif.descricao, icon: "/favicon.ico" });
    if (res.ok) {
      toast({ title: "Notificação enviada!", description: `"${notif.titulo}" foi enviada como teste.` });
    } else {
      if (res.reason === "default") {
        toast({ title: "Permissão necessária", description: "Ative as notificações primeiro para testar.", variant: "destructive" });
      } else if (res.reason === "insecure_context") {
        toast({ title: "Contexto não seguro", description: "Use https ou localhost para testar notificações.", variant: "destructive" });
      } else if (res.reason === "unsupported") {
        toast({ title: "Não suportado", description: "Seu navegador não suporta Notifications.", variant: "destructive" });
      } else {
        toast({ title: "Falha ao enviar", description: "Não foi possível enviar a notificação.", variant: "destructive" });
      }
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "flashcards": return "bg-blue-500";
      case "questao": return "bg-green-500";
      case "checklist": return "bg-purple-500";
      case "motivacional": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "flashcards": return "Flashcards";
      case "questao": return "Questão do Dia";
      case "checklist": return "Checklist";
      case "motivacional": return "Motivacional";
      default: return "Geral";
    }
  };

  const notificacoesAtivas = notificacoes.filter(n => n.ativa).length;

  return (
    <div className="space-y-6">
      {/* Status das notificações */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Permissão do Navegador</h4>
                <p className="text-sm text-muted-foreground">
                  {permissaoNotificacao === "granted" ? "Permitido" : 
                   permissaoNotificacao === "denied" ? "Negado" : "Não solicitado"}
                </p>
              </div>
              <Badge variant={
                permissaoNotificacao === "granted" ? "default" :
                permissaoNotificacao === "denied" ? "destructive" : "secondary"
              }>
                {permissaoNotificacao === "granted" ? "Ativo" : 
                 permissaoNotificacao === "denied" ? "Bloqueado" : "Pendente"}
              </Badge>
            </div>

            {permissaoNotificacao !== "granted" && (
              <Button onClick={solicitarPermissao} className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Ativar Notificações
              </Button>
            )}

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações Ativas</h4>
                <p className="text-sm text-muted-foreground">
                  {notificacoesAtivas} de {notificacoes.length} ativadas
                </p>
              </div>
              <Badge variant="outline">
                {notificacoesAtivas}/{notificacoes.length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de notificações */}
      <div className="space-y-4">
        {notificacoes.map((notif) => (
          <Card key={notif.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTipoColor(notif.tipo)} text-white`}>
                    {notif.icone}
                  </div>
                  <div>
                    <h4 className="font-medium">{notif.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{notif.descricao}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {notif.hora} • {getTipoLabel(notif.tipo)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch
                    checked={notif.ativa}
                    onCheckedChange={() => toggleNotificacao(notif.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => testarNotificacao(notif)}
                    disabled={permissaoNotificacao !== "granted"}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {notif.ativa && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Horário:</span>
                  <input
                    type="time"
                    value={notif.hora}
                    onChange={(e) => alterarHorario(notif.id, e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dicas de notificação */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Settings className="h-4 w-4 text-gold" />
            Dicas para Melhor Uso
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Mantenha o navegador aberto para receber notificações</li>
            <li>• Configure horários que se adequem à sua rotina</li>
            <li>• Use as notificações para criar hábitos de estudo</li>
            <li>• Teste as notificações antes de confiar nelas</li>
          </ul>
        </CardContent>
      </Card>

      {/* Notificação premium */}
      <Card className="border-gold/30 bg-gradient-to-r from-gold/5 to-gold/10">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 text-gold">🚀 Notificações Premium</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Com o upgrade você terá acesso a:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Notificações personalizadas baseadas no seu progresso</li>
            <li>• Lembretes inteligentes de revisão</li>
            <li>• Alertas de simulados e prazos</li>
            <li>• Notificações push no celular</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
