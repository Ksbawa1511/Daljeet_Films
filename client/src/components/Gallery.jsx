export default function Gallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {images.map((src) => (
          <div key={src} className="gallery-item">
            <img src={`/${src}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

