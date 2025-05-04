// vite.config.js
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    reactRouter(),  // reads react-router.config.js automatically
    tailwindcss(),
  ],
});
