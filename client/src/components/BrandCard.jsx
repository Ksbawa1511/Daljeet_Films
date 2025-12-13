import { Link } from 'react-router-dom';

export default function BrandCard({ slug, name, tagline, description, services, highlight }) {
  return (
    <article className="card">
      <span className="badge">{tagline}</span>
      <h3>{name}</h3>
      <p className="muted">{description}</p>
      <ul className="service-list">
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <p className="highlight">{highlight}</p>
      <Link className="text-link" to={`/brand/${slug}`}>
        View studio →
      </Link>
    </article>
  );
}

