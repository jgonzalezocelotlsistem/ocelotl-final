import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind"; // <-- Esta línea define 'tailwind'
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://ocelotlsistem.com',
  output: 'static',
  integrations: [
    react(), 
    tailwind(), // <-- Y aquí se usa la variable 'tailwind'
    sitemap()
  ],
  vite: {
    ssr: {
      noExternal: ['styled-components']
    }
  }
});