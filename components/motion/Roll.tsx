/** Pill label that rolls up to a duplicate of itself on hover (pure CSS, see motion.css). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-text={children}>{children}</span>
    </span>
  );
}
