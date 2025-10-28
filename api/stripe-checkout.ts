import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { email, successUrl, cancelUrl } = req.body;

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'NeuroHack ENEM Premium',
              description: 'Acesso completo ao NeuroHack ENEM - Plataforma de estudos intensivos para o ENEM',
              images: ['https://neurohackenem.pro/og-image.png'],
            },
            unit_amount: 19700, // R$ 197,00 em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.VITE_APP_URL || 'https://neurohackenem.pro'}/#/simulado?payment=success`,
      cancel_url: cancelUrl || `${process.env.VITE_APP_URL || 'https://neurohackenem.pro'}/#/pricing?payment=cancelled`,
      customer_email: email,
      metadata: {
        product: 'neurohack-enem-premium',
        source: 'website',
      },
    });

    res.status(200).json({
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}
