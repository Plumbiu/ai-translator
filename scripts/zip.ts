import fs from 'node:fs'
import Zip from 'adm-zip'

function zipSync() {
  if (fs.existsSync('./build')) {
    fs.rmSync('./build', { recursive: true })
  }
  fs.mkdirSync('./build')
  const zip = new Zip()
  zip.addLocalFile('./manifest.json')
  zip.addLocalFolder('./dist', 'dist')
  zip.addLocalFolder('./assets/icons', 'assets/icons')
  zip.writeZip(`./build/ai-translator.zip`)
}

zipSync()
