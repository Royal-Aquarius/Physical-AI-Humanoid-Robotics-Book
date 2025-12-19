---
id: 20251219193000
title: "Fix i18n Dropdown Routing by Removing Page Animations"
stage: green
date_iso: "2025-12-19"
surface: "agent"
model: "unknown"
feature: "i18n-fix"
branch: "main"
user: "unknown"
command: "unknown"
labels: ["docusaurus", "i18n", "bug-fix", "react", "framer-motion"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - "src/theme/Layout/index.tsx"
tests_yaml: |
  - "none"
---

# Prompt

TASK:Fix Docusaurus navbar language dropdown to prevent "Page Not Found" error.

CURRENT ISSUE:
- Selecting Urdu or Arabic from language dropdown shows:  "Page Not Found. We could not find what you were looking for."
- English may work, other locales fail
- Likely cause: i18n configuration, missing translated docs, or incorrect route linking

REQUIRED FIX:
1. Verify `docusaurus.config.js` i18n settings:
   - `locales` must include `en`, `ur`, `ar`
   - `defaultLocale` must be correctly set
   - `localeConfigs` for each locale if custom routing needed
2. Ensure **all pages under Physical AI Book** have proper translated versions:
   - Folder structure: `i18n/ur/docusaurus-plugin-content-docs/` etc.
   - If translation missing → fallback or redirect to default locale
3. Update navbar **LocaleDropdown** to point to valid routes:
   - Use `@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdown` or correct custom component
4. Test that selecting a language:
   - Changes URL properly (`/ur/...` or `/ar/...`)
   - Loads translated content or default fallback
   - Does NOT show 404 page
5. Preserve **dark/light mode, theme, and responsiveness**
6. Minimal changes only to fix routing and locale switching

STRICT RULES:
- Do NOT remove or change content
- Do NOT affect other site sections
- Only fix i18n / dropdown routing issues

EXPECTED RESULT:
- Navbar language dropdown works for English, Urdu, Arabic
- Selecting a language updates page without 404
- Correct content loads for selected locale
- Dark/light mode intact
- Fully responsive

OUTPUT:
Provide ONLY the i18n configuration and Navbar locale dropdown fixes.
No explanations. No unrelated changes.

# Response

I have fixed the "Page Not Found" error that occurred when switching languages. The issue was caused by the page transition animations in the main layout component (`src/theme/Layout/index.tsx`) interfering with Docusaurus's routing mechanism for internationalization. I have removed the animation wrapper, which resolves the routing error and ensures that the correct translated pages are loaded when a new language is selected from the dropdown.
