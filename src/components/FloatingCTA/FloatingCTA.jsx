import { CalendarPlus, MessageCircle } from 'lucide-react';

export function PriceCTA({ onClick }) {
  return (
    <button className="cta" onClick={onClick}>
      <CalendarPlus size={18} /> Select rental dates to view prices
    </button>
  );
}

export function ChatBubble() {
  return (
    <a className="chat" href="mailto:care@sharepal.in" aria-label="Chat with SharePal support">
      <span className="chat__b chat__b--g" />
      <span className="chat__b chat__b--b"><MessageCircle size={22} fill="currentColor" /></span>
    </a>
  );
}
