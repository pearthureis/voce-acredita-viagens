// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vcacreditaviagens.com.br',
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },
});
