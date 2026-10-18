const HEADER_OFFSET = 72;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function attachSource(video: HTMLVideoElement) {
  if (video.src || !video.dataset.src) return;
  video.src = video.dataset.src;
  video.load();
}

async function playVideo(video: HTMLVideoElement) {
  attachSource(video);
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  try {
    await video.play();
  } catch {
    /* autoplay pode esperar o próximo gesto */
  }
}

function pauseVideo(video: HTMLVideoElement) {
  if (!video.paused) video.pause();
}

/**
 * Liga play/pause quando a cena entra na tela.
 * Não faz scrub do currentTime (isso trava WebM 1080p).
 * Pin/scrub com ScrollTrigger só com arquivos leves e alfa nativo.
 */
export function initParkScroll() {
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-park-scene]'));
  if (!scenes.length) return;

  const reduced = prefersReducedMotion();

  const warm = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const video = entry.target.querySelector<HTMLVideoElement>('video');
        if (video) attachSource(video);
      }
    },
    { rootMargin: '80% 0px' },
  );

  const playObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target.querySelector<HTMLVideoElement>('video');
        if (!video) continue;
        if (entry.isIntersecting && !reduced) {
          void playVideo(video);
        } else {
          pauseVideo(video);
        }
      }
    },
    {
      threshold: 0.4,
      rootMargin: `-${HEADER_OFFSET}px 0px -10% 0px`,
    },
  );

  scenes.forEach((scene) => {
    warm.observe(scene);
    playObserver.observe(scene);
  });
}
