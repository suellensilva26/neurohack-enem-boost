import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Lightbulb, FileText, CheckCircle } from "lucide-react";

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
    titulo: "Perspectivas acerca do envelhecimento na sociedade brasileira",
    justificativa: "O Brasil vive uma transição demográfica acelerada: segundo o Censo 2022 do IBGE, a população com mais de 65 anos cresceu de 7,4% em 2010 para 10,9% em 2022, a maior proporção desde 1940. Esse envelhecimento populacional impacta previdência, saúde pública e mercado de trabalho, exigindo políticas urgentes.",
    repertorios: [
      "Estatuto da Pessoa Idosa (Lei 10.741/2003) - Direitos fundamentais e proteção social",
      "Censo Demográfico IBGE 2022 - Dados sobre transição demográfica brasileira",
      "Conceito de Familismo (Deusivania Falcão) - Solidariedade intergeracional nas famílias latino-americanas",
      "Projeto Falas da Vida (TV Globo 2025) - Visibilidade e combate ao etarismo",
      "Política Nacional de Saúde da Pessoa Idosa - Estratégias de envelhecimento ativo e saudável",
      "Agenda 2030 da ONU - ODS relacionado ao bem-estar em todas as idades"
    ],
    exemplo: `O envelhecimento populacional tornou-se uma das principais transformações demográficas do século XXI no Brasil. Segundo dados do Censo Demográfico de 2022, realizado pelo Instituto Brasileiro de Geografia e Estatística (IBGE), a proporção de brasileiros com mais de 65 anos cresceu de 7,4% em 2010 para 10,9% em 2022, representando a maior proporção desde 1940. Essa transição demográfica acelerada, caracterizada pelo aumento da expectativa de vida e redução da taxa de natalidade, configura-se como um desafio estrutural que impacta previdência social, sistema de saúde e mercado de trabalho. Diante disso, torna-se fundamental analisar as perspectivas do envelhecimento na sociedade brasileira e propor políticas públicas adequadas.

Em primeira análise, é importante destacar que o Estatuto da Pessoa Idosa (Lei 10.741/2003) estabelece direitos fundamentais para brasileiros com 60 anos ou mais, incluindo saúde, educação, cultura e trabalho. Entretanto, a implementação efetiva desses direitos ainda enfrenta obstáculos estruturais. Segundo relatório do Ministério da Saúde, apenas 30% dos municípios brasileiros possuem Centros de Referência de Assistência à Pessoa Idosa (CRAS) adequadamente equipados, resultando em déficit assistencial para milhões de idosos. Esse cenário evidencia-se especialmente em regiões periféricas, onde idosos enfrentam dificuldades de acesso a serviços de saúde especializados e enfrentam isolamento social. Portanto, fica evidente a necessidade de ampliar investimentos em políticas públicas de envelhecimento ativo.

Além disso, outro aspecto relevante relaciona-se ao etarismo e à exclusão digital da população idosa. Conforme o Projeto Falas da Vida, exibido pela TV Globo em 2025, o preconceito etário ainda é uma realidade no Brasil, manifestando-se em discriminação no mercado de trabalho, violência doméstica e invisibilização social. Tal situação pode ser observada em dados da Pesquisa Nacional por Amostra de Domicílios (PNAD), que revelam que apenas 25% dos idosos brasileiros possuem acesso regular à internet, limitando sua participação em serviços digitais essenciais como telemedicina e bancos digitais. Esse processo de exclusão digital agrava isolamento social e dificulta acesso a direitos fundamentais. Dessa forma, torna-se imprescindível promover políticas de inclusão digital específicas para essa faixa etária.

Ademais, é fundamental considerar o papel da família no suporte ao envelhecimento saudável. Segundo a psicóloga brasileira Deusivania Falcão, o conceito de "familismo" caracteriza-se como valor cultural presente nas famílias latino-americanas, marcado por forte identificação e solidariedade intergeracional. Entretanto, mudanças sociais contemporâneas, como urbanização acelerada e inserção feminina no mercado de trabalho, fragilizam essas redes de apoio familiar. Esse cenário exige políticas públicas que fortaleçam redes comunitárias de cuidado e promovam envelhecimento saudável em diferentes contextos familiares.

Portanto, é fundamental que o Ministério da Cidadania promova programas de inclusão digital para idosos, por meio de parcerias com universidades e organizações da sociedade civil, oferecendo cursos de alfabetização digital gratuitos em centros comunitários, a fim de reduzir exclusão tecnológica e facilitar acesso a serviços públicos digitais. Ademais, o Ministério da Saúde deve ampliar a rede de Atenção Primária à Saúde com equipes multidisciplinares especializadas em geriatria, garantindo acompanhamento preventivo e tratamento adequado para doenças crônicas comuns ao envelhecimento. Somente assim será possível construir uma sociedade verdadeiramente inclusiva que valorize e proteja seus cidadãos em todas as fases da vida.`
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
      <Card className="p-4 sm:p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-base sm:text-lg mb-3 text-foreground leading-tight">
          Os 3 Temas Mais Prováveis para ENEM 2025
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Baseado em análise de tendências sociais, eventos recentes e padrões históricos do ENEM. 
          Cada tema vem com redação modelo nota 1000 e repertórios essenciais.
        </p>
      </Card>

      {/* Seletor de Tema */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TEMAS.map((t) => (
          <Button
            key={t.id}
            variant={temaSelecionado === t.id ? "default" : "outline"}
            onClick={() => setTemaSelecionado(t.id)}
            className={`h-auto py-4 px-4 text-left justify-start transition-all ${
              temaSelecionado === t.id 
                ? "bg-primary text-primary-foreground shadow-md scale-[1.02]" 
                : "hover:bg-primary/5"
            }`}
          >
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base sm:text-lg">Tema {t.id}</span>
                {temaSelecionado === t.id && (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                )}
              </div>
              <div className="text-xs sm:text-sm leading-tight opacity-90 line-clamp-2">
                {t.titulo}
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Detalhes do Tema */}
      <Card className="p-4 sm:p-6">
        <h4 className="text-lg sm:text-xl font-bold mb-3 text-foreground leading-tight">
          {tema.titulo}
        </h4>
        
        <div className="mb-4 p-3 sm:p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <span className="font-semibold text-sm sm:text-base text-foreground block mb-1">
            Por que é provável:
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {tema.justificativa}
          </span>
        </div>

        <div className="mb-4">
          <h5 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base text-foreground">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            Repertórios Recomendados:
          </h5>
          <ul className="space-y-2 sm:space-y-2.5">
            {tema.repertorios.map((rep, idx) => (
              <li 
                key={idx} 
                className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-primary mt-1.5 flex-shrink-0 font-bold">•</span>
                <span className="flex-1">{rep}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={() => setModoTimer(false)}
            className="w-full sm:w-auto sm:flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Ver Redação Modelo
          </Button>
          <Button 
            onClick={iniciarTimer} 
            className="w-full bg-primary sm:w-auto sm:flex-1"
          >
            <Clock className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Treinar com Timer (40min)</span>
            <span className="sm:hidden">Timer (40min)</span>
          </Button>
        </div>
      </Card>

      {/* Modo Visualização */}
      {!modoTimer && (
        <Card className="p-4 sm:p-6">
          <h5 className="font-semibold mb-4 text-base sm:text-lg text-foreground">
            Redação Modelo Nota 1000
          </h5>
          <div className="p-3 sm:p-4 rounded-lg bg-secondary whitespace-pre-line font-serif text-xs sm:text-sm leading-relaxed text-foreground overflow-x-auto">
            {tema.exemplo}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-xs sm:text-sm text-foreground leading-relaxed">
            ✅ Esta redação atende todos os critérios: estrutura clara, repertórios legítimos, 
            proposta de intervenção completa (agente, ação, modo, finalidade, detalhamento) e respeito aos direitos humanos.
          </div>
        </Card>
      )}

      {/* Modo Timer */}
      {modoTimer && (
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h5 className="font-semibold text-base sm:text-lg text-foreground">
              Escreva sua redação
            </h5>
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              <span className={`text-xl sm:text-2xl font-bold ${tempoRestante < 300 ? 'text-destructive' : 'text-primary'}`}>
                {formatarTempo(tempoRestante)}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTimerAtivo(!timerAtivo)}
                className="flex-shrink-0"
              >
                {timerAtivo ? "Pausar" : "Continuar"}
              </Button>
            </div>
          </div>

          <Textarea
            value={minhaRedacao}
            onChange={(e) => setMinhaRedacao(e.target.value)}
            placeholder="Comece a escrever sua redação aqui..."
            className="min-h-[300px] sm:min-h-[400px] font-serif text-sm sm:text-base"
          />

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs sm:text-sm text-muted-foreground">
              Palavras: {minhaRedacao.trim() ? minhaRedacao.trim().split(/\s+/).length : 0} | 
              Linhas aproximadas: {Math.ceil((minhaRedacao.trim().split(/\s+/).length) / 10)}
            </span>
            <Button 
              onClick={() => {
                localStorage.setItem(`redacao-${tema.id}`, minhaRedacao);
                alert("Redação salva!");
              }}
              className="w-full sm:w-auto"
            >
              Salvar Redação
            </Button>
          </div>
        </Card>
      )}

      {/* Dica Final */}
      <Card className="p-4 bg-blue-500/10 border-blue-500/30">
        <p className="text-xs sm:text-sm text-foreground leading-relaxed">
          💡 <strong>Estratégia de Preparação:</strong> Escreva pelo menos uma redação completa para cada tema. 
          Memorize os repertórios sugeridos e pratique adaptá-los. No dia da prova, você reconhecerá semelhanças com esses temas.
        </p>
      </Card>
    </div>
  );
}
