import Breadcrumb from '../Breadcrumb/Breadcrumb';

const REVIEWS = [
  { name: 'Afrana', meta: 'Bangalore • Gaming Console', text: 'Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and a console.' },
  { name: 'Kanthikiran', meta: 'Bangalore • Riding Gear', text: "It's an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive." },
  { name: 'Amal', meta: 'Bangalore • Gaming Console', text: "I am a regular customer and order ps4. It's very affordable and booking an order is super easy and user friendly website and polite staff." },
  { name: 'Pankaj', meta: 'Mumbai • Action Camera', text: 'The experience with share pal was awesome. The camera, service and delivery by them is good. Overall I am happy renting camera gear from them.' },
  { name: 'Satyaki', meta: 'Kolkata • Trekking Gear', text: 'I would highly recommend SharePal for anyone looking to rent trekking gears, quick delivery, condition of products were very good, super helpful team.' },
];
const STATS = [
  { value: '250Cr', suffix: '+', label: 'Saved Together' },
  { value: '4.5M Kg', suffix: '', label: 'CO₂E Emissions Saved' },
  { value: '100K', suffix: '+', label: 'Products In Circulation' },
];

const Review = ({ r }) => (
  <li className="review">
    <div className="review__stars"><span className="g">G</span>{'★★★★★'}</div>
    <p>“ {r.text} ”</p>
    <div className="review__who">
      <span className="review__av">{r.name.slice(0, 2).toUpperCase()}</span>
      <div><strong>{r.name}</strong><small>{r.meta}</small></div>
    </div>
  </li>
);

export default function Testimonials() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Bangalore', href: '#' }, { label: 'Gaming gadgets on rent' }]} />
      <section className="proof" aria-labelledby="proof-title">
        <h2 id="proof-title">Served more than <span>1 Lakh Orders</span></h2>
        <div className="marquee">
          <ul className="marquee__track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => <Review key={i} r={r} />)}
          </ul>
        </div>
        <dl className="stats">
          {STATS.map((s) => (
            <div key={s.label}><dt>{s.value}<b>{s.suffix}</b></dt><dd>{s.label}</dd></div>
          ))}
        </dl>
      </section>
    </>
  );
}
