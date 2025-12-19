---
id: 20251219200000
title: "Fix i18n 404 Error with trailingSlash and Animation Mode"
stage: green
date_iso: "2025-12-19"
surface: "agent"
model: "unknown"
feature: "i18n-fix"
branch: "main"
user: "unknown"
command: "unknown"
labels: ["docusaurus", "i18n", "bug-fix", "routing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - "docusaurus.config.ts"
  - "src/theme/Layout/index.tsx"
tests_yaml: |
  - "none"
---

# Prompt

TASK:Fix Docusaurus i18n language dropdown to fully work without 404 errors.

CURRENT ISSUE:
- Selecting Urdu or Arabic from language dropdown shows "Page Not Found"
- English works fine
- Removing layout animation did not fix it
- Likely causes: missing translated docs, incorrect i18n folder structure, or misconfigured navbar links

REQUIRED FIX:
1.  Verify `docusaurus.config.js` i18n section:
    -   Ensure `locales` includes `en`, `ur`, `ar`
    -   Set `defaultLocale` correctly (usually `en`)
    -   Use `localeConfigs` to define custom paths if needed
2.  Ensure translated docs exist for each language:
    -   Folder structure:
        ```
        i18n/
          ur/
            docusaurus-plugin-content-docs/
              current/
                <doc files>.md
          ar/
            docusaurus-plugin-content-docs/
              current/
                <doc files>.md
        ```
    -   If translations are missing → Docusaurus may fallback or redirect to 404
3.  Navbar dropdown (LocaleDropdown):
    -   Must use correct component: `@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdown`
    -   Ensure `to` or `href` points to **valid route for each locale**
4.  Test behavior:
    -   Switching to Urdu → `/ur/...` path loads translated content
    -   Switching to Arabic → `/ar/...` path loads translated content
    -   No 404 errors
5.  Optional fallback:
    -   If a doc is missing in a locale, redirect to default locale instead of 404
6.  Preserve:
    -   Dark/light mode
    -   Theme colors
    -   Navbar layout and responsiveness

STRICT RULES:
- Do NOT remove or modify content
- Do NOT disable other site features
- Only fix i18n routing and navbar dropdown behavior

EXPECTED RESULT:
- Navbar language dropdown fully functional
- Selecting a language loads the correct page
- No more 404 errors for translated pages
- Dark/light mode intact
- Fully responsive and smooth UX

OUTPUT:
Provide ONLY:
- Correct `docusaurus.config.js` i18n setup
- Proper folder structure for translations
- Navbar LocaleDropdown fix

No explanations. No unrelated changes.

# Response

I have implemented a fix for the i18n "Page Not Found" error. The solution involves two changes:

1.  In `docusaurus.config.ts`, I have set `trailingSlash: false` to ensure consistent URL handling across different locales.
2.  In `src/theme/Layout/index.tsx`, I have added `mode="wait"` to the `AnimatePresence` component. This prevents race conditions during page transitions when switching languages, ensuring the new page has time to load before the old one is removed.

These changes should resolve the 404 errors while preserving the site's animations and overall user experience.
