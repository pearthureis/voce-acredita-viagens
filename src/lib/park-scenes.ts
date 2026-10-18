/**
 * Plano das cenas de vídeo em #parques.
 *
 * Hoje a home usa só os cards. Quando os WebM tiverem canal alfa de verdade
 * (VP9 + alpha, fundo transparente — não preto pintado):
 * 1. Troque os arquivos em src/videos/ pelos stems abaixo (prefira .webm).
 * 2. Passe PARK_SCENES_ENABLED para true.
 * 3. Em src/pages/index.astro, importe ParkScenes e renderize no lugar do grid.
 * 4. initParkScroll já observa [data-park-scene]. ScrollTrigger (pin/scrub)
 *    só entra com arquivos leves; não scrubar 1080p quadro a quadro.
 */
export const PARK_SCENES_ENABLED = false;

export const parks = [
  {
    title: 'Orlando',
    text: 'A capital da magia: resorts, gastronomia e dias inesquecíveis em família.',
  },
  {
    title: 'Disney',
    text: 'Magic Kingdom, EPCOT, Hollywood Studios e Animal Kingdom com roteiro sob medida.',
  },
  {
    title: 'Universal',
    text: 'Todos os parques roterizados para que consiga conhecer todos!.',
  },
  {
    title: 'E mais...',
    text: 'Muitos outros parques e atrações nos EUA.',
  },
];

export const parkScenePlan = [
  {
    kind: 'castle',
    title: 'Disney',
    text: 'Magic Kingdom, EPCOT, Hollywood Studios e Animal Kingdom com roteiro sob medida.',
    stem: 'Manter_vídeo_castelo_fogos_1080p_20261018124903',
    label: 'Castelo com fogos no Magic Kingdom',
  },
  {
    kind: 'globe',
    title: 'Universal',
    text: 'Todos os parques roterizados para que consiga conhecer todos!.',
    stem: 'universal',
    label: 'Globo da Universal Studios',
  },
  {
    kind: 'whale',
    title: 'E mais...',
    text: 'Muitos outros parques e atrações nos EUA.',
    stem: 'Orca_breaching_animation_sequence_1080p_20261018125016',
    label: 'Baleia saltando na água',
  },
] as const;
