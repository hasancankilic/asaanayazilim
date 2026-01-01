"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Menu, X } from "@/lib/icons";
import { trackCTA } from "@/lib/analytics-client";
import Image from "next/image";

const LogoWithFallback = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-lg flex items-center justify-center">
        <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-sm rotate-45"></div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="AŞAANA YAZILIM Logo"
      width={128}
      height={128}
      className="w-full h-full object-contain"
      onError={() => setHasError(true)}
      loading="lazy"
      priority={false}
      quality={85}
    />
  );
};

const Navbar = () => {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { key: "home", href: "/" },
    { key: "services", href: "/hizmetler" },
    { key: "projects", href: "/projeler" },
    { key: "about", href: "/hakkimizda" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/iletisim" },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        willChange: scrolled ? 'background-color, backdrop-filter' : 'auto',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center group z-50">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <LogoWithFallback />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative text-white/90 hover:text-white transition-colors group"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              href="/iletisim"
              onClick={() => trackCTA('navbar_teklif_al')}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
            >
              {t('nav.getQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-blue-500/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block text-white/90 hover:text-white transition-colors py-2 text-lg"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <LanguageSwitcher />
                <Link
                  href="/iletisim"
                  onClick={() => trackCTA('navbar_teklif_al')}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  {t('nav.getQuote')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default memo(Navbar);
