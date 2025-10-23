import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, Brain, Target, Clock, TrendingUp, Zap, 
  Users, Star, AlertTriangle, CheckCircle, Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { safeNotify, requestNotificationPermission } from "@/lib/notifications";

interface SmartNotification {
  id: string;
  type: 'motivational' | 'reminder' | 'achievement' | 'study_tip' | 'deadline';
  title: string;
  message: string;
  icon: React.ReactNode;
  priority: 'low' | 'medium' | 'high';
  conditions: string[];
  enabled: boolean;
  lastSent?: string;
}

const smartNotifications: SmartNotification[] = [
  {
    id: 'morning_motivation',
    type: 'motivational',
    title: 'Bom dia, guerreiro! 🌅',
    message: 'Seu sonho de passar no ENEM está mais próximo a cada dia. Vamos começar com energia!',
    icon: <Star className="h-4 w-4" />,
    priority: 'medium',
    conditions: ['Horário: 07:00-09:00', 'Dias da semana: Segunda-Sexta'],
    enabled: true
  },
  {
    id: 'study_reminder',
    type: 'reminder',
    title: 'Hora de estudar! 📚',
    message: 'Você ainda não estudou hoje. Que tal dedicar 30 minutos agora?',
    icon: <Brain className="h-4 w-4" />,
    priority: 'high',
    conditions: ['Após 14h sem estudo', 'Dias úteis'],
    enabled: true
  },
  {
    id: 'streak_alert',
    type: 'achievement',
    title: 'Sua sequência está em risco! ⚠️',
    message: 'Você tem uma sequência de X dias. Não quebre agora!',
    icon: <TrendingUp className="h-4 w-4" />,
    priority: 'high',
    conditions: ['Sequência >= 3 dias', 'Sem estudo por 18h'],
    enabled: true
  },
  {
    id: 'weak_subject',
    type: 'study_tip',
    title: 'Dica de estudo 💡',
    message: 'Matemática é sua matéria mais fraca. Que tal focar nela hoje?',
    icon: <Target className="h-4 w-4" />,
    priority: 'medium',
    conditions: ['Baseado em analytics', 'Frequência: 2x por semana'],
    enabled: true
  },
  {
    id: 'weekend_encouragement',
    type: 'motivational',
    title: 'Fim de semana produtivo! 🎯',
    message: 'Aproveite o sábado para revisar o que aprendeu na semana.',
    icon: <Zap className="h-4 w-4" />,
    priority: 'low',
    conditions: ['Sábados', 'Horário: 10:00-12:00'],
    enabled: true
  },
  {
    id: 'enem_countdown',
    type: 'deadline',
    title: 'Contagem regressiva! ⏰',
    message: 'Faltam apenas X dias para o ENEM. Cada minuto conta!',
    icon: <Clock className="h-4 w-4" />,
    priority: 'high',
    conditions: ['Últimos 15 dias', 'Frequência: Diária'],
    enabled: true
  },
  {
    id: 'social_proof',
    type: 'motivational',
    title: 'Inspiração do dia 🌟',
    message: 'Mais de 10.000 estudantes já foram aprovados com nosso método!',
    icon: <Users className="h-4 w-4" />,
    priority: 'low',
    conditions: ['Frequência: 3x por semana', 'Horários variados'],
    enabled: true
  }
];

export const IntelligentNotifications = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>(smartNotifications);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Carregar configurações salvas
      const savedSettings = localStorage.getItem(`notifications_${user.id}`);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setNotifications(parsed.notifications || smartNotifications);
        setIsEnabled(parsed.enabled !== false);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const saveNotificationSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const settings = {
        notifications,
        enabled: isEnabled,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(settings));
      
      toast({
        title: "Configurações salvas!",
        description: "Suas preferências foram atualizadas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  const requestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    
    if (result === 'granted') {
      toast({
        title: "Permissão concedida! 🔔",
        description: "Você receberá notificações inteligentes.",
      });
      const res = safeNotify("ENEM 15 Dias - Intensivo", {
        body: "Notificações inteligentes ativadas com sucesso!",
        icon: "/favicon.ico",
      });
      if (!res.ok) {
        toast({
          title: "Aviso",
          description: "Falha ao enviar notificação de teste.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
    ));
  };

  const testNotification = (notification: SmartNotification) => {
    if (permission === 'granted') {
      const res = safeNotify(notification.title, {
        body: notification.message,
        icon: "/favicon.ico",
      });
      if (res.ok) {
        toast({
          title: "Notificação enviada!",
          description: `"${notification.title}" foi enviada como teste.`,
        });
      } else {
        toast({
          title: "Falha ao enviar",
          description: "Verifique permissões e contexto seguro.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Permissão necessária",
        description: "Ative as notificações primeiro para testar.",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'motivational': return '💪';
      case 'reminder': return '⏰';
      case 'achievement': return '🏆';
      case 'study_tip': return '💡';
      case 'deadline': return '⚠️';
      default: return '📱';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status geral */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notificações Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Status do Sistema</h4>
                <p className="text-sm text-muted-foreground">
                  {isEnabled ? 'Ativo - Notificações personalizadas' : 'Inativo - Sem notificações'}
                </p>
              </div>
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
                disabled={permission !== 'granted'}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Permissão do Navegador</h4>
                <p className="text-sm text-muted-foreground">
                  {permission === 'granted' ? 'Permitido' : 
                   permission === 'denied' ? 'Negado' : 'Não solicitado'}
                </p>
              </div>
              <Badge variant={
                permission === 'granted' ? 'default' :
                permission === 'denied' ? 'destructive' : 'secondary'
              }>
                {permission === 'granted' ? 'Ativo' : 
                 permission === 'denied' ? 'Bloqueado' : 'Pendente'}
              </Badge>
            </div>

            {permission !== 'granted' && (
              <Button onClick={requestPermission} className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Ativar Notificações Inteligentes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de notificações inteligentes */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Inteligentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <strong>Condições:</strong> {notification.conditions.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => testNotification(notification)}
                      disabled={permission !== 'granted'}
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={() => toggleNotification(notification.id)}
                      disabled={!isEnabled || permission !== 'granted'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas de uso */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Settings className="h-4 w-4 text-gold" />
            Como Funciona o Sistema Inteligente
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Análise de comportamento:</strong> O sistema aprende seus horários de estudo</li>
            <li>• <strong>Personalização:</strong> Notificações adaptadas ao seu progresso</li>
            <li>• <strong>Timing inteligente:</strong> Mensagens no momento certo</li>
            <li>• <strong>Conteúdo relevante:</strong> Dicas baseadas em suas dificuldades</li>
          </ul>
        </CardContent>
      </Card>

      {/* Botão salvar */}
      <Button onClick={saveNotificationSettings} className="w-full">
        <Settings className="h-4 w-4 mr-2" />
        Salvar Configurações
      </Button>
    </div>
  );
};
