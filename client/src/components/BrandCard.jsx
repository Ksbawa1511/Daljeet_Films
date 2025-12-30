import { Link } from 'react-router-dom';

export default function BrandCard({ brand }) {
  return (
    <div className="card">
      <div className="badge">{brand.tagline}</div>
      <h3>{brand.name}</h3>
      <p className="muted">{brand.description}</p>
      <ul className="service-list">
        {brand.services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="highlight">{brand.highlight}</p>
      <div className="brand-actions">
        <Link className="cta" to={`/brand/${brand.slug}`}>
          View studio →
        </Link>
      </div>
    </div>
  );
}

