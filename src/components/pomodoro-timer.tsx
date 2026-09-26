import { useEffect, useState } from 'react'
import { useInterval } from '../hooks/use-interval'
import { chime } from '../utils/chime'
import { secondsToMinutes } from '../utils/seconds-to-minutes'
import {
  MutedIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  VolumeIcon,
} from './icons'

const PHASES = {
  work: { label: 'Focus', seconds: 1500 },
  shortBreak: { label: 'Short break', seconds: 300 },
  longBreak: { label: 'Long break', seconds: 900 },
}
const CYCLES = 4

type TimerPhase = keyof typeof PHASES

export function PomodoroTimer() {
  const [seconds, setSeconds] = useState(PHASES.work.seconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>('work')

  const progress = 1 - seconds / PHASES[phase].seconds

  // The long break shows all dots filled; the next focus round starts over.
  const filledDots = phase === 'longBreak' ? CYCLES : completedCycles % CYCLES

  const startLabel =
    seconds < PHASES[phase].seconds
      ? 'Resume'
      : phase === 'work'
        ? 'Start Focus'
        : 'Start Break'

  useEffect(() => {
    document.title = `${secondsToMinutes(seconds)} · ${PHASES[phase].label}`
  }, [seconds, phase])

  useInterval(() => {
    if (seconds > 1) {
      setSeconds((currentSeconds) => currentSeconds - 1)
      return
    }

    setIsRunning(false)
    if (!isMuted) chime()

    let next: TimerPhase = 'work'
    if (phase === 'work') {
      const nextCycle = completedCycles + 1
      setCompletedCycles(nextCycle)
      next = nextCycle % CYCLES === 0 ? 'longBreak' : 'shortBreak'
    }
    setPhase(next)
    setSeconds(PHASES[next].seconds)
  }, isRunning ? 1000 : null)

  function resetTimer() {
    setIsRunning(false)
    setCompletedCycles(0)
    setPhase('work')
    setSeconds(PHASES.work.seconds)
  }

  return (
    <section className="pomodoro" data-phase={phase} data-running={isRunning}>
      <h1 className="sr-only">Pomodoro Timer</h1>

      <div className="dial">
        <svg className="ring" viewBox="0 0 240 240" aria-hidden="true">
          <circle className="ring-track" cx="120" cy="120" r="112" />
          <circle
            className="ring-ticks"
            cx="120"
            cy="120"
            r="100"
            pathLength={60}
          />
          <circle
            className="ring-progress"
            cx="120"
            cy="120"
            r="112"
            pathLength={1}
            strokeDashoffset={1 - progress}
          />
        </svg>
        <div className="readout">
          <output className="timer">{secondsToMinutes(seconds)}</output>
          <p className="phase" aria-live="polite">
            <span key={phase}>{PHASES[phase].label}</span>
          </p>
        </div>
      </div>

      <div className="cycles">
        <div className="dots" aria-hidden="true">
          {Array.from({ length: CYCLES }, (_, i) => (
            <span key={i} className="dot" data-filled={i < filledDots} />
          ))}
        </div>
        <p className="session">
          {filledDots} of {CYCLES} sessions done
        </p>
      </div>

      <div className="controls">
        <button
          type="button"
          className="icon-button"
          onClick={resetTimer}
          aria-label="Reset timer"
          title="Reset"
        >
          <ResetIcon />
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsRunning((running) => !running)}
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
          {isRunning ? 'Pause' : startLabel}
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={() => setIsMuted((muted) => !muted)}
          aria-label="Mute chime"
          aria-pressed={isMuted}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MutedIcon /> : <VolumeIcon />}
        </button>
      </div>
    </section>
  )
}
