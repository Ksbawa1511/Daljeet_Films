import { Link } from 'react-router-dom';

export default function Hero({ title, subtitle, ctaLabel, ctaHref = '/contact' }) {
  return (
    <section className="hero">
      <p className="eyebrow">Daljeet Films Production</p>
      <h1>{title}</h1>
      <p className="muted">{subtitle}</p>
      <Link className="cta" to={ctaHref}>
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

