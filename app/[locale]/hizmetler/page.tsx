import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import { Link } from '@/i18n/routing';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import ServiceIcon from '@/components/ServiceIcon';
import ServiceFeatureIcon from '@/components/ServiceFeatureIcon';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  
  return generateSEOMetadata({
    title: locale === 'tr' 
      ? 'Yazılım Hizmetlerimiz | Mobil & Web Yazılım | AŞAANA YAZILIM'
      : 'Our Software Services | Mobile & Web Development | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'Mobil uygulama, web yazılım, SaaS çözümleri, yapay zeka ve UI/UX tasarım hizmetlerimiz. İşinize değer katan yazılım çözümleri.'
      : 'Mobile app, web software, SaaS solutions, artificial intelligence and UI/UX design services. Software solutions that add value to your business.',
    locale,
    url: locale === 'tr' ? '/tr/hizmetler' : '/en/hizmetler',
    image: '/og-image.jpg',
  });
}

const services = [
  {
    id: 'mobil-uygulama',
    name: 'Mobil Uygulama',
    iconName: 'Smartphone',
    description: 'iOS ve Android platformları için modern mobil uygulamalar',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['React Native', 'Flutter', 'Native Performance'],
  },
  {
    id: 'web-yazilim',
    name: 'Web Yazılım',
    iconName: 'Monitor',
    description: 'Ölçeklenebilir ve performanslı web uygulamaları',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: 'saas-cozumleri',
    name: 'SaaS Çözümleri',
    iconName: 'Code',
    description: 'Bulut tabanlı yazılım hizmetleri',
    gradient: 'from-indigo-500 to-blue-500',
    features: ['Multi-tenant', 'Auto-scaling', 'API First'],
  },
  {
    id: 'yapay-zeka',
    name: 'Yapay Zeka',
    iconName: 'Brain',
    description: 'AI ve makine öğrenmesi çözümleri',
    gradient: 'from-orange-500 to-red-500',
    features: ['Machine Learning', 'NLP', 'Computer Vision'],
  },
  {
    id: 'ui-ux-tasarim',
    name: 'UI / UX Tasarım',
    iconName: 'Palette',
    description: 'Kullanıcı odaklı tasarım çözümleri',
    gradient: 'from-pink-500 to-rose-500',
    features: ['User Research', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'danismanlik',
    name: 'Danışmanlık',
    iconName: 'MessageSquare',
    description: 'Teknoloji danışmanlık hizmetleri',
    gradient: 'from-teal-500 to-green-500',
    features: ['Tech Audit', 'Architecture', 'DevOps'],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            title="Hizmetlerimiz"
            description="İşinize değer katacak, ölçeklenebilir ve modern teknoloji çözümleri"
            iconName="Sparkles"
            headingLevel="h1"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              return (
                <Link
                  key={service.id}
                  href={`/hizmetler/${service.id}`}
                  className="group block"
                >
                  <div className="glass-card rounded-2xl p-8 h-full cursor-pointer transition-all duration-300 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <ServiceIcon iconName={service.iconName} className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-white/60"
                          >
                            <ServiceFeatureIcon iconName="CheckCircle" className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                        Detayları Gör
                        <ServiceFeatureIcon iconName="ArrowRight" className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-12 border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Size Özel Çözüm İster misiniz?
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              İhtiyaçlarınıza uygun, özelleştirilmiş yazılım çözümleri için bizimle iletişime geçin.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105"
            >
              İletişime Geçin
              <ServiceFeatureIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
