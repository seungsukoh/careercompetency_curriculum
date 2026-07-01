import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("data/baseData.js")) {
            return "base-data";
          }
          if (id.includes("data/roleExpansions.js")) {
            return "role-expansions";
          }
        }
      }
    }
  }
});
