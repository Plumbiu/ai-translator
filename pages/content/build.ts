import fs from 'node:fs/promises'
import { build } from '@libs/bundle-utils'
import postcss from 'postcss'
import prefixWrap from 'postcss-prefixwrap'
import { name } from './package.json' with { type: 'json' }
import { QueryRootClassName } from './src/constants'
import cssnano from 'cssnano'

const IS_PRO = process.env.NODE_ENV === 'production'


build({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  entrypoints: ['./src/main.tsx'],
  naming: 'content.[ext]',
  packageName: name,
  watchDir: import.meta.dirname,
  plugins: [
    {
      name: 'css:loader',
      setup(build) {
        build.onLoad({ filter: /.css$/ }, async ({ path }) => {
          let content = await fs.readFile(path, 'utf-8')
          if (path.includes('node_modules')) {
            content = (
              await postcss([prefixWrap(QueryRootClassName), ...(IS_PRO ? [cssnano()] : [])]).process(content)
            ).content
          }

          return {
            contents: content,
            loader: 'css'
          }
        })
      },
    },
  ],
})
