import { useState } from 'react';
import { ChevronUp, ChevronDown, Headphones, Mail, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';
import Logo from '../Logo/Logo';

const DIRECTORY = [
  { title: 'Action Cameras', links: ['Action Cameras', 'Pocket Cameras', 'GoPro Cameras', 'DJI Cameras', 'DJI Drones', '360 Cameras'] },
  { title: 'Cameras', links: ['DSLR Cameras', 'Cameras', 'iPhones', 'DSLR Gimbal Combos', 'Wildlife Photography', 'Tripod and camera accessories'] },
  { title: 'Trekking Gear', links: ['Trekking Gear', 'Trekking Jackets', 'Trek/Snow Pants', 'Trekking Shoes', 'Trek Accessories'] },
  { title: 'Riding Gear', links: ['Riding Gear', 'Riding Luggage', 'Riding Jackets', 'Riding Essentials', 'Riding Boots', 'Binoculars'] },
  { title: 'Creator Gear', links: ['Wireless & Collar Mics', 'Professional Cameras', 'Mirrorless Cameras', 'UNLMTD Vlogging', 'Mobile Gimbals', 'Vlogging'] },
  { title: 'Gaming Console', links: ['PS5 Console', 'VR', 'Racing Wheel', 'Big Screen Gaming', 'Xbox Console'] },
  { title: 'Winter Wear', links: ['Snow Boots', 'Winter Jackets', 'Backpacks'] },
  { title: 'Camping Gear', links: ['Camping Gear', 'Camping Stools & Tables', 'Camping Tents', 'Sleeping Bags & Mats'] },
  { title: 'Audio Visual Equipment', links: ['Projectors', 'VR', 'Mics', 'Speakers'] },
];

const COLUMNS = [
  { title: 'Sharepal', links: ['About', 'Why SharePal', 'Sitemap', 'CarePal'] },
  { title: 'Become a Pal', links: ['Sharepal for Creators', 'Careers', 'Sharepal for Brands', { label: 'Asset Funding Program', badge: 'New' }, { label: 'Rent Your Gear', badge: 'New' }] },
  { title: 'Information', links: ['How it works?', 'FAQs', 'Verification', 'Cancellation Policy', 'Life at Sharepal'] },
  { title: 'Policies', links: ['Terms & Condition', 'Shipping policy', 'Damage Policy', 'Terms of Use', 'Privacy Policy'] },
];

export default function Footer() {
  const [more, setMore] = useState(false);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="dir">
          {DIRECTORY.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>{c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </nav>
          ))}
        </div>

        <section className="seo">
          <h4><a href="#">Renting from SharePal in Bangalore</a></h4>
          <p>
            Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs. Whether you're exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.
          </p>
          <h4>Categories on Rent</h4>
          <h5><a href="#">Action Cameras on Rent</a></h5>
          <p>
            Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we've got you covered.
            {more && ' Every camera ships with the mounts and memory you need, so you can start recording the moment it arrives.'}
          </p>
          <button className="seo__more" onClick={() => setMore((m) => !m)} aria-expanded={more}>
            {more ? 'Read Less' : 'Read More'} <ChevronDown size={14} className={more ? 'rot' : ''} />
          </button>
        </section>

        <div className="fmain">
          <div className="fmain__logo"><Logo variant="plain" /></div>
          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => {
                  const item = typeof l === 'string' ? { label: l } : l;
                  return <li key={item.label}><a href="#">{item.label}</a>{item.badge && <span className="new">{item.badge}</span>}</li>;
                })}
              </ul>
            </nav>
          ))}
          <nav aria-label="Need Help">
            <h3>Need Help</h3>
            <ul>
              <li><a href="#"><Headphones size={15} /> Contact Support</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="mailto:care@sharepal.in"><Mail size={15} /> care@sharepal.in</a></li>
            </ul>
            <div className="social">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </nav>
        </div>

        <div className="fbar">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Go up <ChevronUp size={15} /></button>
          <span>© {new Date().getFullYear()}, SWNAC E-Kiraya Services Pvt Ltd</span>
          <span>Made with <Heart size={14} fill="currentColor" className="heart-ico" /> for India</span>
        </div>
      </div>
    </footer>
  );
}
