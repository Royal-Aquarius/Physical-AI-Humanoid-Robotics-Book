---
id: 20251219160000
title: Fix CTA button dark mode hover fill
stage: green
date: 2025-12-19
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: (unknown)
command: "Fix CTA button \"Start Your Journey\" hover FILL issue in dark mode."
labels: ["css", "docusaurus", "dark-mode", "button", "hover"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/css/custom.css
tests_yaml: []
---
### PROMPT_TEXT

```text
TASK:Fix CTA button "Start Your Journey" hover FILL issue in dark mode.CURRENT ISSUE:- Dark mode default: outline + text visible (OK)- Dark mode hover: button DOES NOT fill- Light mode hover fill works correctlyREQUIRED BEHAVIOR:- Dark mode hover MUST fill EXACTLY like light mode- Same fill color, same transition, same animation- Default state remains outline (border + text)- Behavior must be IDENTICAL to light modeROOT CAUSE TO FIX:- Dark mode overrides are cancelling / blocking hover background-fill- Hover background is staying transparent in dark modeSTRICT RULES:- Change ONLY CTA button styles- Apply changes ONLY for dark mode- DO NOT touch light mode- DO NOT change content / learning material- DO NOT refactor components or logic- NO new animations or effectsWHAT TO DO:- Restore hover background-fill in dark mode- Explicitly allow hover background color in dark mode- Use SAME colors / CSS variables used in light mode hover- Do NOT override transitions or hover timingHOW:- Minimal dark-mode CSS/Tailwind override- Target ONLY CTA button selector- Fix BOTH:  - default (outline visible)  - hover (fill enabled)EXPECTED RESULT:- Light mode: unchanged- Dark mode:  - Default → outline button visible  - Hover → button fills exactly like light mode- Zero side effects elsewhereOUTPUT:Return ONLY the minimal CSS / Tailwind override.No explanation. No extra suggestions.
```

### RESPONSE_TEXT

```text
I have applied the CSS changes to `src/css/custom.css`.
```
