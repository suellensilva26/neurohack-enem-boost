import { useNavigate } from "react-router-dom";

interface PremiumOverlayProps {
  open: boolean;
  onClose: () => void;
  onUpgradeClick?: () => void;
}

export const PremiumOverlay = ({ open, onClose, onUpgradeClick }: PremiumOverlayProps) => {
  const navigate = useNavigate();

  if (!open) return null;

  const gotoUpgradePage = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      navigate('/pricing');
    }
  };
  
  // Revert: "Ver depois" deve apenas fechar o overlay, sem redirecionar
  const handleSeeLater = () => {
    onClose();
  };

  return (
    <div className="premium-overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <div className="overlay-title">🚀 Desbloqueie todo seu potencial!</div>
        <p className="overlay-message">
          Você está na aba <span className="premium-highlight">Premium</span> do NeuroHack ENEM 2025.<br />
          Toque para impulsionar seus resultados.<br />
          Ao desbloquear, você libera acesso total às funcionalidades mais poderosas:
        </p>
        <ul className="overlay-features">
          <li>🌟 Inteligência Artificial que decifra o ENEM</li>
          <li>🔓 Questões exclusivas e resoluções automáticas</li>
          <li>📈 Estratégias que aumentam sua nota em até 280 pontos</li>
          <li>🔥 Simulados adaptativos (aumente sua performance em tempo real)</li>
        </ul>
        <button className="cta-unlock" onClick={gotoUpgradePage}>
          IMPULSIONE SEUS ESTUDOS AGORA
        </button>
        <span className="close-overlay" onClick={handleSeeLater}>Ver depois</span>
      </div>
    </div>
  );
};

export default PremiumOverlay;