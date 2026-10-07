import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header';
import CategoryTabs from './components/Tabs/CategoryTabs';
import DatePicker from './components/DatePicker/DatePicker';
import { PriceCTA, ChatBubble } from './components/FloatingCTA/FloatingCTA';
import Footer from './components/Footer/Footer';
import GamingGadgets from './pages/GamingGadgets';

export default function App() {
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState('');
  const [dates, setDates] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const toastTimer = useRef();

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  }, []);

  // Header slides away on scroll down and returns on scroll up (tab bar stays pinned).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 120 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.compact = compact;
  }, [compact]);

  const addToCart = useCallback((product) => {
    setCartCount((c) => c + 1);
    notify(`${product.name} added to cart`);
  }, [notify]);

  return (
    <>
      <div className={`top ${compact ? 'is-compact' : ''}`}>
        <Header query={query} onQueryChange={setQuery} cartCount={cartCount} dates={dates} onOpenDates={() => setDateOpen(true)} onNotify={notify} />
        <CategoryTabs onUnavailable={(t) => notify(`${t} isn't part of this demo — Gaming is`)} />
      </div>

      <GamingGadgets query={query} onQueryChange={setQuery} dates={dates} onNeedDates={() => setDateOpen(true)} onAddToCart={addToCart} />
      <Footer />

      <DatePicker
        open={dateOpen}
        dates={dates}
        onApply={(d) => { setDates(d); setDateOpen(false); notify('Prices updated for your dates'); }}
        onClear={() => { setDates(null); setDateOpen(false); }}
        onClose={() => setDateOpen(false)}
      />
      {!dates && <PriceCTA onClick={() => setDateOpen(true)} />}
      <ChatBubble />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
