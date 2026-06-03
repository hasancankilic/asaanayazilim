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
      ? 'ERP Yazılımı Nedir? Nasıl Çalışır? (2026 Rehberi) | AŞAANA YAZILIM'
      : 'What is ERP Software? How Does It Work? (2026 Guide) | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'ERP yazılımı nedir, ne işe yarar, hangi işletmeler için uygundur? 2026 güncel rehberimizde ERP sistemi hakkında bilmeniz gereken her şey.'
      : 'What is ERP software, how does it work, which businesses need it? Everything you need to know about ERP systems in our 2026 guide.',
    locale,
    url: locale === 'tr' ? '/tr/blog/erp-yazilimi-nedir' : '/en/blog/erp-yazilimi-nedir',
    type: 'article',
  });
}

const faqItems = [
  { q: 'ERP yazılımı ne demek?', a: 'ERP, Enterprise Resource Planning (Kurumsal Kaynak Planlama) kelimesinin kısaltmasıdır. Bir işletmenin tüm operasyonel süreçlerini — stok, sipariş, finans, CRM, üretim, İK — tek bir sistemde birleştiren yazılımdır.' },
  { q: 'ERP sistemi hangi işletmeler için uygundur?', a: 'ERP sistemi; üretim, dağıtım, perakende, toptan satış, lojistik, e-ticaret ve hizmet sektöründeki KOBİ ve büyük ölçekli işletmeler için uygundur. Özellikle 10+ çalışanı olan ve manuel süreçlerden kurtulmak isteyen firmalar için idealdir.' },
  { q: 'ERP ile muhasebe programı arasındaki fark nedir?', a: 'Muhasebe programı sadece finansal işlemleri yönetirken, ERP tüm iş süreçlerini (stok, üretim, CRM, İK, depo, lojistik) tek platformda entegre eder. ERP, işletmenizin tamamını yöneten kapsamlı bir sistemdir.' },
  { q: 'Bulut ERP mi yoksa yerel sunucu ERP mi daha iyi?', a: 'Bulut ERP daha düşük başlangıç maliyeti, her yerden erişim ve otomatik güncelleme avantajı sunar. Yerel sunucu ERP ise tam veri kontrolü ve internet bağımsızlığı sağlar. Çoğu işletme için bulut ERP daha avantajlıdır.' },
  { q: 'ERP sistemi kurmak ne kadar sürer?', a: 'Kapsamına göre 2-12 ay arası sürebilir. Temel modüller (stok, sipariş, CRM) 2-4 ayda, tam kapsamlı ERP (finans, üretim, İK dahil) 6-12 ayda teslim edilebilir. Agile metodoloji ile her 2 haftada çalışan modül teslim edilir.' },
];

export default async function ERPGuidePost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTR = (locale || 'tr') === 'tr';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: isTR ? 'ERP Yazılımı Nedir? Nasıl Çalışır? (2026 Rehberi)' : 'What is ERP Software? How Does It Work? (2026 Guide)',
        author: { '@type': 'Organization', name: 'AŞAANA YAZILIM' },
        publisher: { '@type': 'Organization', name: 'AŞAANA YAZILIM' },
        datePublished: '2026-01-15',
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
      <Script id="blog-erp-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      {/* Article Header */}
      <article>
        <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 text-sm">
              <DynamicIcon iconName="ArrowLeft" className="w-4 h-4 mr-1" />
              {isTR ? 'Blog\'a Dön' : 'Back to Blog'}
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-medium">ERP Yazılımı</span>
              <span className="text-white/40 text-xs">15 Ocak 2026 · 12 dk okuma</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {isTR ? 'ERP Yazılımı Nedir? Nasıl Çalışır?' : 'What is ERP Software? How Does It Work?'}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {isTR
                ? 'ERP sistemi, işletmenizin tüm operasyonel süreçlerini tek platformda birleştiren kurumsal yazılımdır. Bu rehberde ERP\'nin ne olduğunu, nasıl çalıştığını ve işletmeniz için uygun olup olmadığını detaylıca inceleyeceğiz.'
                : 'ERP is enterprise software that unifies all operational processes of your business on a single platform. In this guide, we\'ll explore what ERP is, how it works, and whether it\'s right for your business.'}
            </p>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              {isTR ? 'ERP (Enterprise Resource Planning) Nedir?' : 'What is ERP (Enterprise Resource Planning)?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'ERP (Enterprise Resource Planning), Türkçe karşılığıyla Kurumsal Kaynak Planlama, bir işletmenin finans, muhasebe, stok yönetimi, sipariş takibi, müşteri ilişkileri, üretim, depo operasyonları ve insan kaynakları gibi tüm temel iş süreçlerini tek bir entegre sistemde birleştiren yazılım çözümüdür.'
                : 'ERP (Enterprise Resource Planning) is a software solution that integrates all core business processes — finance, accounting, inventory, order tracking, CRM, manufacturing, warehouse operations, and HR — into a single unified system.'}
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'Geleneksel iş yönetiminde her departman kendi yazılımını veya Excel dosyalarını kullanır. Bu durum veri tutarsızlıklarına, manuel hatalara ve zaman kaybına yol açar. ERP sistemi, tüm departmanların aynı veri tabanını paylaşmasını sağlayarak gerçek zamanlı bilgi akışı ve karar alma imkanı sunar.'
                : 'In traditional business management, each department uses its own software or spreadsheets. This leads to data inconsistencies, manual errors, and wasted time. An ERP system enables all departments to share the same database, providing real-time information flow and better decision-making.'}
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'ERP Sistemi Ne İşe Yarar?' : 'What Does an ERP System Do?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR ? 'Bir ERP sistemi şu temel işlevleri yerine getirir:' : 'An ERP system performs the following core functions:'}
            </p>
            <ul className="space-y-3 mb-8">
              {(isTR ? [
                'Stok ve envanter yönetimi: SKU bazlı ürün takibi, düşük stok uyarıları, depo transferi',
                'Sipariş yönetimi: Sipariş oluşturma, durum takibi, fatura ve irsaliye otomasyonu',
                'Müşteri ilişkileri (CRM): Müşteri veritabanı, iletişim geçmişi, teklif yönetimi',
                'Finans ve muhasebe: Gelir-gider takibi, nakit akışı, vergi raporları, maaş ödemeleri',
                'Depo yönetimi: Çoklu depo desteği, palet takibi, envanter günlüğü',
                'Raporlama ve analitik: Gerçek zamanlı dashboard, KPI takibi, özelleştirilebilir raporlar',
                'Üretim planlama: Üretim emirleri, BOM yönetimi, kapasite planlama',
                'İnsan kaynakları: Personel yönetimi, izin takibi, performans değerlendirme',
              ] : [
                'Inventory management: SKU-based tracking, low stock alerts, warehouse transfers',
                'Order management: Order creation, status tracking, automated invoicing',
                'Customer relationships (CRM): Customer database, communication history, quote management',
                'Finance & accounting: Revenue tracking, cash flow, tax reports, payroll',
                'Warehouse management: Multi-warehouse support, pallet tracking, inventory logs',
                'Reporting & analytics: Real-time dashboards, KPI tracking, customizable reports',
                'Manufacturing planning: Work orders, BOM management, capacity planning',
                'Human resources: Employee management, leave tracking, performance reviews',
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/70">
                  <DynamicIcon iconName="CheckCircle" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Hangi İşletmeler ERP Sistemine İhtiyaç Duyar?' : 'Which Businesses Need an ERP System?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'ERP sistemi genellikle şu durumlarda gereklidir: 10+ çalışanınız varsa ve manuel süreçlerden kurtulmak istiyorsanız, birden fazla departman arasında veri tutarsızlığı yaşıyorsanız, stok yönetimi ve sipariş takibi karmaşık hale geldiyse, gerçek zamanlı raporlara ve iş zekasına ihtiyaç duyuyorsanız, büyüme hedefiniz varsa ve altyapınızı ölçeklendirmek istiyorsanız.'
                : 'An ERP system is typically needed when: you have 10+ employees and want to eliminate manual processes, you experience data inconsistencies between departments, inventory and order management has become complex, you need real-time reports and business intelligence, or you have growth targets and need to scale your infrastructure.'}
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Özel ERP vs. Hazır ERP: Hangisini Seçmeli?' : 'Custom ERP vs. Off-the-Shelf ERP: Which to Choose?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'Hazır ERP sistemleri (SAP, Oracle, Microsoft Dynamics) büyük ölçekli işletmeler için tasarlanmıştır ve yüksek lisans ücretleri gerektirir. Özel ERP yazılımı ise işletmenizin tam iş süreçlerine uyum sağlar, aylık lisans ücreti yoktur ve uzun vadede daha maliyet etkindir. KOBİ ve orta ölçekli işletmeler için özel ERP genellikle daha avantajlıdır.'
                : 'Off-the-shelf ERP systems (SAP, Oracle, Microsoft Dynamics) are designed for large enterprises and require high licensing fees. Custom ERP software adapts perfectly to your business processes, has no monthly licensing fees, and is more cost-effective in the long run. For SMEs and mid-size businesses, custom ERP is usually more advantageous.'}
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Sonuç: İşletmeniz İçin Doğru Adım' : 'Conclusion: The Right Step for Your Business'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'ERP yazılımı, işletmenizin verimliliğini %40-60 oranında artırabilir, maliyetleri düşürebilir ve büyümenizi hızlandırabilir. Doğru ERP partneri seçimi, projenin başarısı için kritik öneme sahiptir. AŞAANA YAZILIM olarak, işletmenize özel ERP çözümü için ücretsiz ihtiyaç analizi sunuyoruz.'
                : 'ERP software can increase your business efficiency by 40-60%, reduce costs, and accelerate growth. Choosing the right ERP partner is critical to project success. At AŞAANA YAZILIM, we offer a free needs assessment for your custom ERP solution.'}
            </p>

            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-300 font-medium mb-2">
                {isTR ? '💡 İlgili Sayfa:' : '💡 Related Page:'}
              </p>
              <Link href="/erp-yazilimi" className="text-blue-400 hover:text-blue-300 font-semibold">
                {isTR ? 'ERP Yazılımı Çözümlerimiz →' : 'Our ERP Software Solutions →'}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">{isTR ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <details key={idx} className="glass-card rounded-xl group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:text-blue-400 transition-colors list-none">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-blue-400 text-2xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10 pt-4">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-3xl mx-auto">
            <LeadCaptureForm
              locale={(locale as 'tr' | 'en') || 'tr'}
              serviceType="erp"
              accentColor="blue"
              title={isTR ? 'ERP Projeniz İçin Ücretsiz Teklif Alın' : 'Get a Free Quote for Your ERP Project'}
              description={isTR
                ? 'İşletmenize en uygun ERP çözümünü birlikte belirleyelim. Formu doldurun, 24 saat içinde dönüş yapalım.'
                : "Let's determine the best ERP solution for your business. Fill the form and we'll respond within 24 hours."}
            />
          </div>
        </section>
      </article>
      <Footer />
    </main>
  );
}
