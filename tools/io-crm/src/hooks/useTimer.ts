import { useState, useCallback } from 'react'

interface TimerState {
  seconds: number
  isRunning: boolean
}

export function useTimer() {
  const [timer, setTimer] = useState<TimerState>({
    seconds: 0,
    isRunning: false,
  })

  const start = useCallback(() => {
    setTimer((t) => ({ ...t, isRunning: true }))
  }, [])

  const stop = useCallback(() => {
    setTimer((t) => ({ ...t, isRunning: false }))
  }, [])

  const reset = useCallback(() => {
    setTimer({ seconds: 0, isRunning: false })
  }, [])

  const addSecond = useCallback(() => {
    if (timer.isRunning) {
      setTimer((t) => ({ ...t, seconds: t.seconds + 1 }))
    }
  }, [timer.isRunning])

  return {
    seconds: timer.seconds,
    isRunning: timer.isRunning,
    start,
    stop,
    reset,
    addSecond,
  }
}
