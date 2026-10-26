/**
 * Confeti de celebración (página de gracias) en un `<canvas>`, sin librerías: dos ráfagas desde
 * las esquinas de abajo con los colores de la marca. Corre una vez (~4 s), no bloquea clics y se
 * borra al terminar. Con "reducir movimiento" no se lanza.
 */
const COLORS = ["#ffc66d", "#3ccf7a", "#2A9DF4", "#7B5CF0", "#D97757", "#eceef1"];
const DURATION_MS = 4200;
const GRAVITY = 0.32;
const DRAG = 0.985;

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  /** Fase del "aleteo": hace que cada papelito se vea girar en 3D. */
  wobble: number;
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

  // Menos papelitos en celular para que no se sature la pantalla ni el procesador.
  const perBurst = width < 640 ? 70 : 130;
  const burst = (originX: number, direction: 1 | -1): Piece[] =>
    Array.from({ length: perBurst }, () => {
      const angle = (-Math.PI / 2) + direction * (Math.PI / 9 + Math.random() * (Math.PI / 4));
      const speed = 11 + Math.random() * 11;
      return {
        x: originX,
        y: height + 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * (height / 800 + 0.35),
        size: 6 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.3,
        wobble: Math.random() * Math.PI * 2,
        round: Math.random() < 0.25,
      };
    });
  const pieces = [...burst(width * 0.08, 1), ...burst(width * 0.92, -1)];

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
      const drag = DRAG ** dt;
      piece.vx *= drag;
      piece.vy = piece.vy * drag + GRAVITY * dt;
      piece.x += piece.vx * dt;
      piece.y += piece.vy * dt;
      piece.rotation += piece.spin * dt;
      piece.wobble += 0.12 * dt;
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
