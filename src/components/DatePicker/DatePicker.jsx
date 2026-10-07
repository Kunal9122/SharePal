import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (iso, n) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export default function DatePicker({ open, dates, onApply, onClear, onClose }) {
  const [from, setFrom] = useState(dates?.from || '');
  const [to, setTo] = useState(dates?.to || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setFrom(dates?.from || '');
      setTo(dates?.to || '');
      setError('');
    }
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dates, onClose]);

  if (!open) return null;

  const apply = () => {
    if (!from || !to) return setError('Please choose both delivery and pickup dates.');
    if (to <= from) return setError('Pickup date must be after the delivery date.');
    onApply({ from, to });
  };

  return (
    <div className="dp" role="dialog" aria-modal="true" aria-label="Select rental dates">
      <div className="dp__backdrop" onClick={onClose} />
      <div className="dp__panel">
        <div className="dp__head">
          <h2>Select rental dates</h2>
          <button className="icon-btn" aria-label="Close" onClick={onClose}><X size={20} /></button>
        </div>
        <label>Delivery date
          <input type="date" min={today()} value={from} onChange={(e) => { setFrom(e.target.value); if (to && to <= e.target.value) setTo(addDays(e.target.value, 1)); }} />
        </label>
        <label>Pickup date
          <input type="date" min={from ? addDays(from, 1) : today()} value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        {error && <p className="dp__error" role="alert">{error}</p>}
        <div className="dp__actions">
          {dates && <button className="btn-outline" onClick={onClear}>Clear</button>}
          <button className="btn-dark" onClick={apply}>View prices</button>
        </div>
      </div>
    </div>
  );
}
