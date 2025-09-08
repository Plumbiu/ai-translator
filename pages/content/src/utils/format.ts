export function formatConfidence(confidence: number) {
  return Number.parseFloat((confidence * 100).toPrecision(4)) + '%'
}
