---
id: 20251219154500
title: Adjust CTA button dark mode to match light mode outline
stage: green
date: 2025-12-19
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: (unknown)
command: "Make CTA button \"Start Your Journey\" behave EXACTLY the same in dark mode as it does in light mode."
labels:
  - "css"
  - "docusaurus"
  - "dark-mode"
  - "button"
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
TASK:Make CTA button "Start Your Journey" behave EXACTLY the same in dark mode as it does in light mode.CURRENT ISSUE:- Dark mode: outline + text exist but colors blend with dark background- Hover works, but default state is not clearly visibleREQUIRED BEHAVIOR (MATCH LIGHT MODE 100%):- Default state: outline button (border + text clearly visible)- Hover state: button fills (same animation & effect as light mode)- NO filled button by default- SAME interaction, SAME transition, SAME logicSTRICT RULES:- Change ONLY CTA button colors for dark mode- DO NOT change button behavior or logic- DO NOT change hover styles or animations- DO NOT touch light mode styles- DO NOT touch learning material/content- DO NOT modify any other UI elementWHAT TO DO:- In dark mode default state:  - Set border color same as light mode  - Set text color same as light mode- In dark mode hover state:  - Let EXISTING hover styles work (do NOT override)HOW:- Use minimal CSS / Tailwind dark-mode override- Target ONLY the CTA button selector- Color fix only, no structural changesEXPECTED RESULT:- Light mode: unchanged- Dark mode:  - Button visible as outline (like light mode)  - Hover → fills exactly like light mode- Zero side effects elsewhereOUTPUT:Return ONLY the minimal CSS / Tailwind override.No explanation. No extra suggestions.
```

### RESPONSE_TEXT

```text
I have applied the CSS changes to `src/css/custom.css`.
```
