import { Smile } from 'lucide-react';

export default function CategoryRail({ categories, active, onSelect }) {
  return (
    <div className="rail-col">
    <aside className="rail" aria-label="Product categories">
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            <button className={active === c.id ? 'is-active' : ''} aria-pressed={active === c.id} onClick={() => onSelect(c.id)}>
              <span className="rail__icon">
                {c.icon ? <img src={c.icon} alt="" loading="lazy" /> : <Smile size={30} strokeWidth={2.2} />}
              </span>
              <span className="rail__label">{c.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
    </div>
  );
}
