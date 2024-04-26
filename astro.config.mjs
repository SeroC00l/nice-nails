import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), svelte()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  })
});