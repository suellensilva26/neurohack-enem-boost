import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { subjects, getFlashcardsBySubject } from "@/data/flashcardsData";
import { RepeticaoEspacada } from "@/utils/sm2";

interface SeletorBlocosProps {
  onSelect: (subjectId: string) => void;
  selectedSubjectId?: string;
}

export const SeletorBlocos = ({ onSelect, selectedSubjectId }: SeletorBlocosProps) => {
  const sm2 = new RepeticaoEspacada();

  const getProgress = (subjectId: string) => {
    const cards = getFlashcardsBySubject(subjectId);
    const reviewed = cards.filter(c => sm2.getProgress(c.id)).length;
    const percent = cards.length ? Math.round((reviewed / cards.length) * 100) : 0;
    return percent;
  };

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subj) => (
        <Card key={subj.id} className={`border-primary/20 ${selectedSubjectId === subj.id ? 'ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.55)]' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <span>{subj.icon}</span>
              {subj.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-semibold">{getProgress(subj.id)}%</span>
              </div>
              <Progress value={getProgress(subj.id)} className="h-2" />
            </div>
            <Button className="w-full h-10 sm:h-11 text-sm" onClick={() => onSelect(subj.id)}>Estudar {subj.name}</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};