import { memo, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { formatRupees } from '../../data/products';

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='#fff'/><text x='200' y='205' font-family='Arial' font-size='18' text-anchor='middle' fill='#9aa0a6'>Image unavailable</text></svg>"
  );

const tagClass = (tag) => `tag tag--${tag.toLowerCase().replace(/\s+/g, '-')}`;

function ProductCard({ product, days, liked, onLike, onSelect, onAdd, priority }) {
  const [src, setSrc] = useState(product.image);
  const [voted, setVoted] = useState(false);
  const comingSoon = product.tag === 'Vote to Launch';
  const total = days ? product.per_day_rent * days : null;

  return (
    <article className={`card ${product.out_of_stock ? 'is-oos' : ''}`}>
      <div className="card__tile">
        {product.tag && <span className={tagClass(product.tag)}>{product.tag}</span>}
        <button className={`heart ${liked ? 'is-liked' : ''}`} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={liked} onClick={() => onLike(product.id)}>
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button className="card__img" onClick={() => onSelect(product)} aria-label={`View ${product.name}`}>
          <img src={src} alt={product.name} width="300" height="300" loading={priority ? 'eager' : 'lazy'} onError={() => setSrc(FALLBACK_IMG)} />
        </button>
        {product.out_of_stock && <span className="card__oos">Out of stock</span>}
      </div>

      <h3 className="card__title"><button onClick={() => onSelect(product)} title={product.name}>{product.name}</button></h3>

      <div className="card__foot">
        {total ? (
          <p className="price"><strong>{formatRupees(total)}</strong><span>for {days} day{days > 1 ? 's' : ''}</span></p>
        ) : (
          <p className="price price--locked">Select Dates to view price<span className="blur" aria-hidden="true">₹ 12,34</span></p>
        )}
        {comingSoon ? (
          <button className={`vote ${voted ? 'is-voted' : ''}`} aria-pressed={voted} onClick={() => setVoted((v) => !v)}>
            {voted ? 'Voted ✓' : 'Vote'}
          </button>
        ) : (
          <button className="add" aria-label={`Add ${product.name} to cart`} disabled={product.out_of_stock} onClick={() => onAdd(product)}>
            <Plus size={22} />
          </button>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
