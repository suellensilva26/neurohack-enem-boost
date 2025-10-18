import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "og-image.png",
        "icons/icon-72x72.png",
        "icons/icon-144x144.png",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
        "icons/icon-512x512-maskable.png",
        "screenshots/home.png",
        "screenshots/quiz.png",
      ],
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallback: "/offline.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
            }
          },
          {
            urlPattern: ({ request }) => ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets",
              expiration: { maxEntries: 200, maxAgeSeconds: 604800 }
            }
          },
          {
            urlPattern: ({ request }) => ["image", "font"].includes(request.destination),
            handler: "CacheFirst",
            options: {
              cacheName: "static",
              expiration: { maxEntries: 200, maxAgeSeconds: 2592000 }
            }
          }
        ]
      }
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  build: {
    target: "es2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          utils: ["date-fns"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
