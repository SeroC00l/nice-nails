import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";

import cloudflare from "@astrojs/cloudflare";
import cloudflare from "@astrojs/ima";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db()],
  output: "server",
  adapter: cloudflare(),
  vite: {
    ssr: {
      noExternal: ["astro","@astrojs/image"],
    },
  },
});