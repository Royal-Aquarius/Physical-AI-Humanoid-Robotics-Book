---
id: 20251220120000
title: "Update Why This Book Section with Emojis"
stage: refactor
date: "2025-12-20"
surface: agent
model: gemini
feature: none
branch: main
user: user
command: null
labels:
  - "refactor"
  - "ui"
  - "homepage"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - "src/components/WhyThisBook/index.tsx"
  - "src/components/WhyThisBook/styles.module.css"
tests_yaml: |
  []
---

# PROMPT

You are updating the "Why This Book" section on the MAIN PAGE of a website.Content Rules:- Heading: "Why This Book"   Subheading: "Built for Real-World Robotics  Not another theory-heavy textbook. This is a hands-on guide to building robots that work."- Six feature cards with the following content and icons EXACTLY:1. 🎯 Project-Based Learning   Every chapter builds toward a working capstone project. Learn by doing, not just reading.2. 🔧 Production-Ready Code   All examples use industry-standard tools and practices. Code that actually runs on real robots.3. 📊 Progressive Complexity   Start simple, build complexity. Each lesson builds on the last with clear prerequisites.4. 🌐 End-to-End Pipeline   From sensor data to motor commands. Understand the complete robotics software stack.5. 🤝 Human-Robot Interaction   Build robots that communicate naturally through voice, gestures, and intuitive interfaces.6. ⚡ GPU Acceleration   Leverage NVIDIA Isaac for real-time perception. Train and deploy AI at robot speed.Critical Constraints:- DO NOT modify, rewrite, shorten, or expand any text.- Keep the above emojis as icons for the cards.- DO NOT change book learning material or educational data.- Only UI, layout, and visual styling changes allowed.Design & Theme Instructions:- Sleek, modern, professional cards- Dark mode support: cards must be clearly visible in dark/light mode- Responsive grid layout (desktop: 3 cards per row, mobile stacked)- Smooth hover/animation effects (optional)- Clear contrast between text, icons, and background- Maintain spacing and alignment consistent with existing themePlacement:- Section should appear immediately below the entire "Explore Our Learning Modules" section and its cards.Strict Rules:- No content changes- No logic changes- No learning material changes- Only layout, visual style, dark mode fixExpected Outcome:- “Why This Book” heading + subheading visible- All 6 cards sleek, modern, readable, responsive- Dark mode fully supported- Original emojis retained as icons- Section blends seamlessly with existing themeProceed carefully and conservatively.

# RESPONSE

I have updated the "Why This Book" section as requested.

1.  **Component Logic (`src/components/WhyThisBook/index.tsx`):**
    *   The data structure was changed to use an `icon` string (for the emoji) instead of an SVG component.
    *   The `ReasonList` was updated with the six features, including their new emoji icons, titles, and descriptions as specified.
    *   The `Reason` component was modified to render the emoji as a large text element above the title.
    *   The subheading text was updated to match the requested format.

2.  **Styling (`src/components/WhyThisBook/styles.module.css`):**
    *   The old `.featureSvg` style was removed.
    *   A new `.featureEmoji` style was added to control the size and placement of the emoji icon.
    *   Styles were added/updated for the card, card header, and subheading to ensure a modern, responsive, and dark-mode-compatible appearance.

The section should now appear correctly below the "Explore Our Learning Modules" section, with the specified content and styling.
