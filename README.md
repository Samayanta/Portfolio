# Samayanta Raj Ghimire — Portfolio

A cinematic, premium, multi-page personal brand site for Samayanta Raj Ghimire: Software Engineering student, Business Development Associate, creative technologist, and growth systems thinker from Lalitpur, Nepal.

## Pages

- `index.html` — homepage and positioning
- `about.html` — story, mindset, and principles
- `work.html` — immersive case studies and system-focused work
- `journal.html` — editorial notes on AI, product, Nepal, and growth
- `contact.html` — direct contact paths and a brief builder

## Architecture

```text
.
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   └── responsive.css
│   └── js/
│       └── site.js
├── images/
│   ├── optimized/
│   └── ...
├── index.html
├── about.html
├── work.html
├── journal.html
├── contact.html
└── styles.css
```

`styles.css` imports the CSS modules so the site remains easy to host as static HTML while still keeping the styling modular.

## Motion and interaction

The site uses:

- GSAP + ScrollTrigger for reveal and parallax moments
- Lenis for smooth scrolling
- Barba.js for cinematic page transitions
- A custom dark / light theme toggle
- Accessible reduced-motion fallbacks

If any CDN script fails, the content still remains readable and navigable.

## Running locally

Use any static server from the project root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Contact behavior

The contact page does not fake a backend submission. It provides direct phone and social links, plus a brief builder that copies a concise message to the clipboard so it can be sent through the preferred direct channel.
