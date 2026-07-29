# Media generation prompts for The Plugin

Drop files into `images and visuals/`, then we copy them to `public/media/` with the filenames below.

**Style for all assets:** Premium agency, palette `#F8F6F2` cream, `#1C3557` navy, `#93C5FD` soft blue, minimal UI, no logos, no text, cinematic lighting, 16:9 for video / 3:2 for stills.

---

## Missing videos (assign one file each)

| Save as | Prompt |
|---------|--------|
| `contact-hero.mp4` | Slow cinematic push-in on a premium consultation scene: founder desk, laptop with blurred analytics, warm window light, shallow depth of field, cream and navy tones, calm and trustworthy, loopable 8s. |
| `testimonials.mp4` | Abstract motion of connected nodes and soft light pulses suggesting client trust and growth, minimal, elegant, navy and blue accents on cream, loopable 10s. |
| `pricing-hero.mp4` | Clean motion graphic of ascending bars and a single bold metric line stabilizing, symbolizing transparent pricing, premium fintech aesthetic, no numbers readable, loopable 8s. |
| `resources.mp4` | Digital library aesthetic: floating document cards and checklist icons drifting slowly in 3D space, soft glass morphism, loopable 10s. |
| `blog-hero.mp4` | Editorial motion: ink-like lines forming a growth curve, magazine-quality, cream background, navy strokes, loopable 8s. |
| `cta-block.mp4` | Energetic but refined particle flow converging to center, call-to-action energy without text, blue highlight particles, loopable 6s. |
| `service-performance.jpg` → then we'll add `service-performance.mp4` | Paid media lab: dashboards, ad previews, ROAS motif — **video prompt:** Dynamic ad cards and performance charts animating in a dark navy room, holographic UI, 8s loop. |
| `service-seo.mp4` | Search results and content nodes lighting up in sequence, SEO graph motif, minimal, premium, 8s loop. |
| `service-social.mp4` | Social feed tiles and engagement rings animating smoothly, community growth feel, pastel cream/navy, 8s loop. |
| `service-branding.mp4` | Brand mood boards, typography samples, color swatches floating and aligning, design studio vibe, 8s loop. |
| `service-ai.mp4` | Workflow nodes and automation paths lighting up between app icons, AI orchestration aesthetic, not sci-fi cliché, 8s loop. |

---

## Missing still images (one per slot)

| Save as | Prompt |
|---------|--------|
| `service-performance-still.jpg` | Premium still: laptop showing ad manager dashboard, shallow DOF, cream office, navy UI glow. |
| `service-seo-still.jpg` | SEO analytics on screen, content calendar beside coffee, editorial premium look. |
| `service-social-still.jpg` | Phone with social grid, brand-consistent blue accents, lifestyle business desk. |
| `service-web-still.jpg` | Designer reviewing responsive website mockups on large monitor, clean studio. |
| `service-branding-still.jpg` | Brand guidelines spread, logo sketches, pantone chips, overhead shot, minimal. |
| `service-ai-still.jpg` | Automation diagram on tablet, CRM icons, modern office, calm tech feel. |
| `portfolio-case-1.jpg` | Abstract success metric + SaaS UI blur, green growth accent, case study thumbnail. |
| `portfolio-case-2.jpg` | E-commerce product grid with sales overlay charts, premium DTC vibe. |
| `portfolio-case-3.jpg` | Real estate leads dashboard aesthetic, professional services. |
| `blog-listing.jpg` | Editorial desk, notebook, laptop, growth theme, no readable text. |
| `resources-hero.jpg` | Downloadable templates floating, checklist, playbook aesthetic. |

---

## Already in `public/media/` (do not regenerate)

`hero.mp4`, `about.mp4`, `infrastructure.mp4`, `services-ecosystem.mp4`, `services-ecosystem-b.mp4`, `process-video.mp4`, `team.mp4`, `footer.mp4`, `expertise.mp4`, `expertise-b.mp4`, `expertise-c.mp4`, `performance-marketing.mp4`, `performance-b.mp4`, `profile-presence.mp4`, `web-development.mp4`, `product-engineering-b.mp4`, `environment-b.mp4`, plus stills: `industries.jpg`, `industries-b.jpg`, `industries-c.jpg`, `industries-d.jpg`, `portfolio.jpg`, `process.jpg`, `process-hero.jpg`, `client-success.jpg`, `team-hero.jpg`, `team.jpg`, `contact.jpg`, `contact-hero.jpg`, `pricing.jpg`, `pricing-hero.jpg`, `footer.jpg`, `footer-hero.jpg`, `blog.png`, `blog-hero.png`.

---

After you generate assets, tell us and we'll wire unique filenames in `src/lib/visuals.ts` with zero reuse.
