"use client";

import { Link } from "@/i18n/routing";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "@/lib/icons";
import { useState, memo } from "react";
import { CONTACT_INFO } from "@/lib/constants";
import { useTranslations } from "next-intl";
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
      width={160}
      height={160}
      className="w-full h-full object-contain"
      onError={() => setHasError(true)}
      loading="lazy"
      priority={false}
      quality={85}
    />
  );
};

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-blue-500/20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center">
                <LogoWithFallback />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">{t('footer.links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/hizmetler"
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('footer.services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/projeler"
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('footer.projects')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/kvkk"
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('footer.kvkk')}
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">{t('footer.contact')}</h3>
            <div className="space-y-2 text-white/70 text-sm sm:text-base">
              <a
                href={CONTACT_INFO.phoneHref}
                className="block hover:text-white transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="block hover:text-white transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-6">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-white/50 text-xs sm:text-sm">
          <p>&copy; 2025 AŞAANA YAZILIM. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
