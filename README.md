# Ikiru — ikiru.com.au

Static site for a holistic-therapy practice. Plain HTML/CSS/JS, no build step.

## Preview locally

Open `index.html` directly in a browser, or serve the folder so relative
links behave exactly as they will in production:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Hero image

The homepage hero is built around `assets/NS_HOMEPAGEBANNER_v2.4.jpg` — a
wide (~3.2:1) momiji banner, near-black on the left with soft bokeh, lit
maple leaves on the right. Two scrims sit over it: a horizontal one holding
the headline legible across the dark left (it also tames the bright bokeh in
the lower-left corner, which is the real contrast risk), and a vertical one
settling the banner into the page below. The scrims are plum-tinted, which
warms the maple's reds toward rose. Because the image is far wider than the
hero box, `cover` crops from the left — which costs nothing, since that
region is near-black anyway.

If the file is renamed, update the two `url(...)` references in the `.hero`
rules in `css/styles.css` (desktop and the `max-width: 900px` variant).

## Placeholder imagery

Three SVG placeholders stand in for real photography. They are on-brand
abstract compositions rather than grey boxes, so the layout reads as
finished — but they are placeholders and should be replaced:

| File | Used on | Replace with |
|---|---|---|
| `assets/placeholder-portrait.svg` | About (4:5) | A portrait of the therapist |
| `assets/placeholder-treatment.svg` | Home (3:2) | The treatment room, or hands at work |
| `assets/placeholder-stillness.svg` | Services, Philosophy (3:2) | A detail of the space |

Swap the `src` and keep the aspect ratio; both `.split__media img` and
`.figure-wide img` use `object-fit: cover`, so a real photo will crop
gracefully.

## Required before going live

- **The practitioner's name.** The About page says "Meet your therapist" and
  then never says who. For a solo practice the name is the brand — this is
  the single highest-impact missing piece.
- **Location.** No suburb, address, or service area appears anywhere. For a
  local hands-on practice this is the first question a visitor has.
- **Credentials.** Dry needling and cupping are regulated in Australia. No
  AHPRA registration, association membership, or qualification is listed.
- **Session length and price.** Currently unanswered.
- **Contact form** — `contact.html` posts to a placeholder Formspree
  endpoint (`https://formspree.io/f/REPLACE_ME`). Create a free form at
  https://formspree.io and replace that URL.
- **Phone, email, hours** — placeholders `(02) 0000 0000`,
  `hello@ikiru.com.au`, and "Monday to Friday, 9am – 5pm" appear in the
  footer of every page and on the Contact page.
- **`og:url` values** assume the site is served from `https://ikiru.com.au/`.
- Consider `LocalBusiness` / `MedicalBusiness` structured data once the name,
  address, and hours are real — it matters for local search.

## Design system

The page is split into two registers. The **dark chrome** — header, hero,
footer — belongs to the momiji photograph: charcoal ground with ember and
amber, so the leaves in the banner read true. The **light content region**
carries the feminine voice: blush white with a dusty rose accent, delicate
type and generous air. Neither is decorated with the other's palette.

- **Colour** — chrome is charcoal (`#15120E`, footer `#0E0C09`) with ember
  (`#C1401C`) and amber (`#D98F2B`). Content is blush white (`#FDF8F6`) with
  rose (`#A8455D`). Amber is the accent on dark, rose on light; ember is a
  button fill only, never text — it is 3.6:1 on the dark ground and fails AA.
- **Type** — Cormorant Garamond at light weights for display (it shares the
  thick/thin modulation of a Japanese Mincho face, so it still rhymes with
  the original reference, but its hairlines are far finer), Mulish for body,
  on a 1.25 scale via the `--step-*` custom properties.
- **Light and dark regions** — the page alternates a dark banner/title band
  with a light content region. `.content` re-points a set of contextual
  tokens (`--fg`, `--accent`, `--rule`, `--glass-bg` …), so every component
  adapts to its surroundings with no override selectors and no specificity
  conflicts. To add a light section, wrap it in `.content`.
- **Alignment** — `.container` and `.site-header__inner` share the same
  `--container` (1140px) and `--gutter` (28px), so every content edge lines
  up with the navigation above it. Text sits flush in the container rather
  than inside padded panels, which is what keeps that alignment visible.
- **Glass** — frosted panels (service cards, contact cards, the fixed header)
  over ambient gradient washes, so the blur always has something to refract.
  Degrades to solid panels via `@supports not (backdrop-filter: ...)`.
- **Motion** — one orchestrated arrival on the hero only; everything else is
  hover/focus feedback. Fully disabled under `prefers-reduced-motion`.

## Structure

- `index.html`, `about.html`, `services.html`, `philosophy.html`, `contact.html`
- `css/styles.css` — all styles, shared across pages
- `js/main.js` — mobile nav toggle + header scroll state
- `assets/` — banner photograph and placeholder imagery

## Design spec

See `docs/superpowers/specs/2026-09-08-ikiru-website-design.md` for the
original design rationale. Note the palette, typography, and layout have all
moved on considerably since it was written.
