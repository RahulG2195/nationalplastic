import { useState, useEffect } from 'react'

export function useDelayedRender(delay) {
  const [shouldRender, setShouldRender] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  return shouldRender
}