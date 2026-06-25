# 🧩 TEAmamos

> Organizar o cuidado sem perder o amor no processo.

O **TEAmamos** nasce para ajudar famílias, pessoas TEA, cuidadores e profissionais a transformarem rotina, informações e acompanhamento em mais previsibilidade, clareza e cuidado. Idealizado por **Vanderson Oliveira**, pai de uma filha autista.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 16 (App Router)
- **Biblioteca UI:** React 19
- **Estilização:** Tailwind CSS v4
- **Animações:** Framer Motion & GSAP
- **Banco de Dados:** Supabase (quando configurado) + fallback local em SQLite (`better-sqlite3`)
- **Painel Admin:** autenticação server-side com sessão HTTP-only
- **Validação de Dados:** Zod + React Hook Form
- **Infraestrutura/Deploy:** Docker + Nixpacks (via Coolify)

---

## 💻 Como Rodar Localmente

### Pré-requisitos
- Node.js versão `22.13.0` ou superior (use `nvm use` se aplicável).

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/VanderOliver-IA/TEAmamos.git
   cd TEAmamos/site
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente em `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ADMIN_SESSION_SECRET=
   ```
4. No Supabase, execute o schema disponível em `supabase/schema.sql` no SQL Editor para criar as tabelas `public.colaboracoes` e `public.admin_users`.
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse `http://localhost:3000` no seu navegador.

Sem as variáveis acima ou sem a tabela criada, o projeto continua aceitando colaborações com fallback automático para o SQLite local em `data/teamamos.db`.

### Primeiro acesso ao admin

- URL local: `http://localhost:3000/admin/login`
- URL online: `/admin/login`
- Usuário inicial: `omd.vandersonoliveira@gmail.com`
- Senha inicial: `Entrar2026@`

O painel administrativo atual foi criado para visualizar as mensagens enviadas pelos colaboradores. Quando o Supabase ainda não estiver provisionado, o painel exibe um aviso e usa fallback local.

---

## 🚀 Como fazer o Deploy no Coolify (O Jeito Certo)

Para garantir que o deploy ocorra de forma instantânea e via Webhook nativo do GitHub (evitando duplicações de API e lentidão na VPS), siga rigorosamente os passos abaixo:

### 1. Criar o Recurso Corretamente
No painel do Coolify, navegue até o seu servidor e clique em **Add New Resource**.
Selecione **Public/Private Repository**.

> ⚠️ **ATENÇÃO:** Na hora de selecionar a origem (Source), **NÃO cole a URL do repositório manualmente** (isso faria com que o Coolify usasse a origem genérica "Public Repository" e o webhook fall-back via API).

Em vez disso, clique na aba/opção da sua **Integração do GitHub App** (a mesma configurada no projeto FinOmd). 

### 2. Selecionar o Repositório
Na lista de repositórios que a integração do GitHub App tem acesso, pesquise por `VanderOliver-IA/TEAmamos` e selecione-o.

### 3. Configurações de Build
O Coolify detectará automaticamente o Nixpacks. Como o projeto exige uma versão específica do Node para o Next.js, verifique as variáveis de ambiente ou deixe o `nixpacks.toml` já configurado na raiz cuidar disso:
- **Porta (Ports Exposes):** `3000`
- O script de start configurado internamente cuidará de repassar `HOSTNAME=0.0.0.0` para que o proxy do Coolify redirecione corretamente.

### 4. Deploy
Clique em **Deploy**. O painel passará a registrar os acionamentos com a tag `Webhook`, indicando que a integração nativa está operacional. Deploys subsequentes feitos através de `git push` no GitHub serão automáticos e únicos, sem duplicação ou gargalos.

---

## 📄 Versionamento

Seguimos a Norma VibeDoCode. Para logs completos de atualização, consulte `atualizaçoes do projeto.md` e o Guardião de Contexto no `allchat-site.md`.
