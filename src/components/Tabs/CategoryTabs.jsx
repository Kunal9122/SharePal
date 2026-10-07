const TABS = ['Photography', 'Gaming', 'Outdoor', 'Entertainment'];

export default function CategoryTabs({ active = 'Gaming', onUnavailable }) {
  return (
    <nav className="tabs" aria-label="Rental categories">
      <ul>
        {TABS.map((t) => (
          <li key={t}>
            <button
              className={t === active ? 'is-active' : ''}
              aria-current={t === active ? 'page' : undefined}
              onClick={() => t !== active && onUnavailable(t)}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
