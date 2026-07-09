import { lazy, Suspense } from "react";
import { LazyMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";

// Animation engine loads after first paint; m.* elements render static until then.
const loadMotionFeatures = () =>
  import("./lib/motion-features").then((mod) => mod.default);
const MarineFlooring = lazy(() => import("./pages/MarineFlooring"));
const Campers = lazy(() => import("./pages/Campers"));
const Scanning3D = lazy(() => import("./pages/Scanning3D"));
const Contact = lazy(() => import("./pages/Contact"));
const Warranty = lazy(() => import("./pages/Warranty"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={loadMotionFeatures} strict>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/marine-flooring" element={<MarineFlooring />} />
            <Route path="/campers" element={<Campers />} />
            <Route path="/3d-scanning" element={<Scanning3D />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
