import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';

export default function Brand({ apiBase }) {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiBase}/api/brands/${slug}`);
        if (!res.ok) {
          throw new Error('Brand not found');
        }
        const data = await res.json();
        setBrand(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [apiBase, slug]);

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Studio</p>
        <h2>{brand?.name || 'Loading studio...'}</h2>
        {brand?.tagline && <p className="muted">{brand.tagline}</p>}
      </div>

      {loading && <div className="card">Loading...</div>}
      {error && <div className="card error">{error}</div>}

      {brand && (
        <div className="card">
          <div className="badge">{brand.tagline}</div>
          <h3>{brand.name}</h3>
          <p className="muted">{brand.description}</p>
          <ul className="service-list">
            {brand.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <p className="highlight">{brand.highlight}</p>

          <div className="brand-actions">
            <Link className="cta" to={`/contact?service=${encodeURIComponent(brand.name)}`}>
              Book this studio
            </Link>
          </div>
        </div>
      )}

      {brand?.gallery?.length ? <Gallery images={brand.gallery} /> : null}
    </section>
  );
}

