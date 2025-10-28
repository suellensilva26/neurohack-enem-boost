import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      throw new Error('VITE_STRIPE_PUBLISHABLE_KEY não encontrada nas variáveis de ambiente');
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await getStripe();
  
  if (!stripe) {
    throw new Error('Falha ao carregar o Stripe');
  }
  
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });
  
  if (error) {
    throw new Error(`Erro no checkout: ${error.message}`);
  }
};
