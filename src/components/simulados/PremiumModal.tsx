import PaywallModal from "@/components/PaywallModal";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  feature: string;
}

export const PremiumModal = ({ open, onClose, feature }: PremiumModalProps) => {
  // Map feature to product details. Adjust IDs/prices as needed.
  const featureConfig: Record<string, { price: number; productId: string; tabName: string; ebookId: string }> = {
    simulados: {
      price: 9900, // R$ 99,00
      productId: "simulados-premium",
      tabName: "Simulados ENEM",
      ebookId: "kit-simulados",
    },
  };

  const cfg = featureConfig[feature] ?? featureConfig["simulados"];

  return (
    <PaywallModal
      open={open}
      onClose={onClose}
      price={cfg.price}
      productId={cfg.productId}
      tabName={cfg.tabName}
      ebookId={cfg.ebookId}
    />
  );
};