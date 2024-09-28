import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true, // Use polling, required in some Docker environments
    },
    host: true, // Expose to external (required for Docker)
    port: 5173, // The port that the dev server will run on
    strictPort: true, // Fails if port is already in use
  },
});
