create table if not exists public.quiz_resultados (
  id bigint generated always as identity primary key,
  nome text not null,
  sobrenome text not null,
  acertos integer not null,
  total_perguntas integer not null,
  data_hora timestamptz not null default now(),
  constraint acertos_dentro_do_total check (acertos >= 0 and acertos <= total_perguntas),
  constraint total_perguntas_positivo check (total_perguntas > 0)
);

alter table public.quiz_resultados enable row level security;

grant insert on public.quiz_resultados to anon;
grant usage, select on sequence public.quiz_resultados_id_seq to anon;

create policy "permitir insercao publica"
on public.quiz_resultados
for insert
to anon
with check (true);
