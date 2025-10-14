import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface FreemiumLimits {
  isPremium: boolean;
  dailyQuestionsLimit: number;
  dailyQuestionsUsed: number;
  maxStreak: number;
  currentStreak: number;
  maxStudyHours: number;
  studyHoursToday: number;
  canAccessContent: (contentType: string) => boolean;
  incrementQuestions: () => Promise<void>;
  updateStudyTime: (hours: number) => Promise<void>;
}

export const useFreemiumLimits = (): FreemiumLimits => {
  const { toast } = useToast();
  const [isPremium, setIsPremium] = useState(false);
  const [dailyQuestionsUsed, setDailyQuestionsUsed] = useState(0);
  const [studyHoursToday, setStudyHoursToday] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const FREE_LIMITS = {
    dailyQuestions: 5,
    maxStreak: 7,
    maxStudyHours: 3
  };

  useEffect(() => {
    checkUserAccess();
    loadDailyUsage();
  }, []);

  const checkUserAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Verificar se tem papel premium ou full_access
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["premium_user", "admin"]);

      const { data: profile } = await supabase
        .from("profiles")
        .select("entitlements")
        .eq("id", user.id)
        .single();

      const hasPremiumRole = roles && roles.length > 0;
      const hasFullAccess = profile?.entitlements?.includes("full_access");

      setIsPremium(hasPremiumRole || hasFullAccess);
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
    }
  };

  const loadDailyUsage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];

      const { data: usage } = await supabase
        .from("daily_usage")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (usage) {
        setDailyQuestionsUsed(usage.questions_answered || 0);
        setStudyHoursToday(Number(usage.study_hours) || 0);
        setCurrentStreak(usage.streak_days || 0);
      }

      // Calcular streak usando função do banco
      const { data: streakData } = await supabase.rpc("calculate_user_streak", {
        p_user_id: user.id
      });

      if (streakData !== null) {
        setCurrentStreak(streakData);
      }
    } catch (error) {
      console.error("Erro ao carregar uso diário:", error);
    }
  };

  const incrementQuestions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from("daily_usage")
        .upsert({
          user_id: user.id,
          date: today,
          questions_answered: dailyQuestionsUsed + 1,
          last_activity_at: new Date().toISOString()
        }, {
          onConflict: "user_id,date"
        });

      if (error) throw error;

      setDailyQuestionsUsed(prev => prev + 1);
    } catch (error: any) {
      toast({
        title: "Erro ao registrar questão",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateStudyTime = async (hours: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const newTotal = studyHoursToday + hours;

      const { error } = await supabase
        .from("daily_usage")
        .upsert({
          user_id: user.id,
          date: today,
          study_hours: newTotal,
          last_activity_at: new Date().toISOString()
        }, {
          onConflict: "user_id,date"
        });

      if (error) throw error;

      setStudyHoursToday(newTotal);
    } catch (error: any) {
      toast({
        title: "Erro ao registrar tempo de estudo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const canAccessContent = (contentType: string): boolean => {
    if (isPremium) return true;

    // Conteúdos sempre liberados na versão gratuita
    const freeContent = ["dashboard", "questao-dia", "dica-ia"];
    
    return freeContent.includes(contentType);
  };

  return {
    isPremium,
    dailyQuestionsLimit: isPremium ? Infinity : FREE_LIMITS.dailyQuestions,
    dailyQuestionsUsed,
    maxStreak: isPremium ? Infinity : FREE_LIMITS.maxStreak,
    currentStreak,
    maxStudyHours: isPremium ? Infinity : FREE_LIMITS.maxStudyHours,
    studyHoursToday,
    canAccessContent,
    incrementQuestions,
    updateStudyTime
  };
};
