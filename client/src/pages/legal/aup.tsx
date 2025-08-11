import { Link } from "wouter";
import { ArrowLeft, AlertTriangle, Shield, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AcceptableUsePolicy() {
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
            Kebijakan Penggunaan yang Dapat Diterima
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-red-200">Peringatan Penting</h3>
            </div>
            <p className="text-red-100 text-sm">
              Pelanggaran terhadap kebijakan ini dapat mengakibatkan penonaktifan akun permanen tanpa pemberitahuan sebelumnya. 
              Ini bukan nasihat hukum - konsultasikan dengan ahli hukum untuk kebutuhan spesifik Anda.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Tujuan Kebijakan</h2>
            <p className="text-slate-300 mb-4">
              Kebijakan Penggunaan yang Dapat Diterima (AUP) ini mengatur penggunaan platform VideoAI untuk memastikan:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Lingkungan yang aman dan positif bagi semua pengguna</li>
              <li>Kepatuhan terhadap hukum dan peraturan yang berlaku</li>
              <li>Perlindungan hak kekayaan intelektual dan privasi</li>
              <li>Pencegahan penyalahgunaan teknologi AI untuk tujuan berbahaya</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400 mb-6">2. Konten yang Dilarang</h2>
            
            <div className="space-y-6">
              <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-300">Konten Ilegal dan Berbahaya</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Konten Ilegal:</strong> Melanggar hukum Indonesia atau internasional</li>
                  <li><strong>Kekerasan:</strong> Menampilkan atau mempromosikan kekerasan fisik</li>
                  <li><strong>Terorisme:</strong> Konten yang mendukung atau menghasut tindakan teror</li>
                  <li><strong>Narkoba:</strong> Promosi penjualan atau penggunaan narkoba ilegal</li>
                  <li><strong>Senjata:</strong> Panduan pembuatan senjata atau bahan peledak</li>
                </ul>
              </div>

              <div className="bg-pink-900/10 border border-pink-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-pink-400" />
                  <h3 className="text-xl font-semibold text-pink-300">Perlindungan Anak dan Konten Dewasa</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>CSAM:</strong> Segala bentuk eksploitasi seksual anak (zero tolerance)</li>
                  <li><strong>Pornografi:</strong> Konten seksual eksplisit atau suggestif</li>
                  <li><strong>Ketelanjangan:</strong> Gambar telanjang atau semi-telanjang</li>
                  <li><strong>Grooming:</strong> Konten yang menargetkan atau memanipulasi anak</li>
                  <li><strong>Age-inappropriate:</strong> Konten dewasa yang dapat diakses anak</li>
                </ul>
              </div>

              <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h3 className="text-xl font-semibold text-orange-300">Hate Speech dan Diskriminasi</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Ujaran Kebencian:</strong> Berdasarkan ras, agama, etnis, gender, orientasi seksual</li>
                  <li><strong>Bullying:</strong> Pelecehan, intimidasi, atau ancaman terhadap individu</li>
                  <li><strong>Doxxing:</strong> Publikasi informasi pribadi tanpa izin</li>
                  <li><strong>Harassment:</strong> Pelecehan berulang atau sistematis</li>
                  <li><strong>Diskriminasi:</strong> Konten yang mendiskriminasi kelompok tertentu</li>
                </ul>
              </div>

              <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-blue-300">Deepfake dan Misinformasi</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Deepfake Menipu:</strong> Video palsu untuk menipu atau merugikan orang</li>
                  <li><strong>Impersonasi:</strong> Menyamar sebagai orang lain tanpa izin</li>
                  <li><strong>Hoax:</strong> Penyebaran informasi palsu atau menyesatkan</li>
                  <li><strong>Manipulasi Politik:</strong> Konten untuk mempengaruhi pemilu secara curang</li>
                  <li><strong>Medical Misinformation:</strong> Klaim medis palsu atau berbahaya</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Pelanggaran Hak Cipta dan Kekayaan Intelektual</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Yang Tidak Diizinkan:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Menggunakan konten berhak cipta tanpa izin (musik, film, gambar)</li>
                  <li>Melanggar merek dagang atau hak cipta orang lain</li>
                  <li>Menggunakan likeness selebriti atau tokoh publik tanpa izin</li>
                  <li>Meniru gaya atau karya seniman tanpa atribusi yang tepat</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-200 mb-2">Yang Diizinkan:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Konten original yang Anda buat sendiri</li>
                  <li>Materi domain publik atau creative commons</li>
                  <li>Penggunaan fair use yang sah untuk kritik, parodi, atau edukasi</li>
                  <li>Konten dengan lisensi yang tepat dan atribusi yang benar</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Spam dan Penyalahgunaan Teknis</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Spam dan Penipuan</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                  <li>Konten spam berulang</li>
                  <li>Skema ponzi atau piramida</li>
                  <li>Phishing atau scam</li>
                  <li>MLM atau get-rich-quick schemes</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Penyalahgunaan Sistem</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                  <li>Bot atau automasi tidak sah</li>
                  <li>Rate limiting bypass</li>
                  <li>Multiple accounts untuk circumvention</li>
                  <li>Reverse engineering platform</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Contoh Penggunaan yang Dapat Diterima</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-200 mb-3">✅ Dianjurkan</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm ml-4">
                  <li>Video edukasi dan tutorial</li>
                  <li>Konten kreatif dan artistik original</li>
                  <li>Demo produk dan presentasi bisnis</li>
                  <li>Konten hiburan yang positif</li>
                  <li>Visualisasi data dan infografis</li>
                  <li>Animasi untuk storytelling</li>
                  <li>Konten pemasaran yang etis</li>
                  <li>Parodi dan satire yang tidak merugikan</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-200 mb-3">⚠️ Perlu Hati-hati</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm ml-4">
                  <li>Konten kontroversial atau sensitif</li>
                  <li>Kritik terhadap tokoh publik (harus konstruktif)</li>
                  <li>Konten politik (harus berimbang)</li>
                  <li>Penggunaan music berlisensi</li>
                  <li>Referensi merek atau produk lain</li>
                  <li>Konten sejarah sensitif</li>
                  <li>Diskusi isu sosial kompleks</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Pelaporan dan Penegakan</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Cara Melaporkan Pelanggaran</h3>
                <p className="text-slate-300 mb-2">Jika Anda menemukan konten yang melanggar kebijakan ini:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-4">
                  <li>Gunakan tombol "Laporkan" pada konten tersebut</li>
                  <li>Kirim email ke abuse@videoai.id dengan detail lengkap</li>
                  <li>Sertakan screenshot dan URL jika memungkinkan</li>
                  <li>Berikan konteks mengapa konten melanggar kebijakan</li>
                </ol>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-200 mb-2">Konsekuensi Pelanggaran</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Peringatan:</strong> Untuk pelanggaran ringan pertama kali</li>
                  <li><strong>Pembatasan Fitur:</strong> Sementara untuk pelanggaran berulang</li>
                  <li><strong>Suspend Akun:</strong> 7-30 hari untuk pelanggaran serius</li>
                  <li><strong>Penonaktifan Permanen:</strong> Untuk pelanggaran berat atau berulang</li>
                  <li><strong>Tindakan Hukum:</strong> Jika diperlukan untuk konten ilegal</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Banding dan Review</h2>
            <p className="text-slate-300 mb-4">
              Jika Anda merasa akun atau konten Anda ditindak secara tidak adil, Anda dapat mengajukan banding melalui:
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Email: appeals@videoai.id dengan subjek "Appeal - [Username Anda]"</li>
                <li>Sertakan alasan detail mengapa Anda merasa tindakan tidak tepat</li>
                <li>Berikan bukti pendukung jika ada</li>
                <li>Kami akan merespons dalam 5-7 hari kerja</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Kontak dan Dukungan</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300">
                <strong>Tim Keamanan dan Kepatuhan:</strong><br />
                Email: abuse@videoai.id<br />
                Email Banding: appeals@videoai.id<br />
                Laporan Darurat: emergency@videoai.id
              </p>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Prohibited Content:</strong> Illegal content, violence, terrorism, child exploitation, hate speech, 
                deepfakes, copyright infringement, spam, and technical abuse are strictly forbidden.
              </p>
              <p>
                <strong>Acceptable Use:</strong> Educational content, original creative works, business presentations, 
                positive entertainment, data visualization, and ethical marketing are encouraged.
              </p>
              <p>
                <strong>Enforcement:</strong> Violations may result in warnings, feature restrictions, account suspension, 
                or permanent deactivation depending on severity.
              </p>
              <p>
                <strong>Reporting:</strong> Report violations via the "Report" button, email abuse@videoai.id, or 
                contact emergency@videoai.id for urgent matters.
              </p>
              <p>
                <strong>Appeals:</strong> Contest enforcement actions by emailing appeals@videoai.id with detailed reasoning 
                and supporting evidence.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}