import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
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
            Kebijakan Privasi
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              <strong>Penting:</strong> Ini bukan nasihat hukum. Kebijakan ini adalah templat umum yang harus disesuaikan dengan kebutuhan spesifik dan dikonsultasikan dengan ahli hukum.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Informasi Pribadi</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Nama dan alamat email saat Anda mendaftar</li>
                <li>Informasi pembayaran (diproses melalui penyedia pembayaran pihak ketiga)</li>
                <li>Prompt teks yang Anda masukkan untuk menghasilkan video</li>
                <li>Video yang dihasilkan oleh AI berdasarkan input Anda</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Informasi Teknis</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Alamat IP dan informasi lokasi umum</li>
                <li>Jenis browser dan sistem operasi</li>
                <li>Data penggunaan dan preferensi</li>
                <li>Cookie dan teknologi pelacakan serupa</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Dasar Hukum Pemrosesan Data</h2>
            <p className="text-slate-300 mb-4">
              Sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP), kami memproses data pribadi Anda berdasarkan:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li><strong>Persetujuan:</strong> Untuk layanan video AI dan komunikasi pemasaran</li>
              <li><strong>Pelaksanaan Kontrak:</strong> Untuk memberikan layanan yang Anda minta</li>
              <li><strong>Kepentingan Sah:</strong> Untuk keamanan, analitik, dan peningkatan layanan</li>
              <li><strong>Kewajiban Hukum:</strong> Untuk mematuhi peraturan yang berlaku</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Tujuan Penggunaan Data</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Menyediakan layanan pembuatan video AI</li>
              <li>Memproses pembayaran dan mengelola akun</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Meningkatkan kualitas layanan dan mengembangkan fitur baru</li>
              <li>Mencegah penipuan dan memastikan keamanan platform</li>
              <li>Mematuhi kewajiban hukum dan peraturan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Penyimpanan dan Retensi Data</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                <strong>Lokasi:</strong> Data disimpan di server yang berlokasi di Indonesia dan/atau penyedia cloud terpercaya dengan perlindungan data yang memadai.
              </p>
              <p className="text-slate-300">
                <strong>Periode Retensi:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Data akun: Selama akun aktif + 5 tahun setelah penutupan</li>
                <li>Video yang dihasilkan: 90 hari kecuali diunduh atau disimpan oleh pengguna</li>
                <li>Log teknis: 12 bulan</li>
                <li>Data pembayaran: 10 tahun untuk keperluan akuntansi dan pajak</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Hak-Hak Anda</h2>
            <p className="text-slate-300 mb-4">Sesuai UU PDP, Anda memiliki hak untuk:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Mengakses data pribadi Anda</li>
                <li>Mengoreksi data yang tidak akurat</li>
                <li>Menghapus data pribadi</li>
                <li>Membatasi pemrosesan data</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Portabilitas data</li>
                <li>Menolak pemrosesan tertentu</li>
                <li>Menarik persetujuan</li>
                <li>Mengajukan keluhan ke otoritas</li>
              </ul>
            </div>
            <p className="text-slate-300 mt-4">
              Untuk menggunakan hak-hak ini, silakan hubungi kami di <Link href="/contact" className="text-purple-400 hover:text-purple-300">halaman kontak</Link> atau email privacy@videoai.id
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Keamanan Data</h2>
            <p className="text-slate-300 mb-4">
              Kami menerapkan langkah-langkah keamanan teknis dan organisatoris yang sesuai untuk melindungi data pribadi Anda:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Enkripsi data dalam transit dan saat istirahat</li>
              <li>Kontrol akses yang ketat dan autentikasi multi-faktor</li>
              <li>Audit keamanan berkala dan pemantauan sistem</li>
              <li>Pelatihan keamanan untuk tim kami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Transfer Data Lintas Batas</h2>
            <p className="text-slate-300">
              Jika data Anda ditransfer ke luar Indonesia, kami memastikan bahwa negara atau organisasi penerima memberikan tingkat perlindungan yang memadai sesuai dengan UU PDP dan standar internasional seperti klausul kontraktual standar atau sertifikasi yang diakui.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Perubahan Kebijakan</h2>
            <p className="text-slate-300">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui email atau pemberitahuan di platform kami. Penggunaan berkelanjutan layanan kami setelah perubahan dianggap sebagai persetujuan terhadap kebijakan yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">9. Kontak</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300">
                <strong>Data Protection Officer:</strong><br />
                Email: privacy@videoai.id<br />
                Alamat: [Alamat lengkap akan diisi sesuai lokasi bisnis]<br />
                Telepon: [Nomor telepon untuk pertanyaan privasi]
              </p>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Data Collection:</strong> We collect personal information (name, email, payment info), content you create, and technical data (IP address, browser info, usage data).
              </p>
              <p>
                <strong>Legal Basis:</strong> We process your data based on consent, contract performance, legitimate interests, and legal obligations under Indonesian Personal Data Protection Law (Law No. 27/2022).
              </p>
              <p>
                <strong>Your Rights:</strong> You have rights to access, correct, delete, restrict processing, data portability, object to processing, withdraw consent, and file complaints.
              </p>
              <p>
                <strong>Security:</strong> We implement appropriate technical and organizational measures including encryption, access controls, and regular security audits.
              </p>
              <p>
                <strong>Contact:</strong> For privacy questions, contact privacy@videoai.id or visit our <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">contact page</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}