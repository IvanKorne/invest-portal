import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    outDir: "dist", // Ensures build output goes to dist directory
    rollupOptions: {
      input: "index.html", // Ensure Vite knows the entry point
    },
  },
});
