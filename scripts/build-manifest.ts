import { writeFile } from 'node:fs/promises'
import { manifest } from './manifest'

writeFile('./manifest.json', JSON.stringify(manifest, null, 2))
