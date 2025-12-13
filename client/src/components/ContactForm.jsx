import { useEffect, useState } from 'react';

export default function ContactForm({ apiBase, services, initialService = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || services[0] || '',
    message: '',
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    const validInitial = services.includes(initialService) ? initialService : services[0] || '';
    if (!form.service && validInitial) {
      setForm((prev) => ({ ...prev, service: validInitial }));
    }
  }, [services, form.service, initialService]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send');
      }
      setStatus({ state: 'success', message: 'We received your request!' });
      setForm({ name: '', email: '', phone: '', service: services[0] || '', message: '' });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 234 567 8900"
          inputMode="tel"
        />
      </div>
      <div>
        <label htmlFor="service">Service</label>
        <select id="service" name="service" value={form.service} onChange={handleChange} required>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      <div className="full">
        <label htmlFor="message">Project details</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Timeline, budget, links..."
        />
      </div>
      <div className="full">
        <button type="submit" disabled={status.state === 'loading'}>
          {status.state === 'loading' ? 'Sending...' : 'Send request'}
        </button>
        {status.message && <div className="feedback">{status.message}</div>}
      </div>
    </form>
  );
}

