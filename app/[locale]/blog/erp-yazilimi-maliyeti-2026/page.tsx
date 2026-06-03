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
      ? 'ERP Yazılımı Maliyeti 2026: Fiyatlar ve Bütçe Rehberi | AŞAANA YAZILIM'
      : 'ERP Software Cost 2026: Pricing & Budget Guide | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? '2026 ERP yazılımı maliyetleri ne kadar? Küçük, orta ve büyük işletmeler için ERP fiyatları, gizli maliyetler ve bütçe planlaması rehberi.'
      : 'How much does ERP software cost in 2026? Pricing for small, medium and large businesses, hidden costs and budget planning guide.',
    locale,
    url: locale === 'tr' ? '/tr/blog/erp-yazilimi-maliyeti-2026' : '/en/blog/erp-yazilimi-maliyeti-2026',
    type: 'article',
  });
}

const faqItems = [
  { q: 'ERP yazılımı maliyeti ne kadar?', a: 'ERP maliyeti işletme büyüklüğüne ve kapsamına göre değişir. Küçük işletmeler için 50.000-150.000 TL, orta ölçekli işletmeler için 150.000-500.000 TL, büyük işletmeler için 500.000 TL+ yatırım gerekebilir. Hazır ERP\'lerde yıllık lisans ücreti de eklenmelidir.' },
  { q: 'Hazır ERP mi özel ERP mi daha ucuz?', a: 'Kısa vadede hazır ERP daha ucuz görünebilir, ancak uzun vadede (3-5 yıl) özel ERP daha maliyet etkindir. Hazır ERP\'lerde yıllık lisans ($10.000-$500.000+), kullanıcı başına ücret, modül ekleme ücretleri ve özelleştirme maliyetleri sürekli artar.' },
  { q: 'ERP projesinde gizli maliyetler nelerdir?', a: 'Gizli maliyetler: Veri migrasyonu, kullanıcı eğitimi, sistem entegrasyonu, yıllık bakım ve güncelleme, altyapı (sunucu/bulut) maliyetleri, danışmanlık ücretleri ve proje gecikme maliyetleri. Toplam maliyetin %20-30\'u gizli maliyetlerden oluşabilir.' },
  { q: 'ERP yatırımı ne kadar sürede kendini amorti eder?', a: 'Doğru planlanmış bir ERP yatırımı genellikle 12-24 ay içinde kendini amorti eder. Verimlilik artışı (%40-60), hata azalması, stok optimizasyonu ve zaman tasarrufu ile elde edilen kazanç, yatırım maliyetini kısa sürede karşılar.' },
];

export default async function ERPCostPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTR = (locale || 'tr') === 'tr';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: isTR ? 'ERP Yazılımı Maliyeti 2026: Fiyatlar ve Bütçe Rehberi' : 'ERP Software Cost 2026: Pricing & Budget Guide',
        author: { '@type': 'Organization', name: 'AŞAANA YAZILIM' },
        datePublished: '2026-02-10',
        dateModified: '2026-06-01',
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
      <Script id="blog-erp-cost-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <article>
        <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 text-sm">
              <DynamicIcon iconName="ArrowLeft" className="w-4 h-4 mr-1" />
              {isTR ? 'Blog\'a Dön' : 'Back to Blog'}
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-green-300 text-xs font-medium">ERP Maliyet</span>
              <span className="text-white/40 text-xs">10 Şubat 2026 · 15 dk okuma</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {isTR ? 'ERP Yazılımı Maliyeti 2026: Fiyatlar ve Bütçe Rehberi' : 'ERP Software Cost 2026: Pricing & Budget Guide'}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {isTR
                ? 'ERP yatırımı yapmadan önce bilmeniz gereken tüm maliyet kalemleri, fiyat aralıkları ve bütçe planlaması ipuçları bu rehberde.'
                : 'All cost items, price ranges, and budget planning tips you need to know before investing in ERP.'}
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              {isTR ? 'ERP Yazılımı Fiyatları: 2026 Güncel Piyasa' : 'ERP Software Prices: 2026 Current Market'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'ERP yazılımı maliyeti, işletme büyüklüğüne, modül sayısına, özelleştirme gereksinimlerine ve seçilen teknolojiye göre büyük farklılıklar gösterir. 2026 yılı itibarıyla Türkiye piyasasında güncel fiyat aralıkları şöyledir:'
                : 'ERP software costs vary greatly depending on business size, number of modules, customization requirements, and technology chosen. As of 2026, current price ranges in the Turkish market are as follows:'}
            </p>

            {/* Price Table */}
            <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="glass-card rounded-xl p-6 border border-white/10">
                <p className="text-sm text-white/50 mb-1">{isTR ? 'Küçük İşletme' : 'Small Business'}</p>
                <p className="text-3xl font-bold text-white mb-1">{isTR ? '50.000-150.000' : '50K-150K'} TL</p>
                <p className="text-sm text-white/50">1-10 {isTR ? 'çalışan' : 'employees'}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• {isTR ? '3-5 temel modül' : '3-5 core modules'}</li>
                  <li>• {isTR ? '2-4 ay teslim' : '2-4 months delivery'}</li>
                  <li>• {isTR ? 'Temel raporlama' : 'Basic reporting'}</li>
                </ul>
              </div>
              <div className="glass-card rounded-xl p-6 border border-blue-500/30 bg-blue-500/5">
                <p className="text-sm text-blue-300 mb-1">{isTR ? 'Orta Ölçekli' : 'Medium Business'} ⭐</p>
                <p className="text-3xl font-bold text-white mb-1">{isTR ? '150.000-500.000' : '150K-500K'} TL</p>
                <p className="text-sm text-white/50">10-100 {isTR ? 'çalışan' : 'employees'}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• {isTR ? '6-10 modül' : '6-10 modules'}</li>
                  <li>• {isTR ? '4-8 ay teslim' : '4-8 months delivery'}</li>
                  <li>• {isTR ? 'İleri analitik & API' : 'Advanced analytics & API'}</li>
                </ul>
              </div>
              <div className="glass-card rounded-xl p-6 border border-white/10">
                <p className="text-sm text-white/50 mb-1">{isTR ? 'Büyük İşletme' : 'Enterprise'}</p>
                <p className="text-3xl font-bold text-white mb-1">500.000+ TL</p>
                <p className="text-sm text-white/50">100+ {isTR ? 'çalışan' : 'employees'}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• {isTR ? '10+ modül' : '10+ modules'}</li>
                  <li>• {isTR ? '8-12 ay teslim' : '8-12 months delivery'}</li>
                  <li>• {isTR ? 'Tam özelleştirme' : 'Full customization'}</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Hazır ERP vs. Özel ERP: Maliyet Karşılaştırma' : 'Off-the-Shelf vs. Custom ERP: Cost Comparison'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'Hazır ERP sistemleri (SAP Business One, Oracle NetSuite, Microsoft Dynamics 365) başlangıçta daha uygun fiyatlı görünebilir. Ancak 3-5 yıllık toplam sahip olma maliyeti (TCO) hesaplandığında, özel ERP genellikle daha avantajlıdır. İşte neden:'
                : 'Off-the-shelf ERP systems may appear more affordable initially. However, when calculating total cost of ownership (TCO) over 3-5 years, custom ERP is usually more advantageous. Here\'s why:'}
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
              <div className="glass-card rounded-xl p-6 border border-red-500/20">
                <h3 className="text-lg font-bold text-white mb-4">❌ {isTR ? 'Hazır ERP Gizli Maliyetleri' : 'Off-the-Shelf ERP Hidden Costs'}</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>• {isTR ? 'Yıllık lisans: $10.000-$500.000+' : 'Annual license: $10K-$500K+'}</li>
                  <li>• {isTR ? 'Kullanıcı başına ücret: $50-200/ay' : 'Per-user fee: $50-200/month'}</li>
                  <li>• {isTR ? 'Özelleştirme: $50.000-$200.000' : 'Customization: $50K-$200K'}</li>
                  <li>• {isTR ? 'Implementasyon danışmanı: $100.000+' : 'Implementation consultant: $100K+'}</li>
                  <li>• {isTR ? 'Veri migrasyonu: $10.000-$50.000' : 'Data migration: $10K-$50K'}</li>
                </ul>
              </div>
              <div className="glass-card rounded-xl p-6 border border-green-500/20 bg-green-500/5">
                <h3 className="text-lg font-bold text-white mb-4">✅ {isTR ? 'Özel ERP Avantajları' : 'Custom ERP Advantages'}</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>• {isTR ? 'Tek seferlik yatırım' : 'One-time investment'}</li>
                  <li>• {isTR ? 'Sınırsız kullanıcı' : 'Unlimited users'}</li>
                  <li>• {isTR ? '%100 iş süreçlerinize uyum' : '100% fit to your processes'}</li>
                  <li>• {isTR ? 'Kaynak kodu sizde' : 'You own the source code'}</li>
                  <li>• {isTR ? 'Düşük bakım maliyeti' : 'Low maintenance cost'}</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'ERP Yatırımı Ne Kadar Sürede Amorti Eder?' : 'How Long Does ERP ROI Take?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'Doğru planlanmış ve uygulanmış bir ERP yatırımı, genellikle 12-24 ay içinde kendini amorti eder. Stok optimizasyonu ile %15-25 maliyet düşüşü, sipariş hatalarında %80-90 azalma, operasyonel verimlilikte %40-60 artış ve raporlama süresinde %70+ tasarruf sağlanabilir.'
                : 'A properly planned and implemented ERP investment typically pays for itself within 12-24 months. You can achieve 15-25% cost reduction through inventory optimization, 80-90% reduction in order errors, 40-60% increase in operational efficiency, and 70%+ savings in reporting time.'}
            </p>

            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-300 font-medium mb-2">
                {isTR ? '💡 İlgili Sayfa:' : '💡 Related Page:'}
              </p>
              <Link href="/erp-yazilimi" className="text-blue-400 hover:text-blue-300 font-semibold">
                {isTR ? 'ERP Çözümlerimizi İnceleyin →' : 'Explore Our ERP Solutions →'}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">{isTR ? 'Sıkça Sorulan Sorular' : 'FAQ'}</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <details key={idx} className="glass-card rounded-xl group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:text-green-400 transition-colors list-none">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-green-400 text-2xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10 pt-4">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-3xl mx-auto">
            <LeadCaptureForm locale={(locale as 'tr' | 'en') || 'tr'} serviceType="erp" accentColor="blue"
              title={isTR ? 'ERP Projeniz İçin Ücretsiz Maliyet Analizi' : 'Free Cost Analysis for Your ERP Project'}
              description={isTR ? 'İşletmenize özel ERP maliyetini öğrenmek için formu doldurun.' : 'Fill out the form to learn the ERP cost tailored to your business.'} />
          </div>
        </section>
      </article>
      <Footer />
    </main>
  );
}
