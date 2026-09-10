import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maintenance from "@/components/Maintenance";
import Index from "./pages/Index";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Ethics from "./pages/Ethics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Manutenção programada: entra automaticamente a partir de 31/08/2026 (00:00 em São Paulo, UTC-3)
const MAINTENANCE_START = new Date("2026-08-31T03:00:00Z");
const MAINTENANCE_FORCED = import.meta.env.VITE_MAINTENANCE_MODE === "true";
const MAINTENANCE_DISABLED = import.meta.env.VITE_MAINTENANCE_MODE === "false";

const App = () => {
  // Manutenção desativada
  const isMaintenance = false;

  if (isMaintenance) {
    return <Maintenance />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/integridade-e-etica" element={<Ethics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
