import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const HEADER_OFFSET = 72;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function prepareVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.preload = 'auto';

  if (!video.src && video.dataset.src) {
    video.src = video.dataset.src;
    video.load();
  }

  if (video.readyState < 1) {
    await new Promise<void>((resolve) => {
      const done = () => resolve();
      video.addEventListener('loadedmetadata', done, { once: true });
      video.addEventListener('error', done, { once: true });
    });
  }

  try {
    await video.play();
    video.pause();
  } catch {
    /* iOS pode exigir um gesto; o scrub segue após o unlock */
  }
}

function pinDistance(kind: string) {
  const narrow = window.matchMedia('(max-width: 899px)').matches;
  if (narrow) return kind === 'castle' ? 160 : 130;
  return kind === 'castle' ? 260 : 190;
}

function bindScene(scene: HTMLElement) {
  const pin = scene.querySelector<HTMLElement>('.park-scene-pin');
  const video = scene.querySelector<HTMLVideoElement>('video');
  const copy = scene.querySelector<HTMLElement>('.park-scene-copy');
  const kind = scene.dataset.kind ?? '';
  if (!pin || !video) return;

  const stBase = {
    trigger: scene,
    start: `top ${HEADER_OFFSET}px`,
    end: () => `+=${pinDistance(kind)}%`,
    pin,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: 0.7,
    invalidateOnRefresh: true,
  };

  const tween = gsap.to(video, {
    currentTime: 0,
    ease: 'none',
    paused: true,
    scrollTrigger: {
      ...stBase,
      onEnter: () => void prepareVideo(video),
      onEnterBack: () => void prepareVideo(video),
    },
  });

  const applyDuration = () => {
    if (!video.duration || Number.isNaN(video.duration)) return;
    tween.vars.currentTime = Math.max(video.duration - 0.05, 0.1);
    tween.invalidate();
  };

  if (video.readyState >= 1) applyDuration();
  else video.addEventListener('loadedmetadata', applyDuration, { once: true });

  if (copy) {
    gsap.fromTo(
      copy,
      { autoAlpha: 0.4, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: scene,
          start: `top ${HEADER_OFFSET}px`,
          end: '+=35%',
          scrub: 0.5,
        },
      },
    );
  }

}

export function initParkScroll() {
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-park-scene]'));
  if (!scenes.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const video = entry.target.querySelector<HTMLVideoElement>('video');
        if (video) void prepareVideo(video);
      }
    },
    { rootMargin: '140% 0px' },
  );

  scenes.forEach((scene) => io.observe(scene));

  if (prefersReducedMotion()) {
    scenes.forEach((scene) => {
      const video = scene.querySelector<HTMLVideoElement>('video');
      if (video) void prepareVideo(video);
    });
    return;
  }

  scenes.forEach(bindScene);
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
