import fs from 'node:fs'
import Zip from 'adm-zip'
import { manifest } from './manifest'

function zipSync() {
  if (fs.existsSync('./build')) {
    fs.rmSync('./build', { recursive: true })
  }
  fs.mkdirSync('./build')
  const zip = new Zip()
  zip.addFile('./mainfest.json', Buffer.from(JSON.stringify(manifest, null, 2)))
  zip.addLocalFolder('./dist', 'dist')
  zip.addLocalFolder('./assets/icons', 'assets/icons')
  zip.writeZip('./build/ai-translator.zip')
}

zipSync()
