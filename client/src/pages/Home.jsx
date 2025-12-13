import { useEffect, useMemo, useState } from 'react';
import Hero from '../components/Hero.jsx';
import CTAButtons from '../components/CTAButtons.jsx';

export default function Home({ hero, marqueeItems, loading, error, brands }) {
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    if (!activeSlug && brands.length) {
      setActiveSlug(brands[0].slug);
    }
  }, [activeSlug, brands]);

  const activeBrand = useMemo(
    () => brands.find((b) => b.slug === activeSlug) || brands[0],
    [activeSlug, brands],
  );

  return (
    <>
      {hero && <Hero {...hero} />}

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, index) => (
            <span className="marquee-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="brands" className="section">
        <div className="section-header">
          <p className="eyebrow">Studios & offerings</p>
          <h2>One production house, four specialized teams</h2>
          <p className="muted">
            Daljeet Films Production leads; each sub-brand focuses on a specific audience and pace,
            so you get crews who know the format and deadline you need.
          </p>
        </div>

        {loading && <div className="card grid-span">Loading...</div>}
        {error && <div className="card error">{error}</div>}

        {!loading && !error && (
          <div className="category-layout">
            <div className="category-list">
              {brands.map((brand) => (
                <button
                  key={brand.slug}
                  type="button"
                  className={`category-item ${activeSlug === brand.slug ? 'active' : ''}`}
                  onClick={() => setActiveSlug(brand.slug)}
                >
                  <div className="category-name">{brand.name}</div>
                  <div className="category-tagline">{brand.tagline}</div>
                </button>
              ))}
            </div>

            {activeBrand && (
              <div className="category-detail card">
                <div className="badge">{activeBrand.tagline}</div>
                <h3>{activeBrand.name}</h3>
                <p className="muted">{activeBrand.description}</p>
                <ul className="service-list">
                  {activeBrand.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <p className="highlight">{activeBrand.highlight}</p>
              </div>
            )}
          </div>
        )}

        <CTAButtons />
      </section>
    </>
  );
}

