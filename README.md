# Zakariya Baaziz — Portfolio

Static single-page portfolio built with Vite + React and plain CSS. No backend — the contact form posts to Formspree.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (dist/)
```

## Before deploying — two placeholders to swap

1. **Profile photo:** replace `public/profile.jpg` with your real photo (keep the filename). A generated placeholder is there now.
2. **Formspree:** create a form at [formspree.io](https://formspree.io), then replace `YOUR_FORM_ID` in `src/components/Contact.jsx` (the `FORMSPREE_ENDPOINT` constant at the top).

Also: the TradesJournal project card assumes a **Node/Express** backend — confirm/adjust the tags in `src/components/Projects.jsx`.

## Deploy

Ready for Vercel with zero config: import the repo, framework preset "Vite", done.
