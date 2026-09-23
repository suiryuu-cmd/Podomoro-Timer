import { useState } from 'react'
import { useInterval } from '../hooks/use-interfal'
import { Button } from './button'
import { Timer } from './timer'

interface PodomoroTimerProps {
  podomoroTimer: number
  shortRestTimer: number
  longRestTimer: number
  cycles: number
}

type TimerPhase = 'work' | 'shortBreak' | 'longBreak'

export function PodomoroTimer({
  podomoroTimer,
  shortRestTimer,
  longRestTimer,
  cycles,
}: PodomoroTimerProps) {
  const [seconds, setSeconds] = useState(podomoroTimer)
  const [isRunning, setIsRunning] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>('work')

  useInterval(() => {
    if (seconds > 1) {
      setSeconds((currentSeconds) => currentSeconds - 1)
      return
    }

    setIsRunning(false)

    if (phase === 'work') {
      const nextCycle = completedCycles + 1
      const isLongBreak = nextCycle % cycles === 0
      setCompletedCycles(nextCycle)
      setPhase(isLongBreak ? 'longBreak' : 'shortBreak')
      setSeconds(isLongBreak ? longRestTimer : shortRestTimer)
      return
    }

    setPhase('work')
    setSeconds(podomoroTimer)
  }, isRunning ? 1000 : null)

  function resetTimer() {
    setIsRunning(false)
    setCompletedCycles(0)
    setPhase('work')
    setSeconds(podomoroTimer)
  }

  return (
    <section className={isRunning ? 'podomoro working' : 'podomoro'}>
      <h1>Pomodoro Timer</h1>
      <Timer seconds={seconds} />
      <p className="details">
        {phase === 'work' ? 'Focus time' : 'Break time'} · Completed cycles: {completedCycles}
      </p>
      <div className="controls">
        <Button onClick={() => setIsRunning((running) => !running)}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
    </section>
  )
}
