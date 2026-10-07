import { useEffect, useMemo, useState } from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import CategoryRail from '../components/CategoryRail/CategoryRail';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import ProductModal from '../components/ProductModal/ProductModal';
import FAQ from '../components/FAQ/FAQ';
import Testimonials from '../components/Testimonials/Testimonials';
import { products, CATEGORIES, rentalDays } from '../data/products';

const PAGE_SIZE = 12;

export default function GamingGadgets({ query, onQueryChange, dates, onNeedDates, onAddToCart }) {
  const [category, setCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [liked, setLiked] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Brief skeleton on first paint (data is local, so this is purely perceptual).
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => setVisibleCount(PAGE_SIZE), [category, query]);

  const days = dates ? rentalDays(dates.from, dates.to) : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cat = CATEGORIES.find((c) => c.id === category);
    return products.filter((p) => cat.match(p) && (!q || p.name.toLowerCase().includes(q)));
  }, [query, category]);

  const shown = filtered.slice(0, visibleCount);

  const toggleLike = (id) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleAdd = (product) => (dates ? onAddToCart(product) : onNeedDates());

  return (
    <main className="page">
      <CategoryRail categories={CATEGORIES} active={category} onSelect={setCategory} />

      <div className="page__main">
        <HeroBanner />
        <div className="titlebar">
          <h1>Gaming Gadgets On Rent</h1>
          <p>Total items: <strong>{filtered.length} items</strong></p>
        </div>

        <ProductGrid
          products={shown} loading={loading} days={days} liked={liked}
          onLike={toggleLike} onSelect={setSelected} onAdd={handleAdd}
          onReset={() => { onQueryChange(''); setCategory('all'); }}
        />

        {!loading && filtered.length > 0 && (
          <div className="more">
            <p>Showing {shown.length} of {filtered.length} results</p>
            {shown.length < filtered.length && (
              <button className="btn-outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>Show More</button>
            )}
          </div>
        )}
      </div>

      <div className="page__wide">
        <FAQ />
        <Testimonials />
      </div>

      {selected && (
        <ProductModal product={selected} initialDays={days || 3} onClose={() => setSelected(null)} onAddToCart={(p) => (dates ? onAddToCart(p) : (setSelected(null), onNeedDates()))} />
      )}
    </main>
  );
}
