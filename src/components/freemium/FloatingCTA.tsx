import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FloatingCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2">
      <Button
        onClick={() => navigate("/pricing")}
        size="lg"
        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-2xl shadow-primary/50 animate-pulse rounded-full px-6 py-6 text-base font-bold"
      >
        <Zap className="mr-2 h-5 w-5" />
        Acelerar Aprovação
      </Button>
    </div>
  );
};
