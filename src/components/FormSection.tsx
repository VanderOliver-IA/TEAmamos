"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "./Animations";
import { Heart, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";

const ROLE_OPTIONS = ["Pai/Mãe", "Pessoa TEA", "Familiar", "Cuidador(a)", "Profissional", "Educador(a)", "Outro"];
const SUPPORT_LEVELS = ["Nível 1", "Nível 2", "Nível 3", "Em avaliação", "Não informado", "Prefiro não classificar"];
const PAIN_CATEGORIES = [
  "Rotina", "Comunicação", "Alimentação", "Sono", "Escola", "Terapias",
  "Medicamentos", "Crises", "Sensorial", "Autonomia", "Socialização",
  "Organização de informações", "Outro",
];

type FormData = {
  nome: string;
  email: string;
  whatsapp: string;
  cidade: string;
  perfil: string;
  relacao_tea: string;
  idade_tea: string;
  nivel_suporte: string;
  maior_dificuldade: string[];
  dificuldade_texto: string;
  recurso_desejado: string;
  apps_usados: string;
  o_que_funcionou: string;
  o_que_nao_funcionou: string;
  funcionalidade_indispensavel: string;
  aceita_entrevista: boolean;
  aceita_beta: boolean;
  aceita_atualizacoes: boolean;
  aceita_termos: boolean;
};

const INITIAL: FormData = {
  nome: "", email: "", whatsapp: "", cidade: "", perfil: "", relacao_tea: "",
  idade_tea: "", nivel_suporte: "", maior_dificuldade: [], dificuldade_texto: "",
  recurso_desejado: "", apps_usados: "", o_que_funcionou: "", o_que_nao_funcionou: "",
  funcionalidade_indispensavel: "", aceita_entrevista: false, aceita_beta: false,
  aceita_atualizacoes: true, aceita_termos: false,
};

const STEP_TITLES = ["Quem é você?", "Sua relação com o TEA", "Dores da rotina", "Ideias para o sistema", "Participação futura"];
const COLORS = ["bg-teal", "bg-coral", "bg-mostarda", "bg-azul"];

export function FormSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string | boolean | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePain = (cat: string) => {
    setData((prev) => ({
      ...prev,
      maior_dificuldade: prev.maior_dificuldade.includes(cat)
        ? prev.maior_dificuldade.filter((c) => c !== cat)
        : [...prev.maior_dificuldade, cat],
    }));
  };

  const canNext = () => {
    switch (step) {
      case 0: return data.nome && data.email && data.perfil;
      case 1: return true;
      case 2: return true;
      case 3: return true;
      case 4: return data.aceita_termos;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/colaborar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      setSubmitted(true);
    } catch {
      setError("Ops! Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="colabore" className="section-padding bg-teal/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-white" />
            </div>
            <h2 className="font-nunito text-3xl font-extrabold text-marinho mb-4">
              Obrigado por ajudar a construir o TEAmamos
            </h2>
            <p className="text-marinho/70 leading-relaxed">
              Sua contribuição foi recebida. Cada relato, ideia e sugestão ajuda a aproximar o TEAmamos
              de uma solução mais humana, prática e útil para famílias, pessoas TEA e profissionais.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="colabore" className="section-padding bg-gradient-to-b from-white to-teal/5">
      <div className="max-w-2xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <span className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            Colabore
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-4">
            Ajude a construir o <span className="text-marinho">TEA</span><span className="text-coral">mamos</span>
          </h2>
          <p className="text-marinho/70 max-w-lg mx-auto">
            Sua experiência pode ajudar a criar uma ferramenta mais humana, prática e útil para famílias,
            pessoas TEA e profissionais.
          </p>
        </SectionReveal>

        {/* Progress bar with puzzle pieces */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEP_TITLES.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i <= step ? `${COLORS[i % 4]} text-white` : "bg-areia-dark text-marinho/40"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < STEP_TITLES.length - 1 && (
                <div className={`w-6 h-0.5 transition-colors ${i < step ? COLORS[i % 4] : "bg-areia-dark"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step title */}
        <h3 className="font-nunito font-bold text-xl text-marinho text-center mb-8">
          {STEP_TITLES[step]}
        </h3>

        {/* Form steps */}
        <div className="bg-white rounded-2xl shadow-lg border border-areia-dark p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">Nome *</label>
                    <input
                      type="text"
                      value={data.nome}
                      onChange={(e) => update("nome", e.target.value)}
                      className="form-input"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">E-mail *</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="form-input"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      value={data.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      className="form-input"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">Cidade/Estado</label>
                    <input
                      type="text"
                      value={data.cidade}
                      onChange={(e) => update("cidade", e.target.value)}
                      className="form-input"
                      placeholder="Sua cidade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">Você é: *</label>
                    <div className="flex flex-wrap gap-2">
                      {ROLE_OPTIONS.map((role) => (
                        <button
                          key={role}
                          onClick={() => update("perfil", role)}
                          className={`chip ${data.perfil === role ? "selected" : ""}`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">Qual sua relação com o TEA?</label>
                    <textarea
                      value={data.relacao_tea}
                      onChange={(e) => update("relacao_tea", e.target.value)}
                      className="form-input min-h-[100px] resize-none"
                      placeholder="Conte sobre sua relação com o TEA..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">Idade da pessoa TEA (se quiser informar)</label>
                    <input
                      type="text"
                      value={data.idade_tea}
                      onChange={(e) => update("idade_tea", e.target.value)}
                      className="form-input"
                      placeholder="Ex: 8 anos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">Nível de suporte (se quiser informar)</label>
                    <div className="flex flex-wrap gap-2">
                      {SUPPORT_LEVELS.map((level) => (
                        <button
                          key={level}
                          onClick={() => update("nivel_suporte", level)}
                          className={`chip ${data.nivel_suporte === level ? "selected" : ""}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-3">
                      Qual é a maior dificuldade da rotina hoje?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PAIN_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => togglePain(cat)}
                          className={`chip ${data.maior_dificuldade.includes(cat) ? "selected" : ""}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">
                      Conte com suas palavras
                    </label>
                    <textarea
                      value={data.dificuldade_texto}
                      onChange={(e) => update("dificuldade_texto", e.target.value)}
                      className="form-input min-h-[120px] resize-none"
                      placeholder="Compartilhe sua experiência..."
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">
                      Que recurso você gostaria que existisse?
                    </label>
                    <textarea
                      value={data.recurso_desejado}
                      onChange={(e) => update("recurso_desejado", e.target.value)}
                      className="form-input min-h-[80px] resize-none"
                      placeholder="Descreva o recurso ideal..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">
                      Você já usou algum aplicativo parecido?
                    </label>
                    <input
                      type="text"
                      value={data.apps_usados}
                      onChange={(e) => update("apps_usados", e.target.value)}
                      className="form-input"
                      placeholder="Nomes dos apps..."
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-marinho mb-2">O que funcionou?</label>
                      <textarea
                        value={data.o_que_funcionou}
                        onChange={(e) => update("o_que_funcionou", e.target.value)}
                        className="form-input min-h-[80px] resize-none"
                        placeholder="..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-marinho mb-2">O que não funcionou?</label>
                      <textarea
                        value={data.o_que_nao_funcionou}
                        onChange={(e) => update("o_que_nao_funcionou", e.target.value)}
                        className="form-input min-h-[80px] resize-none"
                        placeholder="..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-marinho mb-2">
                      Qual funcionalidade seria indispensável?
                    </label>
                    <input
                      type="text"
                      value={data.funcionalidade_indispensavel}
                      onChange={(e) => update("funcionalidade_indispensavel", e.target.value)}
                      className="form-input"
                      placeholder="A funcionalidade mais importante..."
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="space-y-4">
                    {[
                      { key: "aceita_entrevista" as keyof FormData, label: "Gostaria de participar de entrevistas?" },
                      { key: "aceita_beta" as keyof FormData, label: "Gostaria de testar o protótipo?" },
                      { key: "aceita_atualizacoes" as keyof FormData, label: "Gostaria de receber atualizações?" },
                    ].map((opt) => (
                      <label key={opt.key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-areia/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data[opt.key] as boolean}
                          onChange={(e) => update(opt.key, e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-areia-dark text-teal focus:ring-teal"
                        />
                        <span className="text-marinho">{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-areia-dark">
                    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-areia/50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.aceita_termos}
                        onChange={(e) => update("aceita_termos", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-areia-dark text-teal focus:ring-teal mt-0.5"
                      />
                      <span className="text-sm text-marinho/70">
                        Aceito que minhas informações sejam usadas para pesquisa, validação e desenvolvimento
                        do projeto TEAmamos. Nenhum dado será publicado sem autorização. *
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {error && (
            <p className="text-coral text-sm text-center mt-4">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-areia-dark">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-marinho/60 hover:text-marinho transition-colors font-medium"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
            ) : (
              <div />
            )}

            {step < STEP_TITLES.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext() || loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Heart size={18} />}
                {loading ? "Enviando..." : "Enviar colaboração"}
              </button>
            )}
          </div>
        </div>

        {/* Encouragement message */}
        <p className="text-center text-xs text-marinho/40 mt-6">
          Etapa {step + 1} de {STEP_TITLES.length} — Todas as etapas são opcionais, exceto nome, e-mail e perfil.
        </p>
      </div>
    </section>
  );
}
