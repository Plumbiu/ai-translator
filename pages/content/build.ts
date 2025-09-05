import build from '@libs/bundle-utils'
import { name } from '@libs/constants/package.json' with { type: 'json' }

build({
  entrypoints: ['./src/main.tsx'],
  naming: 'content.[ext]',
  packageName: name,
  watchDir: import.meta.dirname,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
})
