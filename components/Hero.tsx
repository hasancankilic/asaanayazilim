"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "@/lib/icons";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const Hero = () => {
  const t = useTranslations();

  // Pre-calculate particle positions to avoid Math.random() in render/animate
  const particles = useMemo(() => 
    Array.from({ length: 6 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetY: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Particles - Reduced for performance, pre-calculated positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{ willChange: 'transform, opacity' }}
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              y: `${particle.targetY}%`,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {t('hero.title')}
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-blue-200 font-medium">
            {t('hero.subtitle')}
          </p>

          <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/projeler"
              className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 text-sm sm:text-base"
            >
              {t('hero.cta1')}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-center transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
            >
              {t('hero.cta2')}
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 sm:gap-8 pt-6 md:pt-8"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
              <div className="text-xs sm:text-sm text-white/60">{t('hero.stats.projects')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
              <div className="text-xs sm:text-sm text-white/60">{t('hero.stats.clients')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-xs sm:text-sm text-white/60">{t('hero.stats.support')}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Device Mockups */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] hidden lg:block"
        >
          {/* Laptop Mockup */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-10 w-full max-w-[600px]"
            style={{ willChange: 'transform' }}
          >
            <div className="relative">
              {/* Laptop Frame */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-2xl p-2 shadow-2xl border border-slate-700/50">
                {/* Screen */}
                <div className="bg-slate-900 rounded-lg overflow-hidden aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20"></div>
                  {/* Dashboard UI Preview */}
                  <div className="absolute inset-0 p-6 flex flex-col gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          className="h-16 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <div className="h-32 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg mt-4 border border-blue-500/20"></div>
                  </div>
                </div>
              </div>
              {/* Laptop Base */}
              <div className="h-2 bg-slate-800 rounded-b-lg mx-8"></div>
              <div className="h-1 bg-slate-900 rounded-full mx-16"></div>
            </div>
          </motion.div>

          {/* Mobile Mockup */}
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute right-0 bottom-10 w-[200px]"
            style={{ willChange: 'transform' }}
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-2 shadow-2xl border border-slate-700/50">
                {/* Screen */}
                <div className="bg-slate-900 rounded-[2rem] overflow-hidden aspect-[9/19.5] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20"></div>
                  {/* Mobile UI Preview */}
                  <div className="absolute inset-0 p-4 flex flex-col gap-2">
                    <div className="h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10"></div>
                    <div className="space-y-2 mt-4">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="h-12 bg-white/10 rounded-lg border border-white/10"
                          style={{
                            willChange: 'opacity',
                            backdropFilter: 'blur(4px)',
                          }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Glow Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-2xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
