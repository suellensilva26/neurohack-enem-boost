import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type UserContextValue = {
  isPremium: boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (v: boolean) => void;
  refreshEntitlements: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const refreshEntitlements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsPremium(false);
        return;
      }
      const { data } = await supabase
        .from("user_entitlements")
        .select("entitlement")
        .eq("user_id", user.id);
      const entitlements = (data || []).map((e: any) => e.entitlement);
      setIsPremium(entitlements.includes("full_access") || entitlements.includes("premium"));
    } catch {
      setIsPremium(false);
    }
  };

  useEffect(() => {
    refreshEntitlements();
    const { data: authSub } = supabase.auth.onAuthStateChange(() => {
      refreshEntitlements();
    });
    return () => {
      authSub?.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ isPremium, showUpgradeModal, setShowUpgradeModal, refreshEntitlements }), [isPremium, showUpgradeModal]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}