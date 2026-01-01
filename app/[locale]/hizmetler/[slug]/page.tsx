import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { ArrowLeft, CheckCircle, ArrowRight, Sparkles } from '@/lib/icons';
import PageTransition from '@/components/PageTransition';

const serviceDetails: Record<string, any> = {
  'mobil-uygulama': {
    title: 'Mobil Uygulama Geliştirme',
    description:
      'iOS ve Android platformları için modern, performanslı ve kullanıcı dostu mobil uygulamalar geliştiriyoruz. Native ve cross-platform çözümler sunuyoruz.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS SDK', 'Android SDK'],
    benefits: [
      'Native performans seviyesinde uygulamalar',
      'Cross-platform uyumluluk ve kod paylaşımı',
      'Modern UI/UX tasarım prensipleri',
      'App Store ve Play Store optimizasyonu',
      'Sürekli güncelleme ve teknik destek',
      'Push notification entegrasyonu',
      'Offline çalışma desteği',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    icon: '📱',
  },
  'web-yazilim': {
    title: 'Web Yazılım Geliştirme',
    description:
      'Ölçeklenebilir, güvenli ve yüksek performanslı web uygulamaları geliştiriyoruz. Modern teknolojilerle işinizi dijitalleştiriyoruz.',
    technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
    benefits: [
      'Yüksek performans ve hızlı yükleme süreleri',
      'SEO optimizasyonu ve arama motoru uyumluluğu',
      'Güvenlik odaklı geliştirme yaklaşımı',
      'Tam responsive tasarım',
      'Sürekli bakım ve destek hizmetleri',
      'RESTful API entegrasyonları',
      'Real-time özellikler',
    ],
    gradient: 'from-purple-500 to-pink-500',
    icon: '💻',
  },
  'saas-cozumleri': {
    title: 'SaaS Çözümleri',
    description:
      'Bulut tabanlı yazılım hizmetleri ile iş süreçlerinizi dijitalleştirin. Ölçeklenebilir ve esnek SaaS platformları geliştiriyoruz.',
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Microservices', 'API Gateway'],
    benefits: [
      'Bulut tabanlı altyapı ve güvenilirlik',
      'Otomatik ölçeklendirme kapasitesi',
      'Yüksek erişilebilirlik oranları',
      'Güvenli veri yönetimi ve yedekleme',
      'Maliyet etkin çözümler',
      'Multi-tenant mimari',
      'Subscrition yönetimi',
    ],
    gradient: 'from-indigo-500 to-blue-500',
    icon: '☁️',
  },
  'yapay-zeka': {
    title: 'Yapay Zeka Çözümleri',
    description:
      'Yapay zeka ve makine öğrenmesi teknolojileri ile iş süreçlerinizi optimize edin. AI destekli çözümler geliştiriyoruz.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Computer Vision', 'NLP'],
    benefits: [
      'Otomatik süreç yönetimi ve optimizasyon',
      'Veri analizi ve tahmin modelleri',
      'Doğal dil işleme çözümleri',
      'Görüntü tanıma ve işleme',
      'Özelleştirilmiş AI modelleri',
      'Chatbot ve sanal asistanlar',
      'Anomali tespiti sistemleri',
    ],
    gradient: 'from-orange-500 to-red-500',
    icon: '🤖',
  },
  'ui-ux-tasarim': {
    title: 'UI / UX Tasarım',
    description:
      'Kullanıcı odaklı, modern ve etkileyici arayüz tasarımları oluşturuyoruz. Kullanıcı deneyimini ön planda tutuyoruz.',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Design Systems', 'User Research'],
    benefits: [
      'Kullanıcı odaklı tasarım yaklaşımı',
      'Modern ve şık arayüzler',
      'Prototipleme ve kullanıcı testleri',
      'Tam responsive tasarım',
      'Marka kimliği uyumu',
      'Erişilebilirlik standartları (WCAG)',
      'Design system oluşturma',
    ],
    gradient: 'from-pink-500 to-rose-500',
    icon: '🎨',
  },
  danismanlik: {
    title: 'Teknoloji Danışmanlığı',
    description:
      'Teknoloji stratejilerinizi belirlemenize yardımcı oluyoruz. Dijital dönüşüm süreçlerinizde yanınızdayız.',
    technologies: ['Teknoloji Stratejisi', 'Dijital Dönüşüm', 'Mimari Tasarım', 'Proje Yönetimi', 'Agile/Scrum', 'DevOps'],
    benefits: [
      'Uzman teknoloji danışmanlığı',
      'Stratejik planlama ve roadmap',
      'Teknoloji stack seçimi',
      'Proje yönetimi ve metodoloji',
      'Sürekli destek ve rehberlik',
      'Risk analizi ve azaltma',
      'Ekip eğitimi ve knowledge transfer',
    ],
    gradient: 'from-teal-500 to-green-500',
    icon: '💼',
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Hizmet Bulunamadı</h1>
            <Link
              href="/hizmetler"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Hizmetler sayfasına dön
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/hizmetler"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Hizmetlere Dön
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-4xl shadow-lg`}>
              {service.icon}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{service.title}</h1>
              <p className="text-xl text-white/70">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      <PageTransition>
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Technologies */}
              <div>
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-blue-400" />
                  Kullanılan Teknolojiler
                </h2>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-white backdrop-blur-sm hover:bg-blue-600/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  Avantajlar
                </h2>
                <div className="glass-card rounded-2xl p-8">
                  <ul className="space-y-4">
                    {service.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start text-white/80 group">
                        <CheckCircle className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <div className="glass-card rounded-2xl p-12 text-center border border-blue-500/20">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Bu Hizmet Hakkında Daha Fazla Bilgi Alın
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Özel ihtiyaçlarınız için detaylı bir teklif hazırlayalım
                </p>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105"
                >
                  Teklif Al
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  );
}
