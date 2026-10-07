# SharePal – Gaming Gadgets on Rent (Bangalore) · Frontend Recreation

React + Vite recreation of https://sharepal.in/bangalore/gaming-gadgets-on-rent, built from a screen recording of the live page and the supplied `product-list.json` (23 products).

## Features
- Purple header with blue logo tab, Bangalore selector, Delivery/Pickup date pill, search, cart, login; header hides on scroll-down and returns on scroll-up while the category tab bar stays pinned
- Sticky left category rail (All, PS5 Console, Game Combos, Racing Wheel, PS Portal – derived from the product list), purple hero banner, "Total items" bar
- 4-column product grid: outlined Trending/New tags, heart wishlist on hover, price hidden ("Select Dates to view price") until rental dates are chosen, circular + add button, out-of-stock state, "Vote to Launch" voting
- Date picker (delivery/pickup) → prices recalculate as per-day rent × days; floating "Select rental dates to view prices" pill; chat bubble
- "Earn With Us" promo after the 8th product, "Showing 12 of N results" + Show More, header search, empty state, loading skeleton
- Accordion FAQ ("View more FAQ's"), Google-style review marquee, stats, breadcrumb, full navy footer (category directory, SEO copy with Read More, link columns, social, Go up)
- Responsive (rail becomes a horizontal strip, 2-column grid, compact header) and accessible (semantic landmarks, Esc to close, focus styles, reduced motion)

## Stack
React 18, Vite 5, lucide-react. Plain CSS; design tokens in `:root` of `src/index.css`.

## Run
```bash
npm install
npm run dev
npm run build && npm run preview
```

## Deploy (Vercel)
Framework preset **Vite**. `vercel.json` rewrites all routes to `index.html`. No environment variables.

## Notes / limitations
- Colours, layout and copy were taken from the recording; exact CSS values were sampled/estimated, not read from DevTools.
- Hero/promo artwork (characters, drones) is not reproduced; CSS gradients and product images stand in. Hover mega-menus on the tabs, product detail pages, login and real cart are not implemented (Photography/Outdoor/Entertainment tabs show a notice).
- FAQ answers, the ending of some reviews, and the extra "Read More" sentence were not visible in the recording and are placeholders.
- Left-rail categories use the supplied products (the live site's GTA VI / Xbox / VR items are not in the JSON).
- Screenshots and live demo link are not added yet.
