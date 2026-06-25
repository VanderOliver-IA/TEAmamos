import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({
    authenticated: Boolean(session),
    session: session
      ? {
          nome: session.nome,
          email: session.email,
          role: session.role,
        }
      : null,
  });
}
