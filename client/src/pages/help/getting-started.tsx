import { Link } from "wouter";
import { ArrowLeft, Play, Sparkles, Download, Lightbulb, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GettingStarted() {
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
            Panduan Memulai
          </h1>
          <p className="text-slate-300 mt-2">Pelajari cara membuat video AI yang menakjubkan dalam 4 langkah mudah</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
            <h2 className="text-xl font-semibold text-white mb-2">🚀 Selamat Datang di VideoAI!</h2>
            <p className="text-slate-300">
              Platform AI yang memungkinkan Anda membuat video berkualitas profesional hanya dengan mengetik prompt teks. 
              Tidak perlu keahlian editing - cukup imajinasi Anda!
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-6">Langkah-langkah Pembuatan Video</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <FileText className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Tulis Deskripsi Video Anda</h3>
                </div>
                <div className="ml-11 space-y-3">
                  <p className="text-slate-300">
                    Masukkan prompt teks yang mendeskripsikan video yang ingin Anda buat. Semakin detail, semakin baik hasilnya!
                  </p>
                  <div className="bg-slate-800/70 rounded-lg p-3">
                    <p className="text-sm text-slate-400 mb-2">Contoh prompt yang baik:</p>
                    <div className="space-y-2">
                      <div className="bg-green-900/20 border border-green-500/30 rounded p-2">
                        <p className="text-green-200 text-sm">✅ "Seekor kucing oranye bermain piano di ruangan yang hangat dengan cahaya lilin"</p>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 rounded p-2">
                        <p className="text-green-200 text-sm">✅ "Elang emas terbang melintasi puncak gunung saat matahari terbenam dengan awan dramatis"</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-yellow-200 text-sm">
                      💡 <strong>Tips:</strong> Tekan Enter untuk langsung generate video, atau gunakan fitur "Enhance" 
                      untuk meningkatkan kualitas prompt Anda secara otomatis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-pink-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <Sparkles className="w-6 h-6 text-pink-400" />
                  <h3 className="text-xl font-semibold text-white">Gunakan Fitur Enhancement (Opsional)</h3>
                </div>
                <div className="ml-11 space-y-3">
                  <p className="text-slate-300">
                    Klik tombol "Enhance" untuk memperbaiki prompt Anda menggunakan AI. Fitur ini akan:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                    <li>Menambahkan detail visual yang menarik</li>
                    <li>Memperbaiki struktur kalimat untuk hasil optimal</li>
                    <li>Menerjemahkan dari Bahasa Indonesia ke Inggris secara otomatis</li>
                    <li>Menyesuaikan prompt untuk model AI video</li>
                  </ul>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-200 text-sm">
                      🤖 <strong>Auto-translate:</strong> Aktifkan toggle untuk menerjemahkan prompt Indonesia ke Inggris 
                      secara otomatis untuk hasil yang lebih optimal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-cyan-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <Play className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold text-white">Generate Video Anda</h3>
                </div>
                <div className="ml-11 space-y-3">
                  <p className="text-slate-300">
                    Klik tombol "Generate Video" atau tekan Enter untuk memulai proses pembuatan. Video akan diproses di cloud dengan teknologi AI terdepan.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/70 rounded-lg p-3">
                      <h4 className="font-semibold text-white mb-2">Yang Terjadi Selama Proses:</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• AI menganalisis prompt Anda</li>
                        <li>• Sistem menghasilkan frame video</li>
                        <li>• Video di-render dalam kualitas HD</li>
                        <li>• Proses selesai dalam 1-3 menit</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/70 rounded-lg p-3">
                      <h4 className="font-semibold text-white mb-2">Multiple Video:</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Bisa generate hingga 10 video sekaligus</li>
                        <li>• Tidak perlu menunggu satu selesai</li>
                        <li>• Tracking progress real-time</li>
                        <li>• Queue management otomatis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <Download className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Download dan Gunakan Video</h3>
                </div>
                <div className="ml-11 space-y-3">
                  <p className="text-slate-300">
                    Setelah video selesai diproses, Anda dapat langsung menonton preview dan mengunduhnya untuk digunakan.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/70 rounded-lg p-3">
                      <h4 className="font-semibold text-white mb-2">Format Video:</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Durasi: 8 detik</li>
                        <li>• Format: MP4 (H.264)</li>
                        <li>• Resolusi: HD (1080p)</li>
                        <li>• Frame rate: 24fps</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/70 rounded-lg p-3">
                      <h4 className="font-semibold text-white mb-2">Hak Penggunaan:</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Penggunaan komersial diizinkan</li>
                        <li>• Tidak ada watermark</li>
                        <li>• Video menjadi milik Anda</li>
                        <li>• Distribusi bebas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Tips untuk Hasil Terbaik</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-green-200">Tips Penulisan Prompt</h3>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Sertakan detail visual yang spesifik</li>
                    <li>• Jelaskan pencahayaan dan suasana</li>
                    <li>• Tambahkan informasi tentang gerakan</li>
                    <li>• Gunakan kata sifat yang deskriptif</li>
                    <li>• Hindari prompt yang terlalu rumit</li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-blue-200">Optimalisasi Waktu</h3>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Generate multiple video sekaligus</li>
                    <li>• Gunakan fitur enhance untuk prompt pendek</li>
                    <li>• Coba variasi prompt yang berbeda</li>
                    <li>• Manfaatkan contoh prompt yang disediakan</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-200 mb-2">Contoh Prompt Kategori Populer</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-white">Alam:</strong>
                      <p className="text-slate-300">"Hutan hujan dengan air terjun dan pelangi"</p>
                    </div>
                    <div>
                      <strong className="text-white">Hewan:</strong>
                      <p className="text-slate-300">"Lumba-lumba melompat di laut biru dengan matahari terbenam"</p>
                    </div>
                    <div>
                      <strong className="text-white">Fantasi:</strong>
                      <p className="text-slate-300">"Naga emas terbang di atas kastil dengan aurora borealis"</p>
                    </div>
                    <div>
                      <strong className="text-white">Teknologi:</strong>
                      <p className="text-slate-300">"Robot futuristik berjalan di kota cyberpunk dengan neon"</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-200 mb-2">Troubleshooting Umum</h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Video tidak sesuai? Coba prompt yang lebih spesifik</li>
                    <li>• Loading lama? Cek koneksi internet</li>
                    <li>• Error? Refresh halaman dan coba lagi</li>
                    <li>• Butuh bantuan? Hubungi customer service</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Langkah Selanjutnya</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/help/faq">
                <div className="bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-4 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-white mb-2">📋 Baca FAQ</h3>
                  <p className="text-sm text-slate-300">Pertanyaan yang sering diajukan</p>
                </div>
              </Link>
              <Link href="/help/content-policy">
                <div className="bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-4 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-white mb-2">📖 Panduan Konten</h3>
                  <p className="text-sm text-slate-300">Aturan dan best practices</p>
                </div>
              </Link>
              <Link href="/pricing">
                <div className="bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-4 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-white mb-2">💎 Lihat Paket</h3>
                  <p className="text-sm text-slate-300">Upgrade untuk fitur premium</p>
                </div>
              </Link>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Getting Started:</strong> Create AI videos in 4 steps: 1) Write descriptive text prompt, 
                2) Use enhancement features (optional), 3) Generate video with AI processing, 4) Download HD MP4 result.
              </p>
              <p>
                <strong>Features:</strong> 8-second HD videos, multiple concurrent generation, auto-translation, 
                prompt enhancement, commercial usage rights, no watermarks.
              </p>
              <p>
                <strong>Tips:</strong> Use specific visual details, describe lighting and mood, include movement information, 
                try multiple variations, and leverage example prompts for best results.
              </p>
              <p>
                <strong>Next Steps:</strong> Check <Link href="/help/faq" className="text-cyan-400 hover:text-cyan-300">FAQ</Link>, 
                read <Link href="/help/content-policy" className="text-cyan-400 hover:text-cyan-300">content guidelines</Link>, 
                or explore <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300">premium plans</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}