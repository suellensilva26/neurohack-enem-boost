import { useState } from 'react';
import { redirectToCheckout } from '@/utils/stripe';

interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
}

interface CreateCheckoutSessionParams {
  email?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export const useCheckoutSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (params: CreateCheckoutSessionParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: params.email,
          successUrl: params.successUrl || `${window.location.origin}/#/simulado?payment=success`,
          cancelUrl: params.cancelUrl || `${window.location.origin}/#/pricing?payment=cancelled`,
        }),
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
