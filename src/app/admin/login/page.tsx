import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { getAdminSession } from "@/lib/admin-auth";
import { DEFAULT_SUPER_ADMIN } from "@/lib/admin-config";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata = {
  title: "Admin Login | TEAmamos",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const admin = DEFAULT_SUPER_ADMIN;

  return (
    <main className="min-h-screen bg-gradient-to-br from-areia via-white to-teal/10 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-white/60 bg-marinho px-8 py-10 text-white shadow-[0_30px_100px_rgba(38,52,71,0.18)]">
            <div className="mb-10 flex items-center gap-4">
              <div className="rounded-xl bg-white/10 p-3">
                <ShieldCheck size={28} className="text-mostarda" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                  Painel Administrativo
                </p>
                <div className="mt-2">
                  <BrandLogo variant="text" className="h-8 w-auto" />
                </div>
              </div>
            </div>

            <h1 className="max-w-md font-nunito text-4xl font-extrabold leading-tight">
              Acompanhe cada colaboração que chega ao projeto.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Este primeiro painel foi preparado para centralizar as mensagens enviadas pela comunidade
              e dar visibilidade imediata ao que famílias, pessoas TEA e profissionais estão trazendo.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Super admin inicial</p>
                <p className="mt-2 font-nunito text-xl font-bold">{admin.nome}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">E-mail de acesso</p>
                <p className="mt-2 text-sm font-semibold text-white/80">{admin.email}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-areia-dark bg-white px-6 py-8 shadow-[0_24px_70px_rgba(38,52,71,0.12)] sm:px-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Acesso protegido</p>
              <h2 className="mt-3 font-nunito text-3xl font-extrabold text-marinho">Entrar no admin</h2>
              <p className="mt-3 text-sm leading-relaxed text-marinho/65">
                Faça login para visualizar as colaborações recebidas e acompanhar o início da operação do TEAmamos.
              </p>
            </div>

            <AdminLoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}
