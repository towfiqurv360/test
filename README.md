# Genesis Vidyapeeth — Digital Campus

A production-oriented Next.js App Router starter for a school platform. It uses JavaScript, not TypeScript.

## Stack

- Next.js App Router
- Supabase Auth + PostgreSQL + Storage
- Server-side API routes
- Deterministic timetable constraint solver
- Optional AI provider for natural-language planning and AI tutoring
- CSS-only premium UI with no UI framework dependency

## Important architecture rule

AI must never be the final authority for a timetable. AI can understand natural-language requirements and propose preferences. The server-side deterministic scheduler validates hard constraints and rejects conflicts before a routine can be published.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Create a Supabase project.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Add the Supabase URL and anon key to `.env.local`.
5. Add the service role key only to server environments. Never expose it with `NEXT_PUBLIC_`.
6. Install dependencies with `npm install`.
7. Run `npm run dev`.
8. Open `http://localhost:3000`.

## AI

AI is optional. Without an AI key, the routine engine still works using deterministic rules.

The `/api/routine/generate` endpoint accepts school structure and constraints, creates a deterministic schedule, and returns validation information. If an AI key exists, a short planning pass may be used to normalize preferences, but the final schedule is always validated by the deterministic engine.

## Payments

bKash and Nagad environment variables are placeholders. A production payment integration should use official merchant APIs and server-side webhook verification. Do not put merchant secrets in client components.

## Updating the project

- UI: `app/dashboard/page.js` and `app/globals.css`
- Navigation/layout: `app/dashboard/layout.js`
- Routine engine: `lib/routine-engine.js`
- AI helper: `lib/ai.js`
- Database: `supabase/schema.sql`
- Environment variables: `.env.local`
- Authentication: `lib/supabase/*`
