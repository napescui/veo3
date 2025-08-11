import { Link } from "wouter";
import { Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              VideoAI
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Platform AI terdepan untuk mengubah teks menjadi video berkualitas HD. 
              Buat konten visual yang menakjubkan hanya dengan imajinasi Anda.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
              <Mail className="w-4 h-4" />
              <span>support@videoai.id</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Kebijakan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-slate-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-slate-300 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-slate-300 hover:text-white transition-colors">
                  Kebijakan Cookie
                </Link>
              </li>
              <li>
                <Link href="/legal/aup" className="text-slate-300 hover:text-white transition-colors">
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/dmca" className="text-slate-300 hover:text-white transition-colors">
                  DMCA & Hak Cipta
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="text-slate-300 hover:text-white transition-colors">
                  Kebijakan Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Help */}
          <div>
            <h4 className="text-white font-semibold mb-4">Bantuan & Dukungan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help/getting-started" className="text-slate-300 hover:text-white transition-colors">
                  Panduan Memulai
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/content-policy" className="text-slate-300 hover:text-white transition-colors">
                  Panduan Konten
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/legal/security" className="text-slate-300 hover:text-white transition-colors">
                  Keamanan
                </Link>
              </li>
              <li>
                <Link href="/legal/ai-disclosure" className="text-slate-300 hover:text-white transition-colors">
                  AI Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* Product & Pricing */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produk & Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
                  Harga & Paket
                </Link>
              </li>
              <li>
                <Link href="/legal/age" className="text-slate-300 hover:text-white transition-colors">
                  Batas Usia
                </Link>
              </li>
              <li>
                <Link href="/legal/data-requests" className="text-slate-300 hover:text-white transition-colors">
                  Permintaan Data
                </Link>
              </li>
              <li>
                <a href="/api/status" className="text-slate-300 hover:text-white transition-colors">
                  Status Layanan
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-slate-300 hover:text-white transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © {currentYear} VideoAI. Semua hak dilindungi undang-undang.
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-slate-400">
                <span>Dibuat dengan</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span>di Indonesia</span>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-400 text-xs">Semua sistem normal</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-slate-500 text-xs">
              VideoAI menggunakan teknologi kecerdasan buatan. Hasil yang dihasilkan mungkin tidak selalu akurat. 
              Verifikasi konten sebelum digunakan untuk tujuan penting.{" "}
              <Link href="/legal/ai-disclosure" className="text-purple-400 hover:text-purple-300 underline">
                Pelajari lebih lanjut
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}