import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const REPERTORIOS = [
  {
    id: 1,
    titulo: "Constituição Federal (1988)",
    categoria: "Direitos",
    explicacao: "Artigo 5º garante direitos fundamentais. Use para temas de desigualdade, discriminação, liberdade.",
    exemplo: "Conforme o artigo 5º da Constituição Federal de 1988, todos são iguais perante a lei. Entretanto, na prática...",
    temas: ["desigualdade", "direitos", "discriminação", "cidadania"]
  },
  {
    id: 2,
    titulo: "Zygmunt Bauman - Modernidade Líquida",
    categoria: "Sociedade",
    explicacao: "Relações sociais efêmeras e superficiais. Perfeito para temas de tecnologia, relações, individualismo.",
    exemplo: "O sociólogo Zygmunt Bauman, em 'Modernidade Líquida', descreve uma sociedade marcada por relações fluidas...",
    temas: ["tecnologia", "relações", "sociedade", "individualismo"]
  },
  {
    id: 3,
    titulo: "Hannah Arendt - Banalidade do Mal",
    categoria: "Ética",
    explicacao: "Como pessoas comuns cometem atrocidades. Use para temas de intolerância, preconceito, violência.",
    exemplo: "Hannah Arendt cunhou o termo 'banalidade do mal' ao analisar crimes nazistas, demonstrando como...",
    temas: ["violência", "intolerância", "ética", "preconceito"]
  },
  {
    id: 4,
    titulo: "Simone de Beauvoir - O Segundo Sexo",
    categoria: "Gênero",
    explicacao: "'Não se nasce mulher, torna-se'. Essencial para temas de machismo, feminismo, igualdade de gênero.",
    exemplo: "Simone de Beauvoir, em 'O Segundo Sexo', afirma que o papel da mulher é construção social, não biológica...",
    temas: ["mulher", "feminismo", "gênero", "machismo", "igualdade"]
  },
  {
    id: 5,
    titulo: "Paulo Freire - Pedagogia do Oprimido",
    categoria: "Educação",
    explicacao: "Educação libertadora vs. educação bancária. Use para temas de educação, desigualdade social.",
    exemplo: "Paulo Freire, em 'Pedagogia do Oprimido', critica o modelo educacional que trata alunos como recipientes vazios...",
    temas: ["educação", "desigualdade", "social", "ensino"]
  },
  {
    id: 6,
    titulo: "Émile Durkheim - Fato Social",
    categoria: "Sociologia",
    explicacao: "Comportamentos coletivos que coagem indivíduos. Versátil para diversos temas sociais.",
    exemplo: "O sociólogo Émile Durkheim define fato social como padrões de comportamento que exercem coerção externa...",
    temas: ["sociedade", "comportamento", "coletivo", "normas"]
  },
  {
    id: 7,
    titulo: "Agenda 2030 da ONU",
    categoria: "Sustentabilidade",
    explicacao: "17 Objetivos de Desenvolvimento Sustentável. Perfeito para temas ambientais e sociais.",
    exemplo: "A Agenda 2030 da ONU estabelece 17 objetivos para alcançar desenvolvimento sustentável global...",
    temas: ["meio ambiente", "sustentabilidade", "desenvolvimento", "ONU"]
  },
  {
    id: 8,
    titulo: "Declaração Universal dos Direitos Humanos",
    categoria: "Direitos",
    explicacao: "Artigo 1º: dignidade e igualdade. Use em qualquer tema de direitos e cidadania.",
    exemplo: "A Declaração Universal dos Direitos Humanos, em seu artigo 1º, estabelece que todos nascem livres e iguais...",
    temas: ["direitos humanos", "dignidade", "igualdade", "liberdade"]
  },
  {
    id: 9,
    titulo: "Max Weber - Ética Protestante",
    categoria: "Trabalho",
    explicacao: "Relação entre trabalho e capitalismo. Use para temas de trabalho, economia, sociedade moderna.",
    exemplo: "Max Weber, em 'A Ética Protestante e o Espírito do Capitalismo', analisa como valores religiosos moldaram...",
    temas: ["trabalho", "capitalismo", "economia", "sociedade"]
  },
  {
    id: 10,
    titulo: "Michel Foucault - Vigiar e Punir",
    categoria: "Poder",
    explicacao: "Mecanismos de controle social. Perfeito para temas de privacidade, vigilância, poder.",
    exemplo: "Michel Foucault, em 'Vigiar e Punir', discute como instituições exercem controle através da vigilância constante...",
    temas: ["vigilância", "controle", "poder", "privacidade"]
  },
  {
    id: 11,
    titulo: "Karl Marx - Alienação do Trabalho",
    categoria: "Trabalho",
    explicacao: "Trabalhador alienado do produto de seu trabalho. Use para temas de trabalho, desigualdade econômica.",
    exemplo: "Karl Marx descreve a alienação do trabalho no capitalismo, onde o trabalhador se torna estranho ao produto...",
    temas: ["trabalho", "desigualdade", "capitalismo", "economia"]
  },
  {
    id: 12,
    titulo: "Laudato Si' - Papa Francisco",
    categoria: "Meio Ambiente",
    explicacao: "Encíclica sobre cuidado com a casa comum. Use para temas ambientais e sustentabilidade.",
    exemplo: "Na encíclica Laudato Si', o Papa Francisco alerta para a necessidade urgente de proteger o meio ambiente...",
    temas: ["meio ambiente", "ecologia", "sustentabilidade", "natureza"]
  }
];

export function RepertoriosUniversais() {
  const [busca, setBusca] = useState("");
  const [repertorioSelecionado, setRepertorioSelecionado] = useState<number | null>(null);
  const [meuExemplo, setMeuExemplo] = useState("");
  const { toast } = useToast();

  const repertoriosFiltrados = busca
    ? REPERTORIOS.filter(r => 
        r.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        r.temas.some(t => t.includes(busca.toLowerCase())) ||
        r.categoria.toLowerCase().includes(busca.toLowerCase())
      )
    : REPERTORIOS;

  const salvarExemplo = () => {
    if (!meuExemplo.trim()) {
      toast({
        title: "Escreva seu exemplo",
        description: "Digite um exemplo antes de salvar",
        variant: "destructive"
      });
      return;
    }

    const exemplos = JSON.parse(localStorage.getItem("meus-exemplos-repertorio") || "{}");
    exemplos[repertorioSelecionado!] = meuExemplo;
    localStorage.setItem("meus-exemplos-repertorio", JSON.stringify(exemplos));

    toast({
      title: "Exemplo salvo!",
      description: "Seu exemplo foi salvo com sucesso",
    });

    setMeuExemplo("");
  };

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 text-foreground">
          Os 12 Repertórios Que Funcionam em QUALQUER Tema
        </h3>
        <p className="text-muted-foreground">
          Esses repertórios foram selecionados por aparecerem em mais de 80% das redações nota 1000. 
          Cada um pode ser adaptado para múltiplos temas. <strong>Domine todos os 12 e você nunca ficará sem repertório.</strong>
        </p>
      </Card>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por tema, autor ou categoria..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de Repertórios */}
      <div className="grid gap-4">
        {repertoriosFiltrados.map((repertorio) => (
          <Card key={repertorio.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">{repertorio.titulo}</h4>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {repertorio.categoria}
                </span>
              </div>
              <Button
                variant={repertorioSelecionado === repertorio.id ? "default" : "outline"}
                size="sm"
                onClick={() => setRepertorioSelecionado(repertorio.id)}
              >
                {repertorioSelecionado === repertorio.id ? "Selecionado" : "Ver Detalhes"}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{repertorio.explicacao}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {repertorio.temas.map((tema, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                  #{tema}
                </span>
              ))}
            </div>

            {repertorioSelecionado === repertorio.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <p className="text-sm font-medium mb-1 text-foreground">Exemplo pronto:</p>
                  <p className="text-sm text-muted-foreground italic">{repertorio.exemplo}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Crie seu próprio exemplo com este repertório:
                  </label>
                  <Textarea
                    value={meuExemplo}
                    onChange={(e) => setMeuExemplo(e.target.value)}
                    placeholder="Digite como você usaria este repertório em uma redação..."
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={salvarExemplo}
                    className="mt-2 bg-primary"
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Meu Exemplo
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Dica Final */}
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
        <p className="text-sm text-foreground">
          💡 <strong>Estratégia:</strong> Escolha 3-4 repertórios favoritos e pratique adaptá-los para diferentes contextos. 
          É melhor dominar poucos do que conhecer muitos superficialmente.
        </p>
      </Card>
    </div>
  );
}
