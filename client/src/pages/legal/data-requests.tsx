import { Link } from "wouter";
import { ArrowLeft, Download, Eye, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DataRequests() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "",
    description: "",
    verificationCode: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Permintaan Data Terkirim",
        description: "Kami akan memproses permintaan Anda dalam 5-10 hari kerja.",
      });
      
      setFormData({
        name: "",
        email: "",
        requestType: "",
        description: "",
        verificationCode: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami.",
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Permintaan Data Pribadi
          </h1>
          <p className="text-slate-300 mt-2">Kelola data pribadi Anda sesuai dengan hak-hak UU PDP</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Form Permintaan Data</h2>
              
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
                      placeholder="Sesuai dengan data di akun Anda"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email Akun *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      placeholder="Email yang terdaftar di VideoAI"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="requestType" className="text-slate-300">Jenis Permintaan *</Label>
                  <Select value={formData.requestType} onValueChange={(value) => handleInputChange("requestType", value)}>
                    <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Pilih jenis permintaan data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="access">Akses Data (Data Portability)</SelectItem>
                      <SelectItem value="rectification">Koreksi Data (Data Rectification)</SelectItem>
                      <SelectItem value="deletion">Hapus Data (Data Deletion/Erasure)</SelectItem>
                      <SelectItem value="restriction">Pembatasan Pemrosesan (Processing Restriction)</SelectItem>
                      <SelectItem value="objection">Keberatan Pemrosesan (Processing Objection)</SelectItem>
                      <SelectItem value="withdrawal">Penarikan Persetujuan (Consent Withdrawal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300">Deskripsi Permintaan *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                    rows={4}
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                    placeholder="Jelaskan secara detail permintaan Anda. Misalnya: data apa yang ingin diakses, bagian mana yang perlu dikoreksi, alasan penghapusan, dll."
                  />
                </div>

                <div>
                  <Label htmlFor="verificationCode" className="text-slate-300">Kode Verifikasi</Label>
                  <Input
                    id="verificationCode"
                    value={formData.verificationCode}
                    onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    placeholder="Akan dikirim ke email setelah form disubmit"
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    Kode verifikasi akan dikirim ke email Anda untuk konfirmasi identitas
                  </p>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    📋 <strong>Dokumen Pendukung:</strong> Untuk verifikasi identitas, Anda mungkin perlu 
                    mengirimkan scan KTP atau dokumen identitas lainnya melalui email terpisah setelah form ini disubmit.
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
                      Memproses...
                    </>
                  ) : (
                    "Kirim Permintaan Data"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Jenis Permintaan Data</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Akses Data</h3>
                    <p className="text-slate-300 text-sm">Mendapatkan salinan lengkap data pribadi Anda</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Edit className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Koreksi Data</h3>
                    <p className="text-slate-300 text-sm">Memperbaiki data yang tidak akurat atau tidak lengkap</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Hapus Data</h3>
                    <p className="text-slate-300 text-sm">Menghapus data pribadi secara permanen</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Portabilitas</h3>
                    <p className="text-slate-300 text-sm">Mengunduh data dalam format yang dapat dibaca mesin</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Timeline Pemrosesan</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Konfirmasi Penerimaan</span>
                  <span className="text-green-400 font-semibold">24 jam</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Verifikasi Identitas</span>
                  <span className="text-yellow-400 font-semibold">1-3 hari</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Pemrosesan Permintaan</span>
                  <span className="text-orange-400 font-semibold">5-10 hari</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Pengiriman Hasil</span>
                  <span className="text-blue-400 font-semibold">1-2 hari</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-200 text-sm">
                  📅 <strong>Total:</strong> Maksimal 30 hari sesuai dengan ketentuan UU PDP Indonesia
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Data yang Tersedia</h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h3 className="font-semibold text-white">Informasi Akun:</h3>
                  <p className="text-slate-300">Nama, email, tanggal registrasi, pengaturan</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Konten & Aktivitas:</h3>
                  <p className="text-slate-300">Prompt, video yang dibuat, riwayat penggunaan</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Data Teknis:</h3>
                  <p className="text-slate-300">Log akses, IP address, device information</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Transaksi:</h3>
                  <p className="text-slate-300">Riwayat pembayaran, invoice, langganan</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Kontak & Bantuan</h2>
              
              <div className="space-y-2 text-sm">
                <p><strong>Data Protection Officer:</strong></p>
                <p className="text-slate-300">Email: dpo@videoai.id</p>
                <p className="text-slate-300">Phone: +62 21 XXXX XXXX (ext. 4)</p>
                <p className="text-slate-300">Hours: Senin-Jumat, 09:00-17:00 WIB</p>
              </div>

              <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-200 text-sm">
                  📞 <strong>Urgent:</strong> Untuk permintaan mendesak, hubungi hotline 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* English Summary */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">English Summary</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              <strong>Data Rights:</strong> Request data access, rectification, deletion, processing restriction, 
              objection, or consent withdrawal per Indonesian Personal Data Protection Law.
            </p>
            <p>
              <strong>Request Types:</strong> Data portability (download your data), correction of inaccurate information, 
              permanent deletion, processing limitations, and consent management.
            </p>
            <p>
              <strong>Process Timeline:</strong> 24-hour acknowledgment, 1-3 day identity verification, 
              5-10 day processing, maximum 30 days total as required by Indonesian law.
            </p>
            <p>
              <strong>Available Data:</strong> Account information, content & activity history, technical logs, 
              and transaction records in machine-readable format.
            </p>
            <p>
              <strong>Contact:</strong> Data Protection Officer at dpo@videoai.id, phone +62 21 XXXX XXXX (ext. 4), 
              business hours Monday-Friday 09:00-17:00 WIB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}