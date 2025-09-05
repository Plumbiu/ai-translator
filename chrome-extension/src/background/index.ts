const IS_DEV = process.env.NODE_ENV === 'development'
const PORT = process.env.WS_PORT

if (IS_DEV) {
  // No to let extension go to inactive state
  const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3)
  chrome.runtime.onStartup.addListener(keepAlive)
  keepAlive()
  const ws = new WebSocket(`ws://localhost:${PORT}`)
  ws.onmessage = (event) => {
    if (event.data === 'reload') {
      chrome.runtime.reload()
    }
  }

  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      chrome.tabs.reload()
    }
  })
}
