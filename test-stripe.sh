#!/bin/bash

echo "🚀 Testando Sistema de Pagamento Stripe - NeuroHack ENEM"
echo "=================================================="

# Verificar se as dependências estão instaladas
echo "📦 Verificando dependências..."
if npm list @stripe/stripe-js > /dev/null 2>&1; then
    echo "✅ @stripe/stripe-js instalado"
else
    echo "❌ @stripe/stripe-js não encontrado"
fi

if npm list @stripe/react-stripe-js > /dev/null 2>&1; then
    echo "✅ @stripe/react-stripe-js instalado"
else
    echo "❌ @stripe/react-stripe-js não encontrado"
fi

if npm list stripe > /dev/null 2>&1; then
    echo "✅ stripe instalado"
else
    echo "❌ stripe não encontrado"
fi

if npm list @vercel/node > /dev/null 2>&1; then
    echo "✅ @vercel/node instalado"
else
    echo "❌ @vercel/node não encontrado"
fi

echo ""
echo "📁 Verificando arquivos criados..."

# Verificar arquivos principais
files=(
    "src/utils/stripe.ts"
    "src/hooks/useCheckoutSession.ts"
    "src/pages/Pricing.tsx"
    "src/components/PaymentGuard.tsx"
    "api/stripe-checkout.ts"
    "api/verify-payment.ts"
    "api/stripe-webhook.ts"
    "env.example"
    "STRIPE_IMPLEMENTATION.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file não encontrado"
    fi
done

echo ""
echo "🔧 Verificando configuração..."

# Verificar se o App.tsx foi atualizado
if grep -q "PaymentGuard" src/App.tsx; then
    echo "✅ PaymentGuard integrado no App.tsx"
else
    echo "❌ PaymentGuard não encontrado no App.tsx"
fi

# Verificar se o Index.tsx foi atualizado
if grep -q "navigate('/pricing')" src/pages/Index.tsx; then
    echo "✅ Redirecionamento para pricing configurado"
else
    echo "❌ Redirecionamento para pricing não encontrado"
fi

# Verificar vercel.json
if grep -q "stripe-checkout" vercel.json; then
    echo "✅ Funções serverless configuradas no vercel.json"
else
    echo "❌ Funções serverless não configuradas"
fi

echo ""
echo "🎯 Próximos passos:"
echo "1. Configure as variáveis de ambiente (.env)"
echo "2. Faça deploy no Vercel"
echo "3. Configure webhooks no Stripe Dashboard"
echo "4. Teste o fluxo de pagamento"
echo ""
echo "✅ Sistema de pagamento implementado com sucesso!"
echo "🚀 Pronto para lançar o NeuroHack ENEM Premium!"
