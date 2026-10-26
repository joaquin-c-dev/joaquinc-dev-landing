/**
 * Confeti de celebración (página de gracias) en un `<canvas>`, sin librerías: lluvia de papelitos
 * desde arriba, a todo lo ancho, con los colores de la marca. Corre una vez (~5 s), no bloquea
 * clics y se borra al terminar. Con "reducir movimiento" no se lanza.
 */
const COLORS = ["#ffc66d", "#3ccf7a", "#2A9DF4", "#7B5CF0", "#D97757", "#eceef1"];
const DURATION_MS = 5500;
/** Caen acelerando hasta una velocidad máxima, como papel (no como piedra). */
const GRAVITY = 0.06;
const MAX_FALL_SPEED = 6.5;

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  /** Fase del "aleteo": hace que cada papelito se vea girar en 3D y se mece de lado a lado. */
  wobble: number;
  sway: number;
  round: boolean;
}

export function launchConfetti(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:70";
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  if (!context) return canvas.remove();

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.scale(ratio, ratio);

  // Menos papelitos en celular para que no se sature la pantalla ni el procesador. Empiezan a
  // distintas alturas sobre la pantalla para que caigan escalonados, no todos de golpe.
  const count = width < 640 ? 120 : 220;
  const pieces: Piece[] = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.6,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 2.5 + Math.random() * 3,
    size: 6 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.2,
    wobble: Math.random() * Math.PI * 2,
    sway: 0.6 + Math.random() * 1.2,
    round: Math.random() < 0.25,
  }));

  const start = performance.now();
  let last = start;
  const frame = (now: number) => {
    const elapsed = now - start;
    // Física por tiempo (no por cuadro): se ve igual en pantallas de 60 y de 120 Hz.
    const dt = Math.min((now - last) / (1000 / 60), 3);
    last = now;
    // Se desvanece en el último segundo.
    const fade = Math.min(1, (DURATION_MS - elapsed) / 1000);
    context.clearRect(0, 0, width, height);
    for (const piece of pieces) {
      piece.vy = Math.min(piece.vy + GRAVITY * dt, MAX_FALL_SPEED);
      piece.x += (piece.vx + Math.sin(piece.wobble) * piece.sway) * dt;
      piece.y += piece.vy * dt;
      piece.rotation += piece.spin * dt;
      piece.wobble += 0.08 * dt;
      context.save();
      context.globalAlpha = Math.max(0, fade);
      context.translate(piece.x, piece.y);
      context.rotate(piece.rotation);
      context.scale(1, Math.cos(piece.wobble));
      context.fillStyle = piece.color;
      if (piece.round) {
        context.beginPath();
        context.arc(0, 0, piece.size / 2.4, 0, Math.PI * 2);
        context.fill();
      } else {
        context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
      }
      context.restore();
    }
    if (elapsed < DURATION_MS) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
