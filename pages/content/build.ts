import fs from 'node:fs/promises'
import { build } from '@libs/bundle-utils'
import postcssTailwindcssPlugin from '@tailwindcss/postcss'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { name } from './package.json' with { type: 'json' }

const IS_PRO = process.env.NODE_ENV === 'production'

function escapeSpecialChars(str: string) {
  return str.replace(/[/[\]%:#!]/g, (char: string) => '\\' + char)
}

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
          const fileContent = await fs.readFile(path, 'utf-8')
          if (path.includes('node_modules')) {
            return {
              contents: `export default \`${escapeSpecialChars(fileContent)}\``,
              loader: 'js',
            }
          }
          if (path.endsWith('tailwind.css')) {
            const plugins: postcss.AcceptedPlugin[] = [
              postcssTailwindcssPlugin({}),
              {
                postcssPlugin: 'postcss:transfrom-root',
                Rule(rule) {
                  const selectors = rule.selectors
                  const finalSelectors = new Set<string>()
                  for (const selector of selectors) {
                    if (selector === ':root' || selector === 'html') {
                      finalSelectors.add(':host')
                    } else {
                      finalSelectors.add(selector)
                    }
                  }
                  rule.selectors = [...finalSelectors]
                },
              },
            ]
            if (IS_PRO) {
              plugins.push(cssnano())
            }
            const content = (await postcss(plugins).process(fileContent))
              .content
            return {
              contents: `export default \`${escapeSpecialChars(content)}\``,
              loader: 'js',
            }
          }
          return {
            contents: fileContent,
            loader: 'css',
          }
        })
      },
    },
  ],
  throw: true,
})
