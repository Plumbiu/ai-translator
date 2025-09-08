export function formatConfidence(confidence: number) {
  return parseFloat((confidence * 100).toPrecision(4)) + '%'
}
