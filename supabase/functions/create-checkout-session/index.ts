import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, userId, ebookId } = await req.json();

    const products = {
      'prod_full_access': { name: 'NeuroHack ENEM 15 Dias Intensivo', price: 29700 },
      'prod_tab_redacao': { name: 'Redação Nota 1000', price: 14900 },
      'prod_tab_revisao': { name: 'Kit Revisão Express', price: 11900 },
      'prod_tab_estrategias': { name: 'Estratégias Secretas', price: 8900 },
      'prod_tab_aprendizado': { name: 'Aprendizado Acelerado', price: 9900 },
      'prod_tab_padroes': { name: 'Padrões do ENEM', price: 12900 },
      'prod_tab_banco-questoes': { name: '100 Questões Recorrentes', price: 7900 },
    };

    const product = products[productId as keyof typeof products];
    
    if (!product) {
      throw new Error('Produto inválido');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: product.name,
              description: `Acesso completo ao conteúdo: ${product.name}`,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/tabs?success=true`,
      cancel_url: `${req.headers.get('origin')}/tabs?canceled=true`,
      metadata: {
        userId,
        productId,
        ebookId: ebookId || productId.replace('prod_tab_', ''),
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
