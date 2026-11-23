-- Gym-Logbuch 1.5: einmal im Supabase SQL Editor ausführen (mehrfach ausführbar).
-- 1) Auswertung v_saetze: Name und Muster aus der Einheit, wenn die Übung in exercises fehlt.
create or replace view public.v_saetze with (security_invoker = true) as
select
  s.id                                         as einheit_id,
  (s.data->>'date')::date                      as datum,
  s.data->>'type'                              as einheit,
  s.data->>'status'                            as status,
  b.nr                                         as block,
  e.value->>'ex'                               as uebung_id,
  coalesce(x.name, e.value->>'n', e.value->>'ex') as uebung,
  coalesce(x.muster, e.value->>'mu')           as muster,
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

-- 2) Die 28 neuen Übungen aus 1.5
insert into public.exercises (id, name, muster) values
  ('calfraise', 'Wadenheben stehend', 'Waden'),
  ('seatedcalf', 'Wadenheben sitzend', 'Waden'),
  ('slcalf', 'Wadenheben einbeinig', 'Waden'),
  ('pikepush', 'Pike-Liegestütze', 'Drücken, Schulter'),
  ('glutebridge', 'Glute Bridge', 'Gesäss'),
  ('plank', 'Unterarmstütz', 'Rumpf'),
  ('sideplank', 'Seitstütz', 'Rumpf'),
  ('tspineroll', 'BWS-Streckung über Foam Roller', 'Mobility Brustwirbelsäule'),
  ('openbook', 'Open Books', 'Mobility Brustwirbelsäule'),
  ('threadneedle', 'Fädeln im Vierfüssler', 'Mobility Brustwirbelsäule'),
  ('catcow', 'Katze-Kuh', 'Mobility Brustwirbelsäule'),
  ('wallslide', 'Wand-Engel', 'Mobility Schulter'),
  ('latstretch', 'Lat-Dehnung an der Bank', 'Mobility Schulter'),
  ('pecstretch', 'Brustdehnung am Türrahmen', 'Mobility Schulter'),
  ('shouldercar', 'Schulterkreisen kontrolliert', 'Mobility Schulter'),
  ('chintuck', 'Kinn zurückschieben', 'Mobility Nacken'),
  ('hipflexstretch', 'Hüftbeuger-Dehnung kniend', 'Mobility Hüftbeuger'),
  ('couchstretch', 'Couch Stretch', 'Mobility Hüftbeuger'),
  ('hip9090', '90/90 Hüftrotation', 'Mobility Hüfte'),
  ('lungerot', 'Ausfallschritt mit Rotation', 'Mobility Hüfte'),
  ('squathold', 'Tiefe Hocke halten', 'Mobility Hüfte'),
  ('adductorrock', 'Adduktoren-Rocking', 'Mobility Hüfte'),
  ('figure4', 'Gesässdehnung Figur 4', 'Mobility Hüfte'),
  ('kneetowall', 'Knie zur Wand', 'Mobility Sprunggelenk'),
  ('calfstretch', 'Wadendehnung an der Wand', 'Mobility Sprunggelenk'),
  ('legswing', 'Beinpendel', 'Mobility hintere Kette'),
  ('hamfloss', 'Hamstring-Mobilisation in Rückenlage', 'Mobility hintere Kette'),
  ('inchworm', 'Inchworm', 'Mobility hintere Kette')
on conflict (id) do update set name = excluded.name, muster = excluded.muster;
