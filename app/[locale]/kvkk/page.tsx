import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import FileTextIcon from '@/components/FileTextIcon';
import PageTransition from '@/components/PageTransition';
import { CONTACT_INFO } from '@/lib/constants';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';

  return generateSEOMetadata({
    title: locale === 'tr'
      ? 'KVKK Aydınlatma Metni | AŞAANA YAZILIM'
      : 'KVKK Disclosure | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme metni.'
      : 'Disclosure text under the Personal Data Protection Law.',
    locale,
    url: locale === 'tr' ? '/tr/kvkk' : '/en/kvkk',
    image: '/og-image.jpg',
  });
}

export default function KVKKPage() {
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
            title="KVKK Aydınlatma Metni"
            description="Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme metni"
            icon={<FileTextIcon className="w-12 h-12 text-blue-400" />}
            headingLevel="h1"
          />
        </div>
      </section>

      <PageTransition>
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-white/80 leading-relaxed prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-ul:text-lg prose-li:text-white/80 space-y-8">
                <div>
                  <h2>1. Veri Sorumlusu</h2>
                  <p>
                    AŞAANA YAZILIM, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatına
                    haizdir.
                  </p>
                </div>

                <div>
                  <h2>2. İşlenen Kişisel Veriler</h2>
                  <p>Aşağıdaki kişisel veriler işlenmektedir:</p>
                  <ul>
                    <li>Kimlik bilgileri (Ad, Soyad, TC Kimlik No)</li>
                    <li>İletişim bilgileri (E-posta, Telefon, Adres)</li>
                    <li>Müşteri işlem bilgileri</li>
                    <li>İşlem güvenliği bilgileri</li>
                  </ul>
                </div>

                <div>
                  <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
                  <p>Kişisel veriler aşağıdaki amaçlarla işlenmektedir:</p>
                  <ul>
                    <li>Hizmet sunumu ve müşteri ilişkileri yönetimi</li>
                    <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    <li>İletişim ve bilgilendirme faaliyetleri</li>
                    <li>Müşteri memnuniyeti ve hizmet kalitesinin artırılması</li>
                  </ul>
                </div>

                <div>
                  <h2>4. Kişisel Verilerin Aktarılması</h2>
                  <p>
                    Kişisel veriler, yasal yükümlülüklerin yerine getirilmesi ve hizmet sunumu amacıyla sınırlı olarak
                    üçüncü kişilere aktarılabilir.
                  </p>
                </div>

                <div>
                  <h2>5. Kişisel Verilerin Toplanma Yöntemi</h2>
                  <p>
                    Kişisel veriler, elektronik ortamda, web sitesi üzerinden veya diğer iletişim kanalları aracılığıyla
                    toplanmaktadır.
                  </p>
                </div>

                <div>
                  <h2>6. KVKK Kapsamındaki Haklarınız</h2>
                  <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                  <ul>
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                    <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                    <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                    <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
                    <li>Yapılan işlemlerin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                    <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir
                      sonucun ortaya çıkmasına itiraz etme</li>
                    <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
                  </ul>
                </div>

                <div>
                  <h2>7. İletişim</h2>
                  <p>
                    KVKK kapsamındaki haklarınızı kullanmak için{' '}
                    <a href={CONTACT_INFO.emailHref} className="text-blue-400 hover:text-blue-300">
                      {CONTACT_INFO.email}
                    </a>{' '}
                    adresine e-posta gönderebilir veya iletişim formumuzu kullanabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  );
}
