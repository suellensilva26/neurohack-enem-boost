import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RepeticaoEspacada } from "@/utils/sm2";

export const DashboardFlashcards = () => {
  const sm2 = new RepeticaoEspacada();
  const stats = sm2.getStats();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Progresso Geral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Cards estudados: {stats.total}</Badge>
            <Badge variant="outline">Para hoje: {stats.dueToday}</Badge>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Facilidade Média</div>
            <Progress value={Math.min((stats.avgEF / 3) * 100, 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Streak Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Mantenha sua sequência diária de estudos!</div>
        </CardContent>
      </Card>
    </div>
  );
};