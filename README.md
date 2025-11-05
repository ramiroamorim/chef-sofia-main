# 🍳 Chef Italy - Quiz App

Uma aplicação interativa de quiz que identifica o perfil gastronômico do usuário e oferece a coleção de receitas da Chef Sofia Moretti. Construída com React (frontend) e Express (backend), com tracking do Facebook Pixel e analytics de visitantes.

## 🚀 Quick Start

### Opção 1: Docker (Recomendado para Produção)

```bash
# 1. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 2. Build e start com Docker Compose
docker-compose up -d

# 3. Acesse a aplicação
http://localhost:5000
```

### Opção 2: Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env conforme necessário

# 3. Rodar em modo desenvolvimento
npm run dev

# 4. Acesse a aplicação
http://localhost:5000
```

## 📋 Requisitos

### Para Docker
- Docker 20.10+
- Docker Compose 2.0+

### Para Desenvolvimento Local
- Node.js 18.x
- npm 9.x+

## 🏗️ Arquitetura

- **Frontend**: React com Vite, TailwindCSS e Radix UI
- **Backend**: Express.js com integração Vite para desenvolvimento
- **Database**: PostgreSQL (Neon) com Drizzle ORM
- **Tracking**: Facebook Pixel com Advanced Matching

**Arquitetura Single-Server:**
- Em desenvolvimento: Express integra Vite como middleware
- API e frontend servidos na mesma porta (5000)
- Rotas API disponíveis em `/api/*`

## 🔑 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
# Geolocation (opcional - tem fallback gratuito)
VITE_APIIP_NET_API_KEY=sua_chave

# Hotmart (obrigatório)
HOTMART_CLIENT_ID=seu_client_id
HOTMART_CLIENT_SECRET=seu_client_secret
HOTMART_BASIC_TOKEN=seu_basic_token

# Facebook Pixel (obrigatório)
FACEBOOK_PIXEL_ID=seu_pixel_id
FACEBOOK_ACCESS_TOKEN=seu_access_token

# Configuração
PORT=5000
NODE_ENV=development
```

## 📦 Deploy em Produção

Veja o guia completo em **[DEPLOY.md](./DEPLOY.md)** com:
- ✅ Deploy com Docker em qualquer servidor
- ✅ Configuração de domínio e SSL
- ✅ Nginx como proxy reverso
- ✅ Checklist de segurança
- ✅ Troubleshooting

### Deploy Rápido

```bash
# 1. No servidor (VPS, AWS, etc.)
git clone seu-repositorio.git
cd chef-italy

# 2. Configure variáveis
cp .env.example .env
nano .env  # Edite com suas credenciais

# 3. Deploy
docker-compose up -d

# 4. Configure proxy reverso (Nginx/Caddy)
# Ver DEPLOY.md para configuração completa
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com Vite integrado
npm run dev:fast         # Desenvolvimento rápido (sem TypeScript watch)

# Build
npm run build            # Build completo (client + server)
npm run build:client     # Build apenas frontend
npm run build:server     # Build apenas backend

# Produção
npm start                # Inicia servidor em modo produção

# Utilitários
npm run check            # TypeScript check
npm run typecheck        # TypeScript check (sem emit)
npm run db:push          # Push schema do Drizzle
```

## 📁 Estrutura do Projeto

```
chef-italy/
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   ├── hooks/       # Custom hooks
│   │   ├── assets/      # Imagens e assets
│   │   └── data/        # Dados estáticos
├── server/              # Backend Express
│   ├── index.ts         # Entry point
│   ├── routes.ts        # API routes
│   └── vite.ts          # Vite middleware
├── shared/              # Código compartilhado
├── attached_assets/     # Assets externos
├── Dockerfile           # Docker config
├── docker-compose.yml   # Docker Compose
└── .env.example         # Template de variáveis
```

## 🎨 Features

- ✅ Quiz interativo multi-etapas
- ✅ Análise de perfil gastronômico
- ✅ Facebook Pixel tracking com Advanced Matching
- ✅ Tracking de visitantes e analytics
- ✅ Recomendações de receitas
- ✅ Integração com página de vendas
- ✅ Carrossel de depoimentos
- ✅ Geolocalização com fallback gratuito
- ✅ Todas as imagens otimizadas em WebP (4.3MB total)

## 🔒 Segurança

- ✅ Todas as credenciais em variáveis de ambiente
- ✅ Sem secrets hardcoded no código
- ✅ Graceful degradation quando APIs não disponíveis
- ✅ Health checks configurados
- ✅ Cache headers otimizados

**IMPORTANTE**: 
- Sempre rotacione credenciais antes de fazer deploy
- Use HTTPS em produção
- Nunca commite o arquivo `.env`

## 📊 Performance

- ✅ Imagens otimizadas: 81MB → 4.3MB (94.7% redução)
- ✅ Formato WebP para todas as imagens
- ✅ Multi-stage Docker build (~150MB imagem final)
- ✅ Cache headers configurados
- ✅ TypeScript incremental compilation

## 🐛 Troubleshooting

### Container não inicia
```bash
docker-compose logs  # Ver erros
```

### Porta em uso
```bash
# Mude a porta no docker-compose.yml
ports:
  - "8080:5000"
```

### Build falha
```bash
docker system prune -a
docker-compose build --no-cache
```

## 📝 License

MIT

## 🤝 Contribuindo

Este projeto foi otimizado para performance e segurança. Principais melhorias recentes:

- **Phase 5**: Correção crítica de memory leaks
- **Phase 6**: Remoção de secrets hardcoded + consolidação de código
- **Docker Support**: Adicionado suporte completo para Docker

Veja [replit.md](./replit.md) para histórico completo de otimizações.
