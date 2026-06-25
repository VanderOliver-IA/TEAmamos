"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("omd.vandersonoliveira@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Falha ao entrar.");
      }

      router.push("/admin");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Falha ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-marinho">E-mail</label>
        <div className="flex items-center gap-3 rounded-xl border border-areia-dark bg-white px-4 py-3">
          <Mail size={18} className="text-teal" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-sm text-marinho outline-none"
            placeholder="seu@email.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-marinho">Senha</label>
        <div className="flex items-center gap-3 rounded-xl border border-areia-dark bg-white px-4 py-3">
          <LockKeyhole size={18} className="text-coral" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-transparent text-sm text-marinho outline-none"
            placeholder="Sua senha"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      {error ? <p className="text-sm font-medium text-coral">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? "Entrando..." : "Entrar no painel"}
      </button>
    </form>
  );
}
