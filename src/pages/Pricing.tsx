import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Target, BookOpen, Trophy } from 'lucide-react';
import { useCheckoutSession } from '@/hooks/useCheckoutSession';
import { toast } from 'sonner';

const Pricing = () => {
  const { createCheckoutSession, isLoading, error } = useCheckoutSession();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Verificar se há parâmetros de URL indicando resultado do pagamento
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      toast.success('Pagamento realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        window.location.href = '/#/simulado';
      }, 2000);
    } else if (paymentStatus === 'cancelled') {
      toast.error('Pagamento cancelado. Tente novamente!');
    }
  }, []);

  const handlePurchase = async () => {
    if (!email.trim()) {
      toast.error('Por favor, insira seu email');
      return;
    }

    try {
      await createCheckoutSession({
        email: email.trim(),
      });
    } catch (err) {
      toast.error('Erro ao processar pagamento. Tente novamente.');
    }
  };

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Aprendizagem Acelerada",
      description: "Técnicas neurocientíficas para estudar 3x mais rápido"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Estratégias Secretas",
      description: "Padrões e macetes que só quem passou no ENEM conhece"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Banco de Questões",
      description: "Mais de 10.000 questões do ENEM com resoluções detalhadas"
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "Simulados Inteligentes",
      description: "Simulados adaptativos que identificam suas fraquezas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="h-4 w-4 mr-1" />
            Plataforma Premium
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            NeuroHack ENEM
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Premium
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A plataforma mais avançada para sua aprovação no ENEM. 
            Técnicas neurocientíficas, estratégias secretas e conteúdo exclusivo.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="relative overflow-hidden border-2 border-blue-200 shadow-2xl">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-500 text-white px-6 py-2 rounded-bl-lg">
              <span className="font-semibold">Mais Vendido</span>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Acesso Completo
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 mb-6">
                Tudo que você precisa para passar no ENEM
              </CardDescription>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  R$ 197
                </span>
                <div className="text-left">
                  <div className="text-sm text-gray-500 line-through">R$ 497</div>
                  <Badge variant="destructive" className="text-xs">
                    -60% OFF
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Pagamento único • Acesso vitalício • Sem mensalidades
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Benefits */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">
                  O que você recebe:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "✅ Aprendizagem Acelerada Funcional",
                    "✅ Estratégias Secretas do ENEM", 
                    "✅ Padrões ENEM Funcional",
                    "✅ Questões Recorrentes",
                    "✅ Simulados Inteligentes",
                    "✅ Banco de Questões Completo",
                    "✅ Flashcards Interativos",
                    "✅ Redação Completa",
                    "✅ Revisão Express",
                    "✅ Dashboard de Progresso"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Seu email para receber o acesso:
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Purchase Button */}
              <Button
                onClick={handlePurchase}
                disabled={isLoading || !email.trim()}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Comprar Acesso Agora
                  </div>
                )}
              </Button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Pagamento 100% seguro via Stripe • Garantia de 7 dias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            O que nossos alunos dizem:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Silva",
                score: "850 pontos",
                text: "Consegui aumentar minha nota em 200 pontos usando as técnicas do NeuroHack!"
              },
              {
                name: "João Santos", 
                score: "920 pontos",
                text: "As estratégias secretas me ajudaram a identificar padrões que nunca tinha visto."
              },
              {
                name: "Ana Costa",
                score: "780 pontos", 
                text: "Aprendizagem acelerada funcionou perfeitamente. Estudei em 3 meses o que levaria 1 ano."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.score}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;