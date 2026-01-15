"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import FormInput from '@/components/FormInput';
import { submitContactForm } from '@/app/actions/contact';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from '@/lib/icons';
import { trackFormSubmit } from '@/lib/analytics-client';
import PageTransition from '@/components/PageTransition';
import { CONTACT_INFO } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export default function ContactPageClient() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.validation.name');
    if (!formData.email.trim()) newErrors.email = t('contact.form.validation.email');
    if (!formData.phone.trim()) newErrors.phone = t('contact.form.validation.phone');
    if (!formData.subject.trim()) newErrors.subject = t('contact.form.validation.subject');
    if (!formData.message.trim()) newErrors.message = t('contact.form.validation.message');
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const result = await submitContactForm(formDataObj);
      if (result.success) {
        setIsSubmitted(true);
        trackFormSubmit('contact_page');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setErrors({ submit: result.error || t('contact.form.error') });
      }
    } catch (error) {
      setErrors({ submit: t('contact.form.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            title={t('contact.title')}
            description={t('contact.description')}
            icon={<MessageSquare className="w-12 h-12 text-blue-400" />}
            headingLevel="h1"
          />
        </div>
      </section>

      <PageTransition>
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-4">
                    {t('contact.reachOut.title')}
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {t('contact.reachOut.description')}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="glass-card rounded-2xl p-6 hover:border-blue-400/60 transition-all duration-300 hover:scale-[1.02] group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-lg">{t('contact.reachOut.phone')}</h3>
                        <a
                          href={CONTACT_INFO.phoneHref}
                          className="block text-white/70 hover:text-white transition-colors"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="glass-card rounded-2xl p-6 hover:border-blue-400/60 transition-all duration-300 hover:scale-[1.02] group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-lg">{t('contact.reachOut.email')}</h3>
                        <a
                          href={CONTACT_INFO.emailHref}
                          className="block text-white/70 hover:text-white transition-colors"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="glass-card rounded-2xl p-6 hover:border-blue-400/60 transition-all duration-300 hover:scale-[1.02] group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-lg">{t('contact.reachOut.address')}</h3>
                        <p className="text-white/70 leading-relaxed">
                          {CONTACT_INFO.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                {isSubmitted ? (
                  <div className="glass-card rounded-2xl p-12 text-center border border-green-500/20 bg-gradient-to-br from-green-500/5 to-blue-500/5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl font-semibold text-white mb-4">
                      {t('contact.form.success.title')}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {t('contact.form.success.description')}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-white transition-all duration-300 hover:scale-105"
                    >
                      {t('contact.form.success.newMessage')}
                    </button>
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-8">
                    <h2 className="text-3xl font-semibold text-white mb-6">
                      {t('contact.form.title')}
                    </h2>

                    {errors.submit && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                        {errors.submit}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <FormInput
                        label={t('contact.form.name')}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        placeholder={t('contact.form.namePlaceholder')}
                      />

                      <FormInput
                        label={t('contact.form.email')}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        placeholder={t('contact.form.emailPlaceholder')}
                      />

                      <FormInput
                        label={t('contact.form.phone')}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                        placeholder={t('contact.form.phonePlaceholder')}
                      />

                      <FormInput
                        label={t('contact.form.subject')}
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        required
                        placeholder={t('contact.form.subjectPlaceholder')}
                      />

                      <FormInput
                        label={t('contact.form.message')}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        required
                        multiline
                        rows={6}
                        placeholder={t('contact.form.messagePlaceholder')}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-600/50 disabled:to-purple-600/50 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t('contact.form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t('contact.form.submit')}
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  );
}

