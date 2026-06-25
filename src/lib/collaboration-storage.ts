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
