import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Image as ImageIcon, BookOpen, Atom } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DualCodingSystem = () => {
  const [contentType, setContentType] = useState<"cartao" | "storyboard" | "diagrama">("cartao");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");

  const saveContent = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Preencha título e conteúdo");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from('dual_coding_content')
        .insert({
          user_id: user.id,
          type: contentType,
          title,
          content: { text: content },
          subject
        });

      if (error) throw error;

      toast.success("Conteúdo salvo com sucesso!");
      setTitle("");
      setContent("");
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
          <Eye className="h-8 w-8 text-primary" />
          Dual Coding System
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Hack Visual-Verbal: Duas rotas de recuperação neural
        </p>
      </div>

      {/* Type Selection */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">Escolha o Tipo de Dual Coding</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setContentType("cartao")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              contentType === "cartao"
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50'
            }`}
          >
            <ImageIcon className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Cartões Imagem-Palavra</h4>
            <p className="text-sm text-muted-foreground">
              Figuras de linguagem, processos celulares e conceitos abstratos
            </p>
          </button>

          <button
            onClick={() => setContentType("storyboard")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              contentType === "storyboard"
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50'
            }`}
          >
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Storyboards 4 Quadros</h4>
            <p className="text-sm text-muted-foreground">
              DNA → RNA → proteína em narrativas visuais
            </p>
          </button>

          <button
            onClick={() => setContentType("diagrama")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              contentType === "diagrama"
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50'
            }`}
          >
            <Atom className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold mb-2">Diagramas Anotados</h4>
            <p className="text-sm text-muted-foreground">
              Forças, circuitos, reações com ícones e setas
            </p>
          </button>
        </div>
      </div>

      {/* Content Creator */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">
          Criar {contentType === "cartao" ? "Cartão" : contentType === "storyboard" ? "Storyboard" : "Diagrama"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Título</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Síntese Proteica"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Matéria</label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a matéria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matematica">Matemática</SelectItem>
                <SelectItem value="portugues">Português</SelectItem>
                <SelectItem value="biologia">Biologia</SelectItem>
                <SelectItem value="fisica">Física</SelectItem>
                <SelectItem value="quimica">Química</SelectItem>
                <SelectItem value="historia">História</SelectItem>
                <SelectItem value="geografia">Geografia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              {contentType === "storyboard" ? "Descreva os 4 quadros" : "Conteúdo"}
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                contentType === "storyboard"
                  ? "Quadro 1: ...\nQuadro 2: ...\nQuadro 3: ...\nQuadro 4: ..."
                  : "Descreva o conceito e elementos visuais..."
              }
              className="min-h-[200px]"
            />
          </div>

          <Button onClick={saveContent} className="w-full rounded-xl" size="lg">
            <ImageIcon className="h-4 w-4 mr-2" />
            Salvar Conteúdo
          </Button>
        </div>
      </div>

      {/* ENEM Applications */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">Aplicações por Matéria do ENEM</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="font-bold mb-2 text-primary">📝 Português</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Metáfora/metonímia com ícone e exemplo
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="sm">
              Experimentar
            </Button>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="font-bold mb-2 text-primary">⚡ Física</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Diagramas de forças + setas no corpo
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="sm">
              Experimentar
            </Button>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h4 className="font-bold mb-2 text-primary">🧬 Biologia</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Síntese proteica em 4 cenas
            </p>
            <Button variant="outline" className="w-full rounded-xl" size="sm">
              Experimentar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};