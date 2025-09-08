import { watch } from 'node:fs'
import Bun from 'bun'
import path from 'node:path'

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || process.cwd()

Bun.serve({
  port: process.env.WS_PORT || 3030,
  websocket: {
    open(ws) {
      const distPath = path.resolve(WORKSPACE_ROOT, 'dist')
      const stylesPath = path.resolve(WORKSPACE_ROOT, 'styles')
      const manifestPath = path.resolve(WORKSPACE_ROOT, 'manifest.json')
      const reloadPlugin = () => ws.send('reload')

      watch(distPath, { recursive: true }, reloadPlugin)
      watch(stylesPath, { recursive: true }, reloadPlugin)
      watch(manifestPath, { recursive: true }, reloadPlugin)
    },
    message() {},
    close() {},
  },
  fetch(req, server) {
    if (server.upgrade(req)) {
      return
    }
    return new Response('WebSocket server', { status: 200 })
  },
})
