# yoppi.in

YOPPI — Experiences for a Brighter Tomorrow.

A static marketing site (no build step, no backend) served from GitHub Pages at
[yoppi.in](https://yoppi.in).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, the four dimensions of development, the four audiences |
| `offerings.html` | All offerings, tabbed by audience (`#schools`, `#colleges`, `#young-firms`, `#gccs`) |
| `contact.html` | Contact details and an enquiry form that hands off to WhatsApp or email |

Each audience tab is deep-linkable, so `offerings.html#gccs` opens straight on
that panel — use those links when sending the site to a specific prospect.

## Structure

```
assets/css/   base.css (tokens) · components.css (nav, cards, footer, forms)
              home.css · offerings.css · contact.css
assets/js/    main.js (nav, reveal, year) · offerings.js (tabs) · contact.js (enquiry)
assets/images/yoppi-icon.png (brand mark, 1024px) + 512/180 sizes
```

Colours for the four pillars — growth, wellness, connection, exposure — are CSS
custom properties in `base.css`. Any block can adopt a pillar palette with
`data-pillar="wellness"`, which sets `--pillar`, `--pillar-soft` and
`--pillar-tint` for everything inside it.

## Contact

WhatsApp +91 86709 90985 · +91 89794 84758 · founder@yoppi.in
