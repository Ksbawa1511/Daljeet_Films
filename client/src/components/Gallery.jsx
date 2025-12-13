import { useState } from 'react';

export default function Gallery({ images = [], title = 'Gallery' }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{title}</p>
        <h3>Recent plates & pours</h3>
        <p className="muted">Highlights from Food Lens shoots.</p>
      </div>

      <div className="gallery-slider">
        <button className="gallery-arrow" type="button" aria-label="Previous image" onClick={prev}>
          ←
        </button>

        <figure className="gallery-frame">
          <img src={`/${images[index]}`} alt={`${title} sample ${index + 1}`} loading="lazy" />
          <figcaption className="gallery-caption">
            Shot {index + 1} of {images.length}
          </figcaption>
        </figure>

        <button className="gallery-arrow" type="button" aria-label="Next image" onClick={next}>
          →
        </button>
      </div>
    </section>
  );
}

