import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import DynamicIcon from '@/components/DynamicIcon';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  return generateSEOMetadata({
    title: locale === 'tr'
      ? 'Mobil Uygulama Geliştirme | iOS & Android Uygulama | AŞAANA YAZILIM'
      : 'Mobile App Development | iOS & Android Apps | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'iOS ve Android için profesyonel mobil uygulama geliştirme hizmeti. React Native ve Flutter ile cross-platform uygulamalar. Ücretsiz teklif için arayın.'
      : 'Professional mobile app development for iOS and Android. Cross-platform apps with React Native and Flutter.',
    locale,
    url: locale === 'tr' ? '/tr/mobil-uygulama-gelistirme' : '/en/mobil-uygulama-gelistirme',
  });
}

const faqItems = [
  { q: 'Mobil uygulama geliştirme maliyeti ne kadar?', a: 'Mobil uygulama maliyeti, uygulamanın karmaşıklığına, özelliklerine ve platform sayısına göre değişir. Basit bir uygulama 30.000 TL\'den başlarken, kapsamlı uygulamalar 200.000 TL\'ye kadar çıkabilir. Cross-platform geliştirme ile maliyeti %40 düşürebilirsiniz.' },
  { q: 'iOS ve Android için ayrı ayrı uygulama mı yaptırmalıyım?', a: 'React Native veya Flutter kullanarak tek kod tabanı ile hem iOS hem Android uygulaması geliştirebiliriz. Bu yaklaşım maliyeti %40, geliştirme süresini %50 azaltır ve aynı native performansı sunar.' },
  { q: 'Mobil uygulama ne kadar sürede yapılır?', a: 'Basit uygulamalar 4-8 hafta, orta karmaşıklıkta uygulamalar 3-5 ay, kapsamlı uygulamalar 6-9 ay sürebilir. MVP (Minimum Viable Product) yaklaşımı ile 4-6 haftada ilk sürümü yayınlayabiliriz.' },
  { q: 'Uygulama mağazalara yükleme desteği veriyor musunuz?', a: 'Evet, Apple App Store ve Google Play Store başvuru süreçlerini, uygulama inceleme ve onay süreçlerini tamamen yönetiyoruz. ASO (App Store Optimization) ile uygulamanızın görünürlüğünü artırıyoruz.' },
  { q: 'Mevcut web sitemi mobil uygulamaya dönüştürebilir misiniz?', a: 'Evet, mevcut web uygulamanızı React Native veya Flutter ile native mobil uygulamaya dönüştürebiliriz. Mevcut API altyapınızı kullanarak hızlı ve maliyet etkin bir geçiş sağlıyoruz.' },
];

export default async function MobileAppPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question', name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <main className="min-h-screen">
      <Script id="mobile-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-blue-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(6,182,212,0.12),transparent_60%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              iOS & Android Uzmanı
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Mobil Uygulama</span>{' '}
              Geliştirme
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              iOS ve Android platformları için native performanslı, modern ve kullanıcı dostu mobil uygulamalar. 
              React Native ve Flutter ile tek seferde iki platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/iletisim" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105">
                Mobil Uygulama Teklifi Al <DynamicIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Mobil Geliştirme Teknolojilerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚛️', title: 'React Native', desc: 'Meta tarafından geliştirilen, JavaScript tabanlı cross-platform framework. Tek kod tabanı ile iOS ve Android.', features: ['Hot Reload', 'Native Performans', 'Geniş Ekosistem', 'Code Sharing %90'] },
              { icon: '🎯', title: 'Flutter', desc: 'Google tarafından geliştirilen, Dart tabanlı UI toolkit. Pixel-perfect tasarım ve 60fps performans.', features: ['Widget System', 'Material Design', '60fps Render', 'Multi-Platform'] },
              { icon: '📱', title: 'Native Geliştirme', desc: 'Swift (iOS) ve Kotlin (Android) ile platform-spesifik geliştirme. Maksimum performans ve UX.', features: ['Swift/SwiftUI', 'Kotlin/Jetpack', 'Platform API', 'Maksimum Performans'] },
            ].map((tech, idx) => (
              <div key={idx} className="glass-card rounded-xl p-8 hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{tech.desc}</p>
                <ul className="space-y-2">
                  {tech.features.map((f) => (
                    <li key={f} className="flex items-center text-sm text-white/70">
                      <DynamicIcon iconName="CheckCircle" className="w-4 h-4 mr-2 text-cyan-400" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Geliştirdiğimiz Uygulama Türleri</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛒', name: 'E-Ticaret' }, { icon: '🍽️', name: 'Yemek Sipariş' },
              { icon: '🏥', name: 'Sağlık & Fitness' }, { icon: '📚', name: 'Eğitim' },
              { icon: '🏦', name: 'Finans & Bankacılık' }, { icon: '🚗', name: 'Lojistik & Filo' },
              { icon: '💬', name: 'Sosyal Medya' }, { icon: '🏢', name: 'Kurumsal İş' },
            ].map((app, idx) => (
              <div key={idx} className="glass-card rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-4xl mb-3">{app.icon}</div>
                <p className="text-white font-medium">{app.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Mobil Uygulama Geliştirme: 2026 Rehberi</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Mobil uygulama kullanımı her yıl artmaya devam ediyor. Türkiye&apos;de <strong className="text-white">mobil uygulama geliştirme</strong> talebi, 
            işletmelerin dijital dönüşüm stratejilerinin merkezinde yer alıyor. AŞAANA YAZILIM olarak, 
            <strong className="text-white"> iOS ve Android uygulama geliştirme</strong> konusunda uzman ekibimizle 
            fikrinizi gerçeğe dönüştürüyoruz.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            <strong className="text-white">Cross-platform geliştirme</strong> yaklaşımımız sayesinde tek bir kod tabanı ile 
            hem App Store hem Google Play&apos;de yayınlanabilecek uygulamalar geliştiriyoruz. Bu yaklaşım, 
            maliyeti %40 ve geliştirme süresini %50 azaltırken, native kalitesinde kullanıcı deneyimi sunar.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details key={idx} className="glass-card rounded-xl group">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:text-cyan-400 transition-colors list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10 pt-4">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'tr' ? 'Mobil Uygulama Fikrinizi Hayata Geçirin' : 'Bring Your Mobile App Idea to Life'}
            </h2>
            <p className="text-xl text-white/70">
              {locale === 'tr' ? 'Ücretsiz proje değerlendirmesi için hemen iletişime geçin.' : 'Contact us now for a free project evaluation.'}
            </p>
          </div>
          <LeadCaptureForm locale={locale} serviceType="mobile-app" accentColor="cyan" title={locale === 'tr' ? 'Mobil Uygulama Teklifi Alın' : 'Get a Mobile App Quote'} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
