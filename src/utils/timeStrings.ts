const timeStringRegExp = /(\d+[hms])+/gi

const factorMap = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
} as const

type FactorString = keyof typeof factorMap

function parseTimeFragment(str: string) {
  const factorStr = str[str.length - 1] as FactorString
  const digits = parseInt(str.substring(0, str.length - 1), 10)
  const factor = factorMap[factorStr]

  // Return TimeFragment in ms
  return digits * factor
}

export function durationStr2Ms(str: string) {
  const m = str.match(timeStringRegExp)
  if (!m) return 0

  return m.reduce((sum, timeFragment) => sum + parseTimeFragment(timeFragment), 0)
}

export function ms2DurationStr(ms: number) {
  let timeFragments = []
  let rest = ms

  let hours = Math.floor(rest / factorMap['h'])
  if (hours > 0) {
    rest = rest % factorMap['h']
    timeFragments.push(`${hours}h`)
  }

  let minutes = Math.floor(rest / factorMap['m'])
  if (minutes > 0 && rest > 0) {
    rest = rest % factorMap['m']
    timeFragments.push(`${minutes}m`)
  }

  let seconds = Math.floor(rest / factorMap['s'])
  if (seconds > 0 && rest > 0) {
    rest = rest % factorMap['s']
    timeFragments.push(`${seconds}s`)
  }

  if (timeFragments.length === 0) return '0s'

  return timeFragments.join(' ')
}
