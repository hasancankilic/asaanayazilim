import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import KPICard from '@/components/KPICard';
import IconWrapper from '@/components/IconWrapper';
import { Users, Award, Code, Heart, Target, Lightbulb } from '@/lib/icons';
import PageTransition from '@/components/PageTransition';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  
  return generateSEOMetadata({
    title: locale === 'tr' 
      ? 'Hakkımızda | AŞAANA YAZILIM - Geleceği Kodluyoruz'
      : 'About Us | AŞAANA YAZILIM - Coding the Future',
    description: locale === 'tr'
      ? 'Geleceği kodlayan, teknoloji ile iş dünyasını birleştiren bir ekibiz. Modern yazılım çözümleri ile dijital dönüşüm süreçlerinde yanınızdayız.'
      : 'We are a team that codes the future, combining technology with business. We are with you in digital transformation processes with modern software solutions.',
    locale,
    url: locale === 'tr' ? '/tr/hakkimizda' : '/en/hakkimizda',
    image: '/og-image.jpg',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
            title="Hakkımızda"
            description="Geleceği kodlayan, teknoloji ile iş dünyasını birleştiren bir ekibiz"
            icon={<IconWrapper Icon={Users} className="w-12 h-12 text-blue-400" />}
          />
        </div>
      </section>

      <PageTransition>
        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <KPICard
                title="Tamamlanan Proje"
                value="100+"
                change={25}
                icon={<IconWrapper Icon={Code} className="w-6 h-6" />}
                gradient="from-blue-500 to-cyan-500"
                delay={0}
              />
              <KPICard
                title="Mutlu Müşteri"
                value="50+"
                change={30}
                icon={<IconWrapper Icon={Heart} className="w-6 h-6" />}
                gradient="from-purple-500 to-pink-500"
                delay={0.1}
              />
              <KPICard
                title="Deneyim (Yıl)"
                value="5+"
                icon={<IconWrapper Icon={Award} className="w-6 h-6" />}
                gradient="from-indigo-500 to-blue-500"
                delay={0.2}
              />
              <KPICard
                title="Ekip Üyesi"
                value="15+"
                change={20}
                icon={<IconWrapper Icon={Users} className="w-6 h-6" />}
                gradient="from-orange-500 to-red-500"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-12">
              <div className="space-y-8 text-white/80 text-lg leading-relaxed">
                <p className="text-xl text-white font-medium">
                  AŞAANA YAZILIM olarak, geleceği kodluyoruz. Modern yazılım çözümleri ile işletmelerin dijital dönüşüm
                  süreçlerinde yanlarında yer alıyoruz.
                </p>

                <p>
                  Mobil uygulamalardan web platformlarına, yapay zeka çözümlerinden SaaS hizmetlerine kadar geniş bir
                  yelpazede hizmet sunuyoruz. Müşterilerimize ölçeklenebilir, güvenli ve modern teknolojilerle geliştirilmiş
                  çözümler sunuyoruz.
                </p>

                <p>
                  Ekibimiz, deneyimli yazılım geliştiricileri, tasarımcılar ve proje yöneticilerinden oluşmaktadır. Her
                  projede müşteri memnuniyetini ön planda tutarak, en yüksek kalite standartlarında çalışıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="glass-card rounded-2xl p-8 border border-blue-500/20">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                  <IconWrapper Icon={Target} className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-semibold text-white mb-4">Misyonumuz</h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  İşletmelerin teknoloji ile büyümesine katkıda bulunmak, modern ve yenilikçi yazılım çözümleri sunarak
                  dijital dönüşümlerini hızlandırmak.
                </p>
              </div>

              {/* Vision */}
              <div className="glass-card rounded-2xl p-8 border border-purple-500/20">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <IconWrapper Icon={Lightbulb} className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-semibold text-white mb-4">Vizyonumuz</h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  Türkiye'nin önde gelen yazılım geliştirme şirketi olmak ve uluslararası pazarda rekabet edebilen çözümler
                  üretmek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Değerlerimiz"
              description="Çalışma prensiplerimizi şekillendiren temel değerler"
            />
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'İnovasyon', description: 'Sürekli öğrenme ve teknolojik yeniliklere açıklık', icon: '🚀' },
                { title: 'Kalite', description: 'Her projede en yüksek standartları hedefleme', icon: '⭐' },
                { title: 'Güvenilirlik', description: 'Söz verdiğimiz gibi, zamanında ve eksiksiz teslimat', icon: '🤝' },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-8 text-center hover:border-blue-400/60 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  );
}
