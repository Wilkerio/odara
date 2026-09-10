---
name: lumnis-visual-identity
description: Apply Lumnis Capital Partners' visual identity and institutional-trust guardrails when creating or editing any design, copy, or UI in this repo — pages, sections, colors, typography, imagery, claims, legal/contact info. Trigger whenever a task touches src/components, src/pages, src/lib/i18n.ts, or asks to "improve the visual", "melhorar o visual", "deixar mais bonito/profissional", or add new sections/marketing content.
---

# Identidade visual e institucional — Lumnis Capital Partners

Lumnis é uma boutique de securitização de crédito internacional (Luxemburgo + Brasil),
mirando **contrapartes profissionais/institucionais**, não varejo. Todo ajuste visual ou
de conteúdo precisa reforçar **seriedade, solidez e confiabilidade de negócio financeiro
global** — nunca parecer "startup", nunca soar exagerado ou não-verificável.

## 1. Paleta de cor (extraída do código, não inventar tons novos)

| Papel | HSL | Uso |
|---|---|---|
| Navy profundo (primária) | `hsl(218,100%,8-22%)` | Fundos escuros, títulos de seção, headings, ícones institucionais |
| Navy de destaque | `hsl(218,100%,45-65%)` | Links, hover, labels uppercase, foco de input |
| Indigo/slate (CTA) | `hsl(232,25%,56%)` (hover `48%`) | Botões de ação primária (submit, CTAs) |
| Creme/marfim (fundo claro) | `hsl(36,18%,96%)` | Fundo de seções claras, texto sobre fundo escuro |
| Bege neutro | `hsl(36,3%,40-52%)` | Texto secundário/legendas sobre fundo claro |
| Dourado/âmbar (aviso) | `hsl(37,45%,61%)` | **Só** para mensagens de erro/validação — não usar como cor decorativa |
| Preto quase puro | `hsl(0,0%,5-10%)` | Texto principal, fundos ultra-escuros (footer, ticker) |

Regra: escuro+navy = seções "prova/autoridade" (Hero, Contact, Insights bg escuro);
claro+creme = seções "conteúdo/leitura" (About, Team, Guarantees). Não misturar tons
fora dessa tabela — a paleta inteira do site já é essa, é pequena de propósito.

## 2. Tipografia

- **Cormorant Garamond** (serif, `font-light`) → todo heading (`h1`–`h3`), números de
  destaque (métricas), citações. Transmite tradição/prestígio — nunca usar bold pesado nela.
- **DM Sans** (sans, `font-light`/`font-normal`) → corpo de texto, labels, botões, formulário.
- Labels/eyebrows sempre `uppercase`, `tracking-[0.2em]` a `[0.35em]`, tamanho pequeno
  (`0.6-0.7rem`) — é a assinatura visual do site (rótulo fininho antes de cada título).

## 3. Padrões de interação já estabelecidos

- `useReveal()` hook + classes `.reveal`/`.reveal-delay-N` para entrada de seção no scroll.
- `framer-motion` para transições de card/hover (`whileInView`, `whileHover`, delays escalonados por índice `i * 0.1`ish).
- Overlay `mix-blend-color` com `hsl(232,25%,56%)` sobre fotos (grayscale → cor no hover) —
  é o tratamento de imagem padrão do site inteiro (Team, Guarantees, People). Manter esse
  tratamento em qualquer imagem nova, não deixar foto "crua".
- i18n: todo texto novo visível vai em `src/lib/i18n.ts`, replicado nas 4 chaves de idioma
  (pt/en/es/fr) — nunca hardcodar string de UI direto no componente.

## 4. Guardrails de confiança (lições da auditoria pré-lançamento — não repetir)

Isso pesa mais que estética. Antes de adicionar/alterar qualquer seção "de prova social"
ou claim institucional:

- **Nunca** citar nome de instituição real (banco, regulador, agência de rating) implicando
  afiliação/endosso sem o disclaimer padrão já usado em `PartnersSection` ("uso apenas
  informativo, não implica afiliação, endosso ou parceria" — replicar esse texto, não
  inventar um mais fraco).
- **Nunca** exibir métrica dura (AUM, nº de transações, rating) sem nota de data/fonte
  visível perto do número. Se não for verificável, não incluir.
- **Nunca** fabricar timestamp, data ou fonte de "notícia"/"insight" — se o conteúdo vem
  de terceiro, atribuir de verdade e usar a data real do artigo.
- Contato/legal: um único e-mail canônico por finalidade, mesmo domínio em toda parte
  (site, Terms, Privacy). Antes de escrever um novo e-mail/endereço, grep o repo pelos
  já existentes e reusar — não criar variação nova.
- Terms/Privacy: qualquer edição precisa citar a entidade real (Lumnis Capital Partners
  SPV, Luxemburgo) — nunca deixar texto de template de outra empresa sem substituir 100%.
- Formulários: todo campo precisa estar de fato ligado a estado + envio real (edge
  function). Nunca deixar um "TODO: wire submission" morrendo em produção — se não dá
  pra terminar a integração agora, não subir o form como se funcionasse.
- Consentimento (LGPD/GDPR): checkbox de marketing/opcional nunca pode ser obrigatório
  pra completar uma ação básica (enviar contato, etc).

## 5. Tom de voz (copy)

Formal, preciso, sem hype. Frases curtas, vocabulário técnico do setor (securitização,
tranches, compartimentos, contrapartes profissionais) usado com naturalidade — é sinal
de autenticidade pro público-alvo (family offices, instituições, assessores). Evitar
superlativos vazios ("o melhor", "líder mundial") sem contexto/dado por trás.

## 6. Checklist de saída

Antes de considerar uma mudança visual/de conteúdo pronta:
1. Cores/fontes batem com a tabela acima?
2. Texto novo está nas 4 línguas do `i18n.ts`?
3. Algum claim novo (número, logo, afiliação) tem disclaimer ou fonte?
4. E-mail/endereço usado é o canônico já existente no site?
5. Se mexeu em formulário: campo tem estado + vai pra algum lugar real?
