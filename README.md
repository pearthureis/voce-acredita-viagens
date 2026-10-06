# Você Acredita Viagens

Landing page + blog da **Você Acredita Viagens** (Astro).  
A loja real (hotéis, ingressos, experiências) fica na Just Travel Tour — os CTAs abrem em nova aba.

- Site: https://www.vcacreditaviagens.com.br/
- Loja: https://voceacreditaviagensv2.justtraveltour.com/pt
- Instagram: https://www.instagram.com/voceacreditaviagens/

## Stack

- [Astro](https://astro.build/) (TypeScript, content collections Markdown)
- CSS com variáveis da marca (sem Tailwind)
- Fontes Google: **Libre Baskerville** (texto) + **Great Vibes** (acento cursivo)

### Tipografia (fallback)

A identidade visual cita a fonte **Magic** (script). Como não é gratuita/distribuível via Google Fonts, usamos **Great Vibes** como fallback público. Se no futuro a Magic for licenciada, basta trocar o `family` no `BaseLayout.astro` e a variável `--font-script` em `src/styles/global.css`.

## Cores da marca

| Nome   | Hex       |
|--------|-----------|
| Rosa   | `#FDACAB` |
| Coral  | `#FF7171` |
| Branco | `#FFFFFF` |
| Vermelho | `#F63734` |
| Texto  | `#1A1A1A` |

Assets em `public/brand/`.

## Desenvolvimento

Requisito: **Node.js ≥ 22.12**.

```bash
npm install
npm run dev
```

Abra http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

Saída estática em `dist/`.

## Conteúdo do blog

Posts em `src/content/blog/*.md` com frontmatter:

```yaml
title: "..."
description: "..."
pubDate: 2026-03-15
author: "Ellen Reis"
tags: ["Orlando"]
```

Schema em `src/content.config.ts`.

## Deploy (Vercel)

1. Importe o repositório no [Vercel](https://vercel.com/).
2. Framework preset: **Astro** (build: `npm run build`, output: `dist`).
3. Conecte o domínio `vcacreditaviagens.com.br` (ou o que preferir) nas DNS settings.
4. Não é necessário adapter serverless — o site é estático.

Alternativa: Netlify com o mesmo comando de build e publish directory `dist`.

## Estrutura

- `/` — landing (hero, parques, como funciona, serviços, sobre Ellen, teaser do blog)
- `/blog` — lista de posts
- `/blog/[slug]` — post + CTA loja
- `/contato` — WhatsApp, e-mail, endereço

## Contato

- Ellen Reis
- Rua Antonio Ambuba, 32 — São Paulo
- vc.acreditaconsultoria@gmail.com
- (11) 99458-4598 · [wa.me/5511994584598](https://wa.me/5511994584598)
