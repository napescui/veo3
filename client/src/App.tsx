import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import VideoEditor from "@/pages/video-editor";
import CustomerService from "@/components/customer-service";
import CookieBanner from "@/components/cookie-banner";
import Footer from "@/components/footer";

// Legal Pages
import PrivacyPolicy from "@/pages/legal/privacy";
import TermsOfService from "@/pages/legal/terms";
import CookiePolicy from "@/pages/legal/cookies";
import AcceptableUsePolicy from "@/pages/legal/aup";
import DMCAPolicy from "@/pages/legal/dmca";
import RefundPolicy from "@/pages/legal/refund";
import SecurityPolicy from "@/pages/legal/security";
import AIDisclosure from "@/pages/legal/ai-disclosure";
import AgePolicy from "@/pages/legal/age";
import DataRequests from "@/pages/legal/data-requests";

// Help Pages
import GettingStarted from "@/pages/help/getting-started";
import FAQ from "@/pages/help/faq";
import ContentPolicy from "@/pages/help/content-policy";

// Other Pages
import Contact from "@/pages/contact";
import Pricing from "@/pages/pricing";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/editor" component={VideoEditor} />
          
          {/* Legal Routes */}
          <Route path="/legal/privacy" component={PrivacyPolicy} />
          <Route path="/legal/terms" component={TermsOfService} />
          <Route path="/legal/cookies" component={CookiePolicy} />
          <Route path="/legal/aup" component={AcceptableUsePolicy} />
          <Route path="/legal/dmca" component={DMCAPolicy} />
          <Route path="/legal/refund" component={RefundPolicy} />
          <Route path="/legal/security" component={SecurityPolicy} />
          <Route path="/legal/ai-disclosure" component={AIDisclosure} />
          <Route path="/legal/age" component={AgePolicy} />
          <Route path="/legal/data-requests" component={DataRequests} />
          
          {/* Help Routes */}
          <Route path="/help/getting-started" component={GettingStarted} />
          <Route path="/help/faq" component={FAQ} />
          <Route path="/help/content-policy" component={ContentPolicy} />
          
          {/* Other Routes */}
          <Route path="/contact" component={Contact} />
          <Route path="/pricing" component={Pricing} />
          
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CustomerService />
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
