import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  getAdminSessionCookieOptions,
  getAdminSessionCookieValue,
  validateDefaultAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha são obrigatórios." }, { status: 400 });
    }

    if (!validateDefaultAdminCredentials(email, password)) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      ADMIN_COOKIE_NAME,
      getAdminSessionCookieValue(),
      getAdminSessionCookieOptions(request.nextUrl.hostname)
    );
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Erro interno ao autenticar." }, { status: 500 });
  }
}
