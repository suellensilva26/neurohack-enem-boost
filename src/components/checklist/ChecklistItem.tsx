import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle, Clock, Target, AlertTriangle, 
  Info, Lightbulb, Zap, Lock 
} from "lucide-react";
import { ChecklistItem as ChecklistItemType } from "@/data/checklistData";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (itemId: string, completed: boolean) => void;
  showTips?: boolean;
}

export const ChecklistItemComponent = ({ item, onToggle, showTips = false }: ChecklistItemProps) => {
  const { isPremium } = useFreemiumLimits();
  const [showDetails, setShowDetails] = useState(false);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Target className="h-4 w-4" />;
      case 'medium': return <Info className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 80) return 'text-green-600';
    if (frequency >= 60) return 'text-yellow-600';
    if (frequency >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const canAccess = isPremium || item.importance === 'critical' || item.importance === 'high';

  return (
    <Card className={`transition-all duration-200 ${
      item.completed 
        ? 'border-green-500 bg-green-50' 
        : canAccess 
          ? 'border-primary/20 hover:border-primary/40' 
          : 'border-gray-200 bg-gray-50 opacity-75'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Checkbox
              checked={item.completed}
              onCheckedChange={(checked) => onToggle(item.id, checked as boolean)}
              disabled={!canAccess}
              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base font-medium leading-tight">
                {item.title}
              </CardTitle>
              
              <div className="flex items-center gap-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getImportanceColor(item.importance)}`}
                >
                  {getImportanceIcon(item.importance)}
                  <span className="ml-1 capitalize">{item.importance}</span>
                </Badge>
                
                {!canAccess && (
                  <Badge variant="destructive" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span className={getFrequencyColor(item.frequency)}>
                  {item.frequency}% recorrência ENEM
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{item.estimatedTime}min</span>
              </div>
              
              <Badge variant="secondary" className="text-xs">
                {item.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Progresso Visual */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frequência no ENEM</span>
                <span className="font-medium">{item.frequency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    item.frequency >= 80 ? 'bg-green-500' :
                    item.frequency >= 60 ? 'bg-yellow-500' :
                    item.frequency >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.frequency}%` }}
                />
              </div>
            </div>

            {/* Prerequisites */}
            {item.prerequisites && item.prerequisites.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Pré-requisitos:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {item.prerequisites.map((prereq, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {prereq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {item.tips && item.tips.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  Dicas de Estudo:
                </h4>
                <ul className="space-y-1">
                  {item.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA para Premium */}
            {!canAccess && (
              <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Desbloqueie este tópico</p>
                    <p className="text-xs text-muted-foreground">
                      Acesso completo a todos os tópicos premium
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.location.href = '/pricing'}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Desbloquear
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs"
          >
            {showDetails ? 'Menos detalhes' : 'Mais detalhes'}
          </Button>

          {!item.completed && canAccess && (
            <Button
              size="sm"
              onClick={() => onToggle(item.id, true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Marcar como Concluído
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


