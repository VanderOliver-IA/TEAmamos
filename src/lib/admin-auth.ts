import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_SUPER_ADMIN } from "@/lib/admin-config";

export const ADMIN_COOKIE_NAME = "teamamos_admin_session";
const ADMIN_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "teamamos-admin-session-secret-v1-eaf4452452fd0cbae07de372a03c0406";

export type AdminSession = {
  nome: string;
  email: string;
  role: string;
  exp: number;
};

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, hash] = storedHash.split(":");
  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const candidate = hashPassword(password, salt);
  if (candidate.length !== hash.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash, "hex"));
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", ADMIN_SESSION_SECRET).update(payload).digest("hex");
}

function encodeSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

function decodeSession(token: string): AdminSession | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  if (signature.length !== expectedSignature.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (parsed.exp < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getDefaultSuperAdmin() {
  return DEFAULT_SUPER_ADMIN;
}

export function validateDefaultAdminCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === DEFAULT_SUPER_ADMIN.email &&
    verifyPassword(password, DEFAULT_SUPER_ADMIN.passwordHash)
  );
}

export function buildAdminSession() {
  return {
    nome: DEFAULT_SUPER_ADMIN.nome,
    email: DEFAULT_SUPER_ADMIN.email,
    role: DEFAULT_SUPER_ADMIN.role,
    exp: Date.now() + ADMIN_SESSION_DURATION_MS,
  } satisfies AdminSession;
}

export function getAdminSessionCookieValue() {
  return encodeSession(buildAdminSession());
}

export function getAdminSessionCookieOptions(hostname?: string) {
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && !isLocalHost,
    path: "/",
    expires: new Date(Date.now() + ADMIN_SESSION_DURATION_MS),
  } as const;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return decodeSession(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
