import { name } from './package.json' with { type: 'json' }
import { build } from './src'

build({
  enforeNotWatch: true,
  entrypoints: ['./src/index.ts'],
  packageName: name,
  target: 'bun',
  watchDir: import.meta.dirname,
  minify: false,
})
