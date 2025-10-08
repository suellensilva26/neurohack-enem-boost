import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, Crown, Zap, Target, BarChart3, Download, 
  Users, Trophy, CheckCircle, X, Infinity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  feature: 'simulados' | 'relatorios' | 'comparacao' | 'personalizado';
}

const FEATURES_MAP = {
  simulados: {
    title: 'Simulados Ilimitados',
    description: 'Faça quantos simulados quiser, quando quiser',
    icon: Infinity,
    color: 'text-blue-600'
  },
  relatorios: {
    title: 'Relatórios Detalhados',
    description: 'Análises completas em PDF para download',
    icon: Download,
    color: 'text-green-600'
  },
  comparacao: {
    title: 'Comparação com Outros Alunos',
    description: 'Veja como você está em relação aos demais',
    icon: Users,
    color: 'text-purple-600'
  },
  personalizado: {
    title: 'Simulados Personalizados',
    description: 'Crie simulados sob medida para suas necessidades',
    icon: Target,
    color: 'text-orange-600'
  }
};

const PREMIUM_BENEFITS = [
  {
    icon: Infinity,
    title: 'Simulados Ilimitados',
    description: 'Faça quantos simulados quiser por dia'
  },
  {
    icon: Target,
    title: 'Simulados Personalizados',
    description: 'Escolha quantidade de questões e tempo'
  },
  {
    icon: BarChart3,
    title: 'Análises Avançadas',
    description: 'Relatórios detalhados por competência'
  },
  {
    icon: Download,
    title: 'Relatórios em PDF',
    description: 'Baixe seus resultados em PDF'
  },
  {
    icon: Users,
    title: 'Comparação Nacional',
    description: 'Compare com outros estudantes'
  },
  {
    icon: Trophy,
    title: 'Ranking Premium',
    description: 'Participe do ranking nacional'
  },
  {
    icon: Zap,
    title: 'Correção Instantânea',
    description: 'Feedback imediato após cada questão'
  },
  {
    icon: Star,
    title: 'Suporte Prioritário',
    description: 'Atendimento exclusivo e prioritário'
  }
];

export const PremiumModal = ({ open, onClose, feature }: PremiumModalProps) => {
  const navigate = useNavigate();
  
  if (!open) return null;

  const currentFeature = FEATURES_MAP[feature];
  const FeatureIcon = currentFeature.icon;

  const handleUpgrade = () => {
    navigate('/pricing');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-gold/10 to-gold/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gold/20">
                <Crown className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Desbloqueie o Premium</h2>
                <p className="text-muted-foreground">
                  Acesso completo a todas as funcionalidades
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Feature em Destaque */}
          <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-gold/10 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-background ${currentFeature.color}`}>
                  <FeatureIcon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{currentFeature.title}</h3>
                  <p className="text-muted-foreground">{currentFeature.description}</p>
                </div>
                <Badge className="bg-gold text-white ml-auto">
                  Premium
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Benefícios Premium */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Tudo que você ganha com o Premium:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {PREMIUM_BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Comparação Gratuito vs Premium */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Comparação de Planos:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Plano Gratuito */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-lg">Gratuito</div>
                    <div className="text-2xl font-bold">R$ 0</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">3 simulados por semana</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Simulados básicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Correção simples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">Relatórios em PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">Comparação nacional</span>
                  </div>
                </CardContent>
              </Card>

              {/* Plano Premium */}
              <Card className="border-gold/30 bg-gradient-to-b from-gold/5 to-gold/10">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Crown className="h-5 w-5 text-gold" />
                      <span className="text-lg">Premium</span>
                    </div>
                    <div className="text-2xl font-bold text-gold">R$ 197</div>
                    <div className="text-sm text-muted-foreground">pagamento único</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Simulados ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Simulados personalizados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Análises detalhadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Relatórios em PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Comparação nacional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Suporte prioritário</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <div className="p-4 bg-gold/10 rounded-lg border border-gold/20">
              <div className="text-lg font-bold text-gold mb-2">
                🎯 Oferta Especial - ENEM 2025
              </div>
              <div className="text-sm text-muted-foreground">
                Acesso vitalício por apenas R$ 197 • Sem mensalidades • Garantia de 30 dias
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={onClose}>
                Continuar Gratuito
              </Button>
              <Button onClick={handleUpgrade} className="bg-gold hover:bg-gold/90 text-white px-8">
                <Crown className="h-4 w-4 mr-2" />
                Desbloquear Premium
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              💳 Pagamento seguro • 🔒 Garantia de 30 dias • ⚡ Ativação imediata
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};