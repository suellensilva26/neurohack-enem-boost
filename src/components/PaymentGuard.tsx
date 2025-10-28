import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Lock, Star } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

interface PaymentStatus {
  hasPaid: boolean;
  isLoading: boolean;
  error?: string;
}

export const PaymentGuard: React.FC<PaymentGuardProps> = ({ 
  children, 
  fallbackPath = '/pricing' 
}) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    hasPaid: false,
    isLoading: true,
  });

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    try {
      // Verificar se há um token de pagamento válido no localStorage
      const paymentToken = localStorage.getItem('neurohack_payment_token');
      const paymentEmail = localStorage.getItem('neurohack_payment_email');
      
      if (paymentToken && paymentEmail) {
        // Verificar com o backend se o pagamento é válido
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: paymentToken,
            email: paymentEmail,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setPaymentStatus({
            hasPaid: data.valid,
            isLoading: false,
          });
        } else {
          // Se a verificação falhar, assumir que não pagou
          setPaymentStatus({
            hasPaid: false,
            isLoading: false,
          });
        }
      } else {
        // Verificar se há parâmetros de URL indicando pagamento bem-sucedido
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment') === 'success';
        
        if (paymentSuccess) {
          // Simular que o pagamento foi realizado
          // Em produção, você deve verificar com o Stripe webhook
          localStorage.setItem('neurohack_payment_token', 'temp_token_' + Date.now());
          localStorage.setItem('neurohack_payment_email', 'user@example.com');
          
          setPaymentStatus({
            hasPaid: true,
            isLoading: false,
          });
          
          toast.success('Pagamento confirmado! Acesso liberado.');
        } else {
          setPaymentStatus({
            hasPaid: false,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      setPaymentStatus({
        hasPaid: false,
        isLoading: false,
        error: 'Erro ao verificar pagamento',
      });
    }
  };

  const handlePurchaseClick = () => {
    window.location.href = '/#/pricing';
  };

  if (paymentStatus.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Verificando acesso...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!paymentStatus.hasPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Acesso Premium Necessário
            </CardTitle>
            <CardDescription className="text-gray-600">
              Esta área é exclusiva para usuários premium do NeuroHack ENEM
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">NeuroHack ENEM Premium</span>
              </div>
              <p className="text-sm text-blue-800">
                Desbloqueie todo o potencial da plataforma com acesso completo a todas as funcionalidades.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">O que você ganha:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Aprendizagem Acelerada Funcional
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Estratégias Secretas do ENEM
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Banco de Questões Completo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Simulados Inteligentes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  E muito mais...
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div>
                <p className="font-semibold text-gray-900">Apenas R$ 197</p>
                <p className="text-sm text-gray-600">Pagamento único • Acesso vitalício</p>
              </div>
              <Badge variant="destructive" className="text-xs">
                -60% OFF
              </Badge>
            </div>

            <Button 
              onClick={handlePurchaseClick}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Comprar Acesso Agora
            </Button>

            {paymentStatus.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{paymentStatus.error}</p>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              Pagamento 100% seguro via Stripe • Garantia de 7 dias
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
