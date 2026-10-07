import { products } from '../../data/products';

const art = (id) => products.find((p) => p.id === id)?.image;

export default function HeroBanner() {
  return (
    <section className="hero" aria-label="Gaming consoles">
      <img className="hero__art hero__art--l" src={art(36028)} alt="" />
      <div className="hero__text">
        <h2>Gaming Consoles</h2>
        <p>
          Rent the latest gaming gadgets from <em>SharePal</em> PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </p>
        <ul className="hero__brands" aria-label="Brands">
          <li>XBOX</li><li>PS5</li><li>Meta</li>
        </ul>
      </div>
      <img className="hero__art hero__art--r" src={art(20224)} alt="" />
    </section>
  );
}
