import { Link } from "wouter";
import { ArrowLeft, AlertTriangle, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DMCAPolicy() {
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
            Kebijakan DMCA & Hak Cipta
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
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Komitmen terhadap Hak Cipta</h2>
            <p className="text-slate-300 mb-4">
              VideoAI menghormati hak kekayaan intelektual dan berkomitmen untuk melindungi hak cipta sesuai dengan:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Digital Millennium Copyright Act (DMCA) Amerika Serikat</li>
              <li>Undang-Undang Hak Cipta Indonesia (UU No. 28 Tahun 2014)</li>
              <li>Konvensi Berne untuk Perlindungan Karya Sastra dan Seni</li>
              <li>Perjanjian internasional lainnya tentang hak cipta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Kebijakan Takedown</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                Jika Anda yakin bahwa konten di platform VideoAI melanggar hak cipta Anda, Anda dapat mengajukan permintaan takedown melalui prosedur berikut:
              </p>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-red-200">Persyaratan DMCA Takedown</h3>
                </div>
                <p className="text-red-100 text-sm">
                  Perhatian: Mengajukan klaim hak cipta palsu dapat mengakibatkan konsekuensi hukum termasuk denda dan tuntutan pidana. 
                  Pastikan Anda memiliki hak yang sah sebelum mengajukan takedown notice.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Informasi yang Diperlukan untuk Takedown Notice</h2>
            <div className="space-y-4">
              <p className="text-slate-300 mb-4">
                Takedown notice yang valid harus mencakup informasi berikut:
              </p>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Informasi Wajib:</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Identifikasi Karya:</strong> Deskripsi detail karya yang dilindungi hak cipta yang diklaim dilanggar</li>
                  <li><strong>Lokasi Konten:</strong> URL atau lokasi spesifik konten yang melanggar di platform kami</li>
                  <li><strong>Informasi Kontak:</strong> Nama, alamat, nomor telepon, dan email address</li>
                  <li><strong>Pernyataan Itikad Baik:</strong> Bahwa Anda yakin penggunaan tersebut tidak diizinkan oleh pemilik hak cipta</li>
                  <li><strong>Pernyataan Akurasi:</strong> Bahwa informasi dalam notice adalah akurat</li>
                  <li><strong>Tanda Tangan:</strong> Tanda tangan fisik atau elektronik dari pemilik hak cipta atau yang diberi wewenang</li>
                  <li><strong>Bukti Kepemilikan:</strong> Dokumentasi yang membuktikan kepemilikan atau kewenangan atas karya tersebut</li>
                </ol>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Template Takedown Notice</h3>
                <p className="text-blue-100 text-sm mb-2">Anda dapat menggunakan template berikut sebagai panduan:</p>
                <div className="bg-slate-800/70 rounded p-3 text-xs text-slate-300 font-mono">
                  <p>To: dmca@videoai.id</p>
                  <p>Subject: DMCA Takedown Notice</p>
                  <br />
                  <p>I am writing to notify you of copyright infringement on your platform.</p>
                  <p>Copyrighted work: [Describe your work]</p>
                  <p>Infringing content URL: [Specific URL/location]</p>
                  <p>My contact information: [Full details]</p>
                  <p>I have a good faith belief that the use is not authorized...</p>
                  <p>I swear under penalty of perjury that the information is accurate...</p>
                  <p>Signature: [Your signature]</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Proses Penanganan Takedown</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                  <h3 className="font-semibold text-white mb-1">Penerimaan</h3>
                  <p className="text-slate-300 text-sm">Notice diterima dan direview dalam 24 jam</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                  <h3 className="font-semibold text-white mb-1">Verifikasi</h3>
                  <p className="text-slate-300 text-sm">Kelengkapan dan validitas notice diperiksa</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                  <h3 className="font-semibold text-white mb-1">Tindakan</h3>
                  <p className="text-slate-300 text-sm">Konten dihapus atau akses dibatasi jika valid</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">4</div>
                  <h3 className="font-semibold text-white mb-1">Notifikasi</h3>
                  <p className="text-slate-300 text-sm">Pemilik konten diberi tahu tentang takedown</p>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Timeline Respons:</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                  <li><strong>24 jam:</strong> Konfirmasi penerimaan notice</li>
                  <li><strong>48-72 jam:</strong> Review dan verifikasi kelengkapan</li>
                  <li><strong>5-7 hari:</strong> Tindakan takedown (jika notice valid)</li>
                  <li><strong>10-14 hari:</strong> Proses counter-notice (jika ada)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Counter-Notice dan Pemulihan</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                Jika Anda yakin konten Anda dihapus secara keliru, Anda dapat mengajukan counter-notice dengan informasi berikut:
              </p>
              
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-200 mb-2">Persyaratan Counter-Notice:</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
                  <li>Identifikasi konten yang dihapus dan lokasi sebelumnya</li>
                  <li>Pernyataan bahwa Anda yakin konten dihapus secara keliru</li>
                  <li>Persetujuan untuk tunduk pada yurisdiksi pengadilan federal</li>
                  <li>Informasi kontak lengkap</li>
                  <li>Tanda tangan fisik atau elektronik</li>
                </ol>
              </div>

              <p className="text-slate-300">
                Setelah menerima counter-notice yang valid, kami akan memulihkan konten dalam 10-14 hari kerja 
                kecuali pemilik hak cipta mengajukan tindakan hukum.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Kebijakan Repeat Infringer</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                VideoAI memiliki kebijakan untuk menangani pelanggaran berulang:
              </p>
              
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-200 mb-2">Konsekuensi Pelanggaran Berulang:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Pelanggaran 1:</strong> Peringatan dan penghapusan konten</li>
                  <li><strong>Pelanggaran 2:</strong> Pembatasan sementara akun (7-30 hari)</li>
                  <li><strong>Pelanggaran 3:</strong> Penonaktifan akun permanen</li>
                  <li><strong>Pelanggaran Berat:</strong> Penonaktifan langsung + tindakan hukum</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Fair Use dan Pengecualian</h2>
            <div className="space-y-4">
              <p className="text-slate-300 mb-4">
                Kami menghormati prinsip fair use/fair dealing yang memungkinkan penggunaan terbatas karya berhak cipta untuk:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Penggunaan yang Diizinkan:</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                    <li>Kritik dan review</li>
                    <li>Komentar berita</li>
                    <li>Parodi dan satire</li>
                    <li>Tujuan pendidikan</li>
                    <li>Penelitian dan studi</li>
                  </ul>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Faktor Pertimbangan:</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                    <li>Tujuan dan karakter penggunaan</li>
                    <li>Sifat karya yang dilindungi</li>
                    <li>Jumlah dan substansi yang digunakan</li>
                    <li>Efek pada pasar karya asli</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Kontak DMCA Agent</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">DMCA Designated Agent</h3>
              </div>
              <div className="space-y-2 text-slate-300">
                <p><strong>Email:</strong> dmca@videoai.id</p>
                <p><strong>Subject Line:</strong> DMCA Takedown Notice atau DMCA Counter-Notice</p>
                <p><strong>Alamat Surat:</strong></p>
                <div className="ml-4">
                  <p>VideoAI Legal Department</p>
                  <p>DMCA Agent</p>
                  <p>[Alamat lengkap akan diisi]</p>
                  <p>Jakarta, Indonesia</p>
                </div>
                <p><strong>Telepon:</strong> +62 21 XXXX XXXX (khusus untuk DMCA)</p>
              </div>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Copyright Respect:</strong> VideoAI respects intellectual property rights and complies with DMCA, 
                Indonesian Copyright Law, and international copyright treaties.
              </p>
              <p>
                <strong>Takedown Process:</strong> Submit valid DMCA notices to dmca@videoai.id with required information: 
                work identification, infringing content location, contact details, good faith statement, accuracy declaration, and signature.
              </p>
              <p>
                <strong>Response Timeline:</strong> 24-hour acknowledgment, 48-72 hour review, 5-7 day takedown action if valid, 
                10-14 day counter-notice process.
              </p>
              <p>
                <strong>Repeat Infringers:</strong> Progressive enforcement from warnings to permanent account termination. 
                Fair use considerations for criticism, parody, education, and research.
              </p>
              <p>
                <strong>Contact:</strong> DMCA Agent at dmca@videoai.id for all copyright-related matters.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}