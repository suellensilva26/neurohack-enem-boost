# 🚀 Guia de Deploy na Hostinger (ZIP)

Este guia coloca seu site (build Vite/React) no ar na Hostinger usando um arquivo ZIP já pronto na sua pasta: `hostinger-upload.zip`.

## ✅ O que já está pronto
- Build de produção gerado em `dist/`.
- Arquivo `.htaccess` incluído no build (SPA routing configurado).
- ZIP de upload criado: `hostinger-upload.zip` (na raiz do projeto).

## 📦 Passo 1 — Fazer Upload do ZIP na Hostinger
1. Acesse: Hostinger → Sites → `neurohackenem.pro` → Gerenciador de Arquivos.
2. Entre em `/public_html/`.
3. Faça backup (se desejar) e **delete** arquivos antigos.
4. Faça upload do `hostinger-upload.zip`.
5. Depois do upload, **clique com botão direito** → `Extrair`.
6. Certifique-se que `index.html` e `.htaccess` ficaram na raiz de `/public_html/`.

## 🔧 Passo 2 — Conferências Importantes
- `index.html` está em `/public_html/`.
- Existe `.htaccess` em `/public_html/` com estas regras:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
- `manifest.webmanifest`, `sw.js` e assets estão presentes (PWA/instalação do app).

## 🧪 Passo 3 — Testar
- Acesse `https://neurohackenem.pro`.
- Atualize com `Ctrl+F5` se ver páginas em branco.
- Navegue pelas rotas internas: devem funcionar sem 404 graças ao `.htaccess`.

## 🧰 Problemas Comuns
- Página em branco: verifique se `index.html` está na raiz de `/public_html/` e se **não** há caminhos absolutos iniciando com `/` nos assets.
- 404 nas rotas: confirme o `.htaccess` acima.
- Stripe (se aplicável): para Hostinger estática, chaves precisam estar hardcoded no código. Se você usa Stripe, confirme `publishableKey` e `priceId` no componente de checkout antes do build.

## ♻️ Atualizações Futuras
Quando quiser atualizar:
1. Rode `npm run build` localmente.
2. Compacte a pasta `dist/` em um ZIP novo.
3. Suba e extraia sobre `/public_html/`.

## ✅ Dica Profissional
Se quiser deploy automático e menor chance de erro, mantenha na Vercel e apenas aponte o domínio via DNS. Mas este ZIP funciona 100% na Hostinger.