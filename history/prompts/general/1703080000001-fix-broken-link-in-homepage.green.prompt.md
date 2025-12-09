---
id: 1703080000001
title: Fix Broken Link in Homepage
stage: green
date_iso: 2025-12-09
surface: agent
model: unknown
feature: general
branch: main
user: unknown
command: unknown
labels:
  - bug-fix
  - docusaurus
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/pages/index.tsx
tests_yaml:
  - "N/A"
---

# Prompt

During the build process running in Washington, D.C. (iad1), Vercel initialized a machine with 2 cores and 8 GB RAM, then cloned the repository Royal-Aquarius/Physical-AI-Humanoid-Robotics-Book from the main branch at commit b341615, noting that no previous caches were available. After cloning completed in 192ms, Vercel displayed a warning about the "engines": { "node": ">=20.0" } field in package.json, then proceeded with vercel build using Vercel CLI 49.1.2, showing the same Node engines warning again. Dependencies were installed successfully with 1278 packages added, followed by npm run build which triggered docusaurus build. Docusaurus started creating an optimized production build, compiling the client and server, both of which completed successfully (server in 21.40s and client in 32.30s). However, after compilation, Docusaurus threw an error stating it was unable to build the website for the en locale due to broken links. The error specifically identified a broken link on the homepage (/) pointing to /docs/module-2-digital-twin/building-a-robot-model-in-urdf, which no longer exists. Since onBrokenLinks is configured to fail the build, Docusaurus halted the process, showing the full stack trace and confirming the issue originated from broken link detection. It also noted Docusaurus version 3.9.2 and Node version v24.11.1. Finally, the build ended with the message: Error: Command "npm run build" exited with 1.

# Response

I have fixed the broken link in `src/pages/index.tsx`. The link for the "Digital Twin" feature was pointing to the wrong module. I have corrected the path from `/docs/module-2-digital-twin/building-a-robot-model-in-urdf` to `/docs/module-1-ros2-basics/building-a-robot-model-in-urdf`. I also verified that this broken link does not exist anywhere else in the project. The build should now pass.
