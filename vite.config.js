import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

require("dotenv").config();

const port = process.env.JS_PORT || 3000;
const proxyTarget = `http://127.0.0.1:${port}`;

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "JS_",
  base: "",
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios", "react-toastify"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    // port for exposing frontend
    port: 3000,
    // port for exposing APIs
    proxy: {
      "/api": proxyTarget,
      "/proxy": proxyTarget,
      "/stats": proxyTarget,
      "/sync": proxyTarget,
      "/auth": proxyTarget,
      "/backup": proxyTarget,
      "/logs": proxyTarget,
      "/socket.io": proxyTarget,
      "/swagger": proxyTarget,
      "/utils": proxyTarget,
    },
  },
  target: ["es2015"],
  rollupOptions: {
    output: {
      manualChunks: {
        react: ["react"],
        "react-dom": ["react-dom"],
        "react-router-dom": ["react-router-dom"],
        axios: ["axios"],
        "react-toastify": ["react-toastify"],
      },
    },
  },
  plugins: [react(), splitVendorChunkPlugin()],
  envDir: "backend",
});
