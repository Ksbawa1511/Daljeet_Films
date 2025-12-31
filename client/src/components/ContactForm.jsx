import { useState } from 'react';

export default function ContactForm({ services = [], apiBase }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: services[0] || '', message: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
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
      setStatus({ type: 'success', message: 'Submitted! We will reach out shortly.' });
      setForm({ name: '', email: '', phone: '', service: services[0] || '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="section" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="service">Service</label>
          <select id="service" name="service" value={form.service} onChange={handleChange} required>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us about the project</label>
        <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required />
      </div>
      <button className="cta" type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send message'}
      </button>
      {status && <div className={`card ${status.type === 'error' ? 'error' : ''}`}>{status.message}</div>}
    </form>
  );
}


