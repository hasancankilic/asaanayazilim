import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import ShieldIcon from '@/components/ShieldIcon';
import PageTransition from '@/components/PageTransition';
import { CONTACT_INFO } from '@/lib/constants';

export default function PrivacyPolicyPage() {
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
            title="Gizlilik Politikası"
            description="Kişisel verilerinizin korunması ve gizliliği konusundaki taahhütlerimiz"
            icon={<ShieldIcon className="w-12 h-12 text-blue-400" />}
          />
        </div>
      </section>

      <PageTransition>
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-white/80 leading-relaxed prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-ul:text-lg prose-li:text-white/80 space-y-8">
                <div>
                  <h2>1. Gizlilik Taahhüdümüz</h2>
                  <p>
                    AŞAANA YAZILIM olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası,
                    web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda toplanan bilgilerin nasıl
                    kullanıldığını ve korunduğunu açıklar.
                  </p>
                </div>

                <div>
                  <h2>2. Toplanan Bilgiler</h2>
                  <p>Aşağıdaki bilgileri toplayabiliriz:</p>
                  <ul>
                    <li>Kişisel bilgiler (Ad, Soyad, E-posta, Telefon)</li>
                    <li>İletişim bilgileri</li>
                    <li>Web sitesi kullanım verileri (Cookies, IP adresi)</li>
                    <li>İşlem ve hizmet kullanım bilgileri</li>
                  </ul>
                </div>

                <div>
                  <h2>3. Bilgilerin Kullanımı</h2>
                  <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılır:</p>
                  <ul>
                    <li>Hizmet sunumu ve müşteri desteği</li>
                    <li>Web sitesi performansını iyileştirme</li>
                    <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    <li>Güvenlik ve dolandırıcılık önleme</li>
                    <li>İletişim ve pazarlama faaliyetleri (izin verildiğinde)</li>
                  </ul>
                </div>

                <div>
                  <h2>4. Çerezler (Cookies)</h2>
                  <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için çerezler
                    kullanmaktadır. Çerezler hakkında detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
                  </p>
                </div>

                <div>
                  <h2>5. Veri Güvenliği</h2>
                  <p>
                    Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz. Ancak,
                    internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın.
                  </p>
                </div>

                <div>
                  <h2>6. Üçüncü Taraf Hizmetler</h2>
                  <p>
                    Web sitemiz, analitik ve diğer hizmetler için üçüncü taraf servis sağlayıcılar kullanabilir. Bu
                    sağlayıcılar, verilerinizi kendi gizlilik politikalarına göre işleyebilir.
                  </p>
                </div>

                <div>
                  <h2>7. Haklarınız</h2>
                  <p>
                    KVKK kapsamındaki haklarınızı kullanmak için bizimle iletişime geçebilirsiniz. Kişisel verilerinize
                    erişim, düzeltme, silme ve itiraz etme hakkınız bulunmaktadır.
                  </p>
                </div>

                <div>
                  <h2>8. Değişiklikler</h2>
                  <p>
                    Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler için kullanıcılarımızı
                    bilgilendireceğiz.
                  </p>
                </div>

                <div>
                  <h2>9. İletişim</h2>
                  <p>
                    Gizlilik politikamız hakkında sorularınız için{' '}
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
