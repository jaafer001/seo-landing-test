# SEO Landing Page

Landing page built from the Figma file `Test_SEOLanding` (desktop frame, 1440px).

**Stack:** HTML, CSS, vanilla JavaScript + [GSAP](https://gsap.com/) and its ScrollTrigger plugin (loaded from cdnjs).

## Structure

```
index.html      Page markup (semantic sections, SVG sprite for icons/logo)
css/style.css   Design tokens, layout, hover/click states, responsive rules
js/main.js      Mobile menu, pricing switch, testimonial slider, form, GSAP animations
```

## What is covered (checklist from the brief)

- **Scroll animations:** hero intro on load, fade/slide/scale on scroll (`data-anim`, `data-stagger` attributes), counter (35%), chart drawing.
- **Transitions and micro-interactions:** buttons (hover/active), nav underline, cards lifting, portfolio overlay, pricing switch, testimonial arrows, form focus/validation, social icons.
- **Responsive:** fluid layout with breakpoints at 1100px (tablet), 900px (mobile menu + stacked sections) and 640px (phone).
- **Pixel perfect:** colors, font sizes, line heights, spacing and section sizes come from the Figma styles; the exact values are reached at 1440px.
- **Fonts:** DM Sans and Roboto, preconnect + non-blocking preload + `font-display: swap`, a metric-adjusted fallback font, and animations that wait for `document.fonts.ready`.

## Decisions to know about

- Images and logos are grey placeholder blocks (allowed by the brief).
- The Figma only shows one pricing state; it is treated as "Annual", and the "Monthly" prices are invented.
- Two extra testimonials were added so the slider arrows do something.
- Animations are disabled for users with `prefers-reduced-motion`.
- If GSAP fails to load, everything stays visible (no hidden content).

## Run locally

Open `index.html` in a browser (needs an internet connection for the fonts and GSAP CDN).

## Deploy

- **Netlify:** drag the project folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repo, then Settings → Pages → deploy from the `main` branch, root folder.
- **Vercel:** import the repo, framework preset "Other".
# seo-landing-test
