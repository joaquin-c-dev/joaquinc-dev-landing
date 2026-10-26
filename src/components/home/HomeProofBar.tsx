import { HOME_CONTAINER, HOME_MUTED, reveal } from "./home-theme";

interface HomeProofBarProps {
  rating: number;
  reviewCount: number;
  courseCount: number;
}

/**
 * Número que cuenta desde 0 al entrar en pantalla. El HTML ya trae el valor final (así se
 * lee sin JavaScript y sin "reducir movimiento"); `home-reveal.ts` lo anima con `data-count-to`.
 */
const CountUp = ({ value, decimals = 0 }: { value: number; decimals?: number }) => (
  <span data-count-to={value} data-count-decimals={decimals}>
    {value.toFixed(decimals)}
  </span>
);

/** Barra de pruebas: cuatro datos cortos que responden "¿por qué confiar?". */
const HomeProofBar = ({ rating, reviewCount, courseCount }: HomeProofBarProps) => {
  const stats = [
    { value: <>+<CountUp value={10} /></>, label: "años en backend Java" },
    { value: <><CountUp value={rating} decimals={1} />★</>, label: `promedio de ${reviewCount} reseñas` },
    { value: <><CountUp value={100} />%</>, label: "en vivo, nada pregrabado" },
    { value: <CountUp value={courseCount} />, label: "cursos y talleres" },
  ];
  return (
    <section aria-label="Datos de la academia" className="border-y border-white/[0.07] bg-[#0e1014]">
      <dl className={`${HOME_CONTAINER} grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12`}>
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            {...reveal(index * 70)}
            className="flex flex-col-reverse gap-1 px-2 md:border-l md:border-white/[0.07] md:px-6 md:first:border-l-0"
          >
            <dt className={`text-[13.5px] ${HOME_MUTED}`}>{stat.label}</dt>
            <dd className="text-[clamp(30px,3.6vw,42px)] font-bold tabular-nums tracking-[-0.03em] text-white">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default HomeProofBar;
