import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
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
            Syarat dan Ketentuan
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              <strong>Penting:</strong> Ini bukan nasihat hukum. Syarat dan ketentuan ini adalah templat umum yang harus disesuaikan dengan kebutuhan spesifik dan dikonsultasikan dengan ahli hukum.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Definisi Layanan</h2>
            <p className="text-slate-300 mb-4">
              VideoAI adalah platform berbasis web yang menyediakan layanan pembuatan video otomatis menggunakan teknologi kecerdasan buatan (AI). Layanan ini memungkinkan pengguna untuk:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Membuat video berdurasi 8 detik dari prompt teks</li>
              <li>Menggunakan fitur peningkatan prompt otomatis</li>
              <li>Mengunduh dan menggunakan video yang dihasilkan</li>
              <li>Mengakses fitur analitik dan riwayat pembuatan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Akun dan Registrasi</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Persyaratan Akun</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Anda harus berusia minimal 18 tahun atau memiliki izin orang tua/wali</li>
                <li>Informasi yang diberikan harus akurat dan terkini</li>
                <li>Satu orang hanya boleh memiliki satu akun aktif</li>
                <li>Anda bertanggung jawab menjaga keamanan kata sandi akun</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white">Keamanan Akun</h3>
              <p className="text-slate-300">
                Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di akun Anda. Segera laporkan jika Anda mencurigai adanya penggunaan akun yang tidak sah.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Pembayaran dan Penagihan</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Paket Layanan</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Layanan tersedia dalam paket gratis dan berbayar</li>
                <li>Harga dapat berubah dengan pemberitahuan 30 hari sebelumnya</li>
                <li>Pembayaran diproses secara otomatis sesuai siklus tagihan</li>
                <li>Pajak yang berlaku akan ditambahkan sesuai regulasi</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Kebijakan Refund</h3>
              <p className="text-slate-300">
                Pengembalian dana dapat diajukan dalam 7 hari pertama setelah pembelian untuk langganan baru. 
                Lihat <Link href="/legal/refund" className="text-purple-400 hover:text-purple-300">kebijakan refund</Link> lengkap untuk detail.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Lisensi dan Kepemilikan Konten</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Konten yang Anda Buat</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Anda memiliki hak kepemilikan atas prompt dan input yang Anda berikan</li>
                <li>Video yang dihasilkan AI menjadi milik Anda untuk digunakan secara komersial</li>
                <li>Kami memiliki lisensi terbatas untuk memproses dan menyimpan konten demi memberikan layanan</li>
                <li>Kami tidak mengklaim kepemilikan atas konten yang Anda hasilkan</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Konten Platform</h3>
              <p className="text-slate-300">
                Semua aspek platform VideoAI (desain, kode, logo, merek dagang) adalah milik kami dan dilindungi hak cipta. 
                Anda tidak diizinkan menggunakan elemen platform tanpa izin tertulis.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Batasan Penggunaan</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Larangan Penggunaan</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Membuat konten ilegal, melanggar hukum, atau melanggar hak orang lain</li>
                <li>Menghasilkan konten yang mengandung kekerasan, pornografi, atau hate speech</li>
                <li>Menyalahgunakan atau memanipulasi sistem untuk tujuan tidak sah</li>
                <li>Melakukan reverse engineering atau mencoba mengakses kode sumber</li>
                <li>Menggunakan layanan untuk spam atau distribusi malware</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Batas Teknis</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Maksimal 10 video dapat diproses bersamaan</li>
                <li>Durasi video terbatas pada 8 detik</li>
                <li>Rate limiting berlaku untuk mencegah penyalahgunaan</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Garansi dan Pembatasan Tanggung Jawab</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Disclaimer</h3>
              <p className="text-slate-300">
                Layanan disediakan "sebagaimana adanya" tanpa garansi eksplisit maupun implisit. 
                Kami tidak menjamin bahwa layanan akan selalu tersedia, bebas error, atau memenuhi kebutuhan spesifik Anda.
              </p>

              <h3 className="text-xl font-semibold text-white">Pembatasan Tanggung Jawab</h3>
              <p className="text-slate-300">
                Dalam batas maksimal yang diizinkan hukum, kami tidak bertanggung jawab atas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Kerugian tidak langsung, insidental, atau konsekuensial</li>
                <li>Kehilangan data, profit, atau peluang bisnis</li>
                <li>Gangguan layanan atau downtime</li>
                <li>Penggunaan konten yang dihasilkan oleh pihak ketiga</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Penghentian Layanan</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                <strong>Penghentian oleh Anda:</strong> Anda dapat menghentikan akun kapan saja melalui pengaturan akun atau dengan menghubungi dukungan pelanggan.
              </p>
              <p className="text-slate-300">
                <strong>Penghentian oleh Kami:</strong> Kami berhak menghentikan akun Anda jika melanggar syarat dan ketentuan, dengan atau tanpa pemberitahuan sebelumnya.
              </p>
              <p className="text-slate-300">
                <strong>Efek Penghentian:</strong> Setelah penghentian, akses Anda ke layanan akan dihentikan dan data dapat dihapus sesuai kebijakan retensi data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Hukum yang Berlaku dan Penyelesaian Sengketa</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                <strong>Hukum yang Berlaku:</strong> Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia.
              </p>
              <p className="text-slate-300">
                <strong>Penyelesaian Sengketa:</strong> Setiap sengketa akan diselesaikan melalui:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
                <li>Negosiasi dan mediasi dengan itikad baik</li>
                <li>Arbitrase melalui BANI (Badan Arbitrase Nasional Indonesia)</li>
                <li>Pengadilan yang berwenang di Jakarta, Indonesia sebagai upaya terakhir</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">9. Kontak dan Dukungan</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300">
                Untuk pertanyaan tentang syarat dan ketentuan ini:<br />
                Email: legal@videoai.id<br />
                Alamat: [Alamat lengkap akan diisi sesuai lokasi bisnis]<br />
                Telepon: [Nomor telepon untuk pertanyaan legal]
              </p>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Service:</strong> VideoAI provides AI-powered 8-second video generation from text prompts with features like prompt enhancement and download capabilities.
              </p>
              <p>
                <strong>Account:</strong> Users must be 18+ or have parental consent, provide accurate information, and maintain account security.
              </p>
              <p>
                <strong>Content Rights:</strong> You own the videos you generate. We have limited license to process content for service delivery. Our platform content remains our property.
              </p>
              <p>
                <strong>Restrictions:</strong> Prohibited uses include illegal content, violence, pornography, hate speech, system abuse, and spam.
              </p>
              <p>
                <strong>Liability:</strong> Service provided "as is" with limited warranties. We're not liable for indirect damages, data loss, or business interruption.
              </p>
              <p>
                <strong>Governing Law:</strong> Indonesian law applies. Disputes resolved through negotiation, arbitration (BANI), or Jakarta courts.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}