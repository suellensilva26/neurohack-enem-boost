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
  const PREMIUM_BUILD = (import.meta.env.VITE_PREMIUM_BUILD ?? 'true') === 'true';
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

  // Desbloqueio total para build premium
  if (PREMIUM_BUILD) {
    return {
      isPremium: true,
      dailyQuestionsLimit: Infinity,
      dailyQuestionsUsed,
      maxStreak: Infinity,
      currentStreak,
      maxStudyHours: Infinity,
      studyHoursToday,
      canAccessContent: () => true,
      incrementQuestions: async () => {
        setDailyQuestionsUsed((prev) => prev + 1);
      },
      updateStudyTime: async (hours: number) => {
        setStudyHoursToday((prev) => prev + hours);
      }
    };
  }

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
      const usage = JSON.parse(localStorage.getItem("freemium_usage") || "{}");
      setDailyQuestionsUsed(usage.dailyQuestionsUsed || 0);
      setStudyHoursToday(usage.studyHoursToday || 0);
      setCurrentStreak(usage.currentStreak || 0);
    } catch (error) {
      console.error("Erro ao carregar uso diário:", error);
    }
  };

  const saveUsage = (usage: any) => {
    localStorage.setItem("freemium_usage", JSON.stringify(usage));
  };

  const incrementQuestions = async () => {
    if (isPremium) return;

    const newUsed = dailyQuestionsUsed + 1;
    setDailyQuestionsUsed(newUsed);
    saveUsage({
      dailyQuestionsUsed: newUsed,
      studyHoursToday,
      currentStreak
    });

    if (newUsed === FREE_LIMITS.dailyQuestions) {
      toast({
        title: "Limite diário atingido",
        description: "Desbloqueie o premium para acesso ilimitado.",
      });
    }
  };

  const updateStudyTime = async (hours: number) => {
    if (isPremium) return;

    const newHours = studyHoursToday + hours;
    setStudyHoursToday(newHours);
    saveUsage({
      dailyQuestionsUsed,
      studyHoursToday: newHours,
      currentStreak
    });
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
