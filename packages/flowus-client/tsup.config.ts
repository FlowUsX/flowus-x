import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'node14',
  platform: 'node',
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: false,
  clean: true,
  dts: true,
})
