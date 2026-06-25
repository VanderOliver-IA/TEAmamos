# Atualizaçoes do projeto

- V1.00.12: Preparação da camada Supabase com cliente server-side, schema SQL versionado em `supabase/schema.sql`, rota `/api/colaborar` integrada com fallback automático para SQLite e documentação de variáveis de ambiente.
- V1.00.11: Refinamento estratégico da landing com nome TEAmamos em texto real nos textos corridos, nova frase de impacto no Hero, bloco emocional antes do formulário, FAQ mais convidativo e destaque visual das etapas 01 e 02 do roadmap.
- V1.00.10: Quebra de cache das imagens da logo no Next.js adicionando o sufixo `_v2` aos arquivos PNG, garantindo que as novas versões sem fundo xadrez sejam carregadas imediatamente no navegador do cliente sem retenção pelo `node_modules/.cache/images`.
- V1.00.09: Atualização das imagens PNG oficiais sem fundo xadrez e restauração da variação "square" do logo no componente Hero.
- V1.00.08: Restauração da variável `HOSTNAME=0.0.0.0` no script `start` em conjunto com `next start -p 3000` para garantir que o contêiner Next.js se conecte corretamente ao Traefik, resolvendo de vez o erro "no available server".
- V1.00.07: Remoção do `output: "standalone"` do Next.js e restauração do script `next start`. O standalone sem copiar a pasta `public` no ambiente Docker/Nixpacks causava erro 502/No available server no Traefik.
- V1.00.06: Correção de erro `EBUSY` no build do Nixpacks substituindo `npm ci` por `npm install` no arquivo `nixpacks.toml` para evitar conflito com montagem de cache do Docker.
- V1.00.05: Atualização do README.md com informações completas do projeto, stack tecnológico e instruções detalhadas de como realizar o deploy no Coolify utilizando a integração nativa GitHub App.
- V1.00.04: Correção do tamanho das imagens responsivas (BrandLogo) e reversão do logo do Hero para a versão em ícone, evitando que os PNGs com fundo xadrez fiquem gigantes e quebrem o layout.
- V1.00.03: Correção do start standalone em produção para forçar `HOSTNAME=0.0.0.0`, permitindo o roteamento correto pelo proxy do Coolify.
- V1.00.02: Reforço de marca com uso dos assets oficiais, favicon atualizado com `logo_icone_TEAmamos.png`, hero com `logo_quadrado_TEAmamos.png`, logos verticais/textuais aplicados na interface, remoção do fundo xadrez dos PNGs públicos e start de produção alinhado ao standalone do Next.js.
- V1.00.01: Correção da configuração de deploy no Coolify/Nixpacks para usar Node 22.13.0, compatível com Next.js 16.2.9, inclusão da versão visível no rodapé e ajustes de lint.
- V1.00.00: Versão base do site TEAmamos com landing page institucional, formulário de colaboração e persistência local em SQLite.
