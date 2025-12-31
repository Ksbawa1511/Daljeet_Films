import BrandCard from '../components/BrandCard.jsx';

export default function Studios({ brands, loading, error, marqueeItems }) {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Studios</p>
        <h2>All teams</h2>
        <p className="muted">Four specialties for film, weddings, food, and social content.</p>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, index) => (
            <span className="marquee-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {loading && <div className="card">Loading...</div>}
      {error && <div className="card error">{error}</div>}
      {!loading && !error && (
        <div className="studios-grid">
          {brands.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      )}
    </section>
  );
}


