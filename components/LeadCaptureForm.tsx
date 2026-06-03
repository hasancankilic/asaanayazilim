"use client";

import { useState, FormEvent } from "react";
import DynamicIcon from "./DynamicIcon";

interface LeadFormProps {
  locale?: "tr" | "en";
  serviceType?: string;
  title?: string;
  description?: string;
  accentColor?: string; // e.g. "blue", "purple", "cyan", "emerald"
}

export default function LeadCaptureForm({
  locale = "tr",
  serviceType = "general",
  title,
  description,
  accentColor = "blue",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isTR = locale === "tr";

  const labels = {
    title: title || (isTR ? "Ücretsiz Teklif Alın" : "Get a Free Quote"),
    description:
      description ||
      (isTR
        ? "Projenizi birlikte değerlendirelim. Formu doldurun, 24 saat içinde size dönüş yapalım."
        : "Let's evaluate your project together. Fill out the form and we'll get back to you within 24 hours."),
    name: isTR ? "Ad Soyad" : "Full Name",
    company: isTR ? "Şirket Adı" : "Company Name",
    email: isTR ? "E-posta" : "Email",
    phone: isTR ? "Telefon" : "Phone",
    message: isTR ? "Projeniz Hakkında" : "About Your Project",
    messagePlaceholder: isTR
      ? "Projenizi kısaca anlatın: hangi hizmete ihtiyacınız var, hedefleriniz neler?"
      : "Briefly describe your project: what service do you need, what are your goals?",
    submit: isTR ? "Teklif İsteyin" : "Request a Quote",
    submitting: isTR ? "Gönderiliyor..." : "Sending...",
    success: isTR
      ? "✓ Talebiniz alındı! 24 saat içinde size dönüş yapacağız."
      : "✓ Your request has been received! We'll get back to you within 24 hours.",
    error: isTR ? "Bir hata oluştu. Lütfen tekrar deneyin." : "An error occurred. Please try again.",
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      serviceType,
      source: "landing-page-form",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(labels.error);
      }
    } catch {
      setStatus("error");
      setErrorMsg(labels.error);
    }
  }

  const colorMap: Record<string, string> = {
    blue: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/50",
    purple: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/50",
    cyan: "from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-cyan-500/50",
    emerald: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/50",
  };

  const borderColor = {
    blue: "border-blue-500/20",
    purple: "border-purple-500/20",
    cyan: "border-cyan-500/20",
    emerald: "border-emerald-500/20",
  }[accentColor] || "border-blue-500/20";

  if (status === "success") {
    return (
      <div className={`glass-card rounded-2xl p-10 text-center border ${borderColor}`}>
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-xl text-white font-semibold">{labels.success}</p>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-2xl p-8 md:p-10 border ${borderColor}`}>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{labels.title}</h3>
      <p className="text-white/60 mb-6">{labels.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">{labels.name} *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-colors"
              placeholder="Ahmet Yılmaz"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">{labels.company}</label>
            <input
              type="text"
              name="company"
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-colors"
              placeholder={isTR ? "Şirketiniz" : "Your Company"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">{labels.email} *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-colors"
              placeholder="ornek@sirket.com"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">{labels.phone}</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-colors"
              placeholder="0555 555 55 55"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">{labels.message} *</label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-colors resize-none"
            placeholder={labels.messagePlaceholder}
          />
        </div>

        {status === "error" && (
          <p className="text-red-400 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${colorMap[accentColor] || colorMap.blue} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {labels.submitting}
            </>
          ) : (
            <>
              {labels.submit}
              <DynamicIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
