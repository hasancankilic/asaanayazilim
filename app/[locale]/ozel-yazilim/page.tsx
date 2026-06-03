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
      ? 'Özel Yazılım Firması | Yazılım Geliştirme Şirketi | AŞAANA YAZILIM'
      : 'Custom Software Development Company | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'İstanbul merkezli özel yazılım firması. İşletmenize özel web, mobil ve masaüstü yazılım geliştirme hizmeti. Profesyonel yazılım şirketi arıyorsanız hemen teklif alın.'
      : 'Istanbul-based custom software development company. Web, mobile and desktop software tailored to your business.',
    locale,
    url: locale === 'tr' ? '/tr/ozel-yazilim' : '/en/ozel-yazilim',
  });
}

const faqItems = [
  { q: 'Özel yazılım nedir, hazır yazılımdan farkı ne?', a: 'Özel yazılım, işletmenizin spesifik ihtiyaçlarına göre sıfırdan geliştirilen yazılımdır. Hazır yazılımlar genel kullanım için tasarlanırken, özel yazılım tam olarak iş süreçlerinize uyum sağlar, gereksiz özellikler barındırmaz ve uzun vadede daha maliyet etkindir.' },
  { q: 'Yazılım firması seçerken nelere dikkat etmeliyim?', a: 'Yazılım firması seçerken referans projeleri, teknoloji uzmanlığı, proje yönetim metodolojisi, destek hizmetleri ve şeffaf fiyatlandırma politikasına dikkat edin. Mutlaka daha önce tamamlanmış benzer projeleri inceleyin ve müşteri yorumlarını araştırın.' },
  { q: 'Özel yazılım projesi ne kadar sürer?', a: 'Proje kapsamına göre değişmekle birlikte, basit web uygulamaları 4-8 hafta, orta karmaşıklıkta projeler 3-6 ay, kapsamlı kurumsal sistemler 6-12 ay sürebilir. Agile metodoloji ile her sprint sonunda çalışan yazılım teslim edilir.' },
  { q: 'Proje tamamlandıktan sonra destek veriyor musunuz?', a: 'Evet, proje tesliminden sonra bakım ve destek sözleşmesi kapsamında teknik destek, güncelleme, hata düzeltme ve yeni özellik geliştirme hizmetleri sunuyoruz.' },
  { q: 'Yazılım projesinin maliyeti nasıl hesaplanır?', a: 'Maliyet; proje kapsamı, kullanılacak teknolojiler, geliştirme süresi ve ekip büyüklüğüne göre hesaplanır. Ücretsiz ihtiyaç analizi sonrası detaylı ve şeffaf bir teklif hazırlıyoruz.' },
];

export default async function CustomSoftwarePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Özel Yazılım Geliştirme',
        provider: { '@type': 'Organization', name: 'AŞAANA YAZILIM', url: 'https://asaanayazilim.com' },
        areaServed: 'TR',
        description: 'İşletmelere özel web, mobil ve kurumsal yazılım geliştirme hizmeti',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question', name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <Script id="custom-software-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-pink-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.12),transparent_60%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              İstanbul&apos;un Güvenilir Yazılım Firması
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              İşletmenize Özel{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Yazılım Çözümleri</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Hazır paket programların kısıtlamalarına son. İş süreçlerinize %100 uyum sağlayan, 
              ölçeklenebilir ve modern özel yazılım çözümleri geliştiriyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/iletisim" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
                Ücretsiz Teklif Alın
                <DynamicIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/projeler" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/5">
                Projelerimizi İnceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Yazılım Geliştirme Hizmetlerimiz</h2>
          <p className="text-xl text-white/60 text-center mb-16 max-w-2xl mx-auto">Modern teknolojiler ile işletmenizi geleceğe taşıyan çözümler</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🌐', title: 'Web Uygulamaları', desc: 'Next.js, React, TypeScript ile yüksek performanslı, SEO uyumlu web uygulamaları ve iş otomasyon sistemleri', techs: ['Next.js', 'React', 'Node.js', 'PostgreSQL'] },
              { icon: '📱', title: 'Mobil Uygulamalar', desc: 'iOS ve Android için React Native ve Flutter ile native performanslı cross-platform mobil uygulamalar', techs: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
              { icon: '🏢', title: 'Kurumsal Sistemler', desc: 'ERP, CRM, stok yönetimi, sipariş takibi gibi kurumsal kaynak planlama ve iş yönetim sistemleri', techs: ['ERP', 'CRM', 'REST API', 'Cloud'] },
              { icon: '🤖', title: 'Yapay Zeka Çözümleri', desc: 'Makine öğrenmesi, doğal dil işleme, görüntü tanıma ve AI destekli otomasyon sistemleri', techs: ['Python', 'TensorFlow', 'OpenAI', 'NLP'] },
              { icon: '☁️', title: 'SaaS Platformları', desc: 'Bulut tabanlı, multi-tenant, ölçeklenebilir SaaS uygulamaları ve abonelik yönetimi sistemleri', techs: ['AWS', 'Docker', 'Microservices', 'Stripe'] },
              { icon: '🔗', title: 'API & Entegrasyon', desc: 'Mevcut sistemlerinizle API entegrasyonu, e-fatura, ödeme gateway ve üçüncü parti servis bağlantıları', techs: ['REST', 'GraphQL', 'WebSocket', 'OAuth'] },
            ].map((service, idx) => (
              <div key={idx} className="glass-card rounded-xl p-8 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.techs.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-purple-300 text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Yazılım Geliştirme Sürecimiz</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Analiz', desc: 'Ücretsiz ihtiyaç analizi ve proje planlaması' },
              { step: '02', title: 'Tasarım', desc: 'UI/UX tasarımı ve mimari planlama' },
              { step: '03', title: 'Geliştirme', desc: 'Agile metodoloji ile sprint bazlı geliştirme' },
              { step: '04', title: 'Teslim & Destek', desc: 'Test, eğitim ve sürekli teknik destek' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Özel Yazılım Firması Seçerken Dikkat Edilmesi Gerekenler</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Türkiye&apos;de <strong className="text-white">yazılım firması</strong> arayan işletmeler için doğru partner seçimi kritik önem taşır. 
            AŞAANA YAZILIM olarak, 5+ yıllık deneyimimiz ve başarılı proje portföyümüzle İstanbul ve tüm Türkiye&apos;ye 
            profesyonel <strong className="text-white">yazılım geliştirme hizmeti</strong> sunuyoruz.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            <strong className="text-white">Özel yazılım geliştirme</strong> sürecimiz, Agile metodoloji ile yürütülür. 
            Her 2 haftada bir çalışan yazılım modülleri teslim ederek, süreç içinde geri bildirim almayı ve 
            projenin doğru yönde ilerlemesini garanti ederiz. Next.js, React, TypeScript, Python gibi 
            modern teknolojiler ile geleceğe hazır, ölçeklenebilir sistemler inşa ediyoruz.
          </p>
          <h3 className="text-2xl font-bold text-white mt-10 mb-4">Neden AŞAANA YAZILIM?</h3>
          <p className="text-white/70 leading-relaxed mb-6">
            Şeffaf fiyatlandırma, zamanında teslim, 7/24 teknik destek ve %100 müşteri memnuniyeti garantisi 
            ile sektörde fark yaratıyoruz. Her projede dedicated proje yöneticisi atanır ve düzenli ilerleme 
            raporları paylaşılır. Proje sonrası bakım ve destek sözleşmeleri ile yazılımınız her zaman güncel kalır.
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
                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:text-purple-400 transition-colors list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-purple-400 text-2xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
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
              {locale === 'tr' ? 'Projenizi Hayata Geçirelim' : "Let's Bring Your Project to Life"}
            </h2>
            <p className="text-xl text-white/70">
              {locale === 'tr' ? 'Ücretsiz ihtiyaç analizi ve teklif için hemen iletişime geçin.' : 'Contact us now for a free needs assessment and quote.'}
            </p>
          </div>
          <LeadCaptureForm locale={locale} serviceType="custom-software" accentColor="purple" title={locale === 'tr' ? 'Özel Yazılım Teklifi Alın' : 'Get a Custom Software Quote'} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
