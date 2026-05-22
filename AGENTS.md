# AGENTS.md — Chat customization for AI coding agents

Purpose

- Help AI coding agents quickly understand and work productively with this repository.

Project at-a-glance

- Type: Static portfolio website (single-page HTML + CSS + images).
- Key files: [index.html](index.html), [styles.css](styles.css), [README.md](README.md), [images/](images/)

How to run locally

- No build step. Open `index.html` in a browser to preview.
- For a simple static server (recommended for testing CORS/embed behavior):

  ```bash
  # from repo root
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

What agents should know

- There are no build/test scripts or package managers in this repo.
- All assets live in the `images/` folder; image paths in `index.html` are relative to the repo root.
- Styling lives in `styles.css`. Keep edits small and test in-browser.

Conventions and guidance for automated edits

- Preserve image filenames (often referenced directly in `index.html`).
- Avoid inlining large binary assets into commits; prefer updating `images/` and referencing them.
- When changing layout or fonts, test on mobile viewport (meta viewport is present).

When to run which agent

- `code-reviewer`: Use on any code edits (HTML/CSS changes). Check accessibility (alt text present for images) and mobile layout.
- `security-reviewer`: Not usually required for this static site, but run if any server-side code or third-party scripts are added.
- `tdd-guide` / test agents: Not applicable unless tests or a build tool are added.

Suggested next customizations

- Add a `.github/copilot-instructions.md` if you want GitHub-specific behavior (PR templates, default reviewers, CI notes).
- Add a skill to run a local static server and open the browser automatically for dev previews.

Links

- Main README: [README.md](README.md)

If you'd like, I can also create `.github/copilot-instructions.md` or a small skill to launch a local dev server — tell me which.
