import { useState, useEffect } from 'react'

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [inputMinutes, setInputMinutes] = useState('')
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running && totalSeconds > 0 && secondsLeft === 0) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      osc.frequency.value = 880
      osc.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    }
  }, [running, secondsLeft, totalSeconds])

  useEffect(() => {
    if (!running) return
    if (secondsLeft <= 0) {
      setRunning(false)
      return
    }
    const id = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [running, secondsLeft])

  const startTimer = () => {
    const secs = parseInt(inputMinutes, 10) * 60
    if (!isNaN(secs) && secs > 0) {
      setTotalSeconds(secs)
      setSecondsLeft(secs)
      setRunning(true)
    }
  }

  const h = Math.floor(secondsLeft / 3600)
  const m = Math.floor((secondsLeft % 3600) / 60)
  const s = secondsLeft % 60

  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0
  let color = '#00ff00'
  if (progress < 0.3) color = '#ffff00'
  if (progress < 0.1) color = '#ff2a2a'
  const flash = running && secondsLeft <= 10

  return (
    <div className="container">
      <h1 className="title">活動限界まであと</h1>
      <div className={`timer ${flash ? 'flash' : ''}`} style={{ color }}>
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </div>
      <div className="bar-wrapper">
        <div className="bar" style={{ width: `${progress * 100}%`, backgroundColor: color }}></div>
      </div>
      {!running && (
        <div className="controls">
          <input
            type="number"
            value={inputMinutes}
            onChange={e => setInputMinutes(e.target.value)}
            placeholder="分を入力"
          />
          <button onClick={startTimer}>スタート</button>
        </div>
      )}
      {!running && totalSeconds > 0 && secondsLeft === 0 && (
        <div className="finished">
          起床指令
          <div>
            <button onClick={() => setInputMinutes('')}>もう一度</button>
          </div>
        </div>
      )}
    </div>
  )
}
