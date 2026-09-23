import { PodomoroTimer } from './components/podomoro-timer'

function App() {
  return (
    <main className="container">
      <PodomoroTimer
        podomoroTimer={1500}
        shortRestTimer={300}
        longRestTimer={900}
        cycles={4}
      />
    </main>
  )
}

export default App
