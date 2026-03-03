# AGENTS.md

## Cursor Cloud specific instructions

**json-graph** is a single-page React + TypeScript web app (Vite) that renders JSON data as an interactive tree.

### Quick reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (default port 5173) |
| Lint | `npm run lint` |
| Test | `npm run test` |
| Test (watch) | `npm run test:watch` |
| Build | `npm run build` |

### Notes

- The dev server uses Vite with HMR; changes to `.tsx`/`.css` files are reflected instantly.
- Vitest uses `jsdom` environment; the setup file is at `src/test/setup.ts`.
- ESLint config uses the flat config format (`eslint.config.js`).
- No external services, databases, or Docker are required.
