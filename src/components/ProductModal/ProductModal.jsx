import { useEffect, useRef, useState } from 'react';
import { X, Minus, Plus, Star } from 'lucide-react';
import { formatRupees } from '../../data/products';

const DAY_PRESETS = [1, 3, 7, 15, 30];
const clamp = (n) => Math.min(60, Math.max(1, n));

export default function ProductModal({ product, initialDays = 3, onClose, onAddToCart }) {
  const [days, setDays] = useState(initialDays);
  const closeRef = useRef(null);
  const comingSoon = product.tag === 'Vote to Launch';

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button ref={closeRef} className="icon-btn modal__close" aria-label="Close" onClick={onClose}><X size={20} /></button>
        <img src={product.image} alt={product.name} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
        <div className="modal__content">
          <h2>{product.name}</h2>
          {product.hasRating && <span className="rating"><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)}</span>}
          <p className="booked">{product.booked_count.toLocaleString('en-IN')} {comingSoon ? 'votes' : 'bookings'}</p>

          <div className="days">
            <span id="days-label">Rental period</span>
            <div className="days__presets" role="group" aria-labelledby="days-label">
              {DAY_PRESETS.map((d) => (
                <button key={d} className={`chip ${days === d ? 'is-active' : ''}`} onClick={() => setDays(d)}>{d} day{d > 1 ? 's' : ''}</button>
              ))}
            </div>
            <div className="stepper">
              <button aria-label="Decrease days" onClick={() => setDays((d) => clamp(d - 1))}><Minus size={16} /></button>
              <output aria-live="polite">{days} day{days > 1 ? 's' : ''}</output>
              <button aria-label="Increase days" onClick={() => setDays((d) => clamp(d + 1))}><Plus size={16} /></button>
            </div>
          </div>

          <div className="modal__total">
            <span>{formatRupees(product.per_day_rent)} × {days} day{days > 1 ? 's' : ''}</span>
            <strong>{formatRupees(product.per_day_rent * days)}</strong>
          </div>
          <button
            className="btn btn--primary btn--block"
            disabled={product.out_of_stock || comingSoon}
            onClick={() => { onAddToCart(product); onClose(); }}
          >
            {product.out_of_stock ? 'Currently unavailable' : comingSoon ? 'Coming soon' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
