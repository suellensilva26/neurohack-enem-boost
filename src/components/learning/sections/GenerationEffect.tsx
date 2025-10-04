import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Lightbulb, Plus, BookOpen, HelpCircle, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const GenerationEffect = () => {
  const [contentType, setContentType] = useState<"exemplo" | "questao" | "analogia">("exemplo");
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState({
    subject: "",
    topic: "",
    correctAnswer: ""
  });

  const saveContent = async () => {
    if (!content.trim()) {
      toast.error("Preencha o conteúdo");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from('generated_content')
        .insert({
          user_id: user.id,
          type: contentType,
          content,
          metadata
        });

      if (error) throw error;

      toast.success(`${contentType === "exemplo" ? "Exemplo" : contentType === "questao" ? "Questão" : "Analogia"} salvo com sucesso!`);
      setContent("");
      setMetadata({ subject: "", topic: "", correctAnswer: "" });
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Erro ao salvar conteúdo");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Lightbulb className="h-8 w-8 text-primary" />
          Generation Effect
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Crie Para Nunca Mais Esquecer: 300% melhor retenção no que você produz
        </p>
      </div>

      {/* Type Selection */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">Escolha o Tipo de Criação</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setContentType("exemplo")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              contentType === "exemplo"
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50'
            }`}
          >
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Exemplos Autorais</h4>
            <p className="text-sm text-muted-foreground">
              Crie 3 exemplos próprios por conceito
            </p>
          </button>

          <button
            onClick={() => setContentType("questao")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              contentType === "questao"
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50'
            }`}
          >
            <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Questões Originais</h4>
            <p className="text-sm text-muted-foreground">
              Elabore 5 itens de múltipla escolha
            </p>
          </button>

          <button
            onClick={() => setContentType("analogia")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              contentType === "analogia"
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50'
            }`}
          >
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Analogias Cotidianas</h4>
            <p className="text-sm text-muted-foreground">
              1 analogia forte conectando abstrato ao familiar
            </p>
          </button>
        </div>
      </div>

      {/* Content Creator */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">
          Criar {contentType === "exemplo" ? "Exemplo" : contentType === "questao" ? "Questão" : "Analogia"}
        </h3>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Matéria</label>
              <Select value={metadata.subject} onValueChange={(v) => setMetadata({ ...metadata, subject: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematica">Matemática</SelectItem>
                  <SelectItem value="portugues">Português</SelectItem>
                  <SelectItem value="biologia">Biologia</SelectItem>
                  <SelectItem value="fisica">Física</SelectItem>
                  <SelectItem value="quimica">Química</SelectItem>
                  <SelectItem value="redacao">Redação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tópico</label>
              <Input
                value={metadata.topic}
                onChange={(e) => setMetadata({ ...metadata, topic: e.target.value })}
                placeholder="Ex: Função quadrática"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              {contentType === "exemplo" && "Exemplo"}
              {contentType === "questao" && "Enunciado da Questão"}
              {contentType === "analogia" && "Analogia"}
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                contentType === "exemplo"
                  ? "Crie um exemplo prático e original..."
                  : contentType === "questao"
                  ? "Escreva o enunciado e 5 alternativas (A, B, C, D, E)..."
                  : "Conceito abstrato é como [algo familiar] porque..."
              }
              className="min-h-[200px]"
            />
          </div>

          {contentType === "questao" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Resposta Correta</label>
              <Select value={metadata.correctAnswer} onValueChange={(v) => setMetadata({ ...metadata, correctAnswer: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button onClick={saveContent} className="w-full rounded-xl" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Salvar {contentType === "exemplo" ? "Exemplo" : contentType === "questao" ? "Questão" : "Analogia"}
          </Button>
        </div>
      </div>

      {/* Subject-Specific Applications */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">Aplicações por Matéria</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="font-bold mb-2 text-primary">📐 Matemática</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Crie problemas "gêmeos" variando dados
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="sm">
              Criar Problema Gêmeo
            </Button>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="font-bold mb-2 text-primary">✍️ Redação</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Desenvolva repertórios autorais únicos
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="sm">
              Criar Repertório
            </Button>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="font-bold mb-2 text-primary">🔬 Ciências</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Invente experimentos mentais
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="sm">
              Criar Experimento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};