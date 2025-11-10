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
    exemplo: `Com os avanços tecnológicos do século XXI, a inteligência artificial (IA) tornou-se um dos principais motores de transformação da sociedade contemporânea. Presente em aplicativos, indústrias e sistemas de segurança, essa ferramenta redefine padrões de produtividade, comunicação e tomada de decisão. Entretanto, ao mesmo tempo em que traz benefícios, também suscita dilemas éticos e sociais relacionados ao desemprego, à privacidade e ao controle das informações. Diante disso, é fundamental discutir de que forma a IA pode contribuir para o progresso humano sem comprometer valores fundamentais como a ética e a dignidade.

Inicialmente, é inegável que a inteligência artificial proporciona inúmeros avanços para a humanidade. Sistemas automatizados em hospitais, por exemplo, auxiliam diagnósticos com precisão superior à humana, enquanto algoritmos em plataformas digitais otimizam o acesso à informação. Contudo, esses mesmos mecanismos podem reforçar desigualdades e reduzir postos de trabalho, especialmente em setores que dependem de mão de obra repetitiva. O filósofo Yuval Harari alerta que a "automação pode criar uma nova classe inútil", composta por indivíduos excluídos do mercado por falta de qualificação tecnológica.

Além disso, o uso desregulado da IA levanta preocupações éticas e morais. Empresas de tecnologia coletam e analisam grandes volumes de dados, muitas vezes sem o consentimento adequado dos usuários, o que ameaça a privacidade e a liberdade individual. Ademais, algoritmos enviesados podem reproduzir preconceitos existentes na sociedade, gerando injustiças em processos seletivos e sistemas judiciais. A ausência de uma legislação robusta e de mecanismos de transparência contribui para a falta de responsabilidade sobre as decisões tomadas por máquinas.

Portanto, é imperativo que governos e instituições adotem políticas públicas e regulamentações claras sobre o uso ético da inteligência artificial. A criação de leis que garantam a proteção de dados, a inclusão digital e a capacitação profissional são medidas indispensáveis. Além disso, escolas e universidades devem preparar os cidadãos para conviver de forma crítica e consciente com as novas tecnologias. Assim, será possível transformar a IA em um instrumento de equidade e progresso social, assegurando que o avanço tecnológico caminhe lado a lado com o respeito aos direitos humanos.`
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
    exemplo: `No contexto das grandes cidades brasileiras, o desafio da sustentabilidade urbana tem se tornado cada vez mais urgente. O crescimento desordenado, a falta de planejamento e o consumo excessivo de recursos naturais comprometem a qualidade de vida da população e o equilíbrio ambiental. Nesse sentido, é possível afirmar que as cidades brasileiras ainda carecem de políticas efetivas que conciliem desenvolvimento econômico e preservação ambiental. Diante disso, torna-se imprescindível repensar os modelos de urbanização vigentes e adotar práticas sustentáveis que assegurem o futuro das próximas gerações.

Em primeiro lugar, observa-se que o processo de urbanização no Brasil ocorreu de forma acelerada e sem planejamento adequado. A partir da Revolução Industrial e do êxodo rural no século XX, as cidades passaram a crescer de maneira desordenada, gerando problemas como poluição, favelização e congestionamentos. Essa realidade é agravada pela ausência de infraestrutura básica em muitas regiões urbanas, o que amplia desigualdades sociais e ambientais. Como destacou o geógrafo Milton Santos, o espaço urbano brasileiro é marcado pela coexistência de "circuitos superiores e inferiores" da economia, evidenciando a exclusão dos menos favorecidos.

Além disso, a falta de políticas públicas voltadas à mobilidade sustentável e à gestão de resíduos contribui para o agravamento da crise ambiental urbana. A dependência do transporte individual e a escassez de áreas verdes são exemplos de práticas que comprometem a sustentabilidade. Ainda que existam iniciativas pontuais — como ciclovias, coleta seletiva e programas de energia limpa —, essas ações isoladas não são suficientes diante da magnitude dos problemas. É necessário integrar poder público, setor privado e sociedade civil na construção de cidades inteligentes e ambientalmente equilibradas.

Portanto, faz-se essencial que o Estado promova políticas urbanas baseadas em planejamento sustentável e inclusão social. Investimentos em transporte público eficiente, reciclagem, energias renováveis e educação ambiental devem ser ampliados e monitorados. Ademais, a conscientização da população, estimulada pela mídia e pelas escolas, é fundamental para mudar hábitos e construir uma cultura ecológica. Assim, o Brasil poderá transformar seus centros urbanos em espaços de convivência harmônica entre o ser humano e o meio ambiente, garantindo um futuro mais justo e sustentável.`
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
    exemplo: `No Brasil contemporâneo, o processo de envelhecimento populacional tem se intensificado em virtude dos avanços da medicina e da melhoria nas condições de vida. Contudo, embora a longevidade seja um indicador de progresso social, ela também revela desafios estruturais que comprometem a dignidade da população idosa. A negligência estatal e o preconceito etário, ainda fortemente enraizados, tornam-se obstáculos à plena inclusão desse grupo social. Assim, é fundamental refletir sobre as perspectivas do envelhecimento na sociedade brasileira e sobre a urgência de políticas públicas que assegurem respeito e qualidade de vida aos idosos.

Em primeiro lugar, observa-se que o envelhecimento é muitas vezes associado à incapacidade e à inutilidade, reforçando estereótipos que marginalizam o idoso. Esse fenômeno, conhecido como etarismo, contribui para a exclusão social e para a perda da autoestima entre aqueles que ultrapassam a terceira idade. Além disso, o mercado de trabalho raramente oferece oportunidades para pessoas mais velhas, o que agrava a dependência financeira e emocional dessa parcela da população. Conforme o filósofo Bauman, em uma sociedade líquida, o que não é produtivo tende a ser descartado, e isso se aplica também aos idosos, vistos, muitas vezes, como "obsoletos".

Paralelamente, a ausência de políticas públicas eficazes agrava a vulnerabilidade dos idosos. Apesar da existência do Estatuto do Idoso, a aplicação prática de seus direitos ainda é insuficiente, sobretudo nas áreas de saúde e assistência social. Hospitais públicos sobrecarregados, aposentadorias defasadas e o abandono familiar são realidades que denunciam o descaso governamental e social. Ademais, a falta de campanhas educativas voltadas ao respeito e à valorização do envelhecimento impede a construção de uma cultura intergeracional mais empática e solidária, essencial para um país que envelhece rapidamente.

Portanto, diante desse cenário, é imprescindível que o Estado amplie o investimento em políticas públicas de inclusão e proteção à pessoa idosa. Programas que incentivem a empregabilidade na terceira idade, campanhas de conscientização sobre o etarismo e o fortalecimento da rede de atenção à saúde devem ser priorizados. Além disso, a escola e a mídia têm papel crucial na formação de uma mentalidade de respeito e valorização do envelhecimento. Somente assim o Brasil poderá garantir que envelhecer seja, de fato, sinônimo de conquista e dignidade, e não de exclusão e esquecimento.`
  }
];

export function TemasProvaveis() {
  const [temaSelecionado, setTemaSelecionado] = useState(1);
  const [modeloRedacaoSelecionado, setModeloRedacaoSelecionado] = useState(1);
  const [modoTimer, setModoTimer] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(40 * 60); // 40 minutos
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [minhaRedacao, setMinhaRedacao] = useState("");

  const tema = TEMAS.find(t => t.id === temaSelecionado)!;
  const modeloRedacao = TEMAS.find(t => t.id === modeloRedacaoSelecionado)!;

  // Quando o tema muda, atualiza também o modelo de redação
  const handleTemaChange = (temaId: number) => {
    setTemaSelecionado(temaId);
    setModeloRedacaoSelecionado(temaId);
  };

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
            onClick={() => handleTemaChange(t.id)}
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <h5 className="font-semibold text-base sm:text-lg text-foreground">
              Redação Modelo Nota 1000
            </h5>
            <div className="flex flex-wrap gap-2">
              {TEMAS.map((t) => (
                <Button
                  key={t.id}
                  variant={modeloRedacaoSelecionado === t.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setModeloRedacaoSelecionado(t.id)}
                  className={`text-xs sm:text-sm ${
                    modeloRedacaoSelecionado === t.id 
                      ? "bg-primary text-primary-foreground" 
                      : ""
                  }`}
                >
                  Modelo {t.id}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-3 p-2 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Tema do modelo:</span> {modeloRedacao.titulo}
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-secondary whitespace-pre-line font-serif text-xs sm:text-sm leading-relaxed text-foreground overflow-x-auto">
            {modeloRedacao.exemplo}
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
