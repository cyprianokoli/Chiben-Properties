-- Deal figures shown on each property's case-study page.
-- Run once in the Supabase SQL editor.
alter table properties
  add column if not exists monthly_rent numeric,
  add column if not exists refurb_cost  numeric,
  add column if not exists gross_yield  numeric;
