import { Link } from "wouter";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContentPolicy() {
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
            Panduan Kepatuhan Konten
          </h1>
          <p className="text-slate-300 mt-2">Best practices untuk membuat konten yang aman dan berkualitas</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Panduan ini membantu Anda:</strong> Memahami apa yang boleh dan tidak boleh dibuat, 
              menghindari pelanggaran kebijakan, dan menciptakan konten berkualitas tinggi.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-green-300 mb-6">✅ Konten yang Dianjurkan</h2>
            
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-xl font-semibold text-green-300">Konten Edukasi dan Kreatif</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Contoh Prompt yang Baik:</h4>
                    <ul className="space-y-1 text-green-100 text-sm">
                      <li>• "Proses fotosintesis pada tanaman dengan animasi ilmiah"</li>
                      <li>• "Tutorial origami burung dengan langkah detail"</li>
                      <li>• "Sejarah Candi Borobudur dengan visual cinematik"</li>
                      <li>• "Eksplorasi laut dalam dengan makhluk bioluminesensi"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Tujuan Positif:</h4>
                    <ul className="space-y-1 text-green-100 text-sm">
                      <li>• Pembelajaran dan edukasi</li>
                      <li>• Inspirasi dan motivasi</li>
                      <li>• Dokumentasi budaya</li>
                      <li>• Eksplorasi sains dan alam</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-blue-300">Konten Bisnis dan Pemasaran</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Contoh yang Tepat:</h4>
                    <ul className="space-y-1 text-blue-100 text-sm">
                      <li>• "Presentasi produk dengan background minimalis modern"</li>
                      <li>• "Demo aplikasi mobile dengan UI yang clean"</li>
                      <li>• "Testimoni pelanggan dengan setting office professional"</li>
                      <li>• "Brand story dengan visual storytelling yang menarik"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Praktik Terbaik:</h4>
                    <ul className="space-y-1 text-blue-100 text-sm">
                      <li>• Jujur dan transparan</li>
                      <li>• Tidak menyesatkan</li>
                      <li>• Menghormati kompetitor</li>
                      <li>• Fokus pada value proposition</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-purple-300">Konten Hiburan dan Seni</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Seni dan Kreativitas:</h4>
                    <ul className="space-y-1 text-purple-100 text-sm">
                      <li>• "Lukisan digital dengan gaya impressionist modern"</li>
                      <li>• "Choreografi tari dengan kostum tradisional"</li>
                      <li>• "Musik visualizer dengan geometri abstrak"</li>
                      <li>• "Fashion show dengan tema sustainable fashion"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Hiburan Positif:</h4>
                    <ul className="space-y-1 text-purple-100 text-sm">
                      <li>• Komedi yang tidak menyinggung</li>
                      <li>• Parodi yang konstruktif</li>
                      <li>• Storytelling yang inspiratif</li>
                      <li>• Entertainment yang family-friendly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-300 mb-6">⚠️ Konten yang Perlu Hati-hati</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-yellow-300">Konten Sensitif</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Topik yang Memerlukan Kehati-hatian:</h4>
                    <ul className="list-disc list-inside space-y-1 text-yellow-100 text-sm ml-4">
                      <li><strong>Politik:</strong> Hindari bias partisan, fokus pada fakta dan edukasi</li>
                      <li><strong>Agama:</strong> Hormati semua kepercayaan, hindari proselitizing</li>
                      <li><strong>Isu Sosial:</strong> Presentasikan berbagai perspektif secara berimbang</li>
                      <li><strong>Sejarah Kontroversial:</strong> Gunakan sumber terpercaya dan konteks yang tepat</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-800/30 rounded p-3">
                    <p className="text-yellow-100 text-sm">
                      <strong>💡 Tips:</strong> Konsultasikan dengan ahli, lakukan fact-checking, 
                      dan pertimbangkan dampak konten terhadap berbagai kelompok masyarakat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h3 className="text-xl font-semibold text-orange-300">Penggunaan Nama dan Likeness</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Yang Harus Dihindari:</h4>
                    <ul className="space-y-1 text-orange-100 text-sm">
                      <li>• Tokoh publik tanpa konteks educational</li>
                      <li>• Selebriti untuk keperluan komersial</li>
                      <li>• Politisi dalam konteks partisan</li>
                      <li>• Orang hidup tanpa izin</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Alternatif yang Aman:</h4>
                    <ul className="space-y-1 text-orange-100 text-sm">
                      <li>• Karakter fiksi original</li>
                      <li>• Tokoh sejarah (domain publik)</li>
                      <li>• Deskripsi umum tanpa identitas spesifik</li>
                      <li>• Stock character types</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-300 mb-6">❌ Konten yang Dilarang</h2>
            
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-300">Konten Berbahaya dan Ilegal</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Dilarang Keras:</h4>
                    <ul className="space-y-1 text-red-100 text-sm">
                      <li>• Kekerasan atau gore</li>
                      <li>• Konten seksual atau pornografi</li>
                      <li>• Hate speech atau diskriminasi</li>
                      <li>• Eksploitasi anak</li>
                      <li>• Terorisme atau ekstremisme</li>
                      <li>• Narkoba atau zat ilegal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Konsekuensi:</h4>
                    <ul className="space-y-1 text-red-100 text-sm">
                      <li>• Penghapusan konten langsung</li>
                      <li>• Peringatan atau suspend akun</li>
                      <li>• Penonaktifan permanen</li>
                      <li>• Laporan ke pihak berwajib</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Contoh Prompt yang Akan Ditolak:</h4>
                <div className="space-y-2 text-red-100 text-sm">
                  <div className="bg-red-800/30 rounded p-2">
                    <p>❌ "Pertarungan berdarah dengan senjata tajam"</p>
                  </div>
                  <div className="bg-red-800/30 rounded p-2">
                    <p>❌ "Konten dewasa dengan ketelanjangan"</p>
                  </div>
                  <div className="bg-red-800/30 rounded p-2">
                    <p>❌ "Propaganda kebencian terhadap kelompok etnis"</p>
                  </div>
                  <div className="bg-red-800/30 rounded p-2">
                    <p>❌ "Tutorial pembuatan bahan peledak"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Fair Use dan Copyright</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Prinsip Fair Use yang Aman:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-cyan-300 mb-2">Tujuan yang Diizinkan:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                      <li>Kritik dan review</li>
                      <li>Parodi dan satire</li>
                      <li>Komentar berita</li>
                      <li>Tujuan pendidikan</li>
                      <li>Penelitian akademis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-300 mb-2">Panduan Praktis:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                      <li>Gunakan minimal yang diperlukan</li>
                      <li>Transformatif, bukan copy</li>
                      <li>Tidak merugikan pemilik asli</li>
                      <li>Berikan konteks dan komentar</li>
                      <li>Sertakan atribusi jika memungkinkan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Contoh Fair Use yang Tepat:</h3>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• <strong>Review Film:</strong> "Analisis cinematography dalam film [nama] dengan fokus pada teknik lighting"</li>
                  <li>• <strong>Parodi:</strong> "Versi komedi dari genre horror klasik dengan twist modern"</li>
                  <li>• <strong>Edukasi:</strong> "Penjelasan teknik editing yang digunakan dalam video viral terbaru"</li>
                  <li>• <strong>Komentar:</strong> "Perspektif budaya Indonesia terhadap trend global terbaru"</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Tips untuk Konten Berkualitas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-green-200">Teknik Penulisan Prompt</h3>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Gunakan deskripsi visual yang spesifik</li>
                    <li>• Sertakan detail pencahayaan dan mood</li>
                    <li>• Jelaskan setting dan konteks</li>
                    <li>• Tambahkan informasi tentang gerakan</li>
                    <li>• Gunakan referensi gaya yang jelas</li>
                  </ul>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-200 mb-2">Optimisasi Hasil</h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Uji berbagai variasi prompt</li>
                    <li>• Gunakan fitur enhance untuk perbaikan</li>
                    <li>• Manfaatkan auto-translate jika diperlukan</li>
                    <li>• Iterasi berdasarkan hasil sebelumnya</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-200 mb-2">Contoh Prompt Berkualitas Tinggi</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-slate-800/70 rounded p-2">
                      <p className="text-slate-300">"Seekor kucing oranye bermain piano di ruangan hangat dengan cahaya lilin, gaya cinematik dengan depth of field shallow, pencahayaan golden hour"</p>
                    </div>
                    <div className="bg-slate-800/70 rounded p-2">
                      <p className="text-slate-300">"Time-lapse pertumbuhan tanaman dari biji hingga berbunga, dengan background minimalis putih, makro photography, 4K quality"</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-200 mb-2">Checklist Sebelum Generate</h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>□ Apakah prompt mengandung konten yang dilarang?</li>
                    <li>□ Apakah melanggar hak cipta atau trademark?</li>
                    <li>□ Apakah deskripsi cukup detail dan jelas?</li>
                    <li>□ Apakah sesuai dengan tujuan penggunaan?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Dukungan dan Konsultasi</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Tidak Yakin dengan Konten Anda?</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Tim support kami siap membantu mengevaluasi konten yang meragukan.
                </p>
                <Link href="/contact">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Konsultasi dengan Tim
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Laporan Konten Bermasalah</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Bantu kami menjaga komunitas dengan melaporkan konten yang melanggar.
                </p>
                <a href="mailto:abuse@videoai.id" className="text-purple-400 hover:text-purple-300 text-sm">
                  abuse@videoai.id
                </a>
              </div>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Recommended Content:</strong> Educational content, business presentations, creative arts, 
                positive entertainment, and cultural documentation are encouraged with detailed, specific prompts.
              </p>
              <p>
                <strong>Sensitive Content:</strong> Political, religious, and social topics require careful handling. 
                Avoid partisan bias, respect all beliefs, and present balanced perspectives with credible sources.
              </p>
              <p>
                <strong>Prohibited Content:</strong> Violence, sexual content, hate speech, child exploitation, 
                terrorism, illegal substances, and copyright infringement result in immediate content removal and account penalties.
              </p>
              <p>
                <strong>Fair Use:</strong> Acceptable for criticism, parody, news commentary, education, and research. 
                Use minimal necessary content, ensure transformation, provide context, and include attribution.
              </p>
              <p>
                <strong>Support:</strong> Contact our team at <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">support</Link> for 
                content consultation or report violations to abuse@videoai.id.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}