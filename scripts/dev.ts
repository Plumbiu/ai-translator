import { build, Options } from 'tsup'

const IS_DEV = process.env.NODE_ENV === 'development'

const commonConfig = {
  minify: IS_DEV ? false : 'terser',
  format: 'esm',
  splitting: false,
} satisfies Options

async function run() {
  // libs
  await build({
    entry: ['./packages/constants/src/index.ts'],
    outDir: './packages/constants/dist',
    ...commonConfig,
    dts: true,
  })

  // chrome extension
  await build({
    entry: {
      background: './chrome-extension/src/background/index.ts',
      content: './pages/content/src/main.tsx',
      index: './pages/content/src/index.css',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    noExternal: [/(.*)/],
    platform: 'browser',
    esbuildOptions(options) {
      if (!IS_DEV) {
        options.drop = ['console', 'debugger']
      }
      options.jsx = 'automatic'
    },
    ...commonConfig,
  })
}

run()
