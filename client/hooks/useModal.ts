import { useState } from 'react'

export const useModal = () => {
  const [isToggle, setIsToggle] = useState(false)
  const [isDisplay, setIsDisplay] = useState(false)

  const toggle = () => setIsToggle(!isToggle)
  const open = () => setIsDisplay(true)
  const close = () => setIsDisplay(false)
  return {
    isToggle,
    isDisplay,
    controller: {
      toggle,
      open,
      close
    }
  }
}
