# HeyLucy! — MVP

## Overview
HeyLucy! is a women’s health MVP focused on menstrual cycle tracking and phase‑based education. The core experience is a calendar that predicts phases based on logged period start dates and updates predictions as new dates are logged. Educational content is non‑diagnostic and enriched using the MyHealthfinder public health database.

## Core Features
- **Onboarding**: Date entry for last period start (MM‑DD‑YYYY) with auto‑formatting.
- **Home (Calendar)**: Phase visualization, next estimated period, latest log summary, and phase insights.
- **Track**: Log new period start dates + optional flow, mood, and symptom ratings. “Track” updates predictions and redirects to Home.
- **Resources**: Curated links and video thumbnails for educational topics.
- **MyHealthfinder Integration**: Live public health summaries with required attribution.

## Installation / Running Locally
This is a static HTML app.

**Option A (Simple)**
- Open `index.html` in your browser.

**Option B (Recommended for API calls)**
Run a local server from the project root:
```
python3 -m http.server 5173 --bind 127.0.0.1
```
Then open:
```
http://127.0.0.1:5173/index.html
```

## API Integration (MyHealthfinder)
The app integrates the MyHealthfinder API via a Vercel serverless proxy to avoid CORS issues.

**Proxy Endpoint**
```
/api/myhealthfinder
```

**Supported Endpoints**
- `endpoint=itemlist` (topic list)
- `endpoint=topicsearch` (topic details)
- `endpoint=searchbykeyword` (keyword search)
- `endpoint=healthfinder` (topic by HealthTopicId)

**Optional Filters**
- `age` (optional)
- `pregnant` (optional)
- `keyword` (optional)
- `sex` defaults to `female`

**Example Calls**
```
/api/myhealthfinder?endpoint=itemlist&type=topic&age=24
/api/myhealthfinder?endpoint=topicsearch&topicId=30539&age=24
/api/myhealthfinder?endpoint=searchbykeyword&keyword=stress&age=24
```

## Project Log Summary
- HeyLucy! is a women’s health MVP focused on menstrual cycle tracking and phase‑based education.
- Core features: onboarding date entry, calendar predictions, Track tab for logging, and curated resources.
- Educational content is non‑diagnostic and informed by the MyHealthfinder public health database.
- Firebase Functions required a paid plan, so we switched to Vercel serverless functions for the public API proxy.

## Project Structure
```
index.html
api/myhealthfinder.js
PROJECT_LOG.html
PROJECT_LOG.md
README.txt
```

## Deployment
- Hosted on Vercel
- Live URL: https://hey-lucy.vercel.app/

## Privacy & Safety
- No authentication
- No user data stored on a server
- Logs are in memory only (refresh clears data)
- Educational content only; no diagnosis or treatment

## AI Usage
AI assistance was used **only** for research and debugging support. Product direction, UX decisions, and implementation details were finalized by the team.

## Last Updated
2026-02-08
