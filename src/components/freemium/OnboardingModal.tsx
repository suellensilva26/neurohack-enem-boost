import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Clock } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

export const OnboardingModal = ({ open, onComplete }: OnboardingModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    desired_course: "",
    target_university: "",
    preparation_level: "",
    study_days_available: "",
    main_difficulty: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          desired_course: formData.desired_course,
          target_university: formData.target_university,
          preparation_level: formData.preparation_level,
          study_days_available: parseInt(formData.study_days_available),
          main_difficulty: formData.main_difficulty,
          onboarding_completed: true
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Cadastro completo!",
        description: "Vamos começar sua jornada rumo à aprovação!",
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const daysUntilEnem = Math.ceil((new Date("2025-11-09").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <GraduationCap className="h-6 w-6 text-primary" />
            Bem-vindo ao ENEM 15 Dias
          </DialogTitle>
          <div className="flex items-center gap-2 text-destructive font-bold mt-2">
            <Clock className="h-5 w-5" />
            Faltam {daysUntilEnem} dias para o ENEM. Cadastre-se e comece agora!
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Curso Desejado *</Label>
            <Input
              id="course"
              required
              value={formData.desired_course}
              onChange={(e) => setFormData({ ...formData, desired_course: e.target.value })}
              placeholder="Ex: Medicina, Engenharia..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">Universidade Objetivo *</Label>
            <Input
              id="university"
              required
              value={formData.target_university}
              onChange={(e) => setFormData({ ...formData, target_university: e.target.value })}
              placeholder="Ex: USP, UFMG..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Nível de Preparação *</Label>
            <Select
              required
              value={formData.preparation_level}
              onValueChange={(value) => setFormData({ ...formData, preparation_level: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zero">Zero (começando do zero)</SelectItem>
                <SelectItem value="basico">Básico (já estudei um pouco)</SelectItem>
                <SelectItem value="intermediario">Intermediário (já fiz simulados)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days">Quantos dias por semana pode estudar? *</Label>
            <Input
              id="days"
              required
              type="number"
              min="1"
              max="7"
              value={formData.study_days_available}
              onChange={(e) => setFormData({ ...formData, study_days_available: e.target.value })}
              placeholder="1-7 dias"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Maior Dificuldade Atual *</Label>
            <Input
              id="difficulty"
              required
              value={formData.main_difficulty}
              onChange={(e) => setFormData({ ...formData, main_difficulty: e.target.value })}
              placeholder="Ex: Matemática, Redação..."
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading} size="lg">
            {loading ? "Salvando..." : "Começar Jornada"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
