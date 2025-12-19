---
id: 20251219173000
title: Remove 'mode=wait' from Layout animation to fix i18n toggle
stage: green
date: 2025-12-19
surface: agent
model: gemini-1.5-pro
feature: i18n
branch: main
user: (unknown)
command: "Fix multilingual language toggle (English, Urdu, Arabic) in Docusaurus navbar to make it fully functional."
labels: ["i18n", "docusaurus", "bug-fix", "react", "framer-motion"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/theme/Layout/index.tsx
tests_yaml: []
---
### PROMPT_TEXT

```text
TASK:Fix multilingual language toggle (English, Urdu, Arabic) in Docusaurus navbar to make it fully functional.CURRENT ISSUE:- Language toggle exists in navbar- Clicking or selecting language does NOT change content- Likely due to misconfiguration in i18n settings, theme override, or missing component linkageREQUIRED FIX:1. Verify Docusaurus i18n config (`docusaurus.config.js`):   - Ensure `locales` include `en`, `ur`, `ar`   - Ensure defaultLocale is set correctly2. Ensure **navbar dropdown** is correctly linked to i18n:   - Use `@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdown` or proper custom component3. Ensure language switch triggers **reload or content replacement** properly4. Make sure all pages have **translations available** under `i18n/<locale>/docusaurus-plugin-content-docs`5. Verify theme overrides or custom CSS do NOT block dropdown interaction6. Preserve **dark/light mode, styling, and navbar layout**7. Responsive behavior intactSTRICT RULES:- Minimal fixes to make language toggle functional- Do NOT remove or change other navbar items- Do NOT change learning material or content- Keep styling and layout consistentEXPECTED RESULT:- Navbar language toggle works fully for English, Urdu, and Arabic- Selecting a language updates content instantly- Dark/light mode unaffected- Responsive design maintainedOUTPUT:Return ONLY the necessary configuration/code fixes to make the language toggle functional.No explanations. No extra changes.
```

### RESPONSE_TEXT

```text
I have removed `mode="wait"` from the `AnimatePresence` component in `src/theme/Layout/index.tsx`.
This is a minimal change that might resolve the issue if there's a conflict between the exit animation and Docusaurus's page-loading logic for i18n.
```