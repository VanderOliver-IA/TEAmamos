import { LogOut, Mail, MapPin, Shield } from "lucide-react";

import { listCollaborations } from "@/lib/collaboration-storage";
import { requireAdminSession } from "@/lib/admin-auth";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata = {
  title: "Admin | TEAmamos",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsed);
}

export default async function AdminPage() {
  const session = await requireAdminSession();
  const { provider, records, warning } = await listCollaborations();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f3eee8_0%,#fffdfa_48%,#eef8f7_100%)] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-white/70 bg-marinho px-6 py-6 text-white shadow-[0_24px_80px_rgba(38,52,71,0.16)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">TEAmamos Admin</p>
              <div className="mt-3">
                <BrandLogo variant="text" className="h-9 w-auto" />
              </div>
              <h1 className="mt-5 font-nunito text-3xl font-extrabold sm:text-4xl">
                Colaborações recebidas pela comunidade
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
                Aqui você acompanha tudo o que já chegou pelo formulário público e consegue ler os detalhes
                com clareza, sem depender de buscas manuais.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm">
                <p className="font-semibold text-white">{session.nome}</p>
                <p className="text-white/60">{session.email}</p>
              </div>

              <form action="/api/admin/logout" method="post">
                <button type="submit" className="btn-secondary border-white text-white hover:bg-white hover:text-marinho">
                  <LogOut size={16} />
                  Sair
                </button>
              </form>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-areia-dark bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marinho/45">Total recebido</p>
            <p className="mt-3 font-nunito text-4xl font-extrabold text-marinho">{records.length}</p>
          </div>
          <div className="rounded-xl border border-areia-dark bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marinho/45">Fonte ativa</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
              <Shield size={15} />
              {provider === "supabase" ? "Supabase" : "SQLite fallback"}
            </div>
          </div>
          <div className="rounded-xl border border-areia-dark bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marinho/45">Estado do admin</p>
            <p className="mt-3 text-sm font-semibold text-marinho">
              Super admin ativo com acesso total ao painel.
            </p>
          </div>
        </section>

        {warning ? (
          <section className="mb-6 rounded-xl border border-mostarda/30 bg-mostarda/12 px-5 py-4 text-sm leading-relaxed text-marinho">
            {warning}
          </section>
        ) : null}

        <section className="space-y-4">
          {records.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-areia-dark bg-white px-6 py-12 text-center shadow-sm">
              <h2 className="font-nunito text-2xl font-extrabold text-marinho">Nenhuma colaboração por aqui ainda.</h2>
              <p className="mt-3 text-sm leading-relaxed text-marinho/65">
                Assim que o formulário receber mensagens, elas aparecem neste painel com os detalhes completos.
              </p>
            </div>
          ) : (
            records.map((record) => (
              <article
                key={record.id}
                className="rounded-2xl border border-areia-dark bg-white p-6 shadow-[0_16px_40px_rgba(38,52,71,0.06)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-nunito text-2xl font-extrabold text-marinho">{record.nome}</h2>
                      <span className="rounded-full bg-coral/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                        {record.perfil}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-marinho/65 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                      <span className="inline-flex items-center gap-2">
                        <Mail size={15} className="text-teal" />
                        {record.email}
                      </span>
                      {record.cidade ? (
                        <span className="inline-flex items-center gap-2">
                          <MapPin size={15} className="text-azul" />
                          {record.cidade}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-xl bg-areia px-4 py-3 text-sm font-semibold text-marinho/70">
                    {formatDate(record.criado_em)}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl bg-areia/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">Maior dificuldade</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.maior_dificuldade.length ? record.maior_dificuldade.join(", ") : "Não informado"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-areia/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">Funcionalidade indispensável</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.funcionalidade_indispensavel || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-areia-dark/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">Relação com o TEA</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.relacao_tea || "Não informado"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-areia-dark/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">O que a pessoa gostaria que existisse</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.recurso_desejado || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-xl border border-areia-dark/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">O que funcionou</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.o_que_funcionou || "Não informado"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-areia-dark/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">O que não funcionou</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.o_que_nao_funcionou || "Não informado"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-areia-dark/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">Apps já usados</p>
                    <p className="mt-2 text-sm leading-relaxed text-marinho">
                      {record.apps_usados || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-areia-dark/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marinho/45">Relato livre</p>
                  <p className="mt-2 text-sm leading-relaxed text-marinho">
                    {record.dificuldade_texto || "Não informado"}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
