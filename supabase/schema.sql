-- Genesis Vidyapeeth database foundation
-- Run this in Supabase SQL Editor.
-- The policies below are intentionally conservative. Expand them only after
-- defining your production role model.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student','parent','teacher','admin','accountant')),
  school_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  academic_session text not null,
  created_at timestamptz not null default now()
);

create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  section text,
  room text,
  created_at timestamptz not null default now()
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  profile_id uuid references profiles(id) on delete set null,
  admission_no text not null,
  class_id uuid references classes(id) on delete set null,
  guardian_profile_id uuid references profiles(id) on delete set null,
  xp integer not null default 0,
  created_at timestamptz not null default now(),
  unique(school_id, admission_no)
);

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  profile_id uuid references profiles(id) on delete set null,
  employee_no text not null,
  created_at timestamptz not null default now(),
  unique(school_id, employee_no)
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null
);

create table if not exists routine_requirements (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  subject_id uuid not null references subjects(id) on delete cascade,
  teacher_id uuid not null references teachers(id) on delete cascade,
  periods_per_week integer not null check (periods_per_week > 0),
  created_at timestamptz not null default now()
);

create table if not exists routines (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  academic_session text not null,
  status text not null default 'draft' check (status in ('draft','verified','published','archived')),
  generated_by uuid references profiles(id) on delete set null,
  verified_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists routine_entries (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references routines(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  subject_id uuid not null references subjects(id) on delete cascade,
  teacher_id uuid not null references teachers(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 1 and 7),
  period_id text not null,
  room text,
  unique(routine_id, class_id, day_of_week, period_id),
  unique(routine_id, teacher_id, day_of_week, period_id)
);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  date date not null,
  status text not null check (status in ('present','absent','late','excused')),
  marked_by uuid references profiles(id) on delete set null,
  unique(student_id, date)
);

create table if not exists fee_invoices (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  due_date date not null,
  status text not null default 'due' check (status in ('due','partial','paid','void')),
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references fee_invoices(id) on delete restrict,
  amount numeric(12,2) not null check (amount > 0),
  provider text not null,
  provider_reference text,
  status text not null default 'pending' check (status in ('pending','verified','failed','refunded')),
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table schools enable row level security;
alter table classes enable row level security;
alter table students enable row level security;
alter table teachers enable row level security;
alter table subjects enable row level security;
alter table routine_requirements enable row level security;
alter table routines enable row level security;
alter table routine_entries enable row level security;
alter table attendance enable row level security;
alter table fee_invoices enable row level security;
alter table payments enable row level security;
alter table audit_logs enable row level security;

-- Minimal self-profile policy. Add school/role policies before production.
create policy "profiles_read_self" on profiles for select using (auth.uid() = id);
create policy "profiles_update_self" on profiles for update using (auth.uid() = id);

-- Create a profile automatically when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), 'student')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
