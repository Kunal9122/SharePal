export default function Logo({ variant = 'tab' }) {
  return (
    <a href="/" className={`logo logo--${variant}`} aria-label="SharePal home">
      <span>Share</span><span className="logo__pal">Pal</span>
    </a>
  );
}
