import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityPolicy() {
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
            Keamanan & Pelaporan Kerentanan
          </h1>
          <p className="text-slate-300 mt-2">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              🔒 <strong>Komitmen Keamanan:</strong> Keamanan data dan privasi pengguna adalah prioritas utama kami. 
              Kami menerapkan standar keamanan industri untuk melindungi informasi Anda.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">1. Praktik Keamanan Kami</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Enkripsi Data</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• TLS 1.3 untuk data in transit</li>
                    <li>• AES-256 untuk data at rest</li>
                    <li>• End-to-end encryption untuk konten sensitif</li>
                    <li>• Secure key management dengan HSM</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Kontrol Akses</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Multi-factor authentication (MFA)</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Principle of least privilege</li>
                    <li>• Regular access review</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white">Monitoring & Logging</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• 24/7 security monitoring</li>
                    <li>• Comprehensive audit logging</li>
                    <li>• Real-time threat detection</li>
                    <li>• Incident response automation</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <h3 className="text-lg font-semibold text-white">Vulnerability Management</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Regular security assessments</li>
                    <li>• Automated vulnerability scanning</li>
                    <li>• Penetration testing</li>
                    <li>• Bug bounty program</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Compliance dan Sertifikasi</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-white mb-2">ISO 27001</h3>
                <p className="text-slate-300 text-sm">Information Security Management</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-white mb-2">SOC 2 Type II</h3>
                <p className="text-slate-300 text-sm">Security & Availability Controls</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-white mb-2">GDPR Compliant</h3>
                <p className="text-slate-300 text-sm">European Data Protection</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Responsible Disclosure Program</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                Kami sangat menghargai peneliti keamanan yang membantu menjaga platform kami tetap aman. 
                Jika Anda menemukan kerentanan keamanan, harap laporkan melalui program responsible disclosure kami.
              </p>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-200 mb-3">Scope Program</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">In Scope:</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• *.videoai.id domains</li>
                      <li>• Mobile applications</li>
                      <li>• API endpoints</li>
                      <li>• Infrastructure components</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Out of Scope:</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Third-party services</li>
                      <li>• Physical security</li>
                      <li>• Social engineering</li>
                      <li>• DoS/DDoS attacks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-200 mb-3">Prohibited Activities</h3>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• Accessing or modifying data belonging to others</li>
                  <li>• Disrupting our services or infrastructure</li>
                  <li>• Social engineering attacks against employees</li>
                  <li>• Physical attempts against our facilities</li>
                  <li>• Automated scanning without permission</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">4. Cara Melaporkan Kerentanan</h2>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Informasi yang Diperlukan:</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Deskripsi Kerentanan:</strong> Jelaskan jenis kerentanan dan potensi dampaknya</li>
                  <li><strong>Langkah Reproduksi:</strong> Berikan langkah detail untuk mereproduksi masalah</li>
                  <li><strong>Proof of Concept:</strong> Sertakan screenshot, video, atau code (jika aman)</li>
                  <li><strong>Tingkat Keparahan:</strong> Estimasi tingkat risiko (Critical, High, Medium, Low)</li>
                  <li><strong>Sistem Terdampak:</strong> Sebutkan URL, endpoint, atau komponen spesifik</li>
                  <li><strong>Informasi Kontak:</strong> Nama, email, dan cara menghubungi Anda</li>
                </ol>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">Kontak Security Team</h3>
                <div className="space-y-2 text-blue-100">
                  <p><strong>Email:</strong> security@videoai.id</p>
                  <p><strong>PGP Key:</strong> Available upon request</p>
                  <p><strong>Response Time:</strong> Initial response within 24 hours</p>
                  <p><strong>Language:</strong> Bahasa Indonesia atau English</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Process Timeline</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                  <h3 className="font-semibold text-white mb-1">Laporan Diterima</h3>
                  <p className="text-slate-300 text-sm">24 jam konfirmasi</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                  <h3 className="font-semibold text-white mb-1">Verifikasi</h3>
                  <p className="text-slate-300 text-sm">3-5 hari kerja</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                  <h3 className="font-semibold text-white mb-1">Perbaikan</h3>
                  <p className="text-slate-300 text-sm">Tergantung tingkat keparahan</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">4</div>
                  <h3 className="font-semibold text-white mb-1">Disclosure</h3>
                  <p className="text-slate-300 text-sm">90 hari setelah fix</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-200 mb-2">SLA Response Times:</h3>
                <ul className="text-yellow-100 text-sm space-y-1">
                  <li><strong>Critical:</strong> 4 jam (fix dalam 24 jam)</li>
                  <li><strong>High:</strong> 24 jam (fix dalam 72 jam)</li>
                  <li><strong>Medium:</strong> 72 jam (fix dalam 1 minggu)</li>
                  <li><strong>Low:</strong> 1 minggu (fix dalam 1 bulan)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Recognition & Rewards</h2>
            <div className="space-y-4">
              <p className="text-slate-300">
                Kami menghargai kontribusi peneliti keamanan dengan:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/30">
                  <h3 className="font-semibold text-yellow-200 mb-2">Hall of Fame</h3>
                  <p className="text-yellow-100 text-sm">
                    Pengakuan publik untuk kontributor (dengan persetujuan)
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-500/30">
                  <h3 className="font-semibold text-green-200 mb-2">Bug Bounty</h3>
                  <p className="text-green-100 text-sm">
                    Monetary rewards untuk kerentanan yang memenuhi syarat
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
                  <h3 className="font-semibold text-purple-200 mb-2">Swag & Merch</h3>
                  <p className="text-purple-100 text-sm">
                    Merchandise eksklusif untuk peneliti yang berkontribusi
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Legal Safe Harbor</h2>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300 mb-4">
                VideoAI berkomitmen untuk tidak mengejar tindakan hukum terhadap peneliti keamanan yang:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                <li>Mengikuti panduan responsible disclosure</li>
                <li>Melaporkan kerentanan dengan itikad baik</li>
                <li>Tidak mengakses data pengguna atau mengganggu layanan</li>
                <li>Memberikan waktu yang wajar untuk perbaikan sebelum disclosure publik</li>
                <li>Tidak melanggar hukum atau peraturan yang berlaku</li>
              </ul>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>Security Practices:</strong> We implement industry-standard security including TLS 1.3 encryption, 
                AES-256 data protection, multi-factor authentication, and 24/7 monitoring with incident response.
              </p>
              <p>
                <strong>Compliance:</strong> ISO 27001, SOC 2 Type II, and GDPR compliant with regular security assessments, 
                penetration testing, and automated vulnerability scanning.
              </p>
              <p>
                <strong>Responsible Disclosure:</strong> Report security vulnerabilities to security@videoai.id with detailed 
                reproduction steps, proof of concept, and impact assessment.
              </p>
              <p>
                <strong>Response Timeline:</strong> 24-hour acknowledgment, 3-5 day verification, priority-based fixing, 
                and 90-day coordinated disclosure with recognition and rewards for contributors.
              </p>
              <p>
                <strong>Legal Protection:</strong> Safe harbor for researchers following responsible disclosure guidelines, 
                reporting in good faith, and respecting user data and service availability.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}