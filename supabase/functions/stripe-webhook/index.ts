import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    return new Response('Webhook signature missing', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log('Webhook received:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, productId, ebookId } = session.metadata || {};

      if (!userId || !productId) {
        throw new Error('Missing metadata in session');
      }

      // Save purchase record
      await supabase.from('purchases').insert({
        id: session.id,
        user_id: userId,
        product_id: productId,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'brl',
        stripe_session_id: session.id,
      });

      // Update user entitlements
      const entitlement = productId === 'prod_full_access' 
        ? 'full_access' 
        : (ebookId || productId.replace('prod_tab_', ''));

      const { data: profile } = await supabase
        .from('profiles')
        .select('entitlements')
        .eq('id', userId)
        .single();

      const currentEntitlements = profile?.entitlements || [];
      const newEntitlements = [...currentEntitlements, entitlement];

      await supabase
        .from('profiles')
        .update({ entitlements: newEntitlements })
        .eq('id', userId);

      console.log('Entitlement granted:', entitlement, 'to user:', userId);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 400 }
    );
  }
});
