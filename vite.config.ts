import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/WannaDate/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});