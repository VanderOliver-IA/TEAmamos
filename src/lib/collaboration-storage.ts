import "server-only";

import { getDb } from "@/lib/db";
import { getServiceRoleSupabase, isSupabaseConfigured } from "@/lib/supabase";

export type CollaborationInput = {
  nome: string;
  email: string;
  whatsapp?: string;
  cidade?: string;
  perfil: string;
  relacao_tea?: string;
  idade_tea?: string;
  nivel_suporte?: string;
  maior_dificuldade?: string[] | string;
  dificuldade_texto?: string;
  recurso_desejado?: string;
  apps_usados?: string;
  o_que_funcionou?: string;
  o_que_nao_funcionou?: string;
  funcionalidade_indispensavel?: string;
  aceita_entrevista?: boolean;
  aceita_beta?: boolean;
  aceita_atualizacoes?: boolean;
  aceita_termos: boolean;
};

type StorageProvider = "supabase" | "sqlite";

export type CollaborationRecord = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string | null;
  cidade: string | null;
  perfil: string;
  relacao_tea: string | null;
  idade_tea: string | null;
  nivel_suporte: string | null;
  maior_dificuldade: string[];
  dificuldade_texto: string | null;
  recurso_desejado: string | null;
  apps_usados: string | null;
  o_que_funcionou: string | null;
  o_que_nao_funcionou: string | null;
  funcionalidade_indispensavel: string | null;
  aceita_entrevista: boolean;
  aceita_beta: boolean;
  aceita_atualizacoes: boolean;
  aceita_termos: boolean;
  origem: string;
  status: string;
  criado_em: string;
};

export type CollaborationListResult = {
  provider: StorageProvider;
  records: CollaborationRecord[];
  warning: string | null;
};

function toNullableString(value?: string) {
  return value?.trim() ? value.trim() : null;
}

function normalizePainPoints(value?: string[] | string) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

async function saveCollaborationToSupabase(input: CollaborationInput) {
  const supabase = getServiceRoleSupabase();

  const payload = {
    nome: input.nome.trim(),
    email: input.email.trim().toLowerCase(),
    whatsapp: toNullableString(input.whatsapp),
    cidade: toNullableString(input.cidade),
    perfil: input.perfil.trim(),
    relacao_tea: toNullableString(input.relacao_tea),
    idade_tea: toNullableString(input.idade_tea),
    nivel_suporte: toNullableString(input.nivel_suporte),
    maior_dificuldade: normalizePainPoints(input.maior_dificuldade),
    dificuldade_texto: toNullableString(input.dificuldade_texto),
    recurso_desejado: toNullableString(input.recurso_desejado),
    apps_usados: toNullableString(input.apps_usados),
    o_que_funcionou: toNullableString(input.o_que_funcionou),
    o_que_nao_funcionou: toNullableString(input.o_que_nao_funcionou),
    funcionalidade_indispensavel: toNullableString(input.funcionalidade_indispensavel),
    aceita_entrevista: Boolean(input.aceita_entrevista),
    aceita_beta: Boolean(input.aceita_beta),
    aceita_atualizacoes: Boolean(input.aceita_atualizacoes),
    aceita_termos: Boolean(input.aceita_termos),
    origem: "landing-page",
    status: "recebido",
  };

  const { error } = await supabase.from("colaboracoes").insert(payload);

  if (error) {
    throw error;
  }
}

function saveCollaborationToSqlite(input: CollaborationInput) {
  const db = getDb();

  const insertColaborador = db.prepare(`
    INSERT INTO colaboradores (nome, email, whatsapp, cidade, perfil, relacao_tea, idade_tea, nivel_suporte, aceita_entrevista, aceita_beta, aceita_atualizacoes, aceita_termos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insertColaborador.run(
    input.nome.trim(),
    input.email.trim().toLowerCase(),
    toNullableString(input.whatsapp),
    toNullableString(input.cidade),
    input.perfil.trim(),
    toNullableString(input.relacao_tea),
    toNullableString(input.idade_tea),
    toNullableString(input.nivel_suporte),
    input.aceita_entrevista ? 1 : 0,
    input.aceita_beta ? 1 : 0,
    input.aceita_atualizacoes ? 1 : 0,
    input.aceita_termos ? 1 : 0
  );

  const colaboradorId = result.lastInsertRowid;

  const insertContribuicao = db.prepare(`
    INSERT INTO contribuicoes (colaborador_id, maior_dificuldade, dificuldade_texto, recurso_desejado, apps_usados, o_que_funcionou, o_que_nao_funcionou, funcionalidade_indispensavel)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertContribuicao.run(
    colaboradorId,
    normalizePainPoints(input.maior_dificuldade).join(", ") || null,
    toNullableString(input.dificuldade_texto),
    toNullableString(input.recurso_desejado),
    toNullableString(input.apps_usados),
    toNullableString(input.o_que_funcionou),
    toNullableString(input.o_que_nao_funcionou),
    toNullableString(input.funcionalidade_indispensavel)
  );
}

export async function saveCollaboration(input: CollaborationInput): Promise<StorageProvider> {
  if (isSupabaseConfigured()) {
    try {
      await saveCollaborationToSupabase(input);
      return "supabase";
    } catch (error) {
      console.error("Supabase save failed, falling back to SQLite:", error);
    }
  }

  saveCollaborationToSqlite(input);
  return "sqlite";
}

async function listCollaborationsFromSupabase() {
  const supabase = getServiceRoleSupabase();
  const { data, error } = await supabase
    .from("colaboracoes")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: String(row.id),
    nome: row.nome,
    email: row.email,
    whatsapp: row.whatsapp,
    cidade: row.cidade,
    perfil: row.perfil,
    relacao_tea: row.relacao_tea,
    idade_tea: row.idade_tea,
    nivel_suporte: row.nivel_suporte,
    maior_dificuldade: Array.isArray(row.maior_dificuldade) ? row.maior_dificuldade : [],
    dificuldade_texto: row.dificuldade_texto,
    recurso_desejado: row.recurso_desejado,
    apps_usados: row.apps_usados,
    o_que_funcionou: row.o_que_funcionou,
    o_que_nao_funcionou: row.o_que_nao_funcionou,
    funcionalidade_indispensavel: row.funcionalidade_indispensavel,
    aceita_entrevista: Boolean(row.aceita_entrevista),
    aceita_beta: Boolean(row.aceita_beta),
    aceita_atualizacoes: Boolean(row.aceita_atualizacoes),
    aceita_termos: Boolean(row.aceita_termos),
    origem: row.origem ?? "landing-page",
    status: row.status ?? "recebido",
    criado_em: row.criado_em,
  })) satisfies CollaborationRecord[];
}

function listCollaborationsFromSqlite(): CollaborationRecord[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT
      c.id AS colaborador_id,
      c.nome,
      c.email,
      c.whatsapp,
      c.cidade,
      c.perfil,
      c.relacao_tea,
      c.idade_tea,
      c.nivel_suporte,
      c.aceita_entrevista,
      c.aceita_beta,
      c.aceita_atualizacoes,
      c.aceita_termos,
      c.criado_em,
      ct.maior_dificuldade,
      ct.dificuldade_texto,
      ct.recurso_desejado,
      ct.apps_usados,
      ct.o_que_funcionou,
      ct.o_que_nao_funcionou,
      ct.funcionalidade_indispensavel
    FROM colaboradores c
    LEFT JOIN contribuicoes ct ON ct.colaborador_id = c.id
    ORDER BY c.id DESC
  `).all() as Array<Record<string, string | number | null>>;

  return rows.map((row) => ({
    id: String(row.colaborador_id),
    nome: String(row.nome),
    email: String(row.email),
    whatsapp: (row.whatsapp as string | null) ?? null,
    cidade: (row.cidade as string | null) ?? null,
    perfil: String(row.perfil),
    relacao_tea: (row.relacao_tea as string | null) ?? null,
    idade_tea: (row.idade_tea as string | null) ?? null,
    nivel_suporte: (row.nivel_suporte as string | null) ?? null,
    maior_dificuldade: String(row.maior_dificuldade ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    dificuldade_texto: (row.dificuldade_texto as string | null) ?? null,
    recurso_desejado: (row.recurso_desejado as string | null) ?? null,
    apps_usados: (row.apps_usados as string | null) ?? null,
    o_que_funcionou: (row.o_que_funcionou as string | null) ?? null,
    o_que_nao_funcionou: (row.o_que_nao_funcionou as string | null) ?? null,
    funcionalidade_indispensavel: (row.funcionalidade_indispensavel as string | null) ?? null,
    aceita_entrevista: Boolean(row.aceita_entrevista),
    aceita_beta: Boolean(row.aceita_beta),
    aceita_atualizacoes: Boolean(row.aceita_atualizacoes),
    aceita_termos: Boolean(row.aceita_termos),
    origem: "landing-page",
    status: "recebido",
    criado_em: String(row.criado_em),
  }));
}

function listCollaborationsFromSqliteSafely() {
  try {
    return {
      records: listCollaborationsFromSqlite(),
      warning: null,
    };
  } catch (error) {
    console.error("SQLite fallback failed while listing collaborations:", error);
    return {
      records: [] as CollaborationRecord[],
      warning:
        "Nao foi possivel carregar as colaboracoes neste ambiente. Verifique as variaveis do Supabase na Vercel para o painel funcionar sem depender do fallback local.",
    };
  }
}

export async function listCollaborations(): Promise<CollaborationListResult> {
  if (isSupabaseConfigured()) {
    try {
      const records = await listCollaborationsFromSupabase();
      return {
        provider: "supabase",
        records,
        warning: null,
      };
    } catch (error) {
      const maybeError = error as { code?: string; message?: string };
      const baseWarning = maybeError?.code === "PGRST205"
        ? "O Supabase está configurado, mas a tabela public.colaboracoes ainda não foi criada. Rode o arquivo supabase/schema.sql no SQL Editor."
        : "Não foi possível carregar as colaborações no Supabase. O painel está usando o fallback local.";

      console.error("Supabase list failed, falling back to SQLite:", error);
      const sqliteFallback = listCollaborationsFromSqliteSafely();
      return {
        provider: "sqlite",
        records: sqliteFallback.records,
        warning: sqliteFallback.warning ?? baseWarning,
      };
    }
  }

  const sqliteFallback = listCollaborationsFromSqliteSafely();
  return {
    provider: "sqlite",
    records: sqliteFallback.records,
    warning:
      sqliteFallback.warning ??
      "Supabase ainda não está configurado neste ambiente. O painel está usando o fallback local.",
  };
}
