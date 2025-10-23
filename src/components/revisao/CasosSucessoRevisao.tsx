import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Target } from "lucide-react";

export function CasosSucessoRevisao() {
  const casos = [
    {
      icon: Trophy,
      title: "O MILAGRE DA LETÍCIA",
      situacao: [
        "Não havia estudado durante o ano",
        "15 dias antes da prova estava desesperada",
        "Primeira tentativa: 543 pontos (insuficiente)"
      ],
      resultado: [
        "Segunda tentativa: 847 pontos",
        "Aprovação em Direito na UFMG",
        "Gain de 304 pontos em um mês"
      ],
      aplicacao: [
        "Seguiu religiosamente o cronograma de 15 dias",
        "Focou nos 240 tópicos essenciais",
        "Fez 15 simulados completos",
        "Usou mapas mentais para memorização acelerada"
      ]
    },
    {
      icon: TrendingUp,
      title: "A VIRADA DO MARCOS",
      situacao: [
        "Trabalhava 8h/dia durante o ano",
        "Apenas fins de semana para estudar",
        "Ansiedade extrema com matemática"
      ],
      resultado: [
        "De 498 para 756 pontos",
        "Aprovação em Engenharia Civil",
        "Venceu o bloqueio com matemática"
      ],
      aplicacao: [
        "Cronograma adaptado para 2-3h/dia",
        "Foco extra em exatas (módulos duplicados)",
        "Simulados aos sábados e domingos",
        "Técnicas de controle da ansiedade"
      ]
    },
    {
      icon: Target,
      title: "O FENÔMENO CARLA",
      situacao: [
        "Terceira tentativa no ENEM",
        "Sempre travava na redação",
        "Notas anteriores: 623 e 641"
      ],
      resultado: [
        "892 pontos na média final",
        "980 pontos na redação (nota máxima regional)",
        "Aprovação em Jornalismo na UFSC"
      ],
      aplicacao: [
        "50% do tempo dedicado à redação",
        "Dominou os 12 repertórios universais",
        "30 redações em 30 dias",
        "Técnicas de gestão de tempo"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Casos de Sucesso Documentados</CardTitle>
          <p className="text-sm text-muted-foreground">
            Transformações reais que comprovam a eficácia do Kit Revisão Express
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {casos.map((caso, index) => {
            const Icon = caso.icon;
            return (
              <Card key={index} className="border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    {caso.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-muted-foreground">SITUAÇÃO INICIAL:</h4>
                      <ul className="space-y-1">
                        {caso.situacao.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">RESULTADO FINAL:</h4>
                      <ul className="space-y-1">
                        {caso.resultado.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="font-semibold mb-2">APLICAÇÃO DO KIT EXPRESS:</h4>
                    <ul className="space-y-1">
                      {caso.aplicacao.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card className="text-center p-6 border-gold/30 bg-gold/5">
              <div className="text-4xl font-bold text-gold mb-2">15.000+</div>
              <p className="text-sm text-muted-foreground">Casos de sucesso documentados</p>
            </Card>
            
            <Card className="text-center p-6 border-gold/30 bg-gold/5">
              <div className="text-4xl font-bold text-gold mb-2">73%</div>
              <p className="text-sm text-muted-foreground">Taxa de aprovação na primeira tentativa</p>
            </Card>
            
            <Card className="text-center p-6 border-gold/30 bg-gold/5">
              <div className="text-4xl font-bold text-gold mb-2">+180</div>
              <p className="text-sm text-muted-foreground">Pontos de melhoria média em 30 dias</p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}