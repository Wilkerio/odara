## Objetivo
Trocar as 6 imagens atuais do carrossel do Hero (`showcase-1` a `showcase-6`) pelas fotos enviadas, mantendo layout, animações e textos intactos.

## Mapeamento proposto (tema → imagem enviada)

| # | Slide (tema) | Imagem enviada |
|---|---|---|
| 1 | Middle Market | `image-5.png` (escritório/aço industrial) |
| 2 | Credit → Capital | `image.png` (cristais/minerais preciosos) |
| 3 | Baselines | `image-4.png` (grupo diverso — pilar People) |
| 4 | Bespoke Solutions | `image-2.png` (mãos unidas — parceria) |
| 5 | Hands-on Structure | `image-6.png` (engenheiros/refinaria) |
| 6 | Innovation | `image-7.png` (solda/faíscas — precisão técnica) |

`image-3.png` (macaco) fica de fora por não casar tematicamente com nenhum slide.

## Passos técnicos
1. Fazer upload das 6 imagens via `lovable-assets create` a partir de `/mnt/user-uploads/` (evita adicionar binários ao repo).
2. Escrever os 6 `.asset.json` em `src/assets/` com nomes descritivos (ex.: `hero-1-middle-market.png.asset.json`).
3. Atualizar `src/components/HeroSection.tsx` e `src/components/ShowcaseSection.tsx` para importar os novos pointers e usar `.url` no `<img src>`.
4. Remover os arquivos antigos `showcase-1..6-*.png` de `src/assets/` (ficam órfãos após a troca).
5. Verificar build.

## Confirmação
Se o mapeamento estiver ok, aprove e eu executo. Se quiser trocar alguma imagem de posição, me diga o novo mapeamento.