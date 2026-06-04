/**
 * Decorative blue lightning flashes over the white page background.
 * Respects prefers-reduced-motion via CSS in globals.css.
 */
export function LightningBackground() {
  return (
    <div className="lightning-bg" aria-hidden="true">
      <svg className="lightning-bolt lightning-bolt-1" viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M72 0L38 118h32L28 280l78-142h-36L72 0z"
          fill="currentColor"
        />
      </svg>
      <svg className="lightning-bolt lightning-bolt-2" viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M58 0L32 95h26L22 240l62-115H48L58 0z"
          fill="currentColor"
        />
      </svg>
      <svg className="lightning-bolt lightning-bolt-3" viewBox="0 0 90 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M52 0L30 72h22L18 200l52-98H38L52 0z"
          fill="currentColor"
        />
      </svg>
      <svg className="lightning-bolt lightning-bolt-4" viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M46 0L26 68h18L14 180l48-88H34L46 0z"
          fill="currentColor"
        />
      </svg>
      <div className="lightning-glow lightning-glow-1" />
      <div className="lightning-glow lightning-glow-2" />
    </div>
  );
}
