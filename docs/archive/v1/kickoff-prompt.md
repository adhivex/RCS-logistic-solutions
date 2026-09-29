# First prompt to paste into Claude Code

Read CLAUDE.md and every file in docs/ before doing anything. Then inspect the repository.

Phase 1 only:
1. Scaffold Next.js (App Router, TypeScript strict, Tailwind, ESLint) in this folder without overwriting CLAUDE.md, docs/, public/brand/, .gitignore or .env.example.
2. Install shadcn/ui, lucide-react, motion, react-hook-form, zod, @hookform/resolvers.
3. Set up the design tokens from docs/design-system.md in globals.css, Archivo via next/font, and the layout shell (navbar + footer) using the logo rules in CLAUDE.md.
4. Create lib/site-config.ts exactly as in docs/architecture.md.
5. Write a short design plan for the homepage (per the "Workflow" step 4 in CLAUDE.md) and show it to me before building sections.

Record the library versions you chose and any assumptions in docs/decisions.md. Stop after Phase 1 and summarise what you did.
