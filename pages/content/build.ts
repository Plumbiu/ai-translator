import Bun from 'bun'
import { watch } from 'node:fs'
import path from 'node:path'

const IS_DEV = process.env.NODE_ENV === 'development'
const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || process.cwd()

async function run() {
  Bun.build({
    entrypoints: ['./src/main.tsx', './src/index.css'],
    outdir: path.resolve(WORKSPACE_ROOT, './dist'),
    naming: 'content.[ext]',
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
