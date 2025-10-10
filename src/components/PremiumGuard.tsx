import React from "react";
import { useUser } from "@/hooks/useUser";
import PremiumOverlay from "@/components/freemium/PremiumOverlay";

export const PremiumGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPremium, showUpgradeModal, setShowUpgradeModal } = useUser();
  if (isPremium) return <>{children}</>;
  if (showUpgradeModal) {
    return (
      <PremiumOverlay
        open={true}
        onClose={() => setShowUpgradeModal(false)}
        onUpgradeClick={() => {
          /* overlay handles navigation to pricing */
        }}
      />
    );
  }
  return null; // breve silêncio enquanto decide
};

export default PremiumGuard;