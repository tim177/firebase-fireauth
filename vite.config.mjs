import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Default port
    open: true, // Opens the browser on startup
  },
});
