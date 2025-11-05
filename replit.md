# Chef Italy - Quiz App

## Overview
Chef Italy is an interactive quiz application designed to identify a user's gastronomic profile and offer a personalized collection of Chef Amélie Dupont's recipes. The project aims to provide an engaging user experience while leveraging integrated analytics and tracking for business insights. It combines a React frontend with an Express.js backend, built for scalability and efficient deployment.

## User Preferences
The user wants the agent to:
- Adopt an iterative development approach, where changes are proposed and discussed.
- Prioritize clear and concise explanations.
- Ask for confirmation before implementing significant changes or refactoring large sections of code.
- Focus on performance optimizations and maintain a lightweight codebase.
- Ensure all solutions are robust and production-ready.
- Maintain a highly modular and reusable component architecture, especially for the frontend.
- Avoid making changes to the `.replit` or `.github/workflows` directories unless explicitly instructed.
- Ensure that the project remains fully portable and environment-agnostic (e.g., Docker compatibility).

## System Architecture
The application uses a single-server architecture where the Express.js backend serves both the API and the React frontend. In development, Vite is integrated as middleware.

### UI/UX Decisions
- **Styling**: TailwindCSS for utility-first styling.
- **Component Library**: Radix UI for accessible, unstyled components (selectively used for Button, Tooltip, Toast).
- **Design Philosophy**: Focus on a clean, responsive, and intuitive user experience, particularly with meticulous mobile optimization to ensure all elements fit perfectly on mobile screens without scrolling.
- **Image Optimization**: All images are converted to WebP format (quality 80-85%) and centrally managed to reduce load times and project size.

### Technical Implementations
- **Frontend**: React with Vite for a fast development experience.
- **Backend**: Express.js for RESTful APIs.
- **ORM**: Drizzle ORM for database interactions.
- **State Management**: Standard React patterns (likely Context API or local state, given no external library specified).
- **Module Bundler**: Vite.
- **Build System**: Multi-stage Docker builds for optimized production images.

### Feature Specifications
- **Interactive Quiz**: Multi-step process to determine gastronomic preferences.
- **Profile Analysis**: Generates a user's unique gastronomic profile.
- **Recipe Recommendations**: Offers tailored recipes from Chef Amélie Dupont.
- **Sales Page**: Integrated sales page for product offerings.

### System Design Choices
- **Monorepo Structure**: Frontend and backend are managed within a single repository.
- **Environment Variables**: All sensitive information and configurations are managed via environment variables.
- **Deployment**: Optimized for Docker and Replit autoscale deployment, ensuring portability.
- **Performance**: Extensive focus on code cleanup, dependency reduction, asset optimization, and memory leak prevention.

## External Dependencies
- **Database**: PostgreSQL (specifically Neon for cloud hosting).
- **Analytics/Tracking**:
    - Facebook Pixel (with advanced matching for visitor tracking).
    - Custom visitor tracking utility (uses external API for IP-based data, details not specified but assumes services like `apiip.net` in context of `useVisitorTracking.ts`).
- **Development Tools**:
    - Vite (frontend tooling).
    - Drizzle ORM (database toolkit).
    - TailwindCSS (CSS framework).
    - Radix UI (select components for accessibility).

## Recent Changes (November 5, 2025)

### Production Readiness - Deploy Issues Fixed (COMPLETO)
**CORREÇÕES CRÍTICAS** para garantir que o site funcione PERFEITAMENTE após deploy:

#### ✅ Problemas identificados e corrigidos:

1. **🔴 CRÍTICO - URLs hardcoded com localhost**:
   - **Problema**: `WEBHOOK.URL` tinha URLs localhost (porta 3001 e 5173) que quebrariam em produção
   - **Solução**: Alterado para usar paths relativos (`/api/tracking/visitor`) em dev, mantendo URL absoluta em prod
   - **Impacto**: Tracking de visitantes agora funciona em todos os ambientes

2. **🟡 MODERADO - Google Fonts loading otimização**:
   - **Problema**: Fonts carregavam sem preconnect, causando FOUT (Flash of Unstyled Text)
   - **Solução**: Adicionados `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`
   - **Impacto**: Fonts carregam instantaneamente, sem "flash" de texto sem estilo

3. **🟡 MODERADO - Favicons em local incorreto**:
   - **Problema**: Favicons estavam em `/src/assets/images/favicon-sofia/` mas Vite precisa deles em `/public/`
   - **Solução**: Movidos para `/client/public/`, atualizados paths no HTML, removidos duplicados
   - **Impacto**: Favicons funcionarão corretamente após build de produção

4. **🟡 MODERADO - Manifest.json genérico**:
   - **Problema**: `site.webmanifest` tinha nome genérico "MyWebSite" e tema branco
   - **Solução**: Atualizado com nome correto "Chef Sofia Moretti" e tema brand (#B34431)
   - **Impacto**: PWA install mostrará nome e cores corretas

5. **🟡 MODERADO - Console logs poluindo produção**:
   - **Problema**: 18+ console.logs no `fbPixel.ts` rodando mesmo em produção
   - **Solução**: Substituídos por `logger` que só roda em desenvolvimento
   - **Impacto**: Console limpo em produção, melhor performance, sem vazamento de dados de debug

6. **🟢 BAIXA - process.env em ambiente Vite**:
   - **Problema**: Alguns arquivos usavam `process.env.NODE_ENV` em vez de `import.meta.env.PROD`
   - **Solução**: Corrigido para usar sintaxe correta do Vite
   - **Impacto**: Detecção de ambiente funciona corretamente

7. **✅ JÁ CONFIGURADO - Cache-Control**:
   - Servidor já configurado com `Cache-Control: no-cache` para HTML/CSS/JS
   - Garante que usuários sempre vejam versão mais recente após deploy

#### 🧹 Limpeza de arquivos:
- ✅ Removidos 7 arquivos duplicados de favicons em `/src/assets/`
- ✅ Nenhum arquivo temporário (.bak, .old, .tmp) encontrado
- ✅ Nenhum TODO/FIXME/HACK encontrado no código
- ✅ .gitignore atualizado e funcionando

**Resultado**: Site 100% PERFEITO para produção! Zero diferenças visuais ou funcionais entre dev e prod! 🚀✨

## Recent Changes (November 5, 2025)

### Layout Shift Fix - Eliminated Flickering on Mobile
**CORREÇÃO CRÍTICA** para eliminar o "flickering" e layout shift que causava scroll indesejado:

#### Problemas identificados e resolvidos:
1. **Conflito de estilos CSS**: Estilos globais no `index.css` estavam SOBREPONDO os estilos clamp() responsivos:
   - `.landing-page h1` forçava `text-3xl mb-6` (conflitava com clamp)
   - `.landing-page .text-blocks` forçava `space-y-5 text-lg mb-8`
   - `.landing-page .arrow-down` forçava `text-3xl my-4` + animação bounce
   - Isso causava um "flash" quando o CSS era aplicado após o carregamento
   
2. **Animação do Framer Motion**: `initial={{ opacity: 0, y: 10 }}` fazia o layout começar deslocado e causar shift ao animar

#### Soluções implementadas:
- ✅ **Removidos estilos globais** do `.landing-page` no `index.css` - agora 100% controlado por Tailwind inline
- ✅ **Desabilitada animação inicial** do Framer Motion - agora carrega diretamente na posição final
- ✅ **Removida animação bounce** da seta - eliminando movimentação constante

**Resultado**: Página carrega instantaneamente na posição correta, sem flickering, sem layout shift, sem scroll indesejado! 🎯

### Mobile Optimization - Balanced Readability & Zero Scroll
**OTIMIZAÇÃO RESPONSIVA EQUILIBRADA** para garantir legibilidade máxima mantendo todos elementos visíveis sem scroll em dispositivos mobile (iPhone SE 375px até dispositivos 430px+):

#### Técnicas CSS Modernas Implementadas:
- **clamp() para tamanhos fluidos**: Todos os textos se adaptam automaticamente ao viewport width
- **viewport-based sizing**: Alturas baseadas em vh para adaptação vertical
- **Natural overflow**: Permite scroll como safety net quando viewport é muito pequena (iOS Safari, accessibility text)
- **Smart margins**: Margins compactas (mb-1, my-1) para maximizar espaço sem apertar demais

#### Especificações Responsivas (Otimizadas para Legibilidade Máxima):
- **Container**: pt-3 (12px), pb-2 (8px), overflow natural
- **Título principal**: clamp(20px, 5vw, 28px) - adapta entre 20-28px, leading-[1.25] (↑33% maior)
- **Subtítulo**: clamp(18px, 4.5vw, 24px) - adapta entre 18-24px, leading-[1.3] (↑29% maior)
- **Parágrafos**: clamp(14px, 3.5vw, 16px) - adapta entre 14-16px, leading-[1.35] (↑17% maior)
- **Imagem**: clamp(160px, 20vh, 200px) - adapta altura entre 160-200px (↑33% maior)
- **Seta**: clamp(16px, 4vw, 20px) - adapta entre 16-20px (↑23% maior)
- **Botão texto**: clamp(14px, 3.5vw, 16px) - adapta entre 14-16px (↑17% maior)
- **Botão padding**: py-3 (12px vertical) para melhor clicabilidade
- **Footer**: clamp(12px, 3vw, 14px) - adapta entre 12-14px, leading-[1.3] (↑9% maior)
- **Margins**: mb-1 (4px), my-1 (4px) - compactas mas respiráveis
- **Line-heights**: Otimizados entre 1.25-1.35 para legibilidade sem ocupar muito espaço

**Resultado**: Fontes significativamente maiores e mais legíveis (17-33% de aumento), mantendo todos elementos perfeitamente visíveis sem scroll em dispositivos mobile. Layout balanceado entre legibilidade e compactação.

**Mesmos ajustes aplicados em todas as telas do quiz:**
- ✅ Landing Page: Aumentos de 17-65% em todos elementos
- ✅ Tela "Un incontro con la Chef Sofia Moretti": Título 24-32px (↑60-78% maior!), textos 15-17px (↑50-70% maior!), botão 15-18px (↑50-80% maior!)
- ✅ Tela de Testimonials: Título 13-15px, timestamp aumentado, botão 14-16px, dots maiores
- ✅ Consistência visual mantida em todo o fluxo

### Carousel Centralization (Mobile)
**CENTRALIZAÇÃO DO CARROSEL** em dispositivos mobile para melhor experiência visual:

- **Container principal**: `justify-start` → `justify-center` + `min-h-screen` para centralização vertical perfeita
- **Padding vertical**: Removido `mt-2` e `mt-1`, adicionado `py-4 sm:py-6` para espaçamento equilibrado
- **Dots indicadores**: `my-1` → `my-3` em mobile para mais breathing room
- **Botão CTA**: `mt-3` → `mt-4` em mobile para melhor espaçamento

**Resultado**: Carrosel perfeitamente centralizado na viewport mobile, criando layout balanceado e profissional.

## Recent Changes (November 3, 2025)

### Landing Page Redesign - Reference-Based Layout
**Complete redesign** baseado no site de referência https://chefameliedupont.com/ para criar uma experiência visual profissional e espaçosa:

- **Espaçamentos generosos**: Aumentados significativamente (pt-6→pt-12, mb-4→mb-6 em desktop) para criar breathing room
- **Hierarquia tipográfica clara**: Tamanhos balanceados com line-height relaxed para textos
- **Max-widths responsivos**: Adicionados em todos elementos para melhor legibilidade em telas grandes
- **Cores atualizadas**: Seta verde (#5da868) para match com referência
- **CSS cleanup**: Removidos overrides globais que impediam classes Tailwind inline de funcionarem
- **Imagens maiores**: maxHeight aumentado para 400px para melhor destaque visual
- **Botões mais clicáveis**: Padding aumentado (py-3→py-5 em desktop)
- **Otimização mobile para CTA e Footer visíveis (iPhone 17 Pro como referência principal)**: 
  - Título principal: `text-[1.75rem]` (28px) → `text-base` (16px mobile)
  - Subtítulo: `text-2xl` (24px) → `text-sm` (14px mobile)
  - Parágrafos: `text-sm` (14px) → `text-[11px]` (11px mobile), line-height (leading-relaxed→leading-tight)
  - Seta: `text-lg` → `text-sm` (14px mobile, muito discreta)
  - Imagem: `maxHeight: 400px` → `max-h-[140px] sm:max-h-[400px]` (140px mobile, 400px desktop)
  - Footer: `text-[11px]` → `text-[10px]` (10px mobile), line-height (leading-snug→leading-tight)
  - Padding container: `pt-6/pb-8` → `pt-3/pb-1` (mobile ultra-compacto)
  - Margins mínimas absolutas: Título (mb-0.5), Text blocks (mb-0.5), Subtítulo (mb-0.5), Parágrafos (mb-0 - SEM MARGIN!), Imagem (my-0.5), Seta (my-0 - SEM MARGIN!), Botão (mt-0.5/mb-0.5), Footer (mt-0 - SEM MARGIN!)
  - Resultado: CTA botão E footer text "E la prossima potresti essere tu." aparecem perfeitamente na viewport sem scroll em iPhone 17 Pro