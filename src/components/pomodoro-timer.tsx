import { useEffect, useState } from 'react'
import { useInterval } from '../hooks/use-interval'
import { chime } from '../utils/chime'
import { secondsToMinutes } from '../utils/seconds-to-minutes'
import { Button } from './button'
import {
  MutedIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  VolumeIcon,
} from './icons'
import { Timer } from './timer'

interface PomodoroTimerProps {
  pomodoroTimer: number
  shortRestTimer: number
  longRestTimer: number
  cycles: number
}

type TimerPhase = 'work' | 'shortBreak' | 'longBreak'

const PHASE_LABEL: Record<TimerPhase, string> = {
  work: 'Focus',
  shortBreak: 'Short break',
  longBreak: 'Long break',
}

export function PomodoroTimer({
  pomodoroTimer,
  shortRestTimer,
  longRestTimer,
  cycles,
}: PomodoroTimerProps) {
  const [seconds, setSeconds] = useState(pomodoroTimer)
  const [isRunning, setIsRunning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>('work')

  const phaseTotal = {
    work: pomodoroTimer,
    shortBreak: shortRestTimer,
    longBreak: longRestTimer,
  }[phase]
  const progress = 1 - seconds / phaseTotal

  // A finished long-break round shows all dots filled until the next focus starts.
  const filledDots =
    completedCycles > 0 && completedCycles % cycles === 0
      ? cycles
      : completedCycles % cycles

  useEffect(() => {
    document.title = `${secondsToMinutes(seconds)} · ${PHASE_LABEL[phase]}`
  }, [seconds, phase])

  useInterval(() => {
    if (seconds > 1) {
      setSeconds((currentSeconds) => currentSeconds - 1)
      return
    }

    setIsRunning(false)
    if (!isMuted) chime()

    if (phase === 'work') {
      const nextCycle = completedCycles + 1
      const isLongBreak = nextCycle % cycles === 0
      setCompletedCycles(nextCycle)
      setPhase(isLongBreak ? 'longBreak' : 'shortBreak')
      setSeconds(isLongBreak ? longRestTimer : shortRestTimer)
      return
    }

    setPhase('work')
    setSeconds(pomodoroTimer)
  }, isRunning ? 1000 : null)

  function resetTimer() {
    setIsRunning(false)
    setCompletedCycles(0)
    setPhase('work')
    setSeconds(pomodoroTimer)
  }

  return (
    <section className="pomodoro" data-phase={phase} data-running={isRunning}>
      <h1 className="sr-only">Pomodoro Timer</h1>

      <div className="dial">
        <svg className="ring" viewBox="0 0 240 240" aria-hidden="true">
          <circle className="ring-track" cx="120" cy="120" r="112" />
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
          <Timer seconds={seconds} />
          <p className="phase" aria-live="polite">
            {PHASE_LABEL[phase]}
          </p>
        </div>
      </div>

      <div
        className="cycles"
        role="img"
        aria-label={`${filledDots} of ${cycles} focus sessions completed`}
      >
        {Array.from({ length: cycles }, (_, i) => (
          <span key={i} className="dot" data-filled={i < filledDots} />
        ))}
      </div>

      <div className="controls">
        <Button
          className="icon-button"
          onClick={resetTimer}
          aria-label="Reset timer"
          title="Reset"
        >
          <ResetIcon />
        </Button>
        <Button
          className="primary-button"
          onClick={() => setIsRunning((running) => !running)}
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          className="icon-button"
          onClick={() => setIsMuted((muted) => !muted)}
          aria-label="Mute chime"
          aria-pressed={isMuted}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MutedIcon /> : <VolumeIcon />}
        </Button>
      </div>
    </section>
  )
}
