import Bun from 'bun'
import { watch } from 'node:fs'
import path from 'node:path'
import dts from 'bun-plugin-dts'

const IS_DEV = process.env.NODE_ENV === 'development'

async function run() {
  Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    naming: 'index.[ext]',
    plugins: [dts()],
    minify: !IS_DEV,
  })
}

run()

if (IS_DEV) {
  const watcher = watch(
    path.resolve(import.meta.dirname, './src'),
    { recursive: true },
    run,
  )

  process.on('SIGINT', () => {
    watcher.close()
    process.exit(0)
  })
}
