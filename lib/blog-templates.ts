/**
 * Blog Content Generation Templates — AŞAANA YAZILIM
 * Reusable templates for auto-generating SEO-optimized blog posts
 * Used by scripts/seed-blog.ts and admin panel for content generation
 */

export interface BlogTemplate {
  id: string;
  keyword: string;
  titlePattern: string;
  seoTitlePattern: string;
  seoDescriptionPattern: string;
  category: string;
  sectionHeadings: string[];
  ctaText: string;
  ctaLink: string;
  faqCount: number;
  targetWordCount: [number, number]; // [min, max]
}

export const blogTemplates: BlogTemplate[] = [
  // ─── ERP TEMPLATES ───────────────────────────────────────
  {
    id: 'erp-guide',
    keyword: 'ERP nedir',
    titlePattern: '{Keyword}: {Year} Kapsamlı Rehber | AŞAANA YAZILIM',
    seoTitlePattern: '{Keyword} Nedir? Nasıl Çalışır? {Year} Rehber',
    seoDescriptionPattern: '{keyword} hakkında bilmeniz gereken her şey. Modüller, faydalar, maliyet ve kurulum süreci. Ücretsiz danışmanlık için tıklayın.',
    category: 'ERP',
    sectionHeadings: [
      '{Keyword} Nedir?',
      '{Keyword} Ne İşe Yarar?',
      '{Keyword} Modülleri Nelerdir?',
      'Hangi İşletmeler {Keyword} Sistemine İhtiyaç Duyar?',
      '{Keyword} Sistemi Seçerken Dikkat Edilmesi Gerekenler',
      'Özel {Keyword} vs Hazır {Keyword}: Hangisini Seçmeli?',
      '{Keyword} Kurulum Süreci Nasıl İşler?',
      '{Year} {Keyword} Trendleri',
    ],
    ctaText: 'İşletmenize özel {keyword} çözümü için ücretsiz ihtiyaç analizi alın.',
    ctaLink: '/erp-yazilimi',
    faqCount: 4,
    targetWordCount: [1200, 2000],
  },
  {
    id: 'erp-cost',
    keyword: 'ERP yazılımı fiyatları',
    titlePattern: '{Keyword} {Year}: Maliyet Rehberi ve Bütçe Planlaması',
    seoTitlePattern: '{Keyword} {Year} | Küçük, Orta ve Büyük İşletme Fiyatları',
    seoDescriptionPattern: '{Year} {keyword} ne kadar? İşletme büyüklüğüne göre fiyat aralıkları, gizli maliyetler ve ROI analizi.',
    category: 'ERP',
    sectionHeadings: [
      '{Year} {Keyword} Genel Bakış',
      'Küçük İşletme {Keyword} (1-10 Çalışan)',
      'Orta Ölçekli İşletme {Keyword} (10-100 Çalışan)',
      'Büyük İşletme {Keyword} (100+ Çalışan)',
      'Hazır ERP vs Özel ERP: Maliyet Karşılaştırma',
      'Gizli Maliyetler ve Dikkat Edilmesi Gerekenler',
      'ERP Yatırımı Ne Kadar Sürede Amorti Eder?',
    ],
    ctaText: 'İşletmenize özel {keyword} teklifi için hemen iletişime geçin.',
    ctaLink: '/iletisim',
    faqCount: 3,
    targetWordCount: [1200, 1800],
  },
  {
    id: 'erp-comparison',
    keyword: 'ERP karşılaştırma',
    titlePattern: '{Keyword}: En İyi Sistemler ve Seçim Rehberi ({Year})',
    seoTitlePattern: '{Keyword} {Year} | Hazır vs Özel ERP Analizi',
    seoDescriptionPattern: '{keyword} rehberi. SAP, Oracle, Microsoft Dynamics ve özel ERP çözümleri karşılaştırması. KOBİ ve büyük işletmeler için.',
    category: 'ERP',
    sectionHeadings: [
      '{Keyword} Neden Önemli?',
      'Piyasadaki Popüler ERP Sistemleri',
      'Karşılaştırma Kriterleri',
      'Hazır ERP Sistemleri: Avantaj ve Dezavantajlar',
      'Özel ERP Çözümleri: Avantaj ve Dezavantajlar',
      'Karşılaştırma Tablosu',
      'İşletmenize En Uygun ERP Nasıl Seçilir?',
    ],
    ctaText: 'İşletmenize %100 uygun özel ERP için ücretsiz teklif alın.',
    ctaLink: '/erp-yazilimi',
    faqCount: 3,
    targetWordCount: [1000, 1600],
  },
  {
    id: 'erp-industry',
    keyword: 'sektörel ERP',
    titlePattern: '{Industry} İçin ERP Sistemi: {Year} Kapsamlı Rehber',
    seoTitlePattern: '{Industry} ERP Sistemi | Sektöre Özel Çözümler {Year}',
    seoDescriptionPattern: '{industry} sektörüne özel ERP çözümleri. Sektör ihtiyaçlarına göre modüller, maliyet ve kurulum süreci.',
    category: 'ERP',
    sectionHeadings: [
      '{Industry} Sektöründe ERP Neden Gerekli?',
      '{Industry} ERP Sistemi Temel Modülleri',
      'Sektöre Özel Gereksinimler ve Çözümler',
      '{Industry} ERP Başarı Hikayeleri',
      'Sektörünüze Uygun ERP Nasıl Seçilir?',
    ],
    ctaText: '{industry} sektörüne özel ERP çözümü için ücretsiz danışmanlık alın.',
    ctaLink: '/iletisim',
    faqCount: 3,
    targetWordCount: [1000, 1500],
  },

  // ─── CUSTOM SOFTWARE TEMPLATES ────────────────────────────
  {
    id: 'software-comparison',
    keyword: 'özel yazılım vs hazır yazılım',
    titlePattern: '{Keyword}: {Year} Detaylı Karşılaştırma Rehberi',
    seoTitlePattern: '{Keyword} | Hangisi Daha Avantajlı? ({Year})',
    seoDescriptionPattern: '{keyword} karşılaştırması. Maliyet, esneklik, ölçeklenebilirlik ve uzun vadeli değer açısından detaylı analiz.',
    category: 'Custom Software',
    sectionHeadings: [
      'Yazılım Seçiminde Karar Anı',
      'Hazır Yazılım Nedir? Avantaj ve Dezavantajlar',
      'Özel Yazılım Nedir? Avantaj ve Dezavantajlar',
      'Karşılaştırma Tablosu',
      '5 Yıllık Toplam Maliyet (TCO) Analizi',
      'Hangi Durumlarda Özel Yazılım Tercih Edilmeli?',
      'Doğru Karar Verme Rehberi',
    ],
    ctaText: 'İşletmenize özel yazılım çözümü için ücretsiz teklif alın.',
    ctaLink: '/ozel-yazilim',
    faqCount: 3,
    targetWordCount: [1000, 1600],
  },
  {
    id: 'software-cost',
    keyword: 'yazılım projesi maliyeti',
    titlePattern: '{Keyword} {Year}: Kapsamlı Fiyat Rehberi',
    seoTitlePattern: '{Keyword} {Year} | Web, Mobil, Kurumsal Fiyatlar',
    seoDescriptionPattern: '{Year} {keyword} hesaplama. Proje türüne göre fiyat aralıkları ve maliyeti etkileyen faktörler.',
    category: 'Custom Software',
    sectionHeadings: [
      'Yazılım Maliyetini Etkileyen Faktörler',
      'Proje Türlerine Göre Fiyat Aralıkları',
      'Web Uygulaması Maliyeti',
      'Mobil Uygulama Maliyeti',
      'Kurumsal Sistem (ERP/CRM) Maliyeti',
      'Gizli Maliyetler ve Dikkat Edilecekler',
      'Maliyet Optimizasyon Stratejileri',
    ],
    ctaText: 'Projeniz için ücretsiz maliyet analizi ve teklif alın.',
    ctaLink: '/iletisim',
    faqCount: 3,
    targetWordCount: [1200, 1800],
  },
  {
    id: 'software-company-guide',
    keyword: 'yazılım firması nasıl seçilir',
    titlePattern: '{Keyword}? {Year} Dikkat Edilmesi Gereken {N} Kriter',
    seoTitlePattern: '{Keyword} | {N} Önemli Kriter ({Year})',
    seoDescriptionPattern: '{keyword} sorusunun cevabı. Referans projeler, teknoloji uzmanlığı, fiyatlandırma ve sözleşme ipuçları.',
    category: 'Custom Software',
    sectionHeadings: [
      'Neden Doğru Yazılım Firması Seçimi Önemli?',
      'Yazılım Firması Seçerken Dikkat Edilmesi Gereken Kriterler',
      'Referans Projeler ve Sektör Deneyimi',
      'Teknoloji Uzmanlığı ve Modern Araçlar',
      'Proje Yönetim Metodolojisi (Agile/Scrum)',
      'Fiyatlandırma ve Sözleşme Koşulları',
      'Proje Sonrası Destek Hizmetleri',
    ],
    ctaText: 'Doğru yazılım ortağınızı buldunuz. Ücretsiz proje değerlendirmesi için arayın.',
    ctaLink: '/iletisim',
    faqCount: 3,
    targetWordCount: [1000, 1500],
  },

  // ─── MOBILE APP TEMPLATES ─────────────────────────────────
  {
    id: 'mobile-cost',
    keyword: 'mobil uygulama maliyeti',
    titlePattern: '{Keyword} {Year}: Detaylı Fiyat Rehberi',
    seoTitlePattern: 'Mobil Uygulama Geliştirme Maliyeti {Year} | Fiyat Aralıkları',
    seoDescriptionPattern: '{Year} mobil uygulama geliştirme maliyeti. Basit, orta ve karmaşık uygulama fiyatları. iOS ve Android karşılaştırması.',
    category: 'Mobile Apps',
    sectionHeadings: [
      '{Year} Mobil Uygulama Fiyatları Genel Bakış',
      'Basit Uygulama Maliyeti',
      'Orta Karmaşıklıkta Uygulama Maliyeti',
      'Karmaşık Uygulama Maliyeti',
      'iOS vs Android: Maliyet Farkı Var mı?',
      'Cross-Platform ile Maliyet Optimizasyonu',
      'Bakım ve Güncelleme Maliyetleri',
    ],
    ctaText: 'Mobil uygulama projeniz için ücretsiz teklif alın.',
    ctaLink: '/mobil-uygulama-gelistirme',
    faqCount: 3,
    targetWordCount: [1200, 1800],
  },
  {
    id: 'mobile-framework',
    keyword: 'mobil uygulama framework karşılaştırma',
    titlePattern: '{Framework A} vs {Framework B} {Year}: Hangisi Daha İyi?',
    seoTitlePattern: '{Framework A} vs {Framework B} {Year} | Detaylı Karşılaştırma',
    seoDescriptionPattern: '{Framework A} ve {Framework B} karşılaştırması. Performans, ekosistem, topluluk ve maliyet analizi.',
    category: 'Mobile Apps',
    sectionHeadings: [
      'Cross-Platform Framework Nedir?',
      '{Framework A} Genel Bakış',
      '{Framework B} Genel Bakış',
      'Performans Karşılaştırması',
      'Geliştirme Hızı ve Verimlilik',
      'Topluluk ve Ekosistem',
      'Karşılaştırma Tablosu',
      'Hangi Framework Ne Zaman Tercih Edilmeli?',
    ],
    ctaText: 'Mobil uygulama projeniz için doğru framework seçiminde uzman desteği alın.',
    ctaLink: '/mobil-uygulama-gelistirme',
    faqCount: 3,
    targetWordCount: [1000, 1600],
  },

  // ─── BUSINESS AUTOMATION TEMPLATES ────────────────────────
  {
    id: 'automation-guide',
    keyword: 'iş otomasyonu',
    titlePattern: '{Keyword} Nedir? İşletmenizi Dijital Dönüştürme Rehberi ({Year})',
    seoTitlePattern: '{Keyword} Nedir? | Dijital Dönüşüm Rehberi {Year}',
    seoDescriptionPattern: '{keyword} ile tekrarlayan süreçleri dijitalleştirin. Zamandan %70, maliyetten %50 tasarruf. Adım adım implementasyon rehberi.',
    category: 'Business Automation',
    sectionHeadings: [
      '{Keyword} Nedir?',
      'Otomatikleştirilebilecek İş Süreçleri',
      'İş Otomasyonunun Faydaları',
      'ROI Hesaplama: Ne Kadar Tasarruf Sağlar?',
      'İş Otomasyonu Araçları ve Teknolojileri',
      'Adım Adım Implementasyon Süreci',
      'Başarılı Otomasyon İçin İpuçları',
    ],
    ctaText: 'İş süreçlerinizi otomatikleştirmek için ücretsiz danışmanlık alın.',
    ctaLink: '/web-gelistirme',
    faqCount: 3,
    targetWordCount: [1000, 1600],
  },
  {
    id: 'digital-transformation',
    keyword: 'dijital dönüşüm',
    titlePattern: '{Keyword} Stratejileri: İşletmenizi Geleceğe Taşıyın ({Year})',
    seoTitlePattern: '{Keyword} Stratejileri | Adım Adım Rehber {Year}',
    seoDescriptionPattern: '{keyword} nasıl yapılır? Mevcut durum analizi, teknoloji seçimi, pilot uygulama ve yaygınlaştırma stratejileri.',
    category: 'Business Automation',
    sectionHeadings: [
      '{Keyword} Neden Kaçınılmaz?',
      'Dijital Dönüşüm: 4 Aşamalı Strateji',
      'Mevcut Durum Analizi Nasıl Yapılır?',
      'Teknoloji Seçimi ve Önceliklendirme',
      'Pilot Uygulama ve Ölçeklendirme',
      'Dijital Dönüşüm Başarı Metrikleri',
      'Sık Yapılan Hatalar ve Çözümleri',
    ],
    ctaText: 'Dijital dönüşüm yolculuğunuzda uzman desteği için arayın.',
    ctaLink: '/iletisim',
    faqCount: 3,
    targetWordCount: [1000, 1600],
  },
];

// ─── CONTENT GENERATION HELPERS ─────────────────────────────

/**
 * Fill a template with dynamic values
 */
export function fillTemplate(
  template: BlogTemplate,
  vars: Record<string, string | number>
): { title: string; seoTitle: string; seoDescription: string; headings: string[]; cta: string } {
  const fill = (str: string) =>
    str.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));

  return {
    title: fill(template.titlePattern),
    seoTitle: fill(template.seoTitlePattern),
    seoDescription: fill(template.seoDescriptionPattern),
    headings: template.sectionHeadings.map(fill),
    cta: fill(template.ctaText),
  };
}

/**
 * Generate a FAQ schema JSON-LD block from Q&A pairs
 */
export function generateFAQSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/**
 * Generate an Article schema JSON-LD block
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    image: params.image || 'https://asaanayazilim.com/og-image.jpg',
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      '@type': 'Organization',
      name: params.authorName || 'AŞAANA YAZILIM',
      url: 'https://asaanayazilim.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AŞAANA YAZILIM',
      logo: {
        '@type': 'ImageObject',
        url: 'https://asaanayazilim.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
  };
}

/**
 * Keyword cluster map for Turkey SEO
 * Groups related keywords for internal linking strategy
 */
export const KEYWORD_CLUSTERS = {
  erp_primary: ['ERP yazılımı', 'ERP sistemi', 'ERP nedir', 'kurumsal kaynak planlama'],
  erp_cost: ['ERP fiyatları', 'ERP maliyeti', 'ERP yazılımı fiyatları', 'ERP sistemi maliyeti'],
  erp_industry: ['üretim ERP', 'KOBİ ERP', 'ERP sistemleri Türkiye', 'sektörel ERP'],
  custom_software: ['özel yazılım', 'yazılım firması', 'yazılım geliştirme', 'yazılım şirketi İstanbul'],
  mobile: ['mobil uygulama', 'iOS uygulama', 'Android uygulama', 'React Native', 'Flutter'],
  web: ['web uygulaması', 'web geliştirme', 'iş otomasyonu', 'web app'],
} as const;
