import { Link } from 'react-router-dom';

export default function CTAButtons() {
  return (
    <div className="cta-row">
      <Link className="nav-cta" to="/studios">
        Explore studios
      </Link>
      <Link className="text-link" to="/contact">
        Book a call →
      </Link>
    </div>
  );
}

