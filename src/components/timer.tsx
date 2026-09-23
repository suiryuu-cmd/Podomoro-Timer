import { secondsToMinutes } from '../utils/seconds-to-minutes'

interface TimerProps {
  seconds: number
}

export function Timer({ seconds }: TimerProps) {
  return <output className="timer">{secondsToMinutes(seconds)}</output>
}
