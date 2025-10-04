import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export function CronogramaTrintaDias() {
  const weeks = [
    {
      title: "SEMANA 1 - Diagnóstico e Fundação",
      days: [
        {
          day: "DIA 1 - SEGUNDA",
          activities: [
            "Manhã (3h): Simulado diagnóstico completo",
            "Tarde (2h): Análise de erros e identificação de gaps",
            "Noite (1h): Planejamento personalizado dos próximos 29 dias"
          ]
        },
        {
          day: "DIA 2 - TERÇA",
          activities: [
            "Manhã (3h): Matemática - Funções e gráficos (12 tópicos)",
            "Tarde (2h): Português - Interpretação textual (15 tópicos)",
            "Noite (1h): 50 questões mistas para fixação"
          ]
        },
        {
          day: "DIA 3 - QUARTA",
          activities: [
            "Manhã (3h): Física - Mecânica (10 tópicos)",
            "Tarde (2h): História do Brasil Colonial (12 marcos)",
            "Noite (1h): Revisão express + flashcards"
          ]
        },
        {
          day: "DIA 4 - QUINTA",
          activities: [
            "Manhã (3h): Química - Química geral (10 tópicos)",
            "Tarde (2h): Geografia do Brasil (primeira parte)",
            "Noite (1h): 50 questões de exatas"
          ]
        },
        {
          day: "DIA 5 - SEXTA",
          activities: [
            "Manhã (3h): Biologia - Citologia (8 tópicos)",
            "Tarde (2h): Literatura brasileira - Barroco ao Realismo",
            "Noite (1h): Mini-simulado de humanas"
          ]
        },
        {
          day: "DIA 6 - SÁBADO",
          activities: [
            "Manhã (4h): Simulado completo cronometrado",
            "Tarde (2h): Correção detalhada e análise",
            "Noite (1h): Redação tema livre"
          ]
        },
        {
          day: "DIA 7 - DOMINGO",
          activities: [
            "Manhã (2h): Revisão dos pontos críticos da semana",
            "Tarde (2h): Descanso ativo (filme educativo, documentário)",
            "Noite (1h): Planejamento da semana 2"
          ]
        }
      ]
    },
    {
      title: "SEMANA 2 - Consolidação Intensiva",
      days: [
        { day: "DIA 8", activities: ["Revisão de Matemática - Geometria", "Português - Gramática", "100 questões mistas"] },
        { day: "DIA 9", activities: ["Física - Termologia e Ondulatória", "História - Brasil Império", "Simulado parcial"] },
        { day: "DIA 10", activities: ["Química - Físico-química", "Geografia - Brasil físico", "Redação com tema social"] },
        { day: "DIA 11", activities: ["Biologia - Genética", "Literatura - Modernismo", "80 questões focadas"] },
        { day: "DIA 12", activities: ["Matemática - Estatística", "História Mundial - Idade Moderna", "Simulado completo"] },
        { day: "DIA 13", activities: ["Revisão geral da semana", "Correção de simulados", "Análise de evolução"] },
        { day: "DIA 14", activities: ["Descanso programado", "Revisão leve", "Planejamento semana 3"] }
      ]
    },
    {
      title: "SEMANA 3 - Otimização de Performance",
      days: [
        { day: "DIA 15-19", activities: ["Revisão dos 240 tópicos com foco nos gaps", "2 simulados completos", "Redação com temas atuais"] },
        { day: "DIA 20-21", activities: ["Simulados cronometrados", "Técnicas de gestão de tempo", "Análise de padrões de erro"] }
      ]
    },
    {
      title: "SEMANA 4 - Preparação Final",
      days: [
        { day: "DIA 22-26", activities: ["1 simulado por dia", "Revisão express dos pontos críticos", "Técnicas psicológicas"] },
        { day: "DIA 27-28", activities: ["Revisão final dos formulários", "Preparação logística", "Visualização positiva"] },
        { day: "DIA 29", activities: ["Revisão leve", "Checklist de véspera", "Descanso e sono reparador"] },
        { day: "DIA 30", activities: ["DIA DO ENEM - Aplicar tudo que aprendeu!"] }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Cronograma Militar dos 30 Dias
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Planejamento dia a dia para maximizar seu desempenho
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">{week.title}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {week.days.map((day, dayIndex) => (
                  <Card key={dayIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {day.day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 rounded-lg bg-primary/10">
            <h4 className="font-semibold mb-2">💡 Dica Importante:</h4>
            <p className="text-sm text-muted-foreground">
              Este cronograma é adaptável. Se você tem menos tempo disponível por dia, ajuste as horas mas mantenha a sequência dos conteúdos. O importante é a consistência!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}