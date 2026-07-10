import { lazy, Suspense } from "react";
import { LazyMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
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
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Router-agnostic: the client entry wraps this in BrowserRouter,
// the prerender entry in StaticRouter.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={loadMotionFeatures} strict>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/marine-flooring" element={<MarineFlooring />} />
          <Route path="/campers" element={<Campers />} />
          <Route path="/3d-scanning" element={<Scanning3D />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
