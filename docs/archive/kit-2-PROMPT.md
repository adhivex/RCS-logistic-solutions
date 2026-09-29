# Prompt for Claude Code

Copy everything inside the box below and paste it into Claude Code, from the root of this folder.

---

```
You are building the new website for RCS Logistic Solutions (rebuild of https://www.rcsls.in).

1. First read CLAUDE.md and every file in docs/ (01 to 09), and open docs/reference/homepage-preview.html — that file is the approved final design and the source of truth for how the site must look and behave.

2. Then proceed with ALL the steps in docs/07-build-plan.md, Phase 0 through Phase 8, in order, without stopping to ask for approval between phases. After each phase: run `npm run lint && npm run build`, fix any errors, commit to git, print a short summary, and move straight on to the next phase.

3. Rules while you work:
   - Match the preview design exactly: colours, fonts, spacing, components, mobile layout, animations, footer credit and cookie consent.
   - Mobile first — check every page at 375px, 768px, 1024px and 1440px.
   - Never invent contact details, stats or client names; use the TODO(client) placeholders.
   - No Supabase or Resend credentials yet: use the "Local mode" fallbacks in CLAUDE.md so everything runs locally. Only stop if you hit a genuine blocker you cannot work around.

4. When everything is complete (Phase 8):
   - make sure `npm run build` passes with zero errors,
   - start the dev server with `npm run dev` and keep it running,
   - open http://localhost:3000 in my browser so I can see the final website design,
   - click through and test all pages, the quote form, the mobile menu and the cookie banner,
   - write docs/11-handover.md,
   - and finish by telling me the localhost URL, the list of pages, the remaining TODO(client) items, and the steps to deploy on Vercel.
```

---

Tip: start Claude Code with auto-accept for edits (Shift+Tab to cycle modes) so it can work through all phases without asking you to approve every file change. It will still ask before running some commands unless you allow them.
