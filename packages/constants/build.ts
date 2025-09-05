import build from '@libs/bundle-utils'
import { name } from '@libs/constants/package.json' with { type: 'json' }

build({
  entrypoints: ['./src/index.ts'],
  packageName: name,
  watchDir: import.meta.dirname,
})
