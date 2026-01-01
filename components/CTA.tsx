"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { trackCTA } from "@/lib/analytics-client";
import { useTranslations } from "next-intl";
import { memo } from "react";

const CTA = () => {
  const t = useTranslations();

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white px-4">
            {t('cta.title')}
          </h2>
          <Link
            href="/iletisim"
            onClick={() => trackCTA('homepage_cta')}
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
          >
            {t('cta.button')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(CTA);
