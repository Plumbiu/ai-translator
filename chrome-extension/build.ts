import { build } from '@libs/bundle-utils'
import { name } from './package.json' with { type: 'json' }

build({
  entrypoints: ['./src/background/index.ts'],
  packageName: name,
  naming: 'background.[ext]',
  watchDir: import.meta.dirname,
  define: {
    'process.env.WS_PORT': process.env.WS_PORT || '3030',
  },
})
