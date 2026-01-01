"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  Smartphone,
  Monitor,
  Code,
  Brain,
  Palette,
  MessageSquare,
  ArrowRight,
  CheckCircle,
} from "@/lib/icons";
import { useTranslations } from "next-intl";
import { memo } from "react";

const Services = () => {
  const t = useTranslations();

  const services = [
    {
      id: "mobil-uygulama",
      key: "mobile",
      icon: Smartphone,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "web-yazilim",
      key: "web",
      icon: Monitor,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "saas-cozumleri",
      key: "saas",
      icon: Code,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      id: "yapay-zeka",
      key: "ai",
      icon: Brain,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "ui-ux-tasarim",
      key: "design",
      icon: Palette,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "danismanlik",
      key: "consulting",
      icon: MessageSquare,
      gradient: "from-teal-500 to-green-500",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={`/hizmetler/${service.id}`}
                  className="block h-full glass-card rounded-2xl p-6 sm:p-8 cursor-pointer transition-transform duration-300 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] relative overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">
                      {t(`services.items.${service.key}.name`)}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                      {t(`services.items.${service.key}.description`)}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                      {t('services.viewDetails')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
