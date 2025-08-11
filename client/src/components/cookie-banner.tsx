import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Cookie, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(savedPreferences);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Apply preferences (in a real app, this would configure tracking scripts)
    applyCookiePreferences(prefs);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // In a real implementation, this would:
    // - Enable/disable Google Analytics
    // - Enable/disable marketing pixels
    // - Configure other tracking scripts
    
    console.log('Cookie preferences applied:', prefs);
    
    // Example: Disable analytics if not consented
    if (!prefs.analytics && typeof gtag !== 'undefined') {
      // gtag('config', 'GA_MEASUREMENT_ID', { anonymize_ip: true });
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const rejectOptional = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialOnly);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:max-w-md md:left-auto md:right-4">
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <Cookie className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">Cookie Preferences</h3>
              <p className="text-slate-300 text-sm mb-4">
                Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Cookie penting diperlukan untuk 
                fungsi website, sementara yang lain membantu kami memahami cara Anda menggunakan situs ini.
              </p>
              
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                  >
                    Terima Semua
                  </Button>
                  <Button
                    onClick={rejectOptional}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 flex-1"
                  >
                    Tolak Opsional
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white flex-1"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Kelola Preferensi
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Kelola Cookie Preferences</DialogTitle>
                        <DialogDescription className="text-slate-300">
                          Pilih jenis cookie yang ingin Anda izinkan. Cookie penting tidak dapat dinonaktifkan 
                          karena diperlukan untuk fungsi dasar website.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6 mt-4">
                        {/* Essential Cookies */}
                        <div className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Label className="text-white font-semibold">Cookie Penting</Label>
                              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Wajib</span>
                            </div>
                            <Switch checked={true} disabled />
                          </div>
                          <p className="text-slate-300 text-sm">
                            Cookie yang diperlukan untuk fungsi dasar website seperti login, keamanan, 
                            dan navigasi. Tidak dapat dinonaktifkan.
                          </p>
                        </div>

                        {/* Functional Cookies */}
                        <div className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-white font-semibold">Cookie Fungsional</Label>
                            <Switch
                              checked={preferences.functional}
                              onCheckedChange={(value) => updatePreference('functional', value)}
                            />
                          </div>
                          <p className="text-slate-300 text-sm">
                            Menyimpan preferensi Anda seperti tema, bahasa, dan pengaturan lainnya 
                            untuk pengalaman yang lebih personal.
                          </p>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-white font-semibold">Cookie Analitik</Label>
                            <Switch
                              checked={preferences.analytics}
                              onCheckedChange={(value) => updatePreference('analytics', value)}
                            />
                          </div>
                          <p className="text-slate-300 text-sm">
                            Membantu kami memahami cara website digunakan dengan mengumpulkan data anonim 
                            tentang halaman yang dikunjungi dan fitur yang digunakan.
                          </p>
                        </div>

                        {/* Marketing Cookies */}
                        <div className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-white font-semibold">Cookie Pemasaran</Label>
                            <Switch
                              checked={preferences.marketing}
                              onCheckedChange={(value) => updatePreference('marketing', value)}
                            />
                          </div>
                          <p className="text-slate-300 text-sm">
                            Digunakan untuk menampilkan iklan yang relevan dan mengukur efektivitas 
                            kampanye pemasaran di berbagai platform.
                          </p>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                          <p className="text-blue-200 text-sm">
                            📋 Anda dapat mengubah preferensi ini kapan saja melalui{" "}
                            <Link href="/legal/cookies" className="text-blue-400 hover:text-blue-300 underline">
                              halaman kebijakan cookie
                            </Link>.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => savePreferences(preferences)}
                            className="bg-purple-600 hover:bg-purple-700 flex-1"
                          >
                            Simpan Preferensi
                          </Button>
                          <Button
                            onClick={() => setShowPreferences(false)}
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Link href="/legal/cookies" className="flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white w-full"
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setShowBanner(false)}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white p-1 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}