import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "0.0.0.0",
    port: 8081,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // viteImagemin({
    //   gifsicle: { optimizationLevel: 3 },
    //   mozjpeg: { quality: 75 },
    //   pngquant: { quality: [0.65, 0.8], speed: 4 },
    //   svgo: { plugins: [{ name: "removeViewBox", active: false }] },
    // }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // framer-motion is intentionally not pinned to a chunk: its animation
        // engine loads async via LazyMotion, and forcing the package into one
        // chunk would drag the engine back into the critical path.
        // Skipped for the SSR (prerender) build, where deps stay external.
        manualChunks: isSsrBuild
          ? undefined
          : {
              vendor: ["react", "react-dom", "react-router-dom"],
              ui: ["lucide-react"],
            },
      },
    },
  },
}));
