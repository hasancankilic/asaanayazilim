import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import DynamicIcon from '@/components/DynamicIcon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  
  return generateSEOMetadata({
    title: locale === 'tr' 
      ? 'Yazılım Projelerimiz ve Referanslar | AŞAANA YAZILIM'
      : 'Our Software Projects and References | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'Başarıyla tamamladığımız mobil ve web yazılım projeleri. Referanslarımız ve çözümlerimiz. Teknoloji stack\'i ve başarı hikayeleri.'
      : 'Successfully completed mobile and web software projects. Our references and solutions. Technology stack and success stories.',
    locale,
    url: locale === 'tr' ? '/tr/projeler' : '/en/projeler',
    image: '/og-image.jpg',
  });
}

const projects = [
  {
    id: 'project-1',
    title: 'Modern Bina Yönetim Sistemi',
    description: 'Akıllı bina yönetimi için kapsamlı yazılım çözümü',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    category: 'Web Yazılım',
    date: '2024 Q3',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'project-2',
    title: 'Yazılım Geliştirme Platformu',
    description: 'Geliştiriciler için modern kod geliştirme ortamı',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'SaaS',
    date: '2024 Q2',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'project-3',
    title: 'Kod Geliştirme Araçları',
    description: 'Yazılım geliştirme süreçlerini optimize eden araçlar',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    category: 'Web Yazılım',
    date: '2024 Q1',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'project-4',
    title: 'Mobil E-Ticaret Uygulaması',
    description: 'iOS ve Android için modern e-ticaret çözümü',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    category: 'Mobil Uygulama',
    date: '2023 Q4',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'project-5',
    title: 'AI Destekli Analiz Platformu',
    description: 'Yapay zeka ile veri analizi ve raporlama sistemi',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'Yapay Zeka',
    date: '2023 Q3',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'project-6',
    title: 'Kurumsal Dashboard',
    description: 'İş zekası ve raporlama için dashboard çözümü',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'Web Yazılım',
    date: '2023 Q2',
    gradient: 'from-teal-500 to-green-500',
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            title="Projelerimiz"
            description="Geçmişten bugüne, farklı sektörlerde gerçekleştirdiğimiz başarılı projeler"
            iconName="FolderKanban"
            headingLevel="h1"
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projeler/${project.id}`}
                className="group block"
              >
                <div className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] relative">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-white text-sm font-medium backdrop-blur-sm`}>
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                      <div className="flex items-center gap-1">
                        <DynamicIcon iconName="Calendar" className="w-4 h-4" />
                        {project.date}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                      Detayları Gör
                      <DynamicIcon iconName="ArrowRight" className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Tamamlanan Proje', value: '100+', icon: '✅' },
              { label: 'Mutlu Müşteri', value: '50+', icon: '🎉' },
              { label: 'Deneyim (Yıl)', value: '5+', icon: '📈' },
              { label: 'Teknoloji', value: '20+', icon: '🚀' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 text-center hover:border-blue-400/60 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
