import { watch } from 'node:fs'
import path from 'node:path'
import Bun from 'bun'
import dtsPlugin from 'bun-plugin-dts'

function getEnv(key: string) {
  return process.env[key] || Bun.env[key]
}

interface CustomBuildConfig {
  packageName: string
  watchDir: string
  enforeNotWatch?: boolean
}

export function build(options: Bun.BuildConfig & CustomBuildConfig) {
  const IS_DEV = getEnv('NODE_ENV') === 'development'
  const WORKSPACE_ROOT = getEnv('WORKSPACE_ROOT') || process.cwd()

  const isLibs = options.packageName.startsWith('@libs/')
  const outdir = isLibs ? './dist' : path.resolve(WORKSPACE_ROOT, './dist')

  function _build() {
    const plugins = options.plugins || []

    if (isLibs) {
      plugins.push(dtsPlugin())
    }
    Bun.build({
      ...options,
      outdir,
      minify: !IS_DEV,
      plugins,
      throw: false,
    }).then(() => {})
  }

  _build()

  if (IS_DEV && !options.enforeNotWatch) {
    const watcher = watch(
      path.resolve(options.watchDir, './src'),
      { recursive: true },
      _build,
    )

    process.on('SIGINT', () => {
      watcher.close()
      process.exit(0)
    })
  }
}
