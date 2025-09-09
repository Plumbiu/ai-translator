import minimist from 'minimist'

const cliParams = process.argv.slice(2)
const args = minimist(cliParams)
const version = args.tag || 'v2.0.0'

export const manifest: chrome.runtime.ManifestV3 = {
  action: {
    default_icon: 'assets/icons/icon.png',
    default_title: 'AI Translator',
  },
  background: {
    service_worker: './dist/background.js',
  },
  content_scripts: [
    {
      css: ['./dist/content.css'],
      js: ['./dist/content.js'],
      matches: ['<all_urls>'],
    },
  ],
  description: 'AI Translator',
  icons: {
    '16': 'assets/icons/icon_16.png',
    '32': 'assets/icons/icon_32.png',
    '48': 'assets/icons/icon_48.png',
    '128': 'assets/icons/icon_128.png',
  },
  manifest_version: 3,
  name: 'AI Translator',
  permissions: ['tabs'],
  version: version.slice(1),
}
