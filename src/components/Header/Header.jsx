import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronDown, CalendarDays, CalendarPlus, Search, ShoppingCart, User, X } from 'lucide-react';
import Logo from '../Logo/Logo';
import { formatDay } from '../../data/products';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi/NCR', 'Hyderabad', 'Chennai'];

export default function Header({ query, onQueryChange, cartCount, dates, onOpenDates, onNotify }) {
  const [city, setCity] = useState('Bangalore');
  const [cityOpen, setCityOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cityRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => cityRef.current && !cityRef.current.contains(e.target) && setCityOpen(false);
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  return (
    <header className="header">
      <div className="header__bar">
        <Logo />

        <div className="locbar" role="group" aria-label="Location and rental dates">
          <div className="locbar__city" ref={cityRef}>
            <button aria-haspopup="listbox" aria-expanded={cityOpen} onClick={() => setCityOpen((o) => !o)}>
              <MapPin size={18} /> <span>{city}</span> <ChevronDown size={16} />
            </button>
            {cityOpen && (
              <ul role="listbox" aria-label="City">
                {CITIES.map((c) => (
                  <li key={c} role="option" aria-selected={c === city}>
                    <button onClick={() => { setCity(c); setCityOpen(false); if (c !== 'Bangalore') onNotify(`Showing Bangalore catalogue for ${c} in this demo`); }}>{c}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="locbar__date" onClick={onOpenDates}><CalendarDays size={17} /> {dates ? formatDay(dates.from) : <>Delivery<span className="lbl-x"> Date</span></>}</button>
          <button className="locbar__date" onClick={onOpenDates}><CalendarDays size={17} /> {dates ? formatDay(dates.to) : <>Pickup<span className="lbl-x"> Date</span></>}</button>
          <button className="locbar__select" onClick={onOpenDates}><CalendarPlus size={17} /> Select</button>
        </div>

        <div className="header__actions">
          <button className="hbtn" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}><Search size={24} /></button>
          <button className="hbtn cart" aria-label={`Cart, ${cartCount} items`} onClick={() => onNotify(cartCount ? `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart` : 'Your cart is empty')}>
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart__count">{cartCount}</span>}
          </button>
          <button className="login" onClick={() => onNotify('Login is not available in this demo')}>
            <span className="login__avatar"><User size={22} /></span>
            <span className="login__text">Hi, Login</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="searchbar">
          <Search size={18} aria-hidden="true" />
          <input ref={inputRef} type="search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search PS5, controllers, games…" aria-label="Search products" />
          <button aria-label="Close search" onClick={() => { setSearchOpen(false); onQueryChange(''); }}><X size={18} /></button>
        </div>
      )}
    </header>
  );
}
