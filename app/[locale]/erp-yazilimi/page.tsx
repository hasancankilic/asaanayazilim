import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import DynamicIcon from '@/components/DynamicIcon';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';

  return generateSEOMetadata({
    title: locale === 'tr'
      ? 'ERP Yazılımı Geliştirme | Özel ERP Sistemi | AŞAANA YAZILIM'
      : 'ERP Software Development | Custom ERP System | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'İşletmenize özel ERP yazılımı geliştirme hizmeti. Stok, sipariş, müşteri, finans ve depo yönetimi tek platformda. Ücretsiz danışmanlık için hemen arayın.'
      : 'Custom ERP software development for your business. Inventory, orders, CRM, finance and warehouse management in one platform. Get free consultation now.',
    locale,
    url: locale === 'tr' ? '/tr/erp-yazilimi' : '/en/erp-yazilimi',
    image: '/images/projects/erp/dashboard.jpg',
    type: 'website',
  });
}

const faqItems = [
  {
    q: 'ERP yazılımı nedir ve ne işe yarar?',
    a: 'ERP (Enterprise Resource Planning), işletmenizin tüm operasyonel süreçlerini — stok yönetimi, sipariş takibi, müşteri ilişkileri, finans, muhasebe, depo operasyonları ve insan kaynakları — tek bir platformda birleştiren kurumsal kaynak planlama sistemidir. İş verimliliğinizi %40-60 oranında artırabilir.',
  },
  {
    q: 'Özel ERP yazılımı maliyeti ne kadar?',
    a: 'ERP yazılımı maliyeti, işletmenizin ihtiyaçlarına, modül sayısına ve karmaşıklığına göre değişir. Küçük işletmeler için temel ERP sistemleri 50.000 TL\'den başlarken, kapsamlı kurumsal çözümler 500.000 TL\'ye kadar çıkabilir. Ücretsiz ihtiyaç analizi için bizimle iletişime geçin.',
  },
  {
    q: 'ERP sistemi ne kadar sürede hazır olur?',
    a: 'Temel bir ERP sistemi 2-4 ay içinde, kapsamlı kurumsal ERP çözümü ise 6-12 ay içinde teslim edilebilir. Agile metodoloji ile çalıştığımız için her 2 haftada bir çalışan modüller teslim edilir ve süreç içinde geri bildirim alınır.',
  },
  {
    q: 'Hazır ERP mi özel ERP mi tercih etmeliyim?',
    a: 'Hazır ERP sistemleri (SAP, Oracle) yüksek lisans ücretleri ve uzun implementasyon süreleri gerektirir. Özel ERP yazılımı ise tam olarak iş süreçlerinize uyarlanır, aylık lisans ücreti yoktur ve uzun vadede daha maliyet etkindir. Özellikle KOBİ ve orta ölçekli işletmeler için özel ERP daha avantajlıdır.',
  },
  {
    q: 'ERP sisteminde hangi modüller bulunur?',
    a: 'İşletmenizin ihtiyaçlarına göre şu modüller eklenebilir: Stok ve envanter yönetimi, sipariş yönetimi, müşteri ilişkileri yönetimi (CRM), finans ve muhasebe, depo yönetimi, filo yönetimi, insan kaynakları, raporlama ve analitik dashboard, üretim planlama ve satın alma.',
  },
  {
    q: 'Mevcut sistemlerimizle entegrasyon yapılıyor mu?',
    a: 'Evet. ERP sistemimiz mevcut muhasebe programlarınız, e-ticaret platformlarınız, bankacılık sistemleriniz ve diğer iş yazılımlarınızla API entegrasyonu ile sorunsuz çalışır. E-fatura, e-arşiv ve e-irsaliye entegrasyonları da mevcuttur.',
  },
  {
    q: 'ERP yazılımı bulutta mı çalışır yoksa sunucuda mı?',
    a: 'Her iki seçenek de mevcuttur. Bulut tabanlı (cloud) ERP sistemi ile her yerden erişim sağlarken, on-premise (yerel sunucu) kurulum ile verilerinizi kendi sunucularınızda tutabilirsiniz. Hybrid çözümler de sunulmaktadır.',
  },
];

const erpModules = [
  { icon: '📊', title: 'Dashboard & KPI', desc: 'Gerçek zamanlı finansal performans, stok değeri, gelir-gider takibi ve iş zekası raporları' },
  { icon: '📦', title: 'Stok & Envanter', desc: 'SKU bazlı ürün takibi, düşük stok uyarıları, depo transferi ve barkod entegrasyonu' },
  { icon: '🛒', title: 'Sipariş Yönetimi', desc: 'Sipariş oluşturma, durum takibi, toplu sipariş işleme ve otomatik fatura oluşturma' },
  { icon: '👥', title: 'Müşteri Yönetimi (CRM)', desc: 'Müşteri veritabanı, iletişim geçmişi, teklif yönetimi ve müşteri segmentasyonu' },
  { icon: '💰', title: 'Finans & Muhasebe', desc: 'Gelir-gider takibi, maaş ödemeleri, avans yönetimi, nakit akışı ve vergi raporları' },
  { icon: '🚚', title: 'Filo & Lojistik', desc: 'Araç takibi, bakım planlama, maliyet analizi, sürücü yönetimi ve rota optimizasyonu' },
  { icon: '🏭', title: 'Depo Yönetimi', desc: 'Çoklu depo desteği, palet takibi, envanter günlüğü ve depo transfer operasyonları' },
  { icon: '📈', title: 'Raporlama & Analitik', desc: 'Aylık döküm, maliyet grafikleri, satış performansı ve özelleştirilebilir raporlar' },
];

export default async function ERPPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'AŞAANA ERP Sistemi',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Kapsamlı kurumsal kaynak planlama (ERP) yazılımı. Stok, sipariş, CRM, finans ve depo yönetimi.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          price: '50000',
          priceValidUntil: '2026-12-31',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '47',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
      {
        '@type': 'LocalBusiness',
        name: 'AŞAANA YAZILIM',
        description: 'ERP yazılımı geliştirme ve özel yazılım çözümleri sunan teknoloji firması',
        url: 'https://asaanayazilim.com',
        telephone: '+90-505-470-01-25',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'İstanbul',
          addressCountry: 'TR',
        },
        areaServed: 'TR',
        priceRange: '₺₺₺',
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <Script
        id="erp-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-indigo-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                Türkiye&apos;nin Yeni Nesil ERP Çözümü
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                İşletmenize Özel{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  ERP Yazılımı
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Stok yönetiminden sipariş takibine, müşteri ilişkilerinden finansal raporlamaya kadar 
                tüm iş süreçlerinizi tek platformda birleştirin. İşletmenizin verimliliğini %60 artırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105"
                >
                  Ücretsiz ERP Danışmanlığı Al
                  <DynamicIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="tel:+905054700125"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/5"
                >
                  <DynamicIcon iconName="Phone" className="mr-2 w-5 h-5" />
                  Hemen Arayın
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <DynamicIcon iconName="CheckCircle" className="w-4 h-4 text-green-400" />
                  Ücretsiz İhtiyaç Analizi
                </div>
                <div className="flex items-center gap-2">
                  <DynamicIcon iconName="CheckCircle" className="w-4 h-4 text-green-400" />
                  2 Haftada İlk Modül
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-3xl"></div>
                <div className="relative glass-card rounded-2xl p-6 border border-blue-500/20">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <p className="text-white/50 text-xs mb-1">Toplam Stok Değeri</p>
                      <p className="text-2xl font-bold text-white">₺3.801.020</p>
                      <p className="text-green-400 text-xs">↑ +2.5%</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <p className="text-white/50 text-xs mb-1">Net Kâr</p>
                      <p className="text-2xl font-bold text-white">₺55.827</p>
                      <p className="text-green-400 text-xs">↑ +8.4%</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <p className="text-white/50 text-xs mb-1">Aktif Sipariş</p>
                      <p className="text-2xl font-bold text-white">31</p>
                      <p className="text-blue-400 text-xs">Son 30 gün</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <p className="text-white/50 text-xs mb-1">Toplam Müşteri</p>
                      <p className="text-2xl font-bold text-white">128</p>
                      <p className="text-green-400 text-xs">↑ +12%</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-white/50 text-xs mb-2">Finansal Performans (Son 6 Ay)</p>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 55, 35, 70, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ERP Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ERP Sistemi Modülleri
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              İşletmenizin ihtiyacına göre özelleştirilebilen 8+ modül ile tüm süreçlerinizi yönetin
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {erpModules.map((module, idx) => (
              <div key={idx} className="glass-card rounded-xl p-6 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="text-4xl mb-4">{module.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Custom ERP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Neden Özel ERP Yazılımı?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">❌ Hazır ERP Sistemleri (SAP, Oracle)</h3>
              <ul className="space-y-3 text-white/70">
                <li>• Yüksek lisans ücretleri (yıllık $10.000-$500.000+)</li>
                <li>• Uzun implementasyon süresi (12-24 ay)</li>
                <li>• İş süreçlerinize uyum için maliyetli özelleştirme</li>
                <li>• Kullanıcı başına aylık ücret</li>
                <li>• Karmaşık ve kullanımı zor arayüzler</li>
                <li>• Yetersiz yerel destek</li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-8 border border-green-500/20 bg-green-500/5">
              <h3 className="text-xl font-bold text-white mb-4">✅ AŞAANA Özel ERP</h3>
              <ul className="space-y-3 text-white/70">
                <li>• Tek seferlik yatırım, ömür boyu kullanım</li>
                <li>• 2-6 ay içinde tam teslim</li>
                <li>• %100 iş süreçlerinize uygun</li>
                <li>• Sınırsız kullanıcı, ek ücret yok</li>
                <li>• Modern ve kullanıcı dostu arayüz</li>
                <li>• 7/24 yerel teknik destek</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - SEO Long Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <h2 className="text-3xl font-bold text-white mb-6">
            ERP Yazılımı: İşletmenizi Dijital Dönüştürmenin En Etkili Yolu
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Günümüz iş dünyasında rekabet avantajı elde etmek isteyen işletmeler için <strong className="text-white">ERP (Enterprise Resource Planning) yazılımı</strong> vazgeçilmez bir araç haline gelmiştir. 
            AŞAANA YAZILIM olarak, Türkiye&apos;deki KOBİ ve orta ölçekli işletmelere özel, uygun maliyetli ve hızlı implementasyonlu ERP çözümleri sunuyoruz.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            <strong className="text-white">Özel ERP yazılımımız</strong>, işletmenizin benzersiz iş süreçlerine tam uyum sağlar. 
            Hazır paket programların kısıtlamalarına takılmadan, ihtiyacınız olan her modülü ekleyebilir, 
            kullanmadığınız özellikler için gereksiz maliyet ödemezsiniz. Stok yönetiminden sipariş takibine, 
            müşteri ilişkilerinden finansal raporlamaya kadar tüm operasyonel süreçlerinizi tek bir platformda birleştirin.
          </p>
          <h3 className="text-2xl font-bold text-white mt-10 mb-4">ERP Sistemi Hangi İşletmeler İçin Uygundur?</h3>
          <p className="text-white/70 leading-relaxed mb-6">
            ERP sistemi; üretim, dağıtım, perakende, toptan satış, lojistik, hizmet sektörü ve e-ticaret gibi 
            pek çok alanda faaliyet gösteren işletmeler için idealdir. Özellikle birden fazla departmanın 
            koordineli çalışması gereken, stok takibi ve sipariş yönetiminin kritik olduğu işletmelerde 
            ERP yazılımı verimliliği %40-60 oranında artırabilir.
          </p>
          <h3 className="text-2xl font-bold text-white mt-10 mb-4">ERP Yazılımı Sürecimiz</h3>
          <p className="text-white/70 leading-relaxed mb-6">
            1. <strong className="text-white">İhtiyaç Analizi (Ücretsiz):</strong> İşletmenizin tüm süreçlerini yerinde inceliyoruz.<br/>
            2. <strong className="text-white">Proje Planlaması:</strong> Detaylı roadmap ve zaman planı hazırlıyoruz.<br/>
            3. <strong className="text-white">Agile Geliştirme:</strong> Her 2 haftada bir çalışan modül teslim ediyoruz.<br/>
            4. <strong className="text-white">Test & Kalite:</strong> Kapsamlı test süreçleri ile hatasız teslim.<br/>
            5. <strong className="text-white">Eğitim & Destek:</strong> Ekibinize tam eğitim ve sürekli teknik destek.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details key={idx} className="glass-card rounded-xl group">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:text-blue-400 transition-colors list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-blue-400 text-2xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'tr' ? 'Ücretsiz ERP İhtiyaç Analizi' : 'Free ERP Needs Assessment'}
            </h2>
            <p className="text-xl text-white/70">
              {locale === 'tr'
                ? 'İşletmenize en uygun ERP çözümünü birlikte belirleyelim.'
                : "Let's determine the best ERP solution for your business."}
            </p>
          </div>
          <LeadCaptureForm
            locale={locale}
            serviceType="erp"
            accentColor="blue"
            title={locale === 'tr' ? 'ERP Projesi Teklifi Alın' : 'Get an ERP Project Quote'}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
