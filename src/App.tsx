import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import HowItWorks from "./pages/HowItWorks";
import Providers from "./pages/Providers";
import Cities from "./pages/Cities";
import Enterprise from "./pages/Enterprise";
import Compliance from "./pages/Compliance";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import GetQuote from "./pages/GetQuote";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/enterprise-relocation" element={<Enterprise />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
