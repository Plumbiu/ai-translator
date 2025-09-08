import { build } from '@libs/bundle-utils'
import { name } from './package.json' with { type: 'json' }

build({
  define: {
    'process.env.WS_PORT': process.env.WS_PORT || '3030',
  },
  entrypoints: ['./src/background/index.ts'],
  naming: 'background.[ext]',
  packageName: name,
  watchDir: import.meta.dirname,
})
