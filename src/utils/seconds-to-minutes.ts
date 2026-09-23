import { zeroLeft } from './zero-left'

export function secondsToMinutes(seconds: number): string {
  const remainingSeconds = Math.max(0, seconds)
  const min = zeroLeft(remainingSeconds / 60)
  const sec = zeroLeft(remainingSeconds % 60)
  return `${min}:${sec}`
}
