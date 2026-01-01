'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Settings, Save, Key, Mail } from '@/lib/icons';

export default function SettingsPage() {
  const [adminEmail, setAdminEmail] = useState(
    process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'hasancankilic25@gmail.com'
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Yeni şifreler eşleşmiyor' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      // Note: In production, this should be a proper API endpoint
      // For now, we'll just show a message
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Ayarlar kaydedildi (Not: Şifre değişikliği için .env.local dosyasını güncelleyin)' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Ayarlar kaydedilirken bir hata oluştu' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-400" />
              Ayarlar
            </h1>
            <p className="text-white/60 text-sm sm:text-base mt-2">
              Admin paneli ayarlarını yönetin
            </p>
          </div>

          <div className="space-y-6">
            {/* Admin Email */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold">Admin E-posta</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="admin@example.com"
                    disabled
                  />
                  <p className="text-white/40 text-xs mt-2">
                    E-posta adresi .env.local dosyasından yönetilir
                  </p>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold">Şifre Değiştir</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Yeni Şifre (Tekrar)
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-white/40 text-xs">
                  Şifre değişikliği için .env.local dosyasındaki NEXT_PUBLIC_ADMIN_PASSWORD değerini güncelleyin
                </p>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-xl ${
                  message.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'bg-red-500/20 border border-red-500/30 text-red-400'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Kaydet
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}




