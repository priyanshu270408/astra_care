import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["sb-7gm3n2tu6f51.vercel.run"],
    proxy: { "/api": { target: "http://localhost:5000", changeOrigin: true } }
  }
});
