import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export function CronogramaQuinzeDias() {
  const weeks = [
    {
      title: "SEMANA 1 - Diagnóstico e Fundação Intensiva",
      days: [
        {
          day: "DIA 1 - SEGUNDA",
          activities: [
            "Manhã (4h): Simulado diagnóstico completo + análise imediata",
            "Tarde (3h): Matemática - Funções, gráficos e estatística (tópicos essenciais)",
            "Noite (2h): Planejamento personalizado dos próximos 14 dias"
          ]
        },
        {
          day: "DIA 2 - TERÇA",
          activities: [
            "Manhã (4h): Português - Interpretação textual + gramática essencial",
            "Tarde (3h): Física - Mecânica e eletricidade (foco no que mais cai)",
            "Noite (2h): 100 questões mistas para fixação acelerada"
          ]
        },
        {
          day: "DIA 3 - QUARTA",
          activities: [
            "Manhã (4h): Química - Química geral + orgânica (essencial)",
            "Tarde (3h): História do Brasil - Colonial ao República",
            "Noite (2h): Revisão express + flashcards digitais"
          ]
        },
        {
          day: "DIA 4 - QUINTA",
          activities: [
            "Manhã (4h): Biologia - Citologia, genética e ecologia",
            "Tarde (3h): Geografia do Brasil - física e humana",
            "Noite (2h): 100 questões de ciências da natureza"
          ]
        },
        {
          day: "DIA 5 - SEXTA",
          activities: [
            "Manhã (4h): Literatura brasileira - movimentos essenciais",
            "Tarde (3h): Geografia mundial + atualidades",
            "Noite (2h): Mini-simulado de humanas"
          ]
        },
        {
          day: "DIA 6 - SÁBADO",
          activities: [
            "Manhã (4h): Redação - estrutura, temas e prática intensiva",
            "Tarde (3h): Filosofia e Sociologia - conceitos fundamentais",
            "Noite (2h): Revisão geral da semana"
          ]
        },
        {
          day: "DIA 7 - DOMINGO",
          activities: [
            "Manhã (3h): Simulado completo da primeira semana",
            "Tarde (2h): Análise de desempenho e ajustes",
            "Noite (1h): Descanso ativo - documentários educativos"
          ]
        }
      ]
    },
    {
      title: "SEMANA 2 - Aprofundamento e Prática Intensiva",
      days: [
        {
          day: "DIA 8 - SEGUNDA",
          activities: [
            "Manhã (4h): Matemática avançada - geometria e trigonometria",
            "Tarde (3h): Física - ondas, óptica e física moderna",
            "Noite (2h): 150 questões de exatas (ritmo acelerado)"
          ]
        },
        {
          day: "DIA 9 - TERÇA",
          activities: [
            "Manhã (4h): Química - físico-química e meio ambiente",
            "Tarde (3h): Biologia - evolução, botânica e zoologia",
            "Noite (2h): Laboratório virtual - experimentos essenciais"
          ]
        },
        {
          day: "DIA 10 - QUARTA",
          activities: [
            "Manhã (4h): História mundial - guerras e revoluções",
            "Tarde (3h): Português - literatura + análise de textos",
            "Noite (2h): Redação - prática com temas atuais"
          ]
        },
        {
          day: "DIA 11 - QUINTA",
          activities: [
            "Manhã (4h): Geografia - climatologia e geopolítica",
            "Tarde (3h): Atualidades - política, economia e meio ambiente",
            "Noite (2h): 150 questões de humanas"
          ]
        },
        {
          day: "DIA 12 - SEXTA",
          activities: [
            "Manhã (4h): Revisão geral - pontos fracos identificados",
            "Tarde (3h): Simulado temático - áreas de maior dificuldade",
            "Noite (2h): Técnicas de prova e gestão do tempo"
          ]
        },
        {
          day: "DIA 13 - SÁBADO",
          activities: [
            "Manhã (4h): Simulado completo - condições reais de prova",
            "Tarde (3h): Correção detalhada e análise de erros",
            "Noite (2h): Ajustes finais no plano de estudos"
          ]
        },
        {
          day: "DIA 14 - DOMINGO",
          activities: [
            "Manhã (3h): Revisão final - fórmulas e conceitos-chave",
            "Tarde (2h): Redação - últimas práticas e dicas",
            "Noite (1h): Preparação mental e relaxamento"
          ]
        }
      ]
    },
    {
      title: "DIA FINAL - Preparação para a Prova",
      days: [
        {
          day: "DIA 15 - VÉSPERA DA PROVA",
          activities: [
            "Manhã (2h): Revisão leve - apenas conceitos fundamentais",
            "Tarde (1h): Organização dos materiais e documentos",
            "Noite: Descanso total - sono reparador para o grande dia"
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          📅 Cronograma Intensivo 15 Dias
        </h2>
        <p className="text-gray-300 text-lg">
          Plano otimizado para máximo aproveitamento em tempo mínimo
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-yellow-400">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>9h/dia de estudos</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>135h totais</span>
          </div>
        </div>
      </div>

      {weeks.map((week, weekIndex) => (
        <Card key={weekIndex} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-xl">
              {week.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {week.days.map((day, dayIndex) => (
                <div key={dayIndex} className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-white mb-2">{day.day}</h4>
                  <ul className="space-y-1">
                    {day.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="text-gray-300 text-sm">
                        • {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 border-yellow-400">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-2">
              🎯 Meta Final: APROVAÇÃO GARANTIDA!
            </h3>
            <p className="text-black/80">
              Seguindo este cronograma intensivo, você estará preparado para conquistar sua vaga!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}