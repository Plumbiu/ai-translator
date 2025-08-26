import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./lib/index.ts', './lib/service_worker.ts'],
  format: 'esm',
  clean: true,
  bundle: true,
  minify: false,
  splitting: false,
  noExternal: ['types'],
})
