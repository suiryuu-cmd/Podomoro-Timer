// Two soft sine notes (E5 → B5), synthesized so no audio file has to ship.
export function chime(): void {
  const ctx = new AudioContext()

  ;[659.25, 987.77].forEach((frequency, i) => {
    const start = ctx.currentTime + i * 0.18
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.1)

    osc.connect(gain).connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 1.2)
  })

  window.setTimeout(() => void ctx.close(), 1800)
}
