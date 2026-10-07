import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
            {i < items.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
