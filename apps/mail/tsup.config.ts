import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  splitting: false,
  clean: true,
  noExternal: ['@webshop/ui'],
});
