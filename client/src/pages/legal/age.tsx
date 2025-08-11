import { Link } from "wouter";
import { ArrowLeft, Users, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AgePolicy() {
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
            Perlindungan Anak & Batas Usia
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-blue-200">Komitmen Perlindungan Anak</h3>
            </div>
            <p className="text-blue-100 text-sm">
              VideoAI berkomitmen untuk menciptakan lingkungan online yang aman untuk semua pengguna, 
              dengan perlindungan khusus untuk anak-anak dan remaja sesuai peraturan Indonesia dan internasional.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Batas Usia Minimum</h2>
            <div className="space-y-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Persyaratan Usia</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-green-200 mb-2">18 Tahun ke Atas - Akses Penuh</h4>
                    <p className="text-green-100 text-sm">
                      Pengguna yang berusia 18 tahun atau lebih dapat menggunakan semua fitur platform 
                      tanpa pembatasan, termasuk akun berbayar dan fitur komersial.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-yellow-200 mb-2">16-17 Tahun - Dengan Persetujuan Orang Tua</h4>
                    <p className="text-yellow-100 text-sm">
                      Remaja usia 16-17 tahun dapat menggunakan platform dengan persetujuan tertulis 
                      dan pengawasan orang tua/wali yang sah.
                    </p>
                  </div>
                  
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-red-200 mb-2">Di Bawah 16 Tahun - Tidak Diizinkan</h4>
                    <p className="text-red-100 text-sm">
                      Sesuai UU PDP Indonesia dan standar internasional, kami tidak melayani 
                      pengguna di bawah 16 tahun untuk melindungi privasi dan keamanan mereka.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Persetujuan Orang Tua</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                Untuk pengguna usia 16-17 tahun, persetujuan orang tua/wali diperlukan melalui proses berikut:
              </p>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                  <h3 className="font-semibold text-white mb-1">Registrasi</h3>
                  <p className="text-slate-300 text-sm">Anak mengisi form registrasi dengan data orang tua</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                  <h3 className="font-semibold text-white mb-1">Verifikasi</h3>
                  <p className="text-slate-300 text-sm">Email verifikasi dikirim ke orang tua</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                  <h3 className="font-semibold text-white mb-1">Persetujuan</h3>
                  <p className="text-slate-300 text-sm">Orang tua menyetujui syarat dan ketentuan</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">4</div>
                  <h3 className="font-semibold text-white mb-1">Aktivasi</h3>
                  <p className="text-slate-300 text-sm">Akun diaktifkan dengan monitoring</p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Dokumen yang Diperlukan:</h3>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Identitas anak (KTP anak/akta kelahiran)</li>
                  <li>• Identitas orang tua/wali (KTP/paspor)</li>
                  <li>• Surat persetujuan yang ditandatangani</li>
                  <li>• Bukti hubungan keluarga (jika diperlukan)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Fitur Perlindungan untuk Remaja</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Pembatasan Akses</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Akun gratis only (tidak bisa upgrade berbayar)</li>
                    <li>• Limit video generation per bulan</li>
                    <li>• Konten filter otomatis lebih ketat</li>
                    <li>• Tidak bisa mengunduh watermark-free</li>
                    <li>• Tidak bisa share ke public gallery</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Monitoring & Safety</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Review semua konten sebelum generation</li>
                    <li>• Report to parent untuk aktivitas mencurigakan</li>
                    <li>• Akses terbatas pada prompt tertentu</li>
                    <li>• Session timeout otomatis lebih cepat</li>
                    <li>• Chat support dengan moderator khusus</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Kontrol Orang Tua</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Dashboard monitoring untuk orang tua</li>
                    <li>• Email report mingguan aktivitas</li>
                    <li>• Kemampuan suspend akun temporary</li>
                    <li>• Review dan approve konten (opsional)</li>
                    <li>• Setting time limits penggunaan</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Edukasi & Awareness</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Tutorial digital literacy</li>
                    <li>• Panduan safe online behavior</li>
                    <li>• Warning untuk konten sensitive</li>
                    <li>• Tips untuk responsible AI usage</li>
                    <li>• Link ke resources mental health</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Konten Safety untuk Anak</h2>
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-300">Zero Tolerance untuk CSAM</h3>
                </div>
                <p className="text-red-100 text-sm mb-3">
                  VideoAI memiliki kebijakan zero tolerance untuk Child Sexual Abuse Material (CSAM) 
                  dan menggunakan teknologi detection terdepan untuk mencegah, mendeteksi, dan melaporkan konten tersebut.
                </p>
                <div className="bg-red-800/50 rounded p-3">
                  <h4 className="font-semibold text-red-200 mb-2">Tindakan Otomatis:</h4>
                  <ul className="text-red-100 text-sm space-y-1">
                    <li>• AI-powered CSAM detection</li>
                    <li>• Automatic account termination</li>
                    <li>• Report to authorities (NCMEC, law enforcement)</li>
                    <li>• IP ban dan device fingerprinting</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-200 mb-3">Konten yang Dilarang untuk Remaja</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Kategori Dilarang:</h4>
                    <ul className="text-orange-100 text-sm space-y-1">
                      <li>• Konten seksual atau suggestif</li>
                      <li>• Kekerasan atau gore</li>
                      <li>• Substance abuse (narkoba, alkohol)</li>
                      <li>• Self-harm atau suicide content</li>
                      <li>• Bullying atau harassment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Batasan Tambahan:</h4>
                    <ul className="text-orange-100 text-sm space-y-1">
                      <li>• Tidak bisa generate likeness orang nyata</li>
                      <li>• Prompt filter lebih sensitif</li>
                      <li>• Automatic content moderation</li>
                      <li>• Human review untuk edge cases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Pelaporan dan Dukungan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Untuk Orang Tua</h3>
                <div className="space-y-3">
                  <p className="text-slate-300 text-sm">
                    Jika Anda khawatir tentang aktivitas anak atau menemukan konten yang tidak pantas:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> parents@videoai.id</p>
                    <p><strong>Phone:</strong> +62 21 XXXX XXXX (ext. 3)</p>
                    <p><strong>Hours:</strong> 24/7 untuk emergency, 09:00-18:00 untuk general inquiry</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Untuk Remaja</h3>
                <div className="space-y-3">
                  <p className="text-slate-300 text-sm">
                    Jika Anda merasa tidak aman, di-bully, atau menemukan konten yang mengganggu:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Chat Support:</strong> Widget chat 24/7</p>
                    <p><strong>Email:</strong> teen-support@videoai.id</p>
                    <p><strong>Anonymous Report:</strong> Link di footer website</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Compliance dan Regulasi</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Kepatuhan Hukum:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Indonesia:</strong> UU No. 35/2014 tentang Perlindungan Anak dan UU PDP</li>
                  <li><strong>International:</strong> COPPA (US), GDPR Article 8 (EU), UK Age Appropriate Design Code</li>
                  <li><strong>Industry Standards:</strong> kidSAFE Seal Program, CARU guidelines</li>
                  <li><strong>Platform Policies:</strong> Alignment dengan YouTube Kids, TikTok Family Safety</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Regular Audits & Updates:</h3>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Quarterly review kebijakan child safety</li>
                  <li>• Annual third-party security audit</li>
                  <li>• Regular training untuk moderator content</li>
                  <li>• Update AI model untuk better child protection</li>
                </ul>
              </div>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Age Requirements:</strong> 18+ for full access, 16-17 with parental consent and supervision, 
                under 16 not permitted per Indonesian Personal Data Protection Law and international standards.
              </p>
              <p>
                <strong>Parental Consent:</strong> Required verification process including identity documents, 
                signed consent forms, and ongoing monitoring dashboard for parents of teen users.
              </p>
              <p>
                <strong>Teen Protections:</strong> Limited to free accounts, stricter content filtering, 
                automatic moderation, parental controls, and specialized support with safety education.
              </p>
              <p>
                <strong>CSAM Zero Tolerance:</strong> AI-powered detection, automatic reporting to authorities, 
                immediate account termination, and IP banning for any child exploitation material.
              </p>
              <p>
                <strong>Support:</strong> 24/7 emergency support for parents (parents@videoai.id), 
                specialized teen support (teen-support@videoai.id), and anonymous reporting options.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}