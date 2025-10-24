# Guia de Deploy - NeuroHack ENEM 2025

## Deploy no Vercel

### 1. Preparação do Repositório GitHub

1. Crie o repositório no GitHub: `https://github.com/suellensilva26/NeuroHack_Enem_2025.git`
2. Faça upload de todos os arquivos do projeto
3. Configure as variáveis de ambiente no GitHub Secrets (opcional, para CI/CD)

### 2. Deploy no Vercel

#### Opção 1: Via Interface Web
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Importe o repositório `NeuroHack_Enem_2025`
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_APP_URL`
   - `VITE_API_BASE_URL`
   - `VITE_PREMIUM_BUILD=true`

#### Opção 2: Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Configuração de Domínio Personalizado

1. No painel do Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções do Vercel
4. Aguarde a propagação (pode levar até 48h)

### 4. Variáveis de Ambiente Necessárias

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_APP_URL=https://neurohackenem.pro
VITE_API_BASE_URL=https://api.neurohackenem.com
VITE_PREMIUM_BUILD=true
```

### 5. Configurações Automáticas

O projeto já está configurado com:
- ✅ `vercel.json` otimizado para PWA
- ✅ Headers de cache para assets
- ✅ Rewrite rules para SPA
- ✅ Service Worker configurado
- ✅ Manifest.json para PWA

### 6. Verificações Pós-Deploy

Após o deploy, verifique:
- [ ] Aplicação carrega sem erros
- [ ] PWA funciona offline
- [ ] Manifest.json acessível
- [ ] Service Worker registrado
- [ ] Roteamento SPA funcionando
- [ ] Integração Supabase ativa

### 7. Monitoramento

- Analytics: Vercel Analytics habilitado
- Logs: Disponíveis no painel Vercel
- Performance: Web Vitals automático

### 8. Atualizações

Para atualizações futuras:
1. Push para branch `main` no GitHub
2. Deploy automático no Vercel
3. Verificação via preview URLs

## Troubleshooting

### Erro de Build
- Verifique variáveis de ambiente
- Confirme dependências no `package.json`
- Veja logs no painel Vercel

### PWA não funciona
- Verifique HTTPS
- Confirme `manifest.json` acessível
- Teste Service Worker no DevTools

### Domínio não funciona
- Aguarde propagação DNS (até 48h)
- Verifique configuração no registrar
- Use ferramentas como `dig` ou `nslookup`