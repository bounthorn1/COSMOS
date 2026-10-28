/**
 * COSMOS wordmark — an orbiting glyph + type.
 * Pure SVG so it inherits currentColor and scales crisply.
 */
export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg
        className="logo-mark"
        viewBox="0 0 64 64"
        width="34"
        height="34"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="32" cy="32" r="7.5" fill="currentColor" />
        <ellipse
          cx="32"
          cy="32"
          rx="25"
          ry="10.5"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.6"
          transform="rotate(-18 32 32)"
        />
        <circle cx="51.5" cy="23.5" r="3.6" fill="var(--accent)" />
      </svg>
      <span className="logo-word">COSMOS</span>
    </span>
  )
}
