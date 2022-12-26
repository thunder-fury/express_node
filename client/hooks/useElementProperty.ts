import { RefObject, useCallback } from "react"

type DOMReactProperty = keyof Omit<DOMRect, 'toJSON'>

const useElementProperty = <T extends HTMLElement>(ref: RefObject<T>) => {
  const targetElementProperty = useCallback((targetProerty: DOMReactProperty): number => {
    const clientReact = ref.current?.getBoundingClientRect()
    return clientReact ? clientReact[targetProerty] : 0
  },[ref])
  return {
    targetElementProperty
  }
}

export default useElementProperty
