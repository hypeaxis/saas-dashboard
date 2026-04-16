# TaskMaster SaaS Dashboard

TaskMaster is a Next.js task management dashboard with login, task CRUD, and analytics views. The UI follows the Architectural Minimalist token system with a practical as-built approach.

## Core Features
- Authentication with NextAuth:
	- Credentials provider (demo account)
	- Optional Google provider (enabled via env)
- Protected workspace routes:
	- /dashboard
	- /tasks
	- /analytics
- Task management:
	- Create, view, edit, delete tasks
	- Search and status filtering
	- Activity feed for create/update/delete actions
- Analytics:
	- Completion rate
	- Priority distribution (donut)
	- Task status distribution (column)

## Tech Stack
- Next.js (App Router)
- Tailwind CSS + CSS variables
- NextAuth
- Jotai
- React Hook Form + Zod
- Highcharts

## Local Development

1. Install dependencies
```bash
npm install
```

2. Create .env.local at project root

Recommended variables:
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- DEMO_EMAIL (optional)
- DEMO_PASSWORD (optional)
- GOOGLE_CLIENT_ID (optional)
- GOOGLE_CLIENT_SECRET (optional)

If you do not use Google OAuth, credentials login still works with fallback values in source.

3. Run dev server
```bash
npm run dev
```

4. Open app
```text
http://localhost:3000
```

## Demo Credentials
- Email: demo@taskmaster.dev
- Password: taskmaster123

These values can be overridden with:
- DEMO_EMAIL
- DEMO_PASSWORD

## Design and Product Docs
- Product and requirements: Docs/SRS.md
- Design system: Docs/DESIGN.md
- Delivery status and backlog: Docs/plan.md

## Current Known Gaps
- Dashboard "View Full History" button is placeholder.
- Tasks pagination controls are placeholder.
- Analytics timeline chart is not implemented yet.
