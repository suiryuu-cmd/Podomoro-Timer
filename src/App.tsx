import { PomodoroTimer } from './components/pomodoro-timer'

function App() {
  return (
    <main className="container">
      <PomodoroTimer
        pomodoroTimer={1500}
        shortRestTimer={300}
        longRestTimer={900}
        cycles={4}
      />
    </main>
  )
}

export default App
