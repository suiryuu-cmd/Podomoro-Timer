const pad = (n: number): string => Math.floor(n).toString().padStart(2, '0')

export function secondsToMinutes(seconds: number): string {
  return `${pad(seconds / 60)}:${pad(seconds % 60)}`
}
