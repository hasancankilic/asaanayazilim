import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import DynamicIcon from '@/components/DynamicIcon';
import ImageGallery from '@/components/ImageGallery';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const projectDetails: Record<string, any> = {
  'asaana-erp': {
    title: 'Asaana ERP - Kurumsal Kaynak Planlama Sistemi',
    description: 'İşletmelerin tüm operasyonel süreçlerini tek bir platformda birleştiren kapsamlı ERP çözümü. Stok yönetiminden sipariş takibine, müşteri ilişkilerinden finansal raporlamaya, filo yönetiminden depo operasyonlarına kadar uçtan uca iş yönetimi.',
    image: '/images/projects/erp/dashboard.jpg',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'SQLite', 'Framer Motion'],
    features: [
      'Dashboard & KPI Analiz — Gerçek zamanlı finansal performans, stok değeri, gelir-gider takibi',
      'Ürün & Stok Yönetimi — SKU bazlı ürün takibi, düşük stok uyarıları, depo transferi',
      'Sipariş Yönetimi — Sipariş oluşturma, durum takibi (Beklemede/İşlemde/Tamamlandı)',
      'Müşteri Yönetimi (CRM) — Müşteri veritabanı, iletişim bilgileri, vergi kayıtları',
      'Finans & Muhasebe — Maaş ödemeleri, avans takibi, kesintiler, nakit akışı',
      'Filo Yönetimi — Araç takibi, bakım planlama, maliyet analizi, sürücü yönetimi',
      'Depo Yönetimi — Çoklu depo desteği, palet doluluk oranı, envanter günlüğü',
      'Raporlama & Analitik — Aylık döküm, maliyet grafikleri, satış performansı',
      'Çoklu Kullanıcı & Rol Yönetimi — Yönetici/çalışan rolleri, işlem geçmişi',
    ],
    result: 'İşletme operasyonlarında %60 verimlilik artışı, stok maliyetlerinde %25 azalma, sipariş işleme süresinde %50 hızlanma sağlandı.',
    category: 'ERP / SaaS',
    date: '2026 Q1',
    gradient: 'from-blue-600 to-indigo-600',
    gallery: [
      { src: '/images/projects/erp/dashboard.jpg', label: 'Ana Dashboard — KPI Kartları & Finansal Performans' },
      { src: '/images/projects/erp/products.jpg', label: 'Ürün Listesi — Stok Takibi & Kategori Yönetimi' },
      { src: '/images/projects/erp/customers.jpg', label: 'Müşteri Yönetimi — CRM Modülü' },
      { src: '/images/projects/erp/orders.jpg', label: 'Sipariş Yönetimi — Durum Takibi' },
      { src: '/images/projects/erp/finance.jpg', label: 'Finans & Muhasebe — Maaş, Avans, Kesintiler' },
      { src: '/images/projects/erp/driver-management.jpg', label: 'Sürücü Yönetimi & Ödemeler' },
      { src: '/images/projects/erp/fleet-cost.jpg', label: 'Filo Maliyet Analizi' },
      { src: '/images/projects/erp/maintenance.jpg', label: 'Bakım Planlama & Servis Takibi' },
      { src: '/images/projects/erp/vehicles.jpg', label: 'Araç Yönetimi & Durum Takibi' },
      { src: '/images/projects/erp/warehouse.jpg', label: 'Depo Envanteri — SKU Bazlı Takip' },
      { src: '/images/projects/erp/warehouse-list.jpg', label: 'Depo Listesi — Çoklu Depo Desteği' },
      { src: '/images/projects/erp/inventory-log.jpg', label: 'Hareket Günlüğü & Denetim Analizleri' },
      { src: '/images/projects/erp/overview.jpg', label: 'Genel Bakış — Nakit Akışı & İşlem Geçmişi' },
    ],
  },
  'project-1': {
    title: 'Modern Bina Yönetim Sistemi',
    description: 'Akıllı bina yönetimi için kapsamlı yazılım çözümü. Otomasyon, güvenlik ve enerji yönetimi tek platformda.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'IoT'],
    features: [
      'Akıllı otomasyon sistemleri',
      'Gerçek zamanlı izleme',
      'Enerji yönetimi',
      'Güvenlik entegrasyonu',
      'Mobil uygulama desteği',
      'Raporlama ve analitik',
      'Kullanıcı yönetimi',
    ],
    result: 'Bina yönetim maliyetlerinde %40 azalma, enerji tüketiminde %25 tasarruf sağlandı.',
    category: 'Web Yazılım',
    date: '2024 Q3',
    gradient: 'from-blue-500 to-cyan-500',
  },
  'project-2': {
    title: 'Yazılım Geliştirme Platformu',
    description: 'Geliştiriciler için modern kod geliştirme ortamı. Versiyon kontrolü, CI/CD ve işbirliği araçları.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    technologies: ['React', 'TypeScript', 'Docker', 'Kubernetes', 'Git'],
    features: [
      'Kod editörü',
      'Versiyon kontrolü',
      'CI/CD pipeline',
      'Takım işbirliği',
      'Code review araçları',
      'Issue tracking',
      'Documentation',
    ],
    result: 'Geliştirme süreçlerinde %50 hızlanma, hata oranında %30 azalma görüldü.',
    category: 'SaaS',
    date: '2024 Q2',
    gradient: 'from-purple-500 to-pink-500',
  },
  'project-3': {
    title: 'Kod Geliştirme Araçları',
    description: 'Yazılım geliştirme süreçlerini optimize eden araçlar. Kod kalitesi ve performans analizi.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
    technologies: ['Python', 'FastAPI', 'React', 'MongoDB', 'Redis'],
    features: [
      'Kod analizi',
      'Performans ölçümü',
      'Otomatik test',
      'Dokümantasyon',
      'Entegrasyon araçları',
      'Real-time feedback',
      'Quality metrics',
    ],
    result: 'Kod kalitesinde %60 iyileşme, geliştirme verimliliğinde %45 artış sağlandı.',
    category: 'Web Yazılım',
    date: '2024 Q1',
    gradient: 'from-indigo-500 to-blue-500',
  },
  'project-4': {
    title: 'Mobil E-Ticaret Uygulaması',
    description: 'iOS ve Android için modern e-ticaret çözümü. Hızlı, güvenli ve kullanıcı dostu.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    technologies: ['React Native', 'Node.js', 'Stripe', 'Firebase', 'Redux'],
    features: [
      'Ürün kataloğu',
      'Sepet yönetimi',
      'Ödeme entegrasyonu',
      'Sipariş takibi',
      'Push bildirimleri',
      'Kullanıcı profili',
      'Wishlist',
    ],
    result: 'Mobil satışlarda %200 artış, kullanıcı memnuniyetinde %85 puan elde edildi.',
    category: 'Mobil Uygulama',
    date: '2023 Q4',
    gradient: 'from-orange-500 to-red-500',
  },
  'project-5': {
    title: 'AI Destekli Analiz Platformu',
    description: 'Yapay zeka ile veri analizi ve raporlama sistemi. Otomatik tahmin ve öneriler.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Docker'],
    features: [
      'Makine öğrenmesi modelleri',
      'Veri görselleştirme',
      'Otomatik raporlama',
      'Tahmin analizi',
      'API entegrasyonu',
      'Custom dashboards',
      'Export capabilities',
    ],
    result: 'Analiz sürelerinde %80 azalma, tahmin doğruluğunda %92 başarı oranı.',
    category: 'Yapay Zeka',
    date: '2023 Q3',
    gradient: 'from-pink-500 to-rose-500',
  },
  'project-6': {
    title: 'Kurumsal Dashboard',
    description: 'İş zekası ve raporlama için dashboard çözümü. Gerçek zamanlı veri görselleştirme.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    technologies: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis', 'WebSocket'],
    features: [
      'Gerçek zamanlı veri',
      'Özelleştirilebilir grafikler',
      'Rapor oluşturma',
      'Veri dışa aktarma',
      'Kullanıcı rolleri',
      'Alert system',
      'Scheduled reports',
    ],
    result: 'Karar verme sürelerinde %50 hızlanma, veri erişiminde %90 iyileşme.',
    category: 'Web Yazılım',
    date: '2023 Q2',
    gradient: 'from-teal-500 to-green-500',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { id, locale = 'tr' } = resolvedParams;
  const { generateMetadata: generateSEOMetadata } = await import('@/lib/metadata');
  
  // Try static details first
  let project = projectDetails[id];

  if (!project) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/projects/${id}`, {
        next: { revalidate: 3600 },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.project) {
          const dbProject = result.data.project;
          project = {
            title: dbProject.title,
            description: dbProject.shortDescription || '',
            image: dbProject.thumbnailUrl || '/images/placeholder.jpg',
          };
        }
      }
    } catch (error) {
      console.error('Metadata project fetch error:', error);
    }
  }

  const title = project?.title || (locale === 'tr' ? 'Proje Detayı | AŞAANA YAZILIM' : 'Project Detail | AŞAANA YAZILIM');
  const description = project?.description || (locale === 'tr'
    ? 'Projelerimizin detaylarını keşfedin.'
    : 'Discover details of our projects.');

  return generateSEOMetadata({
    title,
    description,
    locale: locale as 'tr' | 'en',
    url: locale === 'tr' ? `/tr/projeler/${id}` : `/en/projeler/${id}`,
    image: project?.image || '/og-image.jpg',
    type: 'article',
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Try to find static project first
  let project = projectDetails[id];

  // If not found in static list, query dynamic project from database
  if (!project) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/projects/${id}`, {
        next: { revalidate: 3600 },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.project) {
          const dbProject = result.data.project;
          
          // Map DB project keys to expected UI keys
          project = {
            title: dbProject.title,
            description: dbProject.shortDescription || '',
            image: dbProject.thumbnailUrl || '/images/placeholder.jpg',
            technologies: dbProject.tags || [],
            features: dbProject.content 
              ? [dbProject.shortDescription || dbProject.title] 
              : ['Detaylı proje planlaması', 'Modern UI/UX tasarımı', 'Yüksek performanslı altyapı'],
            result: dbProject.content || 'Proje başarıyla tamamlandı.',
            category: dbProject.tags && dbProject.tags[0] ? dbProject.tags[0] : 'Yazılım Geliştirme',
            date: dbProject.year || '2026',
            gradient: 'from-blue-600 to-indigo-600',
            gallery: dbProject.images ? dbProject.images.map((img: string, idx: number) => ({
              src: img,
              label: `Ekran Görüntüsü ${idx + 1}`
            })) : [],
          };
        }
      }
    } catch (error) {
      console.error('Error fetching dynamic project detail:', error);
    }
  }

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Proje Bulunamadı</h1>
            <Link
              href="/projeler"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
            >
              <DynamicIcon iconName="ArrowLeft" className="w-4 h-4" />
              Projeler sayfasına dön
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
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5`}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/projeler"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
          >
            <DynamicIcon iconName="ArrowLeft" className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Projelere Dön
          </Link>

          <div className="mb-8">
            <div className={`inline-block px-4 py-2 bg-gradient-to-r ${project.gradient} rounded-full text-white text-sm font-medium mb-4`}>
              {project.category}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-xl text-white/70 max-w-3xl">{project.description}</p>
            
            {/* Meta */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-white/60">
                <DynamicIcon iconName="Calendar" className="w-5 h-5" />
                {project.date}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageTransition>
        {/* Featured Image */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Gallery - Module Screenshots */}
        {project.gallery && (
          <section className="px-4 sm:px-6 lg:px-8 mb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-semibold text-white mb-8 flex items-center gap-3">
                <DynamicIcon iconName="Images" className="w-8 h-8 text-blue-400" />
                Modül Ekran Görüntüleri
              </h2>
              <ImageGallery items={project.gallery} />
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Technologies */}
              <div>
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                  <DynamicIcon iconName="Tag" className="w-8 h-8 text-blue-400" />
                  Teknolojiler
                </h2>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech: string) => (
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

              {/* Features */}
              <div>
                <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                  <DynamicIcon iconName="CheckCircle" className="w-8 h-8 text-green-400" />
                  Özellikler
                </h2>
                <div className="glass-card rounded-2xl p-8">
                  <ul className="space-y-4">
                    {project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start text-white/80 group">
                        <DynamicIcon iconName="CheckCircle" className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="glass-card rounded-2xl p-8 border border-green-500/20 bg-gradient-to-br from-green-500/5 to-blue-500/5">
              <div className="flex items-start gap-4">
                <DynamicIcon iconName="TrendingUp" className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Sonuç</h3>
                  <p className="text-lg text-white/80 leading-relaxed">{project.result}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <div className="glass-card rounded-2xl p-12 text-center border border-blue-500/20">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Benzer Bir Proje mi İstiyorsunuz?
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Size özel çözümler için bizimle iletişime geçin
                </p>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105"
                >
                  İletişime Geçin
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
