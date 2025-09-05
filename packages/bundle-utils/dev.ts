import { watch } from 'node:fs'
import Bun from 'bun'
import path from 'node:path'

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || process.cwd()

Bun.serve({
  port: process.env.WS_PORT || 3030,
  websocket: {
    open(ws) {
      const distPath = path.resolve(WORKSPACE_ROOT, 'dist')
      watch(distPath, { recursive: true }, () => {
        ws.send('reload')
      })
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
