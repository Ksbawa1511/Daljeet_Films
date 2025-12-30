import { Link } from 'react-router-dom';

export default function CTAButtons() {
  return (
    <div className="cta-buttons">
      <Link className="cta" to="/contact">
        Book a call
      </Link>
      <a className="cta" href="tel:+14377992260">
        Call +1 (437) 799-2260
      </a>
    </div>
  );
}

