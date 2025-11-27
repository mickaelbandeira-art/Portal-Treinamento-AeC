-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Tabela: clientes
create table public.clientes (
  id uuid not null default uuid_generate_v4(),
  nome text not null,
  logo text,
  descricao text,
  created_at timestamp with time zone default now(),
  constraint clientes_pkey primary key (id)
);

-- Tabela: hierarquia
create table public.hierarquia (
  id uuid not null default uuid_generate_v4(),
  cargo text not null,
  nivel integer not null check (nivel >= 1 and nivel <= 9),
  created_at timestamp with time zone default now(),
  constraint hierarquia_pkey primary key (id)
);

-- Tabela: usuarios
create table public.usuarios (
  id uuid not null default uuid_generate_v4(),
  nome text not null,
  email text not null unique,
  senha_hash text, -- Managed by Supabase Auth usually, but keeping for reference if needed or for custom auth
  hierarquia_id uuid references public.hierarquia(id),
  cliente_id uuid references public.clientes(id),
  ativo boolean default true,
  created_at timestamp with time zone default now(),
  constraint usuarios_pkey primary key (id)
);

-- Seed Hierarquia
insert into public.hierarquia (cargo, nivel) values
('Presidente', 1),
('Vice Presidente', 2),
('Diretor', 3),
('Gerente Executivo', 4),
('Gerente de Pessoas', 5),
('Coordenador', 6),
('Supervisor', 7),
('Instrutor', 8),
('Colaborador', 9);

-- Operational Tables

-- Segmentos
create table public.segmentos (
  id uuid not null default uuid_generate_v4(),
  nome text not null,
  cliente_id uuid references public.clientes(id),
  created_at timestamp with time zone default now(),
  constraint segmentos_pkey primary key (id)
);

-- Turmas
create table public.turmas (
  id uuid not null default uuid_generate_v4(),
  codigo text not null,
  segmento_id uuid references public.segmentos(id),
  instrutor_id uuid references public.usuarios(id),
  data_inicio date,
  data_fim date,
  status text check (status in ('planejada', 'em_andamento', 'concluida', 'cancelada')),
  created_at timestamp with time zone default now(),
  constraint turmas_pkey primary key (id)
);

-- Salas
create table public.salas (
  id uuid not null default uuid_generate_v4(),
  nome text not null,
  capacidade integer,
  localizacao text,
  created_at timestamp with time zone default now(),
  constraint salas_pkey primary key (id)
);

-- Cursos Obrigatórios
create table public.cursos_obrigatorios (
  id uuid not null default uuid_generate_v4(),
  titulo text not null,
  descricao text,
  segmento_id uuid references public.segmentos(id),
  conteudo_url text,
  created_at timestamp with time zone default now(),
  constraint cursos_obrigatorios_pkey primary key (id)
);

-- Avaliação Final
create table public.avaliacoes_finais (
  id uuid not null default uuid_generate_v4(),
  turma_id uuid references public.turmas(id),
  aluno_id uuid references public.usuarios(id),
  nota numeric(5,2),
  aprovado boolean,
  comentarios text,
  created_at timestamp with time zone default now(),
  constraint avaliacoes_finais_pkey primary key (id)
);

-- Presença Diária
create table public.presenca_diaria (
  id uuid not null default uuid_generate_v4(),
  turma_id uuid references public.turmas(id),
  aluno_id uuid references public.usuarios(id),
  data date not null,
  presente boolean default false,
  justificativa text,
  created_at timestamp with time zone default now(),
  constraint presenca_diaria_pkey primary key (id)
);

-- Logs AI
create table public.logs_ai (
  id uuid not null default uuid_generate_v4(),
  usuario_id uuid references public.usuarios(id),
  acao text,
  prompt text,
  resposta text,
  modelo text,
  created_at timestamp with time zone default now(),
  constraint logs_ai_pkey primary key (id)
);

-- RLS Policies (Basic Setup - to be refined)
alter table public.clientes enable row level security;
alter table public.hierarquia enable row level security;
alter table public.usuarios enable row level security;
alter table public.turmas enable row level security;

-- Policy: Allow read access to authenticated users
create policy "Allow read access to authenticated users" on public.clientes for select using (auth.role() = 'authenticated');
create policy "Allow read access to authenticated users" on public.hierarquia for select using (auth.role() = 'authenticated');
create policy "Allow read access to authenticated users" on public.usuarios for select using (auth.role() = 'authenticated');
