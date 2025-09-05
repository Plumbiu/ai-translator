import { manifest } from './manifest'
import { writeFile } from 'node:fs/promises'

writeFile('./manifest.json', JSON.stringify(manifest, null, 2))