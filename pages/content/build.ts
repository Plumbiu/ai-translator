import { build } from '@libs/bundle-utils'
import { name } from './package.json' with { type: 'json' }

build({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  entrypoints: ['./src/main.tsx'],
  naming: 'content.[ext]',
  packageName: name,
  watchDir: import.meta.dirname,
})
