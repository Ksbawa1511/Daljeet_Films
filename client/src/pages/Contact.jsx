import { useSearchParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact({ services, apiBase }) {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service') || '';

  return (
    <section className="section contact">
      <div className="section-header">
        <p className="eyebrow">Contact</p>
        <h2>Tell us about your project</h2>
        <p className="muted">We respond within one business day.</p>
      </div>

      <ContactForm apiBase={apiBase} services={services} initialService={requestedService} />
    </section>
  );
}

