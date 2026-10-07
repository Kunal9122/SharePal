import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How can I rent from SharePal?', a: 'Pick your product, choose the delivery and pickup dates to see the price, add it to your cart and complete checkout. We deliver to your doorstep and collect it when the rental ends.' },
  { q: 'If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?', a: 'Partial extension is possible. You can extend the rental for individual products by contacting support before the rental ends.' },
  { q: 'When does the rental start?', a: 'The rental starts on the delivery date you select, and the product is picked up on your chosen pickup date.' },
  { q: 'What will be the condition of the products at the time of delivery?', a: 'Every product is tested, cleaned and sanitised before it is dispatched, so it reaches you in working, hygienic condition.' },
  { q: 'Why is verification required?', a: 'A quick verification keeps the renting community safe and secure for both customers and product owners.' },
  { q: 'Is there a security deposit?', a: 'SharePal advertises zero deposit on most products. Final terms are shown at checkout.' },
  { q: 'Can I rent a PS5 for a weekend?', a: 'Yes. Choose any delivery and pickup dates, from a single day to several weeks.' },
];
const INITIAL = 5;

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? FAQS : FAQS.slice(0, INITIAL);

  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently Asked Questions (FAQs)</h2>
      <ul>
        {list.map(({ q, a }, i) => (
          <li key={q}>
            <h3>
              <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                <span>{q}</span><ChevronDown size={18} className={open === i ? 'rot' : ''} />
              </button>
            </h3>
            <div id={`faq-${i}`} className={`faq__a ${open === i ? 'is-open' : ''}`}><p>{a}</p></div>
          </li>
        ))}
      </ul>
      {!showAll && <button className="faq__more" onClick={() => setShowAll(true)}>View more FAQ's</button>}
    </section>
  );
}
