import { Fragment } from 'react';
import { SearchX } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import PromoBanner from '../PromoBanner/PromoBanner';

const PROMO_AFTER = 8;

export default function ProductGrid({ products, loading, days, liked, onLike, onSelect, onAdd, onReset }) {
  if (loading) {
    return (
      <div className="grid" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }, (_, i) => (
          <div className="card skeleton" key={i}><div className="skeleton__img" /><div className="skeleton__line" /><div className="skeleton__line short" /></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty" role="status">
        <SearchX size={44} />
        <h3>No gaming gadgets match your search</h3>
        <p>Try a different keyword or pick another category.</p>
        <button className="btn-outline" onClick={onReset}>Reset search</button>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map((p, i) => (
        <Fragment key={p.id}>
          {i === PROMO_AFTER && <PromoBanner />}
          <ProductCard product={p} days={days} liked={liked.has(p.id)} onLike={onLike} onSelect={onSelect} onAdd={onAdd} priority={i < 4} />
        </Fragment>
      ))}
    </div>
  );
}
