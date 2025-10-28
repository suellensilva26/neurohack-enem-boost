import { useState } from 'react';
import { redirectToCheckout } from '@/utils/stripe';

interface CheckoutSessionResponse {
  sessionId: string;
  redirectUrl: string;
}

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar sessão de checkout');
      }

      const data: CheckoutSessionResponse = await response.json();
      
      // Redirecionar para o checkout do Stripe
      await redirectToCheckout(data.sessionId);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro no checkout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading,
    error,
  };
};
