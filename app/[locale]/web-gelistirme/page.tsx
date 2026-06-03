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
      ? 'Web Uygulama Geliştirme | İş Otomasyon Sistemleri | AŞAANA YAZILIM'
      : 'Web Application Development | Business Automation | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'Modern web uygulamaları ve iş otomasyon sistemleri. Next.js, React ile SEO uyumlu, yüksek performanslı web geliştirme hizmeti. Hemen teklif alın.'
      : 'Modern web applications and business automation systems. SEO-friendly, high-performance web development with Next.js and React.',
    locale,
    url: locale === 'tr' ? '/tr/web-gelistirme' : '/en/web-gelistirme',
  });
}

const faqItems = [
  { q: 'Web uygulaması ile web sitesi arasındaki fark nedir?', a: 'Web sitesi genellikle statik bilgi sunarken, web uygulaması kullanıcı etkileşimi, veritabanı işlemleri, gerçek zamanlı güncellemeler ve iş mantığı içerir. Web uygulamaları kullanıcı girişi alır, veri işler ve dinamik sonuçlar üretir.' },
  { q: 'Web uygulama geliştirme maliyeti nedir?', a: 'Web uygulama maliyeti projenin kapsamına göre değişir. Basit bir web uygulaması 20.000 TL\'den başlarken, kapsamlı kurumsal sistemler 300.000 TL\'ye kadar çıkabilir. Ücretsiz ihtiyaç analizi sonrası net fiyat teklifi sunuyoruz.' },
  { q: 'SEO uyumlu web sitesi yapıyor musunuz?', a: 'Evet, tüm web projelerimiz SEO best practice\'lara uygun geliştirilir. Teknik SEO (hız, mobil uyum, schema markup), içerik optimizasyonu ve Core Web Vitals metrikleri ön planda tutulur.' },
  { q: 'İş otomasyon sistemi nedir?', a: 'İş otomasyon sistemi, manuel yapılan tekrarlayan iş süreçlerini dijitalleştirerek otomatikleştiren yazılımdır. Fatura oluşturma, stok takibi, müşteri bilgilendirme, raporlama gibi süreçler otomatik hale getirilir, zamandan %70\'e kadar tasarruf sağlanır.' },
  { q: 'Mevcut web sitemi yeniden tasarlayabilir misiniz?', a: 'Evet, mevcut web sitenizi modern teknolojilerle yeniden tasarlayabiliriz. Next.js migrasyonu, performans optimizasyonu, mobil uyumluluk ve SEO iyileştirmeleri ile sitenizi güncelleyebiliriz.' },
];

export default async function WebDevPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <Script id="web-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-teal-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(16,185,129,0.12),transparent_60%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Next.js & React Uzmanı
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Web Uygulama &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">İş Otomasyon</span> Sistemleri
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Modern web teknolojileri ile yüksek performanslı, SEO uyumlu web uygulamaları ve 
              iş süreçlerinizi otomatikleştiren akıllı sistemler geliştiriyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/iletisim" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105">
                Web Projesi Teklifi Al <DynamicIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/projeler" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/5">
                Canlı Projeler
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Web Çözümlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🌐', title: 'Kurumsal Web Siteleri', desc: 'SEO uyumlu, hızlı ve profesyonel kurumsal web siteleri. Next.js ile server-side rendering.', features: ['SEO Optimizasyon', 'Hızlı Yükleme', 'Responsive', 'CMS Entegrasyon'] },
              { icon: '⚡', title: 'Web Uygulamaları', desc: 'React/Next.js ile interaktif, gerçek zamanlı web uygulamaları ve dashboard\'lar.', features: ['Real-time', 'Dashboard', 'API Entegrasyon', 'Auth & Güvenlik'] },
              { icon: '🤖', title: 'İş Otomasyon', desc: 'Tekrarlayan iş süreçlerinizi otomatikleştiren akıllı workflow sistemleri.', features: ['Workflow', 'Otomatik Rapor', 'E-posta/SMS', 'Entegrasyon'] },
              { icon: '🛒', title: 'E-Ticaret', desc: 'Özel e-ticaret platformları, ödeme gateway entegrasyonu ve stok yönetimi.', features: ['Ödeme Sistemi', 'Stok Yönetimi', 'Sipariş Takibi', 'Kargo Entegrasyon'] },
              { icon: '📊', title: 'Admin Panelleri', desc: 'İş verilerinizi yönetebileceğiniz güçlü admin paneli ve CMS sistemleri.', features: ['CRUD İşlemler', 'Rol Yönetimi', 'Raporlama', 'Medya Yönetimi'] },
              { icon: '🔌', title: 'API Geliştirme', desc: 'RESTful ve GraphQL API\'ler ile sistemleriniz arası sorunsuz iletişim.', features: ['REST API', 'GraphQL', 'WebSocket', 'OAuth 2.0'] },
            ].map((sol, idx) => (
              <div key={idx} className="glass-card rounded-xl p-8 hover:border-emerald-400/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="text-4xl mb-4">{sol.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{sol.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{sol.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {sol.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-300 text-xs">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Kullandığımız Teknolojiler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Prisma', 'Docker', 'AWS', 'Redis', 'GraphQL'].map((tech) => (
              <div key={tech} className="glass-card rounded-xl p-4 text-center hover:border-emerald-400/40 transition-all">
                <p className="text-white font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Web Uygulama Geliştirme ve İş Otomasyonu</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Modern işletmeler için <strong className="text-white">web uygulaması geliştirme</strong> sadece bir web sitesine sahip olmaktan çok daha fazlasıdır. 
            AŞAANA YAZILIM olarak, <strong className="text-white">Next.js ve React</strong> teknolojileri ile yüksek performanslı, 
            SEO uyumlu ve ölçeklenebilir web uygulamaları geliştiriyoruz.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            <strong className="text-white">İş otomasyon sistemleri</strong> ile manuel yapılan tekrarlayan işleri dijitalleştirerek 
            zamandan %70, maliyetten %50 tasarruf sağlıyoruz. Fatura oluşturma, stok bilgilendirme, 
            müşteri takip, raporlama gibi süreçleri otomatik hale getirerek ekibinizin stratejik işlere odaklanmasını sağlıyoruz.
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
                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:text-emerald-400 transition-colors list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
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
              {locale === 'tr' ? 'Web Projenizi Birlikte İnşa Edelim' : "Let's Build Your Web Project Together"}
            </h2>
            <p className="text-xl text-white/70">
              {locale === 'tr' ? 'Ücretsiz ihtiyaç analizi ve proje planlaması için hemen iletişime geçin.' : 'Contact us now for a free needs assessment and project plan.'}
            </p>
          </div>
          <LeadCaptureForm locale={locale} serviceType="web-development" accentColor="emerald" title={locale === 'tr' ? 'Web Projesi Teklifi Alın' : 'Get a Web Project Quote'} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
