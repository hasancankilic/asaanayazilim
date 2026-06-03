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
      ? 'Özel Yazılım vs Hazır Yazılım: Hangisini Seçmeli? (2026) | AŞAANA YAZILIM'
      : 'Custom Software vs Off-the-Shelf: Which to Choose? (2026) | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'Özel yazılım mı hazır paket yazılım mı? Maliyet, süre, esneklik ve uzun vadeli değer açısından detaylı karşılaştırma. 2026 güncel rehber.'
      : 'Custom software or off-the-shelf? Detailed comparison on cost, timeline, flexibility and long-term value. 2026 updated guide.',
    locale,
    url: locale === 'tr' ? '/tr/blog/ozel-yazilim-vs-hazir-yazilim' : '/en/blog/ozel-yazilim-vs-hazir-yazilim',
    type: 'article',
  });
}

const faqItems = [
  { q: 'Özel yazılım mı hazır yazılım mı daha iyi?', a: 'İşletmenizin ihtiyaçlarına bağlıdır. İş süreçleriniz standart ise ve bütçeniz kısıtlıysa hazır yazılım uygun olabilir. Ancak benzersiz iş süreçleriniz varsa, uzun vadede maliyet avantajı istiyorsanız ve tam kontrol sahibi olmak istiyorsanız özel yazılım daha iyi bir seçenektir.' },
  { q: 'Hazır yazılımın dezavantajları nelerdir?', a: 'Hazır yazılımın başlıca dezavantajları: aylık/yıllık lisans ücretleri, iş süreçlerinize tam uymama, özelleştirme kısıtlamaları, vendor bağımlılığı, veri taşınabilirliği sorunları ve kullanmadığınız özellikler için ödeme yapma zorunluluğu.' },
  { q: 'Özel yazılım ne kadar sürede yapılır?', a: 'Basit uygulamalar 4-8 hafta, orta karmaşıklıkta projeler 3-6 ay, kapsamlı kurumsal sistemler 6-12 ay sürebilir. Agile metodoloji ile her 2 haftada çalışan yazılım teslim edilir.' },
  { q: 'Yazılım firması seçerken nelere dikkat etmeliyim?', a: 'Referans projeler, teknoloji uzmanlığı, proje yönetim metodolojisi, şeffaf fiyatlandırma, sözleşme koşulları (kaynak kodu hakkı), destek hizmetleri ve müşteri yorumları en önemli kriterlerdir.' },
];

export default async function CustomVsReadyPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTR = (locale || 'tr') === 'tr';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: isTR ? 'Özel Yazılım vs Hazır Yazılım: Hangisini Seçmeli?' : 'Custom Software vs Off-the-Shelf: Which to Choose?',
        author: { '@type': 'Organization', name: 'AŞAANA YAZILIM' },
        datePublished: '2026-03-05',
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
      <Script id="blog-compare-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <article>
        <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-pink-900/10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 text-sm">
              <DynamicIcon iconName="ArrowLeft" className="w-4 h-4 mr-1" /> {isTR ? 'Blog\'a Dön' : 'Back to Blog'}
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">{isTR ? 'Yazılım Karşılaştırma' : 'Software Comparison'}</span>
              <span className="text-white/40 text-xs">5 Mart 2026 · 10 dk okuma</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {isTR ? 'Özel Yazılım vs Hazır Yazılım: Hangisini Seçmeli?' : 'Custom Software vs Off-the-Shelf: Which to Choose?'}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {isTR
                ? 'İşletmeniz için yazılım kararı verirken karşınıza çıkan en temel soru: hazır paket yazılım mı kullanmalı, yoksa size özel yazılım mı geliştirmeli? Bu rehberde her iki seçeneği maliyet, süre, esneklik ve uzun vadeli değer açısından karşılaştıracağız.'
                : 'The most fundamental question when making a software decision: should you use off-the-shelf software or invest in custom development? We\'ll compare both options on cost, timeline, flexibility, and long-term value.'}
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              {isTR ? 'Hazır Yazılım Nedir?' : 'What is Off-the-Shelf Software?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'Hazır yazılım (SaaS veya paket yazılım), genel kullanım için önceden geliştirilmiş, abonelik veya lisans ile satılan yazılımdır. SAP, Oracle, Salesforce, Microsoft Dynamics gibi büyük firmalar bu kategoridedir. Avantajı hızlı kurulum ve düşük başlangıç maliyetidir; ancak iş süreçlerinize tam uymayabilir.'
                : 'Off-the-shelf software (SaaS or packaged software) is pre-built for general use and sold via subscription or license. SAP, Oracle, Salesforce, Microsoft Dynamics fall in this category. Its advantage is quick setup and low initial cost; however, it may not perfectly fit your business processes.'}
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Özel Yazılım Nedir?' : 'What is Custom Software?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR
                ? 'Özel yazılım, işletmenizin spesifik ihtiyaçlarına göre sıfırdan geliştirilen yazılımdır. İş süreçleriniz, sektör gereksinimleriniz ve büyüme hedefleriniz doğrultusunda tasarlanır. Kaynak kodu size ait olur, istediğiniz zaman istediğiniz değişikliği yapabilirsiniz.'
                : 'Custom software is built from scratch for your specific business needs. It\'s designed around your business processes, industry requirements, and growth targets. You own the source code and can make any changes whenever you want.'}
            </p>

            {/* Comparison Table */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Detaylı Karşılaştırma Tablosu' : 'Detailed Comparison Table'}
            </h2>
            <div className="not-prose overflow-x-auto my-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white/60">{isTR ? 'Kriter' : 'Criteria'}</th>
                    <th className="text-left py-3 px-4 text-white">{isTR ? 'Hazır Yazılım' : 'Off-the-Shelf'}</th>
                    <th className="text-left py-3 px-4 text-green-400">{isTR ? 'Özel Yazılım ⭐' : 'Custom Software ⭐'}</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  {[
                    [isTR ? 'Başlangıç maliyeti' : 'Initial cost', isTR ? 'Düşük-Orta' : 'Low-Medium', isTR ? 'Orta-Yüksek' : 'Medium-High'],
                    [isTR ? 'Uzun vadeli maliyet (5 yıl)' : 'Long-term cost (5yr)', isTR ? 'Çok Yüksek' : 'Very High', isTR ? 'Düşük' : 'Low'],
                    [isTR ? 'Kurulum süresi' : 'Setup time', isTR ? '1-4 hafta' : '1-4 weeks', isTR ? '2-12 ay' : '2-12 months'],
                    [isTR ? 'İş süreçlerine uyum' : 'Process fit', isTR ? '%40-70' : '40-70%', isTR ? '%100' : '100%'],
                    [isTR ? 'Özelleştirme' : 'Customization', isTR ? 'Sınırlı' : 'Limited', isTR ? 'Sınırsız' : 'Unlimited'],
                    [isTR ? 'Ölçeklenebilirlik' : 'Scalability', isTR ? 'Paket sınırları' : 'Package limits', isTR ? 'Sınırsız' : 'Unlimited'],
                    [isTR ? 'Kaynak kodu' : 'Source code', isTR ? 'Yok' : 'None', isTR ? 'Size ait' : 'Yours'],
                    [isTR ? 'Vendor bağımlılığı' : 'Vendor lock-in', isTR ? 'Yüksek' : 'High', isTR ? 'Yok' : 'None'],
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/50">{row[0]}</td>
                      <td className="py-3 px-4">{row[1]}</td>
                      <td className="py-3 px-4 text-green-400">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">
              {isTR ? 'Hangi Durumda Hangisini Seçmeli?' : 'When to Choose Which?'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR ? 'Hazır yazılım şu durumlarda uygundur:' : 'Off-the-shelf software is suitable when:'}
            </p>
            <ul className="space-y-2 mb-6">
              {(isTR ? [
                'İş süreçleriniz endüstri standardına uyuyorsa',
                'Bütçeniz kısıtlıysa ve hızlı başlamanız gerekiyorsa',
                'Temel CRM, muhasebe veya e-posta gibi genel ihtiyaçlarınız varsa',
                'Küçük bir ekibiniz varsa (1-5 kişi)',
              ] : [
                'Your business processes follow industry standards',
                'Your budget is limited and you need to start quickly',
                'You have general needs like basic CRM, accounting, or email',
                'You have a small team (1-5 people)',
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/70">
                  <span className="text-yellow-400">•</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/70 leading-relaxed mb-6">
              {isTR ? 'Özel yazılım şu durumlarda uygundur:' : 'Custom software is suitable when:'}
            </p>
            <ul className="space-y-2 mb-8">
              {(isTR ? [
                'Benzersiz iş süreçleriniz ve sektörel gereksinimleriniz varsa',
                'Mevcut sistemlerle entegrasyon gerekiyorsa',
                'Uzun vadede maliyet avantajı istiyorsanız',
                'Rekabet avantajı sağlayacak özellikler istiyorsanız',
                'Büyüme hedefiniz varsa ve yazılımın sizinle ölçeklenmesini istiyorsanız',
              ] : [
                'You have unique business processes and industry requirements',
                'Integration with existing systems is needed',
                'You want long-term cost advantages',
                'You need features that provide competitive advantage',
                'You have growth targets and want software that scales with you',
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/70">
                  <DynamicIcon iconName="CheckCircle" className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-purple-300 font-medium mb-2">
                {isTR ? '💡 İlgili Sayfa:' : '💡 Related Page:'}
              </p>
              <Link href="/ozel-yazilim" className="text-purple-400 hover:text-purple-300 font-semibold">
                {isTR ? 'Özel Yazılım Çözümlerimiz →' : 'Our Custom Software Solutions →'}
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

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-3xl mx-auto">
            <LeadCaptureForm locale={(locale as 'tr' | 'en') || 'tr'} serviceType="custom-software" accentColor="purple"
              title={isTR ? 'Projeniz İçin Ücretsiz Değerlendirme' : 'Free Project Evaluation'}
              description={isTR ? 'İşletmenize en uygun yazılım çözümünü birlikte belirleyelim.' : "Let's determine the best software solution for your business."} />
          </div>
        </section>
      </article>
      <Footer />
    </main>
  );
}
