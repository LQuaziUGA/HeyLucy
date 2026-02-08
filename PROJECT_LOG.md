# HeyLucy! Project Log & Documentation

## Project Summary
HeyLucy! is a women’s health MVP focused on menstrual cycle tracking and phase‑based education. The core experience is a calendar that predicts phases based on logged period start dates and updates predictions as new dates are logged. Educational content is presented in a non‑diagnostic format and enriched using the MyHealthfinder public health database.

**Note on AI usage:** AI assistance was used only for research and debugging support (e.g., exploring public API behavior, troubleshooting errors). Product direction, UX decisions, and implementation details were finalized by the team.

---

## Product Goals (MVP)
- Simple onboarding to capture the first day of the last period.
- Calendar-based cycle tracking with phase visualization.
- User logging of new period starts to override predictions.
- Educational insights tied to menstrual phases (non‑diagnostic).
- Resources section with curated links and videos.
- Privacy‑first (no authentication, local-only state).

---

## Core User Flow
1. **Animated Intro**
   - Short branded animation to introduce the app.
   - Tap or wait to continue to Welcome.

2. **Welcome**
   - Centered app title + description and “Begin” button.

3. **Onboarding**
   - User enters last period start date (`MM‑DD‑YYYY`).
   - Input auto‑formats and validates.

4. **Home (Calendar)**
   - Calendar shows predicted phases for each day.
   - “Next estimated period” displayed.
   - Phase‑based insight card + MyHealthfinder summary.
   - Latest log summary appears after logging.

5. **Track**
   - Log a new period start date.
   - Optional flow, mood, symptom ratings.
   - “Track” updates calendar + predictions and redirects to Home.

6. **Resources**
   - Curated links for mental & reproductive health.
   - Video thumbnails for educational topics.

---

## Functional Specs

### Cycle Prediction
- **Cycle length:** 28 days (MVP default).
- **Period length:** 5 days (MVP default).
- **Phase determination:**
  - Days 1–5: Menstrual
  - Days 6–13: Follicular
  - Day 14: Ovulation
  - Days 15–28: Luteal

### Logging Behavior
- User logs a new period start date on the Track tab.
- The log is added to a `periodLogs` array.
- **Past months are preserved** based on the nearest prior log.
- **Future predictions update** based on the most recent log.
- Latest log summary appears on the Home screen.

### UI Tabs
- Home (Calendar + Insights)
- Track (Logging)
- Resources (Links + Videos)

### Alerts
- Success alert shown after logging a cycle date.
- Validation alert if date is missing/invalid.

---

## Data & Content

### Menstrual Phase Content (Static)
- Each phase includes:
  - Phase summary
  - Common symptoms
  - Mental health notes
  - Hormonal changes

### MyHealthfinder Integration
- Live content pulled via serverless proxy to avoid CORS issues.
- The app displays:
  - Topic title
  - Short summary (2–3 sentences)
  - Last updated date (if provided)
  - “Learn more” link
- Required attribution (logo + source link) is shown wherever MyHealthfinder data appears.

---

## Technical Architecture

### Frontend
- **Single‑file static app** in `index.html`.
- Vanilla JS for routing, state, and UI updates.
- CSS for styling, animations, and layout.
- Mobile‑first layout with a phone frame container.

### Serverless Proxy (Vercel)
- File: `api/myhealthfinder.js`
- Supports endpoints:
  - `itemlist` (topic list)
  - `topicsearch` (topic details)
  - `searchbykeyword`
  - `healthfinder`
- Optional filters:
  - `age`, `pregnant`, `keyword`
  - `sex` defaults to `female` (no UI prompt)
- **Rate limiting:** 60 req/min per IP
- **Caching:** 30 minutes (`Cache-Control`)

---

## File Structure
- `index.html` — UI + logic + styles
- `api/myhealthfinder.js` — Vercel proxy for MyHealthfinder
- `src/` — React Native MVP (parallel exploration)
- `functions/`, `functionsub/` — Firebase experiments (not used in Vercel deployment)

---

## Deployment
- Hosted on Vercel.
- GitHub repo: `LQuaziUGA/HeyLucy`
- Live URL: `https://hey-lucy.vercel.app/`

---

## Privacy & Safety
- No authentication.
- No user data stored on a server.
- Logs exist only in memory (MVP).
- No diagnosis or treatment recommendations.

---

## Known Limitations (MVP)
- No persistent storage for logs (refresh clears data).
- Fixed cycle length assumptions.
- MyHealthfinder topics are general health topics, not cycle‑specific.

---

## Next Steps (Post‑MVP)
- Persist logs in `localStorage`.
- Allow user to set cycle length and period length.
- Build a log history view.
- Improve MyHealthfinder topic mapping to be more cycle‑relevant.
- Add gentle reminders and optional notification flow.

---

Last updated: 2026-02-08
