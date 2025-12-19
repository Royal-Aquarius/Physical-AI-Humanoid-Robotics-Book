---
id: 20251219170000
title: Fix footer crash due to deprecated Docusaurus hook
stage: green
date: 2025-12-19
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: (unknown)
command: "Fix Docusaurus footer crash caused by deprecated hook import."
labels: ["footer", "docusaurus", "bug-fix", "react", "hook"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/theme/Footer/index.tsx
tests_yaml: []
---
### PROMPT_TEXT

```text
TASK:Fix Docusaurus footer crash caused by deprecated hook import.CURRENT ISSUE:- Footer is crashing on page load- Error: `(0 , _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_2__.useDocusaurusThemeConfig) is not a function`- Reason: `useDocusaurusThemeConfig` no longer exists in `@docusaurus/theme-common`- Page crash prevents footer and other components from renderingREQUIRED FIX:1. Replace **useDocusaurusThemeConfig** with **useThemeConfig** in `Footer/index.tsx`2. Update import statement:   - OLD: `import { useDocusaurusThemeConfig } from '@docusaurus/theme-common';`   - NEW: `import { useThemeConfig } from '@docusaurus/theme-common';`3. Replace all occurrences in the code:   - OLD: `const themeConfig = useDocusaurusThemeConfig();`   - NEW: `const themeConfig = useThemeConfig();`4. Ensure footer renders without crash5. Preserve all **dark/light mode styles, social links, newsletter signup, and contact info**6. Do NOT modify other sections or learning materialSTRICT RULES:- Minimal change to fix hook import- Footer functionality and theme must remain intact- Responsive design must remain intact- No extra components, no refactor beyond the hook replacementEXPECTED RESULT:- Footer renders correctly in both light and dark mode- No page crash- All footer features (social links, newsletter, contact info) remain functional- Theme colors preservedOUTPUT:Provide ONLY the fixed import statement and usage replacement in `Footer/index.tsx`.No explanations or extra changes.
```

### RESPONSE_TEXT

```text
I have replaced both the import statement and the usage of the deprecated hook with the correct one in `src/theme/Footer/index.tsx`.
This should fix the footer crash.
```