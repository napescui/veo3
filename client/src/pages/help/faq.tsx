import { Link } from "wouter";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      title: "Dasar-dasar VideoAI",
      items: [
        {
          id: "what-is-videoai",
          question: "Apa itu VideoAI?",
          answer: "VideoAI adalah platform AI yang memungkinkan Anda membuat video berkualitas HD berdurasi 8 detik dari prompt teks. Menggunakan teknologi kecerdasan buatan terdepan, platform ini mengubah deskripsi tekstual menjadi video visual yang menakjubkan tanpa memerlukan keahlian editing."
        },
        {
          id: "how-it-works",
          question: "Bagaimana cara kerja VideoAI?",
          answer: "VideoAI menggunakan model AI generatif yang telah dilatih pada jutaan video untuk memahami hubungan antara teks dan visual. Ketika Anda memasukkan prompt, AI menganalisis deskripsi tersebut dan menghasilkan sequence visual yang sesuai, kemudian merender menjadi video HD 8 detik."
        },
        {
          id: "video-quality",
          question: "Seperti apa kualitas video yang dihasilkan?",
          answer: "Video dihasilkan dalam format MP4 dengan resolusi HD (1080p), frame rate 24fps, dan durasi tetap 8 detik. Kualitas visual bergantung pada detail prompt dan kemampuan model AI yang terus ditingkatkan."
        }
      ]
    },
    {
      title: "Penggunaan dan Fitur",
      items: [
        {
          id: "prompt-tips",
          question: "Bagaimana cara menulis prompt yang baik?",
          answer: "Prompt terbaik adalah yang deskriptif dan spesifik. Sertakan detail tentang objek utama, setting/lokasi, pencahayaan, mood, dan gerakan. Contoh: 'Seekor kucing oranye bermain piano di ruangan hangat dengan cahaya lilin' lebih baik daripada 'kucing main piano'."
        },
        {
          id: "enhance-feature",
          question: "Apa fungsi tombol 'Enhance'?",
          answer: "Fitur Enhance menggunakan AI untuk memperbaiki dan memperkaya prompt Anda secara otomatis. Ia menambahkan detail visual, memperbaiki struktur kalimat, dan mengoptimalkan prompt untuk hasil video yang lebih baik."
        },
        {
          id: "multiple-videos",
          question: "Bisakah saya membuat beberapa video sekaligus?",
          answer: "Ya! Anda dapat menjalankan hingga 10 proses pembuatan video secara bersamaan. Tidak perlu menunggu satu video selesai untuk memulai yang lain. Sistem akan mengelola queue secara otomatis."
        },
        {
          id: "auto-translate",
          question: "Apa itu fitur auto-translate?",
          answer: "Auto-translate secara otomatis menerjemahkan prompt Bahasa Indonesia ke Bahasa Inggris untuk hasil yang lebih optimal, karena model AI dilatih terutama dengan data berbahasa Inggris."
        }
      ]
    },
    {
      title: "Format dan Download",
      items: [
        {
          id: "file-format",
          question: "Dalam format apa video diunduh?",
          answer: "Video diunduh dalam format MP4 (H.264 codec) dengan resolusi 1080p. Format ini kompatibel dengan hampir semua device dan platform media sosial."
        },
        {
          id: "file-size",
          question: "Berapa ukuran file video?",
          answer: "Video 8 detik HD biasanya berukuran 3-8 MB tergantung kompleksitas visual. Ukuran sudah dioptimalkan untuk keseimbangan antara kualitas dan efisiensi storage."
        },
        {
          id: "duration-limit",
          question: "Bisakah saya membuat video lebih dari 8 detik?",
          answer: "Saat ini, platform dibatasi pada durasi 8 detik untuk memastikan kualitas optimal dan waktu pemrosesan yang cepat. Fitur durasi variabel sedang dalam pengembangan."
        },
        {
          id: "watermark",
          question: "Apakah ada watermark di video?",
          answer: "Tidak, video yang dihasilkan tidak memiliki watermark dan dapat digunakan secara bebas termasuk untuk keperluan komersial."
        }
      ]
    },
    {
      title: "Hak Cipta dan Lisensi",
      items: [
        {
          id: "commercial-use",
          question: "Bisakah saya menggunakan video untuk tujuan komersial?",
          answer: "Ya, Anda memiliki hak penuh untuk menggunakan video yang dihasilkan untuk tujuan komersial, termasuk menjual, mendistribusikan, atau menggunakan dalam project bisnis."
        },
        {
          id: "ownership",
          question: "Siapa yang memiliki hak cipta video?",
          answer: "Anda memiliki hak cipta atas video yang dihasilkan dari prompt Anda. VideoAI tidak mengklaim kepemilikan atas konten yang Anda buat."
        },
        {
          id: "attribution",
          question: "Apakah saya perlu menyebutkan VideoAI saat menggunakan video?",
          answer: "Tidak ada kewajiban untuk menyebutkan VideoAI, namun kami sangat menghargai jika Anda memberikan credit atau berbagi pengalaman Anda."
        }
      ]
    },
    {
      title: "Akun dan Pembayaran",
      items: [
        {
          id: "free-tier",
          question: "Apa yang tersedia di akun gratis?",
          answer: "Akun gratis memungkinkan Anda membuat sejumlah terbatas video per bulan dengan fitur dasar. Lihat halaman pricing untuk detail lengkap batas dan fitur."
        },
        {
          id: "payment-methods",
          question: "Metode pembayaran apa yang diterima?",
          answer: "Kami menerima kartu kredit/debit, e-wallet seperti GoPay, OVO, DANA, dan transfer bank. Pembayaran diproses secara aman melalui gateway pembayaran berlisensi."
        },
        {
          id: "refund-policy",
          question: "Bagaimana kebijakan refund?",
          answer: "Refund dapat diajukan dalam 7 hari pertama setelah pembelian langganan baru. Lihat halaman kebijakan refund untuk syarat dan kondisi lengkap."
        },
        {
          id: "account-limits",
          question: "Apakah ada batasan penggunaan?",
          answer: "Ya, setiap paket memiliki batasan jumlah video per bulan, concurrent processing, dan fitur tertentu. Batasan direset setiap bulan dan dapat di-upgrade dengan paket yang lebih tinggi."
        }
      ]
    },
    {
      title: "Teknis dan Troubleshooting",
      items: [
        {
          id: "processing-time",
          question: "Berapa lama waktu pembuatan video?",
          answer: "Rata-rata 1-3 menit per video, tergantung kompleksitas prompt dan beban server. Waktu bisa lebih lama saat peak hours atau untuk prompt yang sangat kompleks."
        },
        {
          id: "failed-generation",
          question: "Mengapa video saya gagal dibuat?",
          answer: "Video bisa gagal karena prompt melanggar kebijakan konten, masalah teknis server, atau prompt yang terlalu kompleks/ambigu. Coba dengan prompt yang lebih sederhana dan pastikan mengikuti panduan konten."
        },
        {
          id: "slow-loading",
          question: "Website lambat atau tidak merespons?",
          answer: "Coba refresh halaman, clear cache browser, atau gunakan koneksi internet yang lebih stabil. Jika masalah berlanjut, hubungi customer support."
        },
        {
          id: "browser-compatibility",
          question: "Browser apa yang didukung?",
          answer: "VideoAI kompatibel dengan Chrome, Firefox, Safari, dan Edge versi terbaru. Untuk pengalaman terbaik, gunakan browser yang telah diperbarui dengan JavaScript enabled."
        },
        {
          id: "mobile-usage",
          question: "Bisakah digunakan di mobile?",
          answer: "Ya, website fully responsive dan dapat digunakan di smartphone dan tablet. App mobile native sedang dalam pengembangan."
        }
      ]
    }
  ];

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
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-slate-300 mt-2">Temukan jawaban atas pertanyaan yang paling sering diajukan</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-8">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Tidak menemukan jawaban?</strong> Hubungi customer service kami melalui chat widget 
              atau email support@videoai.id untuk bantuan personal.
            </p>
          </div>

          {faqCategories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h2 className="text-2xl font-bold text-purple-300 mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <Collapsible key={item.id} open={openItems.includes(item.id)}>
                    <CollapsibleTrigger
                      onClick={() => toggleItem(item.id)}
                      className="w-full bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-4 text-left transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                        {openItems.includes(item.id) ? (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-2 p-4 bg-slate-600/30 rounded-lg border-l-4 border-purple-500">
                        <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Masih Butuh Bantuan?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">📧 Email Support</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Untuk pertanyaan teknis atau masalah akun
                </p>
                <p className="text-purple-400">support@videoai.id</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">💬 Live Chat</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Chat langsung dengan customer service
                </p>
                <p className="text-purple-400">Widget chat di pojok kanan bawah</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">📖 Panduan Lengkap</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Tutorial step-by-step untuk pemula
                </p>
                <Link href="/help/getting-started" className="text-purple-400 hover:text-purple-300">
                  Baca Getting Started →
                </Link>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">⚖️ Kebijakan</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Syarat penggunaan dan kebijakan privasi
                </p>
                <Link href="/legal/terms" className="text-purple-400 hover:text-purple-300">
                  Lihat Legal Pages →
                </Link>
              </div>
            </div>
          </section>

          {/* English Summary */}
          <section className="mt-12 border-t border-slate-600 pt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong>VideoAI Basics:</strong> AI-powered platform that creates 8-second HD videos from text prompts 
                using advanced generative AI models trained on millions of videos.
              </p>
              <p>
                <strong>Features:</strong> Multiple concurrent video generation (up to 10), prompt enhancement, 
                auto-translation, HD quality output (1080p MP4), and commercial usage rights without watermarks.
              </p>
              <p>
                <strong>Usage Tips:</strong> Write descriptive prompts with specific visual details, lighting, and movement. 
                Use the Enhance feature for better results and auto-translate for Indonesian prompts.
              </p>
              <p>
                <strong>Technical:</strong> Processing takes 1-3 minutes per video, supports modern browsers, 
                mobile-responsive interface, with dedicated customer support via email and live chat.
              </p>
              <p>
                <strong>Pricing:</strong> Free tier available with limitations, paid plans offer more videos and features. 
                7-day refund policy for new subscriptions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}