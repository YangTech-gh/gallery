import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/gallery/oral-harmony/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../oral-harmony-dist",
    emptyOutDir: true,
  },
});
