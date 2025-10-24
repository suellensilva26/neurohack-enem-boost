# Configuração do GitHub - NeuroHack ENEM 2025

## Passos para Criar o Repositório

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Configure:
   - **Repository name**: `NeuroHack_Enem_2025`
   - **Description**: `🧠 NeuroHack ENEM 2025 - Plataforma inteligente de preparação para o ENEM com simulados, dashboard personalizado e recursos PWA`
   - **Visibility**: Public
   - **Initialize**: ✅ Add a README file
   - **Add .gitignore**: Node
   - **Choose a license**: MIT License

### 2. Upload dos Arquivos

#### Opção 1: Via Interface Web (Recomendado para primeira vez)
1. No repositório criado, clique em "uploading an existing file"
2. Arraste todos os arquivos do projeto (exceto `node_modules`, `dist`, `.env`)
3. Commit message: `🚀 Initial commit - NeuroHack ENEM 2025 complete project`

#### Opção 2: Via Git CLI
```bash
# No diretório do projeto
git init
git remote add origin https://github.com/suellensilva26/NeuroHack_Enem_2025.git
git add .
git commit -m "🚀 Initial commit - NeuroHack ENEM 2025 complete project"
git branch -M main
git push -u origin main
```

### 3. Configurar Secrets (Para CI/CD)

No GitHub, vá em Settings > Secrets and variables > Actions:

```
VITE_SUPABASE_URL = sua_url_do_supabase
VITE_SUPABASE_PUBLISHABLE_KEY = sua_chave_publica_supabase
VITE_APP_URL = https://neurohackenem.pro
VITE_API_BASE_URL = https://api.neurohackenem.com
```

### 4. Arquivos Preparados para Upload

✅ **Arquivos principais**:
- `README.md` - Documentação completa
- `package.json` - Dependências e scripts
- `vercel.json` - Configuração otimizada para Vercel
- `.env.example` - Template de variáveis de ambiente
- `DEPLOY.md` - Guia de deploy

✅ **Configurações**:
- `.gitignore` - Arquivos ignorados otimizado
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `tsconfig.json` - Configuração TypeScript
- `tailwind.config.ts` - Configuração Tailwind
- `vite.config.ts` - Configuração Vite

✅ **Código fonte**:
- `src/` - Todo o código da aplicação
- `public/` - Assets públicos
- `components.json` - Configuração shadcn/ui

✅ **PWA**:
- `manifest.json` - Manifest da PWA
- Service Worker configurado
- Icons e screenshots

### 5. Verificações Antes do Upload

- [ ] Arquivo `.env` não está incluído (segurança)
- [ ] `node_modules` não está incluído
- [ ] `dist` não está incluído (será gerado no build)
- [ ] Todos os arquivos de configuração estão presentes
- [ ] README.md está atualizado

### 6. Próximos Passos Após Upload

1. **Verificar repositório**: Confirme que todos os arquivos foram enviados
2. **Deploy no Vercel**: Siga o guia em `DEPLOY.md`
3. **Configurar domínio**: Vincule seu domínio personalizado
4. **Testar aplicação**: Verifique se tudo funciona em produção

## Estrutura Final do Repositório

```
NeuroHack_Enem_2025/
├── 📁 .github/workflows/     # CI/CD
├── 📁 public/               # Assets públicos
├── 📁 src/                  # Código fonte
├── 📁 supabase/            # Configurações Supabase
├── 📄 .env.example         # Template variáveis
├── 📄 .gitignore           # Arquivos ignorados
├── 📄 DEPLOY.md            # Guia de deploy
├── 📄 README.md            # Documentação
├── 📄 package.json         # Dependências
├── 📄 vercel.json          # Config Vercel
└── 📄 vite.config.ts       # Config Vite
```

## Comandos Úteis

```bash
# Clonar repositório
git clone https://github.com/suellensilva26/NeuroHack_Enem_2025.git

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```