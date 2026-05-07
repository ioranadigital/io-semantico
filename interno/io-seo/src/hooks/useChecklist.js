import { useState, useCallback, useMemo } from 'react'
import { MANUAL_CHECKLIST } from '../utils/constants.js'

function buildInitialState() {
  const state = {}
  MANUAL_CHECKLIST.forEach(cat => {
    cat.items.forEach((item, i) => {
      const id = `${cat.cat}__${i}`
      state[id] = { id, cat: cat.cat, name: item, status: null, value: '' }
    })
  })
  return state
}

export function useChecklist() {
  const [items, setItems] = useState(buildInitialState)

  const setStatus = useCallback((id, status) => {
    setItems(prev => ({
      ...prev,
      [id]: { ...prev[id], status: prev[id].status === status ? null : status }
    }))
  }, [])

  const setValue = useCallback((id, value) => {
    setItems(prev => ({ ...prev, [id]: { ...prev[id], value } }))
  }, [])

  const reset = useCallback(() => setItems(buildInitialState()), [])

  const summary = useMemo(() => {
    const vals = Object.values(items)
    const filled = vals.filter(v => v.status)
    return {
      total: vals.length,
      filled: filled.length,
      ok: filled.filter(v => v.status === 'ok').length,
      warn: filled.filter(v => v.status === 'warn').length,
      crit: filled.filter(v => v.status === 'crit').length,
    }
  }, [items])

  const criticalItems = useMemo(() =>
    Object.values(items).filter(v => v.status === 'crit').map(v => v.name),
    [items]
  )

  const warnItems = useMemo(() =>
    Object.values(items).filter(v => v.status === 'warn').map(v => v.name),
    [items]
  )

  return { items, setStatus, setValue, reset, summary, criticalItems, warnItems }
}
