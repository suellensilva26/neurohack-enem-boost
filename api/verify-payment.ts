import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { token, email } = req.body;

    if (!token || !email) {
      return res.status(400).json({ 
        message: 'Token e email são obrigatórios' 
      });
    }

    // Em produção, você deve verificar o token com o Stripe
    // Por enquanto, vamos simular uma verificação básica
    const isValidToken = token.startsWith('temp_token_') || token.startsWith('stripe_');
    
    if (isValidToken) {
      return res.status(200).json({ 
        valid: true,
        message: 'Pagamento verificado com sucesso'
      });
    } else {
      return res.status(400).json({ 
        valid: false,
        message: 'Token inválido'
      });
    }
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}
