import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Kebijakan Cookie
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              <strong>Penting:</strong> Ini bukan nasihat hukum. Kebijakan cookie ini adalah templat umum yang harus disesuaikan dengan implementasi teknis aktual dan dikonsultasikan dengan ahli hukum.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Apa itu Cookie?</h2>
            <p className="text-slate-300 mb-4">
              Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi website. 
              Cookie membantu website mengingat informasi tentang kunjungan Anda, seperti preferensi bahasa dan pengaturan lainnya.
            </p>
            <p className="text-slate-300">
              Selain cookie, kami juga menggunakan teknologi serupa seperti local storage, session storage, dan web beacons untuk meningkatkan pengalaman pengguna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Jenis Cookie yang Kami Gunakan</h2>
            <div className="space-y-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-300 mb-3">Cookie Penting (Strictly Necessary)</h3>
                <p className="text-slate-300 mb-2">Cookie yang diperlukan untuk fungsi dasar website:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                  <li><strong>Session ID:</strong> Menjaga sesi login Anda</li>
                  <li><strong>CSRF Token:</strong> Keamanan dan pencegahan serangan</li>
                  <li><strong>Cookie Consent:</strong> Mengingat pilihan cookie Anda</li>
                  <li><strong>Load Balancer:</strong> Distribusi traffic server</li>
                </ul>
                <p className="text-green-200 text-sm mt-2">✓ Selalu aktif - diperlukan untuk operasi website</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Cookie Fungsional (Functional)</h3>
                <p className="text-slate-300 mb-2">Cookie yang meningkatkan fungsionalitas website:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                  <li><strong>Theme Preference:</strong> Mode gelap/terang pilihan Anda</li>
                  <li><strong>Language:</strong> Preferensi bahasa interface</li>
                  <li><strong>Video Settings:</strong> Kualitas dan preferensi video</li>
                  <li><strong>Auto-translate:</strong> Pengaturan terjemahan otomatis</li>
                </ul>
                <p className="text-blue-200 text-sm mt-2">⚙️ Dapat dinonaktifkan tanpa mempengaruhi fungsi dasar</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-yellow-300 mb-3">Cookie Analitik (Analytics)</h3>
                <p className="text-slate-300 mb-2">Cookie yang membantu kami memahami penggunaan website:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                  <li><strong>Page Views:</strong> Halaman yang paling sering dikunjungi</li>
                  <li><strong>User Journey:</strong> Alur navigasi pengguna</li>
                  <li><strong>Performance:</strong> Waktu loading dan error</li>
                  <li><strong>Feature Usage:</strong> Fitur yang paling banyak digunakan</li>
                </ul>
                <p className="text-yellow-200 text-sm mt-2">📊 Data dianonimkan dan digunakan untuk peningkatan layanan</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-pink-300 mb-3">Cookie Pemasaran (Marketing)</h3>
                <p className="text-slate-300 mb-2">Cookie untuk personalisasi konten dan iklan:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                  <li><strong>Retargeting:</strong> Menampilkan iklan relevan di situs lain</li>
                  <li><strong>Conversion Tracking:</strong> Mengukur efektivitas kampanye</li>
                  <li><strong>Social Media:</strong> Integrasi dengan platform media sosial</li>
                  <li><strong>Email Marketing:</strong> Personalisasi komunikasi email</li>
                </ul>
                <p className="text-pink-200 text-sm mt-2">🎯 Dapat dinonaktifkan - tidak mempengaruhi fungsi utama</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Cookie Pihak Ketiga</h2>
            <p className="text-slate-300 mb-4">
              Beberapa cookie ditempatkan oleh layanan pihak ketiga yang kami gunakan:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Penyedia Pembayaran</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Stripe / Midtrans</li>
                  <li>• Keamanan transaksi</li>
                  <li>• Pencegahan fraud</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Analytics</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Google Analytics (opsional)</li>
                  <li>• Plausible Analytics</li>
                  <li>• Heat mapping tools</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Media Sosial</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Facebook Pixel</li>
                  <li>• Twitter Analytics</li>
                  <li>• LinkedIn Insight</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Customer Support</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Live chat widget</li>
                  <li>• Help desk integration</li>
                  <li>• User feedback tools</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Cara Mengelola Cookie</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
                <h3 className="text-xl font-semibold text-white mb-3">Preferensi Cookie di Website</h3>
                <p className="text-slate-300 mb-3">
                  Anda dapat mengubah preferensi cookie Anda kapan saja melalui:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Kelola Preferensi Cookie
                  </Button>
                  <Button variant="outline" size="sm">
                    Tolak Semua Cookie Opsional
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Pengaturan Browser</h3>
                <p className="text-slate-300 mb-4">
                  Anda juga dapat mengelola cookie melalui pengaturan browser:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Desktop Browser</h4>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                      <li>• <strong>Firefox:</strong> Preferences → Privacy & Security</li>
                      <li>• <strong>Safari:</strong> Preferences → Privacy</li>
                      <li>• <strong>Edge:</strong> Settings → Cookies and site permissions</li>
                    </ul>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Mobile Browser</h4>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>• <strong>Chrome Mobile:</strong> Menu → Settings → Site settings</li>
                      <li>• <strong>Safari iOS:</strong> Settings → Safari → Privacy</li>
                      <li>• <strong>Samsung Internet:</strong> Menu → Settings → Sites and downloads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-200 mb-2">⚠️ Penting untuk Diketahui</h4>
                <p className="text-yellow-100 text-sm">
                  Menonaktifkan cookie tertentu dapat mempengaruhi fungsionalitas website. 
                  Cookie penting tidak dapat dinonaktifkan karena diperlukan untuk operasi dasar website.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Do Not Track</h2>
            <p className="text-slate-300">
              Kami menghormati sinyal "Do Not Track" dari browser Anda. Ketika Do Not Track diaktifkan, 
              kami akan menonaktifkan cookie analitik dan pemasaran opsional, namun cookie penting tetap berfungsi 
              untuk memastikan website dapat beroperasi dengan normal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Pembaruan Kebijakan</h2>
            <p className="text-slate-300">
              Kebijakan cookie ini dapat diperbarui dari waktu ke waktu untuk mencerminkan perubahan 
              dalam praktik kami atau persyaratan hukum. Tanggal pembaruan terakhir tertera di bagian atas halaman ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Kontak</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300">
                Untuk pertanyaan tentang penggunaan cookie:<br />
                Email: privacy@videoai.id<br />
                Atau kunjungi <Link href="/contact" className="text-purple-400 hover:text-purple-300">halaman kontak</Link> kami.
              </p>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Cookie Types:</strong> We use essential cookies (always active), functional cookies (user preferences), 
                analytics cookies (usage statistics), and marketing cookies (advertising personalization).
              </p>
              <p>
                <strong>Third-party Cookies:</strong> Payment processors, analytics providers, social media platforms, 
                and customer support tools may place cookies on your device.
              </p>
              <p>
                <strong>Cookie Management:</strong> You can manage cookie preferences through our cookie banner or browser settings. 
                Essential cookies cannot be disabled as they're required for basic website operation.
              </p>
              <p>
                <strong>Do Not Track:</strong> We respect Do Not Track signals by disabling optional analytics and marketing cookies 
                while keeping essential functionality intact.
              </p>
              <p>
                <strong>Contact:</strong> For cookie-related questions, email privacy@videoai.id or visit our <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">contact page</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}