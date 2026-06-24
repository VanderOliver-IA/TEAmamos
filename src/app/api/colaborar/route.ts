import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nome,
      email,
      whatsapp,
      cidade,
      perfil,
      relacao_tea,
      idade_tea,
      nivel_suporte,
      maior_dificuldade,
      dificuldade_texto,
      recurso_desejado,
      apps_usados,
      o_que_funcionou,
      o_que_nao_funcionou,
      funcionalidade_indispensavel,
      aceita_entrevista,
      aceita_beta,
      aceita_atualizacoes,
      aceita_termos,
    } = body;

    // Validation
    if (!nome || !email || !perfil) {
      return NextResponse.json(
        { error: "Nome, email e perfil são obrigatórios." },
        { status: 400 }
      );
    }

    if (!aceita_termos) {
      return NextResponse.json(
        { error: "É necessário aceitar os termos." },
        { status: 400 }
      );
    }

    const db = getDb();

    // Insert colaborador
    const insertColaborador = db.prepare(`
      INSERT INTO colaboradores (nome, email, whatsapp, cidade, perfil, relacao_tea, idade_tea, nivel_suporte, aceita_entrevista, aceita_beta, aceita_atualizacoes, aceita_termos)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertColaborador.run(
      nome,
      email,
      whatsapp || null,
      cidade || null,
      perfil,
      relacao_tea || null,
      idade_tea || null,
      nivel_suporte || null,
      aceita_entrevista ? 1 : 0,
      aceita_beta ? 1 : 0,
      aceita_atualizacoes ? 1 : 0,
      aceita_termos ? 1 : 0
    );

    const colaboradorId = result.lastInsertRowid;

    // Insert contribuicao
    const insertContribuicao = db.prepare(`
      INSERT INTO contribuicoes (colaborador_id, maior_dificuldade, dificuldade_texto, recurso_desejado, apps_usados, o_que_funcionou, o_que_nao_funcionou, funcionalidade_indispensavel)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertContribuicao.run(
      colaboradorId,
      Array.isArray(maior_dificuldade) ? maior_dificuldade.join(", ") : maior_dificuldade || null,
      dificuldade_texto || null,
      recurso_desejado || null,
      apps_usados || null,
      o_que_funcionou || null,
      o_que_nao_funcionou || null,
      funcionalidade_indispensavel || null
    );

    return NextResponse.json(
      { success: true, message: "Colaboração recebida com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving collaboration:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar a colaboração." },
      { status: 500 }
    );
  }
}
