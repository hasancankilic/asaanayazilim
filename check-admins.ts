import { prisma } from './lib/db';

async function checkAdmins() {
  try {
    const admins = await prisma.adminUser.findMany();
    console.log('📋 Admin kullanıcıları:');
    console.log(admins);
    console.log('\n📊 Toplam:', admins.length);
    
    if (admins.length === 0) {
      console.log('\n⚠️ Veritabanında admin kullanıcı yok!');
      console.log('📝 Environment değişkenlerinden okunacak...');
      console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
      console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
    }
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmins();
