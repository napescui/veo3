import { Link } from "wouter";
import { ArrowLeft, CreditCard, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefundPolicy() {
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
            Kebijakan Refund & Penagihan
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
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Masa Refund</h2>
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-green-200">7 Hari Masa Refund</h3>
                </div>
                <p className="text-green-100 text-sm">
                  Anda dapat mengajukan refund dalam 7 hari kalender pertama setelah pembelian langganan baru. 
                  Periode ini dihitung dari tanggal transaksi berhasil diproses.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Yang Memenuhi Syarat:</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                    <li>Langganan bulanan atau tahunan baru</li>
                    <li>Upgrade paket pertama kali</li>
                    <li>Pembelian credit pack</li>
                    <li>Add-on premium features</li>
                  </ul>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Yang Tidak Memenuhi Syarat:</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                    <li>Perpanjangan langganan otomatis</li>
                    <li>Downgrade atau perubahan paket</li>
                    <li>Akun yang sudah dibanned</li>
                    <li>Pembelian lebih dari 7 hari</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Kondisi Kelayakan Refund</h2>
            <div className="space-y-6">
              <div className="bg-green-900/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-xl font-semibold text-green-300">Kondisi yang Memenuhi Syarat</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Masalah Teknis Berkepanjangan:</strong> Platform tidak dapat digunakan lebih dari 48 jam berturut-turut</li>
                  <li><strong>Fitur Tidak Sesuai Deskripsi:</strong> Fitur yang dijanjikan tidak tersedia atau tidak berfungsi</li>
                  <li><strong>Kesalahan Penagihan:</strong> Charged untuk paket yang tidak dipilih atau duplikasi payment</li>
                  <li><strong>Ketidakpuasan Pertama Kali:</strong> Untuk pengguna baru yang tidak puas dengan layanan</li>
                  <li><strong>Force Majeure:</strong> Layanan terganggu karena kejadian di luar kendali kami</li>
                </ul>
              </div>

              <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-300">Kondisi yang Tidak Memenuhi Syarat</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Penyalahgunaan Layanan:</strong> Melanggar terms of service atau acceptable use policy</li>
                  <li><strong>Penggunaan Berlebihan:</strong> Sudah menggunakan lebih dari 80% kuota bulanan</li>
                  <li><strong>Perubahan Pikiran:</strong> Tidak ada alasan teknis atau masalah layanan</li>
                  <li><strong>Testing Purposes:</strong> Menggunakan untuk keperluan testing tanpa niat berlangganan</li>
                  <li><strong>Konkursi/Benchmarking:</strong> Menggunakan untuk membandingkan dengan kompetitor</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Jenis Refund</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">Full Refund</h3>
                </div>
                <p className="text-slate-300 text-sm mb-2">100% pengembalian dana</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Masalah teknis kami</li>
                  <li>• Kesalahan penagihan</li>
                  <li>• Fitur tidak sesuai</li>
                </ul>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-white">Pro-rata Refund</h3>
                </div>
                <p className="text-slate-300 text-sm mb-2">Sesuai penggunaan</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Downgrade sukarela</li>
                  <li>• Batal di tengah periode</li>
                  <li>• Upgrade tidak sesuai</li>
                </ul>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Credit Refund</h3>
                </div>
                <p className="text-slate-300 text-sm mb-2">Dalam bentuk credit</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Bonus credit pack</li>
                  <li>• Kompensasi downtime</li>
                  <li>• Goodwill gesture</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Proses Pengajuan Refund</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                  <h3 className="font-semibold text-white mb-1">Ajukan Request</h3>
                  <p className="text-slate-300 text-sm">Kirim email ke billing@videoai.id</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                  <h3 className="font-semibold text-white mb-1">Review</h3>
                  <p className="text-slate-300 text-sm">Tim review dalam 24-48 jam</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                  <h3 className="font-semibold text-white mb-1">Keputusan</h3>
                  <p className="text-slate-300 text-sm">Notification via email</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">4</div>
                  <h3 className="font-semibold text-white mb-1">Refund</h3>
                  <p className="text-slate-300 text-sm">Proses 5-10 hari kerja</p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Informasi yang Diperlukan:</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4 text-sm">
                  <li>Nama lengkap dan email akun</li>
                  <li>Invoice number atau transaction ID</li>
                  <li>Tanggal pembelian</li>
                  <li>Alasan refund yang detail</li>
                  <li>Screenshot error (jika ada masalah teknis)</li>
                  <li>Metode pembayaran yang digunakan</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Timeline Refund</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Estimasi Waktu Pemrosesan:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-cyan-300 mb-2">Metode Pembayaran:</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li><strong>Kartu Kredit/Debit:</strong> 5-10 hari kerja</li>
                      <li><strong>E-wallet (GoPay, OVO, DANA):</strong> 1-3 hari kerja</li>
                      <li><strong>Transfer Bank:</strong> 3-7 hari kerja</li>
                      <li><strong>Virtual Account:</strong> 3-5 hari kerja</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-300 mb-2">Faktor yang Mempengaruhi:</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• Bank processing time</li>
                      <li>• Weekend dan hari libur</li>
                      <li>• Verifikasi tambahan</li>
                      <li>• Kebijakan payment gateway</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Pajak dan Biaya</h2>
            <div className="space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-200 mb-2">Penting tentang Pajak:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>PPN:</strong> Pajak yang telah dibayar tidak dapat dikembalikan sesuai regulasi pajak Indonesia</li>
                  <li><strong>Refund Amount:</strong> Jumlah refund adalah harga dasar sebelum pajak</li>
                  <li><strong>Invoice Adjustment:</strong> Invoice akan disesuaikan untuk keperluan akuntansi</li>
                  <li><strong>Tax Reporting:</strong> Tetap dilaporkan sebagai transaksi untuk compliance</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Biaya Processing:</h3>
                <p className="text-slate-300 text-sm mb-2">
                  VideoAI menanggung biaya processing refund. Namun, beberapa kondisi mungkin berlaku:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                  <li>Payment gateway fees tidak dapat dikembalikan</li>
                  <li>Currency conversion fees (untuk pembayaran internasional)</li>
                  <li>Bank charges dari pihak ketiga</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Sengketa dan Penyelesaian</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                Jika Anda tidak puas dengan keputusan refund, Anda dapat:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Opsi Penyelesaian:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm ml-4">
                    <li>Escalate ke Customer Success Manager</li>
                    <li>Mediasi internal dengan tim legal</li>
                    <li>Arbitrase melalui BANI</li>
                    <li>Pengadilan komersial (upaya terakhir)</li>
                  </ol>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Timeline Sengketa:</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                    <li>30 hari untuk mengajukan banding</li>
                    <li>60 hari untuk mediasi internal</li>
                    <li>90 hari untuk arbitrase</li>
                    <li>1 tahun untuk tindakan hukum</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Kontak dan Dukungan</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300">
                <strong>Tim Billing & Refund:</strong><br />
                Email: billing@videoai.id<br />
                Subject: "Refund Request - [Invoice Number]"<br />
                Phone: +62 21 XXXX XXXX (ext. 2)<br />
                Business Hours: Monday-Friday, 09:00-18:00 WIB
              </p>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Refund Period:</strong> 7-day refund window for new subscriptions, calculated from successful transaction date. 
                Covers new subscriptions, upgrades, credit packs, and premium add-ons.
              </p>
              <p>
                <strong>Eligible Conditions:</strong> Technical issues lasting 48+ hours, features not matching description, 
                billing errors, first-time user dissatisfaction, and force majeure events.
              </p>
              <p>
                <strong>Refund Types:</strong> Full refund (100%), pro-rata refund (usage-based), or credit refund. 
                Processing time: 1-10 business days depending on payment method.
              </p>
              <p>
                <strong>Tax Policy:</strong> VAT cannot be refunded per Indonesian tax regulations. Refund amount is base price before tax. 
                Payment gateway fees are non-refundable.
              </p>
              <p>
                <strong>Contact:</strong> Email billing@videoai.id with invoice number, purchase date, detailed reason, 
                and supporting documentation for refund requests.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}