-- Gym-Logbuch · Einrichtung der Datenbank
-- Einmal komplett im SQL Editor von Supabase ausführen (Run). Mehrfaches Ausführen schadet nicht.

-- 1) Einheiten und Einstellungen. Jede Einheit ist ein JSON-Dokument, genau wie in der App.
create table if not exists public.sessions (
  id         text primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Zugriffsregeln: Jedes Konto sieht und ändert nur die eigenen Daten.
alter table public.sessions enable row level security;
alter table public.settings enable row level security;

drop policy if exists "eigene Einheiten" on public.sessions;
create policy "eigene Einheiten" on public.sessions
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "eigene Einstellungen" on public.settings;
create policy "eigene Einstellungen" on public.settings
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- 3) Übungsnamen für lesbare Auswertungen
create table if not exists public.exercises (
  id     text primary key,
  name   text not null,
  muster text
);
alter table public.exercises enable row level security;
drop policy if exists "Übungen lesen" on public.exercises;
create policy "Übungen lesen" on public.exercises for select to authenticated using (true);

insert into public.exercises (id, name, muster) values
  ('goblet', 'Goblet Squat', 'Kniebeuge'),
  ('frontsq', 'Front Squat', 'Kniebeuge'),
  ('rdl', 'Rumänisches Kreuzheben', 'Hüftbeuge, Hamstrings'),
  ('csrow', 'Brustgestütztes KH-Rudern', 'Horizontales Ziehen'),
  ('incline', 'Schrägbankdrücken KH', 'Drücken, Brust'),
  ('bss', 'Bulgarian Split Squat', 'Einbeinig'),
  ('facepull', 'Face Pulls', 'Hintere Schulter'),
  ('deadbug', 'Dead Bug', 'Rumpf gegen Hohlkreuz'),
  ('hipthrust', 'Hip Thrust', 'Gesäss'),
  ('pullup', 'Klimmzüge', 'Vertikales Ziehen'),
  ('pullupA', 'Klimmzüge assistiert', 'Vertikales Ziehen'),
  ('latpd', 'Latzug', 'Vertikales Ziehen'),
  ('landmine', 'Landmine Press kniend', 'Drücken, Schulter'),
  ('nordic', 'Nordic Hamstring Curls', 'Exzentrisch Hamstrings'),
  ('dbrow', 'Einarmiges KH-Rudern', 'Horizontales Ziehen'),
  ('latlunge', 'Seitliche Ausfallschritte', 'Seitlich, Adduktoren'),
  ('pallof', 'Pallof Press', 'Rumpf, Stabilität'),
  ('curl', 'Bizeps-Curls', 'Bizeps'),
  ('pushdown', 'Trizeps-Pushdowns', 'Trizeps'),
  ('slbridge', 'Einbeinige Glute Bridge', null),
  ('hamslide', 'Hamstring Slides', 'Exzentrisch Hamstrings'),
  ('legpress', 'Beinpresse', 'Kniebeuge'),
  ('dbrdl', 'Rumänisches Kreuzheben KH', 'Hüftbeuge, Hamstrings'),
  ('slrdl', 'Einbeiniges RDL', 'Hüftbeuge, Hamstrings'),
  ('cablerow', 'Kabelrudern sitzend', 'Horizontales Ziehen'),
  ('machrow', 'Rudermaschine', 'Horizontales Ziehen'),
  ('dbbench', 'Flachbankdrücken KH', 'Drücken, Brust'),
  ('chestpress', 'Brustpresse', 'Drücken, Brust'),
  ('pushup', 'Liegestütze', 'Drücken, Brust'),
  ('revlunge', 'Ausfallschritte rückwärts', 'Einbeinig'),
  ('stepup', 'Step-ups', 'Einbeinig'),
  ('revfly', 'Reverse Flys KH', 'Hintere Schulter'),
  ('pullapart', 'Band Pull-Aparts', 'Hintere Schulter'),
  ('birddog', 'Bird Dog', 'Rumpf gegen Hohlkreuz'),
  ('rollout', 'Ab Rollout', 'Rumpf gegen Hohlkreuz'),
  ('bbbridge', 'Glute Bridge Langhantel', 'Gesäss'),
  ('slhipthrust', 'Einbeiniger Hip Thrust', 'Gesäss'),
  ('kneelpress', 'KH-Drücken halbkniend', 'Drücken, Schulter'),
  ('seatedpress', 'Schulterdrücken sitzend KH', 'Drücken, Schulter'),
  ('legcurl', 'Beinbeuger liegend', 'Exzentrisch Hamstrings'),
  ('cossack', 'Cossack Squat', 'Seitlich, Adduktoren'),
  ('adductor', 'Adduktoren-Maschine', 'Seitlich, Adduktoren'),
  ('chop', 'Holzhacker am Kabel', 'Rumpf, Stabilität'),
  ('hammercurl', 'Hammer-Curls', 'Bizeps'),
  ('cablecurl', 'Bizeps-Curls am Kabel', 'Bizeps'),
  ('ohext', 'Trizepsstrecken über Kopf', 'Trizeps')
on conflict (id) do update set name = excluded.name, muster = excluded.muster;

-- 4) Auswertungs-Ansichten (für Claude und eigene Abfragen). Sie beachten die Zugriffsregeln.
create or replace view public.v_einheiten with (security_invoker = true) as
select
  s.id,
  (s.data->>'date')::date                                                       as datum,
  s.data->>'type'                                                               as einheit,
  s.data->>'status'                                                             as status,
  round(((s.data->>'endedAt')::numeric - (s.data->>'startedAt')::numeric) / 60000) as dauer_min,
  (s.data->>'feel')::int                                                        as gefuehl,
  (s.data->>'fun')::int                                                         as spass,
  nullif(s.data->>'note', '')                                                   as notiz,
  coalesce((s.data->>'reentry')::boolean, false)                                as wiedereinstieg,
  coalesce((s.data->>'short')::boolean, false)                                  as kurzversion,
  s.data->'check'                                                               as check_vorher,
  s.updated_at
from public.sessions s;

create or replace view public.v_saetze with (security_invoker = true) as
select
  s.id                                         as einheit_id,
  (s.data->>'date')::date                      as datum,
  s.data->>'type'                              as einheit,
  s.data->>'status'                            as status,
  b.nr                                         as block,
  e.value->>'ex'                               as uebung_id,
  coalesce(x.name, e.value->>'ex')             as uebung,
  x.muster,
  st.nr                                        as satz,
  (st.value->>'w')::numeric                    as gewicht_kg,
  (st.value->>'r')::int                        as wdh,
  (st.value->>'rir')::int                      as rir,
  coalesce((st.value->>'done')::boolean, false)  as erledigt,
  coalesce((e.value->>'skipped')::boolean, false) as ausgelassen,
  e.value->>'swapFrom'                         as statt_uebung_id
from public.sessions s
cross join lateral jsonb_array_elements(s.data->'blocks') with ordinality as b(value, nr)
cross join lateral jsonb_array_elements(b.value->'items') as e(value)
cross join lateral jsonb_array_elements(e.value->'sets') with ordinality as st(value, nr)
left join public.exercises x on x.id = e.value->>'ex';

-- 5) Keepalive: Der tägliche Ping von GitHub ruft diese Funktion auf, damit Supabase das Projekt nicht pausiert.
create table if not exists public.heartbeat (
  id int primary key default 1 check (id = 1),
  at timestamptz not null default now()
);
alter table public.heartbeat enable row level security;
insert into public.heartbeat (id) values (1) on conflict (id) do nothing;

create or replace function public.keepalive()
returns timestamptz
language sql
security definer
set search_path = ''
as $$
  update public.heartbeat set at = now() where id = 1 returning at;
$$;
revoke all on function public.keepalive() from public;
grant execute on function public.keepalive() to anon, authenticated;
