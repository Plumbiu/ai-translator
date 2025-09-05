import { build } from './src'
import { name } from './package.json' with { type: 'json' }

build({
  entrypoints: ['./src/index.ts'],
  target: 'bun',
  packageName: name,
  watchDir: import.meta.dirname,
  enforeNotWatch: true,
})
