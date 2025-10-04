import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FormulaCoringa() {
  const [introducao, setIntroducao] = useState("");
  const [dev1, setDev1] = useState("");
  const [dev2, setDev2] = useState("");
  const [conclusao, setConclusao] = useState("");
  const { toast } = useToast();

  const contarLinhas = (texto: string) => {
    if (!texto) return 0;
    // Aproximadamente 10 palavras = 1 linha
    const palavras = texto.trim().split(/\s+/).length;
    return Math.ceil(palavras / 10);
  };

  const totalLinhas = contarLinhas(introducao) + contarLinhas(dev1) + contarLinhas(dev2) + contarLinhas(conclusao);

  const salvarRedacao = () => {
    const redacao = {
      introducao,
      dev1,
      dev2,
      conclusao,
      data: new Date().toISOString(),
      linhas: totalLinhas
    };

    const redacoes = JSON.parse(localStorage.getItem("minhas-redacoes") || "[]");
    redacoes.push(redacao);
    localStorage.setItem("minhas-redacoes", JSON.stringify(redacoes));

    toast({
      title: "Redação salva!",
      description: `Total de ${totalLinhas} linhas`,
    });
  };

  const gerarModelo = () => {
    setIntroducao(`No contexto contemporâneo, [TEMA] representa um desafio significativo para a sociedade brasileira. Conforme [REPERTÓRIO], essa questão exige atenção urgente. Diante disso, torna-se fundamental analisar [ASPECTO 1] e [ASPECTO 2] para compreender a problemática.`);
    
    setDev1(`Em primeira análise, é importante destacar [ARGUMENTO 1]. Segundo [REPERTÓRIO/AUTOR], [EXPLICAÇÃO]. Esse cenário evidencia-se em [EXEMPLO CONCRETO], demonstrando que [ANÁLISE]. Portanto, fica evidente a necessidade de [CONSEQUÊNCIA/SOLUÇÃO PARCIAL].`);
    
    setDev2(`Além disso, outro aspecto relevante relaciona-se a [ARGUMENTO 2]. De acordo com [REPERTÓRIO/AUTOR], [EXPLICAÇÃO]. Tal situação pode ser observada em [EXEMPLO CONCRETO], o que comprova [ANÁLISE]. Dessa forma, torna-se imprescindível [CONSEQUÊNCIA/SOLUÇÃO PARCIAL].`);
    
    setConclusao(`Portanto, é fundamental que [AGENTE] promova [AÇÃO], por meio de [MEIO/MODO], a fim de [FINALIDADE]. Ademais, [AGENTE 2] deve [AÇÃO 2], visando [DETALHAMENTO]. Somente assim será possível [RESULTADO ESPERADO].`);

    toast({
      title: "Modelo gerado!",
      description: "Substitua os campos entre [colchetes] pelo seu conteúdo",
    });
  };

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          A Fórmula Coringa: Funciona em QUALQUER Tema
        </h3>
        <p className="text-muted-foreground mb-3">
          Esse template foi extraído de centenas de redações nota 1000. Ele fornece uma estrutura sólida que você pode adaptar para qualquer tema.
        </p>
        <Button onClick={gerarModelo} variant="outline" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          Gerar Template
        </Button>
      </Card>

      {/* Contador */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
        <span className="text-sm font-medium text-foreground">Total de linhas (aprox.)</span>
        <span className={`text-2xl font-bold ${totalLinhas >= 20 && totalLinhas <= 30 ? 'text-green-500' : 'text-destructive'}`}>
          {totalLinhas} linhas
        </span>
      </div>

      {/* Editor de Redação */}
      <div className="space-y-4">
        {/* Introdução */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-foreground">Introdução</label>
            <span className="text-sm text-muted-foreground">{contarLinhas(introducao)} linhas</span>
          </div>
          <Textarea
            value={introducao}
            onChange={(e) => setIntroducao(e.target.value)}
            placeholder="Contextualização + Tese..."
            className="min-h-[120px] font-mono text-sm"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            💡 Ideal: 6-7 linhas | Deve conter: contextualização, repertório e tese clara
          </div>
        </Card>

        {/* Desenvolvimento 1 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-foreground">Desenvolvimento 1</label>
            <span className="text-sm text-muted-foreground">{contarLinhas(dev1)} linhas</span>
          </div>
          <Textarea
            value={dev1}
            onChange={(e) => setDev1(e.target.value)}
            placeholder="Argumento 1 + Repertório + Análise..."
            className="min-h-[140px] font-mono text-sm"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            💡 Ideal: 7-8 linhas | Estrutura: Tópico frasal + Repertório + Exemplo + Análise
          </div>
        </Card>

        {/* Desenvolvimento 2 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-foreground">Desenvolvimento 2</label>
            <span className="text-sm text-muted-foreground">{contarLinhas(dev2)} linhas</span>
          </div>
          <Textarea
            value={dev2}
            onChange={(e) => setDev2(e.target.value)}
            placeholder="Argumento 2 + Repertório + Análise..."
            className="min-h-[140px] font-mono text-sm"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            💡 Ideal: 7-8 linhas | Conecte com D1 usando: "Além disso", "Outrossim", "Ademais"
          </div>
        </Card>

        {/* Conclusão */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-foreground">Conclusão</label>
            <span className="text-sm text-muted-foreground">{contarLinhas(conclusao)} linhas</span>
          </div>
          <Textarea
            value={conclusao}
            onChange={(e) => setConclusao(e.target.value)}
            placeholder="Retomada + Proposta de Intervenção Completa..."
            className="min-h-[120px] font-mono text-sm"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            💡 Ideal: 5-6 linhas | OBRIGATÓRIO: Agente + Ação + Modo/Meio + Finalidade + Detalhamento
          </div>
        </Card>
      </div>

      {/* Botão Salvar */}
      <Button onClick={salvarRedacao} className="w-full bg-primary" size="lg">
        <Save className="h-5 w-5 mr-2" />
        Salvar Minha Redação
      </Button>

      {/* Conectores Úteis */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3 text-foreground">Conectores Essenciais</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-primary">Iniciar D1:</span>
            <p className="text-muted-foreground">Em primeira análise, Primeiramente, Inicialmente</p>
          </div>
          <div>
            <span className="font-medium text-primary">Iniciar D2:</span>
            <p className="text-muted-foreground">Além disso, Ademais, Outrossim, Paralelamente</p>
          </div>
          <div>
            <span className="font-medium text-primary">Exemplificar:</span>
            <p className="text-muted-foreground">Por exemplo, A título de exemplo, Nesse sentido</p>
          </div>
          <div>
            <span className="font-medium text-primary">Concluir:</span>
            <p className="text-muted-foreground">Portanto, Logo, Dessa forma, Assim</p>
          </div>
        </div>
      </Card>

      {/* Alerta */}
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <div className="text-sm text-foreground">
            <strong>ATENÇÃO:</strong> Este é um template. Não copie literalmente! Adapte para o tema específico, 
            adicione seus repertórios e desenvolva análises próprias. O avaliador identifica redações decoradas.
          </div>
        </div>
      </Card>
    </div>
  );
}
