export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`wordmark ${compact ? "wordmark-compact" : ""}`}>
      <span>Swanky Balloon Co.</span>
      <small>NASHVILLE, TENNESSEE</small>
    </span>
  );
}
export function BrandSeal() {
  return (
    <div className="brand-seal" aria-hidden="true">
      <span>SWANKY BALLOON CO.</span>
      <strong>
        S<span>B</span>
        <i>C</i>
      </strong>
      <span>CUSTOM INSTALLATIONS</span>
    </div>
  );
}
