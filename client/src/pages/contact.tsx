import { Link } from "wouter";
import { ArrowLeft, Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Tim kami akan merespons dalam 1-2 hari kerja.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Hubungi Kami
          </h1>
          <p className="text-slate-300 mt-2">Tim support kami siap membantu Anda 24/7</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-slate-300">Kategori *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Pilih kategori pertanyaan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Masalah Teknis</SelectItem>
                        <SelectItem value="billing">Billing & Pembayaran</SelectItem>
                        <SelectItem value="account">Akun & Login</SelectItem>
                        <SelectItem value="feature">Fitur & Penggunaan</SelectItem>
                        <SelectItem value="legal">Legal & Kebijakan</SelectItem>
                        <SelectItem value="partnership">Kemitraan & Bisnis</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-slate-300">Subjek *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      placeholder="Ringkasan singkat masalah/pertanyaan"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-300">Pesan *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={6}
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                    placeholder="Jelaskan pertanyaan atau masalah Anda secara detail. Sertakan informasi yang relevan seperti pesan error, langkah yang sudah dicoba, dll."
                  />
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-200 text-sm">
                    📋 <strong>Tips untuk respons yang lebih cepat:</strong> Sertakan screenshot jika ada error, 
                    jelaskan langkah yang sudah dicoba, dan berikan informasi akun (tanpa password) jika diperlukan.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Informasi Kontak</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Email Support</h3>
                    <p className="text-slate-300 text-sm">support@videoai.id</p>
                    <p className="text-slate-400 text-xs">Untuk pertanyaan umum & teknis</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-pink-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Email Legal</h3>
                    <p className="text-slate-300 text-sm">legal@videoai.id</p>
                    <p className="text-slate-400 text-xs">Untuk pertanyaan hukum & compliance</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Telepon</h3>
                    <p className="text-slate-300 text-sm">+62 21 XXXX XXXX</p>
                    <p className="text-slate-400 text-xs">Senin - Jumat, 09:00 - 18:00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Alamat</h3>
                    <p className="text-slate-300 text-sm">
                      [Alamat lengkap kantor]<br />
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Jam Operasional</h3>
                    <p className="text-slate-300 text-sm">
                      Senin - Jumat: 09:00 - 18:00 WIB<br />
                      Sabtu: 10:00 - 15:00 WIB<br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Respons Time</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Email Support</span>
                  <span className="text-green-400 font-semibold">&lt; 24 jam</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Live Chat</span>
                  <span className="text-green-400 font-semibold">&lt; 5 menit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Masalah Teknis</span>
                  <span className="text-yellow-400 font-semibold">&lt; 48 jam</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Legal Inquiry</span>
                  <span className="text-yellow-400 font-semibold">&lt; 72 jam</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-200 text-sm">
                  🟢 <strong>Status:</strong> Semua sistem normal. Customer service tersedia 24/7 melalui live chat.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Bantuan Cepat</h2>
              
              <div className="space-y-3">
                <Link href="/help/faq">
                  <div className="bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-3 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-white text-sm">📋 FAQ</h3>
                    <p className="text-slate-400 text-xs">Pertanyaan yang sering diajukan</p>
                  </div>
                </Link>
                
                <Link href="/help/getting-started">
                  <div className="bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-3 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-white text-sm">🚀 Getting Started</h3>
                    <p className="text-slate-400 text-xs">Panduan lengkap untuk pemula</p>
                  </div>
                </Link>
                
                <Link href="/legal/terms">
                  <div className="bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-3 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-white text-sm">⚖️ Terms & Conditions</h3>
                    <p className="text-slate-400 text-xs">Syarat dan ketentuan penggunaan</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* English Summary */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              <strong>Contact Options:</strong> Reach our support team via email (support@videoai.id), 
              live chat widget, phone (+62 21 XXXX XXXX), or the contact form above.
            </p>
            <p>
              <strong>Response Times:</strong> Email support &lt;24 hours, live chat &lt;5 minutes, 
              technical issues &lt;48 hours, legal inquiries &lt;72 hours.
            </p>
            <p>
              <strong>Business Hours:</strong> Monday-Friday 09:00-18:00 WIB, Saturday 10:00-15:00 WIB, 
              Sunday closed. Live chat available 24/7.
            </p>
            <p>
              <strong>Contact Categories:</strong> Technical issues, billing & payments, account & login, 
              features & usage, legal & policies, partnerships & business, and general inquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}