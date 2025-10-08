import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Crown, Medal, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
  show: boolean;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common": return "bg-gray-100 text-gray-800";
    case "rare": return "bg-blue-100 text-blue-800";
    case "epic": return "bg-purple-100 text-purple-800";
    case "legendary": return "bg-gold/20 text-gold";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getRarityEmoji = (rarity: string) => {
  switch (rarity) {
    case "common": return "🥉";
    case "rare": return "🥈";
    case "epic": return "🥇";
    case "legendary": return "👑";
    default: return "🏆";
  }
};

export const AchievementToast = ({ achievement, onClose, show }: AchievementToastProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (achievement && show) {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      // Show toast notification as well
      toast({
        title: "🎉 Nova Conquista Desbloqueada!",
        description: `${achievement.name} - +${achievement.xpReward} XP`,
        duration: 3000,
      });

      return () => clearTimeout(timer);
    }
  }, [achievement, show, onClose, toast]);

  if (!achievement || !show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-500">
      <Card className="w-80 border-2 border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">{getRarityEmoji(achievement.rarity)}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-gold/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold text-foreground">
              Conquista Desbloqueada!
            </h3>
            
            <div className={`inline-flex items-center gap-2 p-3 rounded-lg ${getRarityColor(achievement.rarity)}`}>
              {achievement.icon}
              <span className="font-medium">{achievement.name}</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
            
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-primary text-primary-foreground">
                +{achievement.xpReward} XP
              </Badge>
              <Badge className={getRarityColor(achievement.rarity)}>
                {achievement.rarity.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Hook para usar o sistema de notificações de conquistas
export const useAchievementNotifications = () => {
  const { toast } = useToast();

  const showAchievement = (achievement: Achievement) => {
    toast({
      title: "🎉 Nova Conquista!",
      description: `${achievement.name} desbloqueada! +${achievement.xpReward} XP`,
      duration: 4000,
    });
  };

  const showLevelUp = (newLevel: number, title: string) => {
    toast({
      title: "🚀 Level Up!",
      description: `Parabéns! Você alcançou o nível ${newLevel} - ${title}`,
      duration: 5000,
    });
  };

  const showStreakMilestone = (streak: number) => {
    toast({
      title: "🔥 Sequência Incrível!",
      description: `${streak} dias consecutivos de estudo! Continue assim!`,
      duration: 4000,
    });
  };

  return {
    showAchievement,
    showLevelUp,
    showStreakMilestone
  };
};