import { Link } from "wouter";
import { ArrowLeft, Bot, AlertTriangle, Brain, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIDisclosure() {
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
            Pernyataan AI & Transparansi
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-blue-200">Transparansi AI</h3>
            </div>
            <p className="text-blue-100 text-sm">
              VideoAI menggunakan teknologi kecerdasan buatan untuk menghasilkan konten video. 
              Dokumen ini menjelaskan bagaimana AI bekerja, batasannya, dan tanggung jawab Anda sebagai pengguna.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Konfirmasi Penggunaan AI</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Teknologi yang Digunakan:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Generative AI Models:</strong> Model pembelajaran mesin yang dilatih untuk menghasilkan video dari teks</li>
                  <li><strong>Natural Language Processing:</strong> Untuk memahami dan memproses prompt berbahasa Indonesia dan Inggris</li>
                  <li><strong>Computer Vision:</strong> Untuk menganalisis dan menghasilkan elemen visual yang koheren</li>
                  <li><strong>Neural Networks:</strong> Deep learning algorithms untuk sintesis video berkualitas tinggi</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-yellow-200">Penting untuk Diketahui</h3>
                </div>
                <p className="text-yellow-100 text-sm">
                  <strong>Semua video yang dihasilkan oleh platform ini adalah produk AI generatif.</strong> 
                  Konten tidak merepresentasikan peristiwa nyata kecuali secara kebetulan, dan harus diperlakukan 
                  sebagai karya seni digital atau simulasi.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Potensi Bias dan Keterbatasan</h2>
            <div className="space-y-6">
              <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-300">Bias dalam Model AI</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Model AI kami dilatih menggunakan dataset besar yang mungkin mengandung bias implicit. Ini dapat mempengaruhi:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Representasi Visual:</h4>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Representasi ras dan etnis</li>
                        <li>• Stereotip gender</li>
                        <li>• Bias budaya dan geografis</li>
                        <li>• Preferensi estetika tertentu</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Interpretasi Konteks:</h4>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Asumsi budaya Barat</li>
                        <li>• Bias temporal (modern vs klasik)</li>
                        <li>• Preferensi gaya visual populer</li>
                        <li>• Interpretasi subjektif prompt</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-orange-300 mb-3">Keterbatasan Teknis</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Akurasi Konten:</h4>
                    <ul className="text-orange-100 text-sm space-y-1">
                      <li>• Tidak dapat memverifikasi fakta</li>
                      <li>• Hasil bersifat probabilistik</li>
                      <li>• Mungkin menghasilkan anachronism</li>
                      <li>• Tidak memahami konteks sejarah</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Konsistensi Visual:</h4>
                    <ul className="text-orange-100 text-sm space-y-1">
                      <li>• Variasi hasil untuk prompt sama</li>
                      <li>• Kesulitan dengan detail spesifik</li>
                      <li>• Keterbatasan fisika realistis</li>
                      <li>• Interpretasi prompt yang berbeda</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Kewajiban Verifikasi Pengguna</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Tanggung Jawab Pengguna:</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Verifikasi Faktual:</strong> Pastikan akurasi informasi jika video digunakan untuk tujuan edukasi atau informatif</li>
                  <li><strong>Konteks yang Tepat:</strong> Berikan disclaimer yang sesuai saat membagikan konten AI-generated</li>
                  <li><strong>Sensitivitas Budaya:</strong> Periksa apakah konten menghormati norma dan nilai lokal</li>
                  <li><strong>Kesesuaian Platform:</strong> Pastikan konten sesuai dengan guidelines platform tempat Anda berbagi</li>
                  <li><strong>Hak dan Izin:</strong> Verifikasi bahwa penggunaan tidak melanggar hak orang lain</li>
                </ol>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Contoh Disclaimer yang Disarankan:</h3>
                <div className="bg-slate-800/70 rounded p-3 text-sm text-slate-300 font-mono">
                  <p>"Video ini dibuat menggunakan teknologi AI generatif dan tidak merepresentasikan peristiwa nyata."</p>
                  <br />
                  <p>"Konten ini adalah hasil AI generatif dari VideoAI.id - selalu verifikasi informasi dari sumber terpercaya."</p>
                  <br />
                  <p>"AI-generated content by VideoAI - for entertainment/artistic purposes only."</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Larangan Penggunaan</h2>
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-200 mb-3">Penggunaan yang Dilarang Keras:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Klaim Medis/Kesehatan:</h4>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Diagnosis medis</li>
                      <li>• Rekomendasi pengobatan</li>
                      <li>• Klaim efektivitas obat</li>
                      <li>• Informasi kesehatan menyesatkan</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Klaim Finansial:</h4>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Prediksi pasar saham</li>
                      <li>• Saran investasi</li>
                      <li>• Analisis keuangan</li>
                      <li>• Jaminan return investasi</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Klaim Hukum:</h4>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Nasihat hukum</li>
                      <li>• Interpretasi undang-undang</li>
                      <li>• Prosedur legal</li>
                      <li>• Hak dan kewajiban hukum</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Misinformasi:</h4>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Berita palsu</li>
                      <li>• Conspiracy theories</li>
                      <li>• Pseudoscience</li>
                      <li>• Historical revision</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Best Practices untuk Penggunaan AI</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-green-200">Penggunaan Etis</h3>
                  </div>
                  <ul className="text-green-100 text-sm space-y-2">
                    <li>• Selalu berikan konteks AI-generated</li>
                    <li>• Hindari menyesatkan audiens</li>
                    <li>• Hormati hak dan privasi orang lain</li>
                    <li>• Gunakan untuk tujuan konstruktif</li>
                    <li>• Pertimbangkan dampak sosial</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-200 mb-3">Quality Assurance</h3>
                  <ul className="text-blue-100 text-sm space-y-2">
                    <li>• Review hasil sebelum publikasi</li>
                    <li>• Cross-check dengan sumber terpercaya</li>
                    <li>• Test dengan audiens kecil dulu</li>
                    <li>• Monitor feedback dan tanggapan</li>
                    <li>• Siap untuk koreksi jika perlu</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-200 mb-3">Contoh Penggunaan yang Baik:</h3>
                <div className="space-y-2 text-purple-100 text-sm">
                  <div className="bg-slate-800/50 rounded p-2">
                    <p><strong>Edukasi:</strong> "Simulasi AI tentang ekosistem laut dalam untuk tujuan pembelajaran"</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2">
                    <p><strong>Hiburan:</strong> "Konten hiburan AI-generated untuk media sosial dengan disclaimer yang jelas"</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2">
                    <p><strong>Kreatif:</strong> "Eksplorasi artistik menggunakan AI sebagai tool creative collaboration"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Pelaporan dan Feedback</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Laporkan Masalah:</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Jika Anda menemukan bias, output yang bermasalah, atau kegunaan yang tidak tepat:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> ai-ethics@videoai.id</p>
                  <p><strong>Subject:</strong> "AI Output Concern - [Brief Description]"</p>
                  <p><strong>Include:</strong> Screenshot, prompt, dan penjelasan masalah</p>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Saran Perbaikan:</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Bantuan Anda sangat berharga untuk meningkatkan kualitas AI kami:
                </p>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Laporkan bias yang Anda temukan</li>
                  <li>• Sarankan improvement untuk model</li>
                  <li>• Bagikan use case positif</li>
                  <li>• Berikan feedback tentang accuracy</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Komitmen Perbaikan Berkelanjutan</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300 mb-4">
                VideoAI berkomitmen untuk terus meningkatkan kualitas, akurasi, dan fairness model AI kami melalui:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Regular model updates berdasarkan feedback pengguna</li>
                <li>Bias detection dan mitigation yang berkelanjutan</li>
                <li>Kolaborasi dengan peneliti AI ethics</li>
                <li>Transparency reporting secara berkala</li>
                <li>Community engagement untuk responsible AI development</li>
              </ul>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>AI Technology:</strong> VideoAI uses generative AI models, natural language processing, and deep learning 
                to create videos from text prompts. All outputs are AI-generated and should be treated as digital art or simulation.
              </p>
              <p>
                <strong>Limitations & Bias:</strong> AI models may contain implicit bias affecting visual representation, cultural assumptions, 
                and content interpretation. Results are probabilistic and may vary for identical prompts.
              </p>
              <p>
                <strong>User Responsibilities:</strong> Verify factual accuracy, provide appropriate disclaimers, respect cultural sensitivities, 
                and ensure compliance with platform guidelines when sharing AI-generated content.
              </p>
              <p>
                <strong>Prohibited Uses:</strong> Medical advice, financial predictions, legal counsel, and misinformation are strictly forbidden. 
                Always disclose AI-generated nature of content.
              </p>
              <p>
                <strong>Reporting:</strong> Contact ai-ethics@videoai.id to report bias, problematic outputs, or suggest improvements. 
                We're committed to continuous model enhancement and responsible AI development.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}