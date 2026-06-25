import { NextRequest, NextResponse } from "next/server";
import { saveCollaboration } from "@/lib/collaboration-storage";

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

    const provider = await saveCollaboration({
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
    });

    return NextResponse.json(
      {
        success: true,
        message: "Colaboração recebida com sucesso!",
        provider,
      },
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
