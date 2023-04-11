import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/api/main.ts'],
  splitting: false,
  clean: true,
  noExternal: ['@webshop/ui'],
});
