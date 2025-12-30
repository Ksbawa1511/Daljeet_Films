import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Brand from './pages/Brand.jsx';
import Studios from './pages/Studios.jsx';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('daljeet-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [hero, setHero] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('daljeet-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/brands`);
        if (!res.ok) {
          throw new Error('Failed to load content');
        }
        const data = await res.json();
        setHero(data.hero);
        setBrands(data.brands);
      } catch (err) {
        console.error(err);
        setError('Unable to load site content right now.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const services = useMemo(() => brands.map((b) => b.name), [brands]);
  const marqueeItems = useMemo(
    () => [
      'Films production',
      'Weddings cinema',
      'Food lens',
      'Turbo shots',
      'Storyboarding',
      'Lighting & grip',
      'Edit & color',
      'Sound design',
    ],
    [],
  );

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const [isNavOpen, setIsNavOpen] = useState(false);
  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      <div className="site-header-bar">
        <header className="site-header">
          <div className="logo brand-with-icon">
            <span role="img" aria-label="logo">
              🎬
            </span>
            <span>Daljeet Films Production</span>
          </div>
          <nav className={`nav-links ${isNavOpen ? 'open' : ''}`}>
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
            <Link to="/studios" onClick={closeNav}>
              Studios
            </Link>
            <Link to="/contact" onClick={closeNav}>
              Contact
            </Link>
          </nav>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen((v) => !v)}
          >
            ☰
          </button>
          <div className="nav-actions">
            <button className="theme-toggle icon-toggle" onClick={toggleTheme} type="button" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>
      </div>

      {brands.length > 0 && (
        <div className="nav-tabs-bar">
          <div className="nav-tabs" aria-label="Studios tabs">
            <Link className="nav-tab" to="/studios">
              All studios
            </Link>
            {brands.map((brand) => (
              <Link key={brand.slug} className="nav-tab" to={`/brand/${brand.slug}`}>
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="page">
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  hero={hero}
                  marqueeItems={marqueeItems}
                  loading={loading}
                  error={error}
                  brands={brands}
                />
              }
            />
            <Route path="/brand/:slug" element={<Brand apiBase={API_BASE} />} />
            <Route path="/contact" element={<Contact services={services} apiBase={API_BASE} />} />
            <Route
              path="/studios"
              element={
                <Studios brands={brands} loading={loading} error={error} marqueeItems={marqueeItems} />
              }
            />
          </Routes>
        </main>
      </div>

      <footer className="site-footer-bar">
        <div className="site-footer">
          <div className="footer-brand">
            <div className="logo small">Daljeet Films Production</div>
            <p className="muted">Cinematic production across film, weddings, food, and social.</p>
          </div>

          <div className="footer-columns">
            <div>
              <p className="footer-title">Navigate</p>
              <Link to="/">Home</Link>
              <Link to="/studios">Studios</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div>
              <p className="footer-title">Studios</p>
              <span className="muted">Daljeet Films</span>
              <span className="muted">Daljeet Weddings</span>
              <span className="muted">Daljeet Food Lens</span>
              <span className="muted">Daljeet Turbo Shots</span>
            </div>
            <div>
              <p className="footer-title">Contact</p>
              <a href="mailto:daljeetbawa12@gmail.com">daljeetbawa12@gmail.com</a>
              <a href="tel:+14377992260">+1 (437) 799-2260</a>
              <Link to="/contact">Book a call</Link>
            </div>
            <div>
              <p className="footer-title">Follow</p>
              <a href="https://www.instagram.com/daljeets_films?igsh=MTlpcDk0cnZ2amdsaA==">
                Instagram (Films)
              </a>
              <a href="https://www.instagram.com/daljeets_weddings?igsh=MWNwNmlrbmFzZGVqYQ==">
                Instagram (Weddings)
              </a>
              <a href="https://www.youtube.com/channel/UC9G_x8h0bm7CSeIM0B6zFkw">
                YouTube
              </a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="muted">© 2025 Daljeet Films Production. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

