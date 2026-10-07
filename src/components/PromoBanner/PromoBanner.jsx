import { ArrowUpRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <aside className="promo" aria-label="Earn with SharePal">
      <p>Got gear you <u>dont use anymore?</u></p>
      <h3>Rent Out Your Gear on SharePal</h3>
      <a className="btn-lime" href="https://earnwithus.sharepal.in" target="_blank" rel="noreferrer">
        Earn With Us <ArrowUpRight size={18} />
      </a>
    </aside>
  );
}
