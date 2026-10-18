# AGENTS.md — Você Acredita Viagens

## O site
Site da **Você Acredita Viagens**, agência da **Ellen Reis** especializada em Orlando (Disney e Universal) para famílias brasileiras.
- Instagram: [@voceacreditaviagens](https://www.instagram.com/voceacreditaviagens/)
- Slogan: *Experiências mágicas, memórias eternas*
- Tom: acolhedor, claro e prático. Nunca corporativo. Textos em pt-BR.
- Loja (reservas): https://voceacreditaviagensv2.justtraveltour.com/pt. A constante `shopUrl` aparece em Header, Footer, ShopCTA, `index.astro` e `contato.astro`: se mudar, troque em todos.

## Stack
- Astro (site estático), Node 22.
- `npm install`, `npm run dev` (local), `npm run build` (gera `dist/`), `npm run preview`.

## Deploy
- Todo push na `main` faz deploy automático na Vercel: https://voce-acredita-viagens.vercel.app (leva ~1 min).
- Domínio `vcacreditaviagens.com.br`: DNS ainda pendente (nameservers devem apontar pra Vercel).

## Onde fica cada coisa
- `src/pages/index.astro`: home. Seções: hero (botões Ir à loja / Falar conosco / Blog), `#parques`, `#como-funciona`, `#servicos`, `#sobre` (Ellen), `#blog`.
- `src/pages/contato.astro`: página de contato.
- `src/pages/blog/index.astro`: lista de posts. `src/pages/blog/[slug].astro`: template do post (H1, capa, CSS de `.prose`).
- `src/components/`: `Header.astro` (logo + botão de tema), `Footer.astro`, `ShopCTA.astro`.
- `src/layouts/BaseLayout.astro`: `<head>`, favicons, script que aplica o tema.
- `src/styles/global.css`: paleta e tokens (variáveis CSS), estilos globais.
- `src/lib/format.ts`: formatação de data pt-BR.
- `src/content.config.ts`: schema da coleção `blog`.
- `public/brand/`: logos, foto da Ellen (`ellen-reis.jpg`), paleta.
- `public/blog/`: imagens dos posts.

## Regras de design
- Cores da marca em variáveis CSS no `:root` de `global.css`: `--red` #f63734, `--coral` #ff7171, `--pink` #fdacab. Use as variáveis/tokens, não cores soltas.
- Paleta escura em `:root[data-theme="dark"]`.
- Modo claro é o padrão. O escuro só liga pelo botão do header e fica salvo no `localStorage`. **Não reintroduzir `prefers-color-scheme`.**
- Favicons usam `?v=N` no BaseLayout para furar cache: ao trocar o ícone, suba o número.

## Blog
- Posts chegam como `.md` e vão em `src/content/blog/`. **Slug = nome do arquivo.**
- Frontmatter:
  ```yaml
  title: "Título SEO"          # <title>
  heading: "H1 da página"      # opcional; senão usa title
  description: "Meta description"
  pubDate: 2026-10-16
  author: "Ellen Reis"         # padrão
  tags: ["Orlando", "Disney"]
  heroImage: "/blog/arquivo.jpg"  # opcional, capa no topo
  ```
- O corpo começa abaixo do H1 do arquivo original (o H1 vai em `heading`). Linhas de metadados SEO do arquivo não entram no corpo.
- Imagens em `public/blog/...`, otimizadas (~1600px de largura máx., < 300 KB, JPG/WebP), com alt descritivo.
- Não incluir lista de fontes.

## Colaboração
- Outros agentes (Grok Bot) também fazem commit aqui: **sempre `git pull --rebase` antes de editar.**
- Faça só o que foi pedido, sem retrabalho.
- Rode `npm run build` sem erros antes de dar push.
