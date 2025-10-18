-- Create waitlist table for AI Tip feature
begin;

create table if not exists public.ai_waitlist (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  source text,
  discount_percent integer not null default 70,
  created_at timestamptz not null default now()
);

comment on table public.ai_waitlist is 'Waitlist entries for AI Tip (phone + discount)';

-- Temporarily disable RLS for easier reads while validating
alter table public.ai_waitlist disable row level security;

commit;