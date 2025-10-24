# Secrets necessários para deploy automático no Vercel

Para o workflow `.github/workflows/vercel-deploy.yml` funcionar, crie os seguintes Secrets no GitHub (Settings → Secrets and variables → Actions):

## Secrets do Vercel
- `VERCEL_TOKEN`: token pessoal do Vercel
  - Vercel → Settings → Tokens → Generate Token
- `VERCEL_ORG_ID`: ID da sua organização/time no Vercel
  - Vercel → Team Settings → General → "ID"
- `VERCEL_PROJECT_ID`: ID do projeto no Vercel
  - Abra o projeto → Settings → General → "Project ID"

## Variáveis da build (usadas pelo Vite)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_APP_URL` (ex.: `https://neurohackenem.pro`)
- `VITE_API_BASE_URL`
- `VITE_PREMIUM_BUILD` → defina como `true`

## Fluxo recomendado
1. Faça push do código para `main` em `https://github.com/suellensilva26/NeuroHack_Enem_2025`
2. No Vercel, crie o projeto importando esse repositório (Git Integration)
3. Copie `ORG_ID` e `PROJECT_ID` nas telas indicadas acima
4. Crie `VERCEL_TOKEN` e adicione todos os Secrets no GitHub
5. Confirme que `vercel.json` tem `buildCommand: "npm run build"` e `outputDirectory: "dist"`
6. A cada push na `main`, o workflow faz build e deploy automático em produção

## Dicas
- Use `workflow_dispatch` para disparar manualmente o deploy pelo GitHub Actions
- O Vercel também faz deploy automático via integração com Git, sem precisar do Action; este Action garante build e deploy consistentes com logs no GitHub