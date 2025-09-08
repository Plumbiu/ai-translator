import minimist from 'minimist'

const cliParams = process.argv.slice(2)
const args = minimist(cliParams)
const version = args.tag || 'v2.0.0'

export const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'AI Translator',
  version: version.slice(1),
  description: 'AI Translator',
  icons: {
    '16': 'assets/icons/icon_16.png',
    '32': 'assets/icons/icon_32.png',
    '48': 'assets/icons/icon_48.png',
    '128': 'assets/icons/icon_128.png',
  },
  action: {
    default_icon: 'assets/icons/icon.png',
    default_title: 'AI Translator',
  },
  permissions: ['tabs'],
  background: {
    service_worker: './dist/background.js',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      css: ['./styles/content.css'],
      js: ['./dist/content.js'],
    },
  ],
}
