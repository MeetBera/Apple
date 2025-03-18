import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "jsm-dd",
    project: "javascript-react"
  })],

  // 👈 Change this to match your repository name
  base: "/Apple/",

  build: {
    sourcemap: true
  }
});