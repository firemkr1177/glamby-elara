import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

type Stat = { num: number; sup: string; label: string };

/** "8+ / 500+ / 100%" row. Numbers count up as they arrive. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <ul className="stats">
      {items.map((s, i) => (
        <Reveal as="li" key={s.label} delay={i * 0.1}>
          <span className="stats__num">
            <Counter to={s.num} delay={0.15 + i * 0.1} />
            <sup>{s.sup}</sup>
          </span>
          <span className="stats__label">{s.label}</span>
        </Reveal>
      ))}
    </ul>
  );
}
