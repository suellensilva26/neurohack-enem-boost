import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Lightbulb, FileText } from "lucide-react";

const TEMAS = [
  {
    id: 1,
    titulo: "Inteligência Artificial e Sociedade",
    justificativa: "Com o avanço acelerado da IA (ChatGPT, deepfakes, automação), questões éticas e sociais são urgentes.",
    repertorios: [
      "Michel Foucault - Vigilância e controle social",
      "Hannah Arendt - Responsabilidade em tempos de automação",
      "Lei Geral de Proteção de Dados (LGPD)"
    ],
    exemplo: `No contexto contemporâneo, a Inteligência Artificial representa uma revolução tecnológica sem precedentes, modificando profundamente as relações sociais e trabalhistas. Segundo Michel Foucault, em "Vigiar e Punir", mecanismos de controle social são cada vez mais sofisticados e invisíveis. Nesse sentido, a IA configura-se como um novo paradigma de poder, capaz de influenciar comportamentos através de algoritmos e análise de dados. Diante disso, torna-se fundamental analisar os desafios éticos dessa tecnologia e sua regulamentação no Brasil.

Em primeira análise, é importante destacar que a ausência de regulamentação adequada permite abusos no uso de IA. De acordo com a Lei Geral de Proteção de Dados (LGPD), brasileira, o tratamento de informações pessoais deve respeitar princípios de transparência e finalidade. Entretanto, algoritmos de recomendação manipulam usuários sem seu conhecimento explícito, criando "bolhas" informacionais que fragmentam o debate público. Esse cenário evidencia-se nas eleições brasileiras de 2022, onde deepfakes e desinformação automatizada influenciaram milhões de eleitores. Portanto, fica evidente a necessidade de mecanismos de fiscalização mais rígidos.

Além disso, outro aspecto relevante relaciona-se ao impacto da IA no mercado de trabalho brasileiro. Segundo estimativas da Organização Internacional do Trabalho (OIT), até 2030, aproximadamente 30% dos empregos podem ser automatizados. Tal situação pode ser observada em setores como telemarketing, contabilidade e até medicina diagnóstica, onde algoritmos já substituem profissionais humanos. Esse processo de automação, embora aumente produtividade, agrava desigualdades sociais ao eliminar postos de trabalho de baixa qualificação, afetando especialmente populações vulneráveis. Dessa forma, torna-se imprescindível repensar políticas de educação e qualificação profissional.

Portanto, é fundamental que o Congresso Nacional promova a regulamentação específica de IA no Brasil, por meio de leis que estabeleçam limites éticos para desenvolvimento e aplicação dessas tecnologias, a fim de proteger direitos fundamentais dos cidadãos. Ademais, o Ministério da Educação deve implementar currículos de letramento digital nas escolas públicas, preparando jovens para conviver criticamente com essas ferramentas. Somente assim será possível aproveitar benefícios da IA minimizando seus riscos sociais.`
  },
  {
    id: 2,
    titulo: "Sustentabilidade Urbana no Brasil",
    justificativa: "Enchentes recordes, poluição, falta de planejamento urbano e mudanças climáticas tornam este tema crítico.",
    repertorios: [
      "Agenda 2030 da ONU - ODS 11 (Cidades Sustentáveis)",
      "Estatuto das Cidades (Lei 10.257/2001)",
      "Relatórios do IPCC sobre mudanças climáticas"
    ],
    exemplo: `A sustentabilidade urbana tornou-se um dos maiores desafios do século XXI, especialmente no Brasil, onde o rápido processo de urbanização não foi acompanhado de planejamento adequado. Conforme a Agenda 2030 da ONU, o Objetivo de Desenvolvimento Sustentável 11 estabelece a necessidade de tornar cidades inclusivas, seguras e resilientes. Entretanto, enchentes devastadoras em São Paulo, deslizamentos em Petrópolis e ilhas de calor em grandes metrópoles evidenciam o fracasso na gestão urbana sustentável. Diante disso, torna-se essencial analisar as causas estruturais desse problema e propor soluções integradas.

Em primeira análise, é importante destacar que a impermeabilização excessiva do solo urbano agrava catástrofes climáticas. Segundo o Estatuto das Cidades (Lei 10.257/2001), municípios devem garantir direito à cidade sustentável, incluindo saneamento e drenagem adequados. Entretanto, dados do Instituto Brasileiro de Geografia e Estatística (IBGE) revelam que apenas 46% dos municípios brasileiros possuem planos diretores atualizados, resultando em ocupação irregular de áreas de risco e ausência de áreas verdes. Esse cenário evidencia-se tragicamente nas enchentes de 2024 no Rio Grande do Sul, que deixaram milhares de desabrigados. Portanto, fica evidente a necessidade de fiscalização mais rigorosa do uso do solo urbano.

Além disso, outro aspecto relevante relaciona-se à poluição atmosférica e seus impactos na saúde pública. De acordo com a Organização Mundial da Saúde (OMS), poluição do ar causa cerca de 50 mil mortes prematuras anualmente no Brasil. Tal situação pode ser observada em metrópoles como São Paulo, onde a frota de veículos ultrapassa 8 milhões de unidades, gerando concentrações perigosas de poluentes. Esse processo não apenas degrada qualidade de vida, mas também sobrecarrega o sistema de saúde com doenças respiratórias e cardiovasculares. Dessa forma, torna-se imprescindível investir em mobilidade urbana sustentável.

Portanto, é fundamental que governos municipais promovam políticas de renaturalização urbana, por meio da criação de parques lineares e telhados verdes obrigatórios em novas construções, a fim de aumentar permeabilidade do solo e mitigar ilhas de calor. Ademais, o Ministério das Cidades deve incentivar transporte público de qualidade e ciclovias, reduzindo dependência de automóveis individuais. Somente assim será possível construir cidades mais resilientes e habitáveis para as próximas gerações.`
  },
  {
    id: 3,
    titulo: "Saúde Mental dos Jovens no Brasil",
    justificativa: "Aumento alarmante de casos de depressão, ansiedade e suicídio entre jovens, agravado por redes sociais e pandemia.",
    repertorios: [
      "Émile Durkheim - 'O Suicídio' (anomia social)",
      "Zygmunt Bauman - Modernidade Líquida",
      "Setembro Amarelo e políticas de prevenção ao suicídio"
    ],
    exemplo: `No cenário contemporâneo, a saúde mental dos jovens brasileiros tornou-se uma questão de saúde pública urgente. Segundo dados da Organização Pan-Americana da Saúde (OPAS), o Brasil registra aumento de 40% nos casos de transtornos mentais entre adolescentes na última década. Conforme o sociólogo Émile Durkheim, em "O Suicídio", períodos de rápida transformação social geram anomia, ou seja, perda de referências coletivas que orientam comportamentos. Nesse sentido, a digitalização das relações sociais e pressões acadêmicas/profissionais configuram-se como fatores desestabilizadores. Diante disso, torna-se fundamental analisar as causas desse adoecimento psíquico e buscar soluções efetivas.

Em primeira análise, é importante destacar o papel das redes sociais na deterioração da saúde mental juvenil. Segundo Zygmunt Bauman, em "Modernidade Líquida", relações contemporâneas são marcadas por superficialidade e competição constante por validação externa. Esse cenário evidencia-se em plataformas como Instagram e TikTok, onde jovens comparam-se incessantemente a padrões inalcançáveis de beleza, sucesso e felicidade. Estudos da Universidade de São Paulo (USP) demonstram correlação direta entre tempo de uso de redes sociais e sintomas depressivos em adolescentes. Portanto, fica evidente a necessidade de educação digital crítica desde o ensino fundamental.

Além disso, outro aspecto relevante relaciona-se à precarização do acesso a tratamento psicológico no Sistema Único de Saúde (SUS). De acordo com dados do Conselho Federal de Psicologia, o SUS dispõe de apenas 1 psicólogo para cada 20 mil habitantes, número muito abaixo da recomendação da OMS. Tal situação pode ser observada em capitais como Rio de Janeiro, onde tempo de espera para atendimento psiquiátrico no SUS ultrapassa 6 meses. Esse déficit assistencial resulta em agravamento de quadros clínicos e aumento de tentativas de suicídio, especialmente entre jovens de baixa renda. Dessa forma, torna-se imprescindível ampliar investimentos em saúde mental pública.

Portanto, é fundamental que o Ministério da Educação promova programas de letramento digital e saúde mental nas escolas, por meio de psicólogos escolares e campanhas de conscientização, a fim de desenvolver resiliência emocional nos jovens. Ademais, o Ministério da Saúde deve ampliar a rede de Centros de Atenção Psicossocial (CAPS) e garantir atendimento psicológico gratuito em até 30 dias. Somente assim será possível reverter essa crise silenciosa que afeta milhões de brasileiros.`
  }
];

export function TemasProvaveis() {
  const [temaSelecionado, setTemaSelecionado] = useState(1);
  const [modoTimer, setModoTimer] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(40 * 60); // 40 minutos
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [minhaRedacao, setMinhaRedacao] = useState("");

  const tema = TEMAS.find(t => t.id === temaSelecionado)!;

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (timerAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [timerAtivo, tempoRestante]);

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const iniciarTimer = () => {
    setModoTimer(true);
    setTimerAtivo(true);
    setTempoRestante(40 * 60);
  };

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 text-foreground">
          Os 3 Temas Mais Prováveis para ENEM 2025
        </h3>
        <p className="text-muted-foreground">
          Baseado em análise de tendências sociais, eventos recentes e padrões históricos do ENEM. 
          Cada tema vem com redação modelo nota 1000 e repertórios essenciais.
        </p>
      </Card>

      {/* Seletor de Tema */}
      <div className="grid grid-cols-3 gap-4">
        {TEMAS.map((t) => (
          <Button
            key={t.id}
            variant={temaSelecionado === t.id ? "default" : "outline"}
            onClick={() => setTemaSelecionado(t.id)}
            className="h-auto py-4 text-left justify-start"
          >
            <div>
              <div className="font-semibold">Tema {t.id}</div>
              <div className="text-xs opacity-90">{t.titulo}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Detalhes do Tema */}
      <Card className="p-6">
        <h4 className="text-xl font-bold mb-3 text-foreground">{tema.titulo}</h4>
        
        <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <span className="font-medium text-foreground">Por que é provável: </span>
          <span className="text-muted-foreground">{tema.justificativa}</span>
        </div>

        <div className="mb-4">
          <h5 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
            <Lightbulb className="h-4 w-4 text-primary" />
            Repertórios Recomendados:
          </h5>
          <ul className="space-y-1">
            {tema.repertorios.map((rep, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {rep}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setModoTimer(false)}>
            <FileText className="h-4 w-4 mr-2" />
            Ver Redação Modelo
          </Button>
          <Button onClick={iniciarTimer} className="bg-primary">
            <Clock className="h-4 w-4 mr-2" />
            Treinar com Timer (40min)
          </Button>
        </div>
      </Card>

      {/* Modo Visualização */}
      {!modoTimer && (
        <Card className="p-6">
          <h5 className="font-semibold mb-4 text-lg text-foreground">Redação Modelo Nota 1000</h5>
          <div className="p-4 rounded-lg bg-secondary whitespace-pre-line font-serif text-sm leading-relaxed text-foreground">
            {tema.exemplo}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-foreground">
            ✅ Esta redação atende todos os critérios: estrutura clara, repertórios legítimos, 
            proposta de intervenção completa (agente, ação, modo, finalidade, detalhamento) e respeito aos direitos humanos.
          </div>
        </Card>
      )}

      {/* Modo Timer */}
      {modoTimer && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-semibold text-lg text-foreground">Escreva sua redação</h5>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className={`text-2xl font-bold ${tempoRestante < 300 ? 'text-destructive' : 'text-primary'}`}>
                {formatarTempo(tempoRestante)}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTimerAtivo(!timerAtivo)}
              >
                {timerAtivo ? "Pausar" : "Continuar"}
              </Button>
            </div>
          </div>

          <Textarea
            value={minhaRedacao}
            onChange={(e) => setMinhaRedacao(e.target.value)}
            placeholder="Comece a escrever sua redação aqui..."
            className="min-h-[400px] font-serif"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Palavras: {minhaRedacao.trim() ? minhaRedacao.trim().split(/\s+/).length : 0} | 
              Linhas aproximadas: {Math.ceil((minhaRedacao.trim().split(/\s+/).length) / 10)}
            </span>
            <Button onClick={() => {
              localStorage.setItem(`redacao-${tema.id}`, minhaRedacao);
              alert("Redação salva!");
            }}>
              Salvar Redação
            </Button>
          </div>
        </Card>
      )}

      {/* Dica Final */}
      <Card className="p-4 bg-blue-500/10 border-blue-500/30">
        <p className="text-sm text-foreground">
          💡 <strong>Estratégia de Preparação:</strong> Escreva pelo menos uma redação completa para cada tema. 
          Memorize os repertórios sugeridos e pratique adaptá-los. No dia da prova, você reconhecerá semelhanças com esses temas.
        </p>
      </Card>
    </div>
  );
}
