import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";
import million from "million/compiler";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import AutoImport from 'unplugin-auto-import/astro'
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://dp-ltd.org",
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [million.vite({
      mode: "react",
      server: true,
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g]
      }
    }), 
    tailwindcss()],
  },
  integrations: [
    react(), 
    vue({
      jsx: true,
      devtools: true,
      reactivityTransform: true,
  }),
  AutoImport({
    imports: [
      'vue',
      'vue/macros',
      'react',
    ],
    dirs: ['src/utils/*.ts'],
    dts: './src/auto-imports.d.ts',
  }),
  sitemap(), partytown(), mdx()]
});