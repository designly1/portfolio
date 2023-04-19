--  RUN 1st
create extension vector;

-- RUN 2nd
create table vsearch (
  id bigserial primary key,
  document_title text,
  page_no int2,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function vector_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  document_title text,
  page_no int2,
  content text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    vsearch.id,
    vsearch.document_title,
    vsearch.page_no,
    vsearch.content,
    vsearch.content_length,
    vsearch.content_tokens,
    1 - (vsearch.embedding <=> query_embedding) as similarity
  from vsearch
  where 1 - (vsearch.embedding <=> query_embedding) > similarity_threshold
  order by vsearch.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on vsearch 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);