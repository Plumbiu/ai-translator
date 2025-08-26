import fs from 'node:fs'
import zlib from 'node:zlib'
import Zip from 'adm-zip'
import manifest from '../manifest.json'

function zipSync() {
  if (fs.existsSync('./build')) {
    fs.rmSync('./build', { recursive: true })
  }
  fs.mkdirSync('./build')
  const zip = new Zip()
  zip.addLocalFile('./manifest.json')
  zip.addLocalFolder('./dist', 'dist')
  zip.addLocalFolder('./icons', 'icons')
  zip.addLocalFolder('./style', 'style')
  zip.writeZip(`./build/zh-translator-v${manifest.version}.zip`)
}

zipSync()


if (process.env.NODE_ENV === 'development') {
  zlib.unzip('./build/zh-translator-v0.0.1.zip', (err) => {
    if (err) {
      console.error(err)
    }
  })
}