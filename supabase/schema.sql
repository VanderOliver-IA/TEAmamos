create extension if not exists pgcrypto;

create table if not exists public.colaboracoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  whatsapp text,
  cidade text,
  perfil text not null,
  relacao_tea text,
  idade_tea text,
  nivel_suporte text,
  maior_dificuldade jsonb not null default '[]'::jsonb,
  dificuldade_texto text,
  recurso_desejado text,
  apps_usados text,
  o_que_funcionou text,
  o_que_nao_funcionou text,
  funcionalidade_indispensavel text,
  aceita_entrevista boolean not null default false,
  aceita_beta boolean not null default false,
  aceita_atualizacoes boolean not null default true,
  aceita_termos boolean not null default false,
  origem text not null default 'landing-page',
  status text not null default 'recebido',
  criado_em timestamptz not null default timezone('utc', now())
);

create index if not exists idx_colaboracoes_email on public.colaboracoes (email);
create index if not exists idx_colaboracoes_criado_em on public.colaboracoes (criado_em desc);
create index if not exists idx_colaboracoes_perfil on public.colaboracoes (perfil);

alter table public.colaboracoes enable row level security;

revoke all on public.colaboracoes from anon;
revoke all on public.colaboracoes from authenticated;

comment on table public.colaboracoes is 'Colaborações enviadas pelo formulário público do site TEAmamos.';
