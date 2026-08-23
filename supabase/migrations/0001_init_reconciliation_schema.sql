create extension if not exists pgcrypto;

create table batches (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  seed integer,
  total_records integer not null default 0,
  match_rate numeric(5,2),
  exception_count integer not null default 0
);

create table raw_transactions (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references batches(id) on delete cascade,
  source text not null check (source in ('ledger', 'settlement', 'bank')),
  date date not null,
  amount numeric(12,2) not null,
  reference_id text not null,
  counterparty text,
  raw_row jsonb not null,
  created_at timestamptz not null default now()
);

create index raw_transactions_batch_id_idx on raw_transactions (batch_id);
create index raw_transactions_reference_id_idx on raw_transactions (reference_id);
create index raw_transactions_source_idx on raw_transactions (source);

create table match_results (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references batches(id) on delete cascade,
  transaction_ids uuid[] not null,
  match_stage text not null check (match_stage in ('exact', 'fuzzy', 'gemini')),
  confidence numeric(4,3),
  status text not null check (status in ('matched', 'exception')),
  reason text,
  created_at timestamptz not null default now()
);

create index match_results_batch_id_idx on match_results (batch_id);
create index match_results_status_idx on match_results (status);

alter table batches enable row level security;
alter table raw_transactions enable row level security;
alter table match_results enable row level security;

create policy "public read batches" on batches for select using (true);
create policy "public read raw_transactions" on raw_transactions for select using (true);
create policy "public read match_results" on match_results for select using (true);
