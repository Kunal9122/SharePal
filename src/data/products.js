import raw from './product-list.json';

const parseControllers = (name) => {
  const match = name.match(/(\d)\s*Controllers?/i);
  return match ? Number(match[1]) : null;
};

/** Normalised product list derived from the supplied SharePal JSON. */
export const products = raw.products.map((p) => ({
  ...p,
  tag: p.tag || null,
  hasRating: p.rating > 0,
  controllers: parseControllers(p.name),
}));

const byId = (id) => products.find((p) => p.id === id);
const isGameCombo = (p) => /FC\d\d|Digital Game|All in one|EA Play|\(100\+\)/i.test(p.name);

/** Left-rail categories, derived from the product list (icon = a representative product image). */
export const CATEGORIES = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'ps5', label: 'PS5 Console', icon: byId(8185)?.image, match: (p) => /^PS5/i.test(p.name) && !/Racing/i.test(p.name) },
  { id: 'games', label: 'Game Combos', icon: byId(36028)?.image, match: isGameCombo },
  { id: 'wheel', label: 'Racing Wheel', icon: byId(20224)?.image, match: (p) => /Racing/i.test(p.name) },
  { id: 'portal', label: 'PS Portal', icon: byId(37616)?.image, match: (p) => /Portal/i.test(p.name) },
];

export const formatRupees = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });

export const formatDay = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

/** Whole days between two ISO dates (minimum 1). */
export const rentalDays = (from, to) =>
  Math.max(1, Math.round((new Date(to) - new Date(from)) / 86400000));
