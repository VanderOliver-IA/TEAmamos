create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  role text not null default 'super_admin',
  password_hash text not null,
  ativo boolean not null default true,
  criado_em timestamptz not null default timezone('utc', now())
);

create table if not exists public.colaboracoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  whatsapp text,
  cidade text,
  perfil text not null,
  relacao_tea text,
  realidade_acompanhada jsonb not null default '[]'::jsonb,
  idade_tea text,
  nivel_suporte text,
  maior_dificuldade jsonb not null default '[]'::jsonb,
  dificuldade_texto text,
  necessidade_contexto text,
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

alter table public.colaboracoes add column if not exists realidade_acompanhada jsonb not null default '[]'::jsonb;
alter table public.colaboracoes add column if not exists necessidade_contexto text;

create index if not exists idx_colaboracoes_email on public.colaboracoes (email);
create index if not exists idx_colaboracoes_criado_em on public.colaboracoes (criado_em desc);
create index if not exists idx_colaboracoes_perfil on public.colaboracoes (perfil);
create index if not exists idx_admin_users_email on public.admin_users (email);

alter table public.admin_users enable row level security;
alter table public.colaboracoes enable row level security;

revoke all on public.admin_users from anon;
revoke all on public.admin_users from authenticated;
revoke all on public.colaboracoes from anon;
revoke all on public.colaboracoes from authenticated;

insert into public.admin_users (nome, email, role, password_hash, ativo)
values (
  'Vanderson Oliveira',
  'omd.vandersonoliveira@gmail.com',
  'super_admin',
  'scrypt:75b35929ab44acf3f6c1b637043f53fd:d33cff0edbca8c90a91441679359e67fc6dfcdaba93f5e6339d5460f8c5356f379be43f54b68f1fee42e0c02cd3161b4f637258b32071d2d51d7307cb9a9539d',
  true
)
on conflict (email) do update
set
  nome = excluded.nome,
  role = excluded.role,
  password_hash = excluded.password_hash,
  ativo = excluded.ativo;

comment on table public.admin_users is 'Usuários administrativos do TEAmamos.';
comment on table public.colaboracoes is 'Colaborações enviadas pelo formulário público do site TEAmamos.';
