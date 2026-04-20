"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Quote } from "@/lib/icons";
import { useMemo } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const Testimonials = () => {
  const t = useTranslations();

  const testimonials: Testimonial[] = useMemo(() => [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "CTO",
      company: "TechCorp",
      content: "AŞAANA Yazılım ile çalışmak harika bir deneyimdi. Projemizi zamanında ve beklentilerimizin üzerinde teslim ettiler.",
      rating: 5,
    },
    {
      id: 2,
      name: "Elif Demir",
      role: "Product Manager",
      company: "StartupX",
      content: "Mobil uygulamamız için mükemmel bir iş çıkardılar. Kullanıcılarımızdan çok olumlu geri bildirimler alıyoruz.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      role: "CEO",
      company: "E-Commerce Pro",
      content: "E-ticaret platformumuzu sıfırdan geliştirdiler. Satışlarımız %150 arttı. Kesinlikle tavsiye ediyorum!",
      rating: 5,
    },
  ], []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-blue-500/20">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/80 mb-6 leading-relaxed line-clamp-4">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-white/60">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
            <div className="text-sm text-white/60">{t('testimonials.stats.projects')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-white/60">{t('testimonials.stats.clients')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">4.9</div>
            <div className="text-sm text-white/60">{t('testimonials.stats.rating')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-white/60">{t('testimonials.stats.support')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
