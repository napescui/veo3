import { Link } from "wouter";
import { ArrowLeft, Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "Gratis",
      period: "selamanya",
      description: "Sempurna untuk mencoba dan eksplorasi",
      icon: Star,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30",
      features: [
        "3 video per bulan",
        "Durasi 8 detik per video",
        "Resolusi HD (1080p)",
        "Format MP4 download",
        "Fitur enhance prompt",
        "Auto-translate",
        "Community support"
      ],
      limitations: [
        "Watermark kecil",
        "Queue priority rendah",
        "Penyimpanan 30 hari"
      ],
      cta: "Mulai Gratis",
      popular: false
    },
    {
      name: "Pro",
      price: "Rp 99.000",
      period: "per bulan",
      description: "Untuk kreator konten dan bisnis kecil",
      icon: Zap,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
      features: [
        "50 video per bulan",
        "Durasi 8 detik per video",
        "Resolusi HD & 4K",
        "Tanpa watermark",
        "Priority queue",
        "Bulk generation (hingga 10)",
        "Advanced prompt enhance",
        "Analytics dasar",
        "Email support"
      ],
      limitations: [
        "Penyimpanan 90 hari"
      ],
      cta: "Upgrade ke Pro",
      popular: true
    },
    {
      name: "Business",
      price: "Rp 299.000",
      period: "per bulan",
      description: "Untuk tim dan bisnis yang berkembang",
      icon: Crown,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500/30",
      features: [
        "200 video per bulan",
        "Durasi 8 detik per video",
        "Resolusi hingga 4K",
        "Tanpa watermark",
        "Highest priority queue",
        "Bulk generation (hingga 25)",
        "Custom style presets",
        "Advanced analytics",
        "Team collaboration",
        "Priority support",
        "Custom branding"
      ],
      limitations: [],
      cta: "Upgrade ke Business",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "hubungi kami",
      description: "Solusi khusus untuk enterprise",
      icon: Crown,
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/20",
      borderColor: "border-cyan-500/30",
      features: [
        "Video unlimited",
        "Custom video duration",
        "White-label solution",
        "API access",
        "Custom model training",
        "Dedicated infrastructure",
        "24/7 phone support",
        "Custom SLA",
        "On-premise deployment",
        "Advanced security features"
      ],
      limitations: [],
      cta: "Hubungi Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Pilih Paket yang Tepat
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Mulai gratis, upgrade kapan saja. Semua paket mencakup teknologi AI terdepan 
            dan video berkualitas HD tanpa komitmen jangka panjang.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border ${plan.borderColor} ${
                  plan.popular ? 'ring-2 ring-purple-500/50 scale-105' : ''
                } transition-transform hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-3 py-1">
                      Paling Populer
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-6 h-6 ${plan.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-slate-400 text-sm ml-2">/ {plan.period}</span>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-6 p-3 bg-slate-700/30 rounded-lg">
                    <p className="text-slate-400 text-xs font-semibold">Keterbatasan:</p>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs">• {limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  } text-white`}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Apakah saya bisa upgrade atau downgrade kapan saja?</h3>
                <p className="text-slate-300 text-sm">
                  Ya, Anda dapat mengubah paket kapan saja. Upgrade berlaku langsung, 
                  sementara downgrade berlaku di periode billing berikutnya.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Bagaimana cara pembayaran?</h3>
                <p className="text-slate-300 text-sm">
                  Kami menerima kartu kredit/debit, e-wallet (GoPay, OVO, DANA), 
                  dan transfer bank. Pembayaran diproses secara aman melalui gateway berlisensi.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Apakah ada kontrak jangka panjang?</h3>
                <p className="text-slate-300 text-sm">
                  Tidak, semua paket berbasis langganan bulanan tanpa komitmen jangka panjang. 
                  Anda dapat membatalkan kapan saja.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Apa yang terjadi jika melebihi kuota?</h3>
                <p className="text-slate-300 text-sm">
                  Anda akan mendapat notifikasi saat mendekati limit. Setelah habis, 
                  Anda bisa upgrade paket atau menunggu reset di bulan berikutnya.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Apakah ada diskon untuk pembayaran tahunan?</h3>
                <p className="text-slate-300 text-sm">
                  Ya, dapatkan diskon 20% untuk pembayaran tahunan di depan. 
                  Hubungi sales team untuk informasi lebih lanjut.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Bisakah saya mendapat invoice untuk perusahaan?</h3>
                <p className="text-slate-300 text-sm">
                  Tentu, semua paket Business dan Enterprise dilengkapi dengan invoice resmi 
                  dan dukungan untuk proses procurement perusahaan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 text-center border border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">Butuh Solusi Custom?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Untuk kebutuhan enterprise dengan volume tinggi, custom features, 
            atau on-premise deployment, tim kami siap membantu merancang solusi yang tepat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Hubungi Sales Team
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Request Demo
            </Button>
          </div>
        </div>

        {/* English Summary */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              <strong>Pricing Plans:</strong> Free (3 videos/month with watermark), Pro (Rp 99K, 50 videos/month), 
              Business (Rp 299K, 200 videos/month), and Enterprise (custom pricing with unlimited features).
            </p>
            <p>
              <strong>Features:</strong> All plans include HD video generation, prompt enhancement, auto-translate, 
              and commercial usage rights. Higher tiers offer no watermarks, priority processing, and advanced analytics.
            </p>
            <p>
              <strong>Payment:</strong> Monthly subscriptions with no long-term contracts. Accepts credit cards, 
              e-wallets, and bank transfers. 20% discount available for annual payments.
            </p>
            <p>
              <strong>Enterprise:</strong> Custom solutions available for high-volume users, API access, 
              white-label deployment, and on-premise installations with dedicated support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}