import BrandCard from '../components/BrandCard.jsx';

export default function Studios({ brands = [], loading, error, marqueeItems = [] }) {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Studios</p>
        <h2>Find the right crew for your project</h2>
        <p className="muted">
          Four focused teams across film, weddings, food visuals, and turbo-fast social content.
        </p>
      </div>

      {marqueeItems?.length ? (
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {loading && <div className="card grid-span">Loading studios...</div>}
      {error && <div className="card error">{error}</div>}

      <div className="brand-grid">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} {...brand} />
        ))}
      </div>
    </section>
  );
}

