HeyLucy! — MVP Overview
=======================

Project Log Summary
- HeyLucy! is a women’s health MVP focused on menstrual cycle tracking and phase‑based education.
- Core features: onboarding date entry, calendar predictions, Track tab for logging, and curated resources.
- Educational content is non‑diagnostic and informed by the MyHealthfinder public health database.
- Firebase Functions required a paid plan, so we switched to Vercel serverless functions for the public API proxy.

Core Features
1. Onboarding
- User enters last period start date (MM‑DD‑YYYY).
- Input auto‑formats and validates.

2. Home (Calendar)
- Cycle phase visualization (menstrual, follicular, ovulation, luteal).
- Next estimated period date.
- Latest log summary and phase insights.
- MyHealthfinder summary with attribution.

3. Track
- Log new period start date to update predictions.
- Flow, mood, and symptom rating inputs.
- “Track” button saves, updates Home, and shows success alert.
- “Edit Last Log” returns to Track with the latest date prefilled.

4. Resources
- Curated links (CDC, Office on Women’s Health, Planned Parenthood).
- Video guide thumbnails linking to YouTube.

Data Source
- MyHealthfinder API (Office of the Assistant Secretary for Health).
- Accessed through a Vercel serverless proxy to avoid CORS restrictions.
- Attribution (logo + link) is displayed where content appears.

Technical Notes
- Single‑file static frontend: index.html
- Serverless proxy: api/myhealthfinder.js
- No authentication or backend database for MVP.
- Logs stored in memory only (refresh clears data).

Project Structure
- index.html
- api/myhealthfinder.js
- PROJECT_LOG.html
- PROJECT_LOG.md

Deployment
- Hosted on Vercel.
- Live URL: https://hey-lucy.vercel.app/

AI Usage
- AI assistance was used only for research and debugging support.
- Product decisions, UI, and implementation were finalized by the team.

Last Updated
- 2026-02-08
