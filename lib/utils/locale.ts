// copy from https://github.com/daidr/fancy-translator/blob/main/src/constants/lang.ts
// LICENSE file: https://github.com/daidr/fancy-translator/blob/main/LICENSE
export const supportsLanguages = [
  'zh-Hans', // 简体中文
  'zh-Hant', // 繁体中文
  'en', // 英语
  'ja', // 日语
  // 'ja-Latn', // 日语（拉丁字母）
  'ru', // 俄语
  // 'ru-Latn', // 俄语（拉丁字母）
  'ko', // 韩语
  'es', // 西班牙语
  'fr', // 法语
  'de', // 德语
  'pt', // 葡萄牙语
  'it', // 意大利语
  'nl', // 荷兰语
  'sv', // 瑞典语
  'da', // 丹麦语
  'fi', // 芬兰语
  'no', // 挪威语
  'id', // 印尼语
  'th', // 泰语
  'pl', // 波兰语
  'tr', // 土耳其语
  'vi', // 越南语
  'ar', // 阿拉伯语
  // 'ar-Latn', // 阿拉伯语（拉丁字母）
  'hi', // 印地语
  // 'hi-Latn', // 印地语（拉丁字母）
  'bn', // 孟加拉语
  'kn', // 卡纳达语
  'mr', // 马拉地语
  'hr', // 克罗地亚语
  'cs', // 捷克语
  'hu', // 匈牙利语
  'uk', // 乌克兰语
  'he', // 希伯来语
  'bg', // 保加利亚语
  // 'bg-Latn', // 保加利亚语（拉丁字母）
  'ro', // 罗马尼亚语
  'te', // 泰卢固语
  'lt', // 立陶宛语
  'sl', // 斯洛文尼亚语
  'el', // 希腊语
  // 'el-Latn', // 希腊语（拉丁字母）
  'ta', // 泰米尔语
]

export const intlDisplayNames = new Intl.DisplayNames(supportsLanguages, {
  type: 'language',
})
export const localeDisplayName = new Intl.DisplayNames([navigator.language], {
  type: 'language',
}).of(navigator.language)

export const getLocalName = (locale: string) => {
  return intlDisplayNames.of(locale) || locale
}
