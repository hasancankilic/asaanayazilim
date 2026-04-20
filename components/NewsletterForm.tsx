"use client";

import { useState, memo } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "@/lib/icons";

const NewsletterForm = memo(() => {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Abonelik başarısız");
      }

      setStatus("success");
      setEmail("");
      setName("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Bir hata oluştu");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-white font-semibold mb-2">{t('newsletter.success')}</h3>
        <p className="text-white/70 text-sm">{t('newsletter.successMessage')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('newsletter.namePlaceholder')}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.emailPlaceholder')}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={status === "loading"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !email}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t('newsletter.submit')}
          </>
        )}
      </button>

      <p className="text-xs text-white/50 text-center">
        {t('newsletter.privacy')}
      </p>
    </form>
  );
});

NewsletterForm.displayName = "NewsletterForm";

export default NewsletterForm;
