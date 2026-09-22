# Genesis Vidyapeeth — Complete Feature Scaffold

This package is intentionally a **feature scaffold**, not a finished production school ERP.
Every major page is already represented in the Next.js App Router, and each page contains:
- a clear section title
- the feature list
- an implementation note for each feature
- a placeholder action button

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For Supabase:
1. Copy `.env.example` to `.env.local`.
2. Create a Supabase project.
3. Run `supabase/schema.sql`.
4. Add URL/anon key.
5. Keep service-role secrets server-side only.

## Major route map

### Public
- `/`
- `/about`
- `/admission`
- `/contact`
- `/notice-board`
- `/login`

### Student / Academic
- `/dashboard`
- `/dashboard/students`
- `/dashboard/teachers`
- `/dashboard/parents`
- `/dashboard/academics`
- `/dashboard/routine`
- `/dashboard/attendance`
- `/dashboard/homework`
- `/dashboard/quests`
- `/dashboard/exams`
- `/dashboard/results`

### Learning / Support
- `/dashboard/ai`
- `/dashboard/support`
- `/dashboard/library`
- `/dashboard/clubs`
- `/dashboard/certificates`

### School Operations
- `/dashboard/admissions`
- `/dashboard/calendar`
- `/dashboard/notices`
- `/dashboard/transport`
- `/dashboard/health`

### Finance
- `/dashboard/fees`
- `/dashboard/payments`

### Intelligence / Admin
- `/dashboard/analytics`
- `/dashboard/cctv`
- `/dashboard/admin`
- `/dashboard/security`
- `/dashboard/settings`

## Implementation order

1. Authentication + roles
2. School/class/student master data
3. Attendance + routine
4. Homework + quests
5. Exams + results
6. Parent portal
7. Fees + payments
8. Library
9. AI tutor + teacher escalation
10. Notifications
11. Analytics
12. Advanced integrations

Do not implement payment, SMS, AI, CCTV or sensitive student-health functionality from the browser alone.
Use server-side APIs, verified webhooks, access control, audit logs and secure storage.

## Design principle

The UI is deliberately premium/minimal and the feature pages are deliberately simple.
The goal is to make the architecture easy to extend without pretending that placeholder buttons are production functionality.
