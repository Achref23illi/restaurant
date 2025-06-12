import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Ignore TypeScript errors during build
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore TypeScript errors
        if (warning.code === 'PLUGIN_WARNING') return;
        warn(warning);
      }
    }
  },
  esbuild: {
    // Ignore TypeScript errors in development
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});