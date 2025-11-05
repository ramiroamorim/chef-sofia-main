# 🚀 Deploy Guide - Chef Italy Quiz App

## 📦 Preparação do Projeto

### 1. Arquivos Necessários
Este projeto está pronto para deploy em qualquer ambiente com Docker. Os arquivos incluídos são:
- ✅ `Dockerfile` - Configuração Docker otimizada
- ✅ `docker-compose.yml` - Orquestração simplificada
- ✅ `.dockerignore` - Otimização do build
- ✅ `.env.example` - Template de variáveis de ambiente

### 2. Configuração de Variáveis de Ambiente

**IMPORTANTE**: Antes de fazer o deploy, copie `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Geolocation API (opcional - tem fallback gratuito)
VITE_APIIP_NET_API_KEY=sua_chave_apiip_net

# Hotmart (obrigatório para vendas)
HOTMART_CLIENT_ID=seu_client_id
HOTMART_CLIENT_SECRET=seu_client_secret
HOTMART_BASIC_TOKEN=seu_basic_token

# Facebook Pixel (obrigatório para tracking)
FACEBOOK_PIXEL_ID=seu_pixel_id
FACEBOOK_ACCESS_TOKEN=seu_access_token

# Configuração do servidor
PORT=5000
NODE_ENV=production
```

## 🐳 Deploy com Docker

### Opção 1: Docker Compose (Recomendado)

```bash
# 1. Build e start
docker-compose up -d

# 2. Ver logs
docker-compose logs -f

# 3. Parar
docker-compose down
```

### Opção 2: Docker direto

```bash
# 1. Build da imagem
docker build -t chef-italy-app .

# 2. Rodar container
docker run -d \
  --name chef-italy \
  -p 5000:5000 \
  --env-file .env \
  --restart unless-stopped \
  chef-italy-app

# 3. Ver logs
docker logs -f chef-italy

# 4. Parar container
docker stop chef-italy
docker rm chef-italy
```

## 🌐 Deploy em Servidores

### Deploy em VPS (DigitalOcean, AWS, etc.)

```bash
# 1. SSH no servidor
ssh user@seu-servidor.com

# 2. Instalar Docker (se necessário)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Clonar/enviar projeto
git clone seu-repositorio.git
# ou
scp -r ./chef-italy user@servidor:/home/user/

# 4. Configurar .env
cd chef-italy
nano .env  # Configure as variáveis

# 5. Deploy
docker-compose up -d

# 6. Configurar proxy reverso (Nginx/Caddy) se necessário
```

### Deploy com Nginx (Proxy Reverso)

Exemplo de configuração Nginx (`/etc/nginx/sites-available/chef-italy`):

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📋 Checklist Antes do Deploy

- [ ] Configurar todas as variáveis de ambiente no `.env`
- [ ] Atualizar `FACEBOOK_PIXEL_ID` com o pixel correto do domínio
- [ ] Rotacionar credenciais do Hotmart se foram expostas
- [ ] Rotacionar chave APIIP.NET se foi exposta
- [ ] Testar localmente com `docker-compose up`
- [ ] Configurar SSL/HTTPS (Let's Encrypt/Cloudflare)
- [ ] Configurar domínio DNS
- [ ] Testar formulário de conversão
- [ ] Verificar tracking do Facebook Pixel

## 🔒 Segurança

1. **NUNCA** commite o arquivo `.env` no Git
2. **SEMPRE** use HTTPS em produção
3. **ROTACIONE** credenciais expostas antes do deploy
4. Configure firewall para permitir apenas portas 80/443/22
5. Use secrets management em produção (AWS Secrets Manager, etc.)

## 🎯 Domínios Diferentes

Para usar em outro domínio:

1. **Atualize as variáveis de ambiente** com as credenciais do novo domínio
2. **Configure o Facebook Pixel** para o novo domínio no Facebook Business Manager
3. **Atualize DNS** para apontar para o servidor
4. **Configure SSL** com certbot ou Cloudflare

```bash
# Exemplo: Renovar certificado SSL (Let's Encrypt)
certbot --nginx -d seu-novo-dominio.com
```

## 📊 Monitoramento

```bash
# Ver status
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Ver uso de recursos
docker stats

# Reiniciar se necessário
docker-compose restart
```

## 🐛 Troubleshooting

### Problema: Container não inicia
```bash
# Ver logs de erro
docker-compose logs

# Verificar variáveis de ambiente
docker-compose config
```

### Problema: Porta já em uso
```bash
# Mudar porta no docker-compose.yml
ports:
  - "8080:5000"  # Usar 8080 externamente
```

### Problema: Build falha
```bash
# Limpar cache do Docker
docker system prune -a
docker-compose build --no-cache
```

## 📞 Suporte

Para problemas específicos:
1. Verifique os logs: `docker-compose logs`
2. Verifique o health check: `docker inspect chef-italy-app`
3. Teste localmente primeiro
4. Verifique configuração de firewall/rede

## ⚡ Performance

O projeto está otimizado com:
- ✅ Multi-stage Docker build (imagem final ~150MB)
- ✅ Todas as imagens em WebP (4.3MB total)
- ✅ Cache headers configurados
- ✅ Health checks automáticos
- ✅ Restart automático em caso de falha
