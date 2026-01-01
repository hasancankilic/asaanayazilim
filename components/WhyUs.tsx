"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Shield, Activity, CheckCircle } from "@/lib/icons";
import { memo } from "react";

const features = [
  {
    icon: Clock,
    title: "Hızlı Teslim",
    description: "Agile metodoloji ile hızlı iterasyon ve sürekli teslimat",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Modern Teknoloji",
    description: "En güncel teknolojiler ve best practice'ler ile geliştirme",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Ölçeklenebilir Yapı",
    description: "Büyüyen işinize uyum sağlayan, güvenli altyapı",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Activity,
    title: "Gerçek Zamanlı Sistemler",
    description: "Anlık veri işleme ve kullanıcı deneyimi optimizasyonu",
    color: "from-orange-500 to-red-500",
  },
];

const WhyUs = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Neden Biz?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Deneyimli ekibimiz ve modern yaklaşımımızla işinizi bir üst seviyeye taşıyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  willChange: 'transform, opacity',
                }}
                className="group"
              >
                <div 
                  className="glass-card rounded-2xl p-8 h-full text-center transition-transform duration-300 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] relative overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card rounded-2xl p-8 border border-blue-500/20"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "7/24 Teknik Destek",
              "Sürekli Güncelleme ve İyileştirme",
              "Detaylı Dokümantasyon",
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(WhyUs);
