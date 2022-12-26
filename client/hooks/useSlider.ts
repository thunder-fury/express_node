import { RefObject, useCallback, useEffect, useState } from "react"
import useElementProperty from "./useElementProperty"
import { useWindowSize } from "./useWindowSize"

export const useSlide = ({
  spaceBetween = 0,
  slidesPerView,
  viewSlideWidth,
}: {
  spaceBetween?: number,
  slidesPerView?: number,
  viewSlideWidth?: number,
}) => {
  const [parent, setParent] = useState({
    currentIndex: 0,
    slideCount: 0,
    clientWidth: 0,
    clientHeight: 0,
  })
  // const { firstElementChild } = useElementProperty()
  console.log(parent)
  const { currentIndex, slideCount, clientWidth, clientHeight } = parent
  const [moveSlideValue, setdotMoveSlideValue] = useState<number>(1)
  const [transition, setTransition] = useState('')
  const [animated, setAnimated] = useState('')
  const arr: Element[] = []
  const [slideBody, setSlideBody] = useState<Element[]>([])
  const isCloneElement = (e: Element) => e.classList.contains('clone')
  const initialClonChildren = useCallback((parent: HTMLDivElement) => {
    Array.prototype.slice.call(parent?.children).forEach((e: Element) => {
      if (!isCloneElement(e)) {
        const cloneSlide = e.cloneNode(true) as Element
        cloneSlide.classList.add(`clone`)
        parent?.appendChild(cloneSlide)
      }
    })
    parent && Object.entries(parent.children)
      .reverse()
      .forEach(([key, e]: [key: string, e: Element]) => {
        if (!isCloneElement(e)) {
          const cloneSlide: Node = e?.cloneNode(true)
          ;(cloneSlide as Element).classList.add(`clone`)
          parent?.prepend(cloneSlide)
        }
      })
    Array.prototype.slice.call(parent?.children).forEach((e: Element, i) => {
      !isCloneElement(e) && arr.push(e)
      setSlideBody(arr)
    })
    setParent((conf) => ({ ...conf, slideCount: arr.length }))
    setParent((conf) => ({ ...conf, clientWidth: parent?.firstElementChild?.clientWidth as number }))
    setParent((conf) => ({ ...conf, clientHeight: parent?.firstElementChild?.clientHeight as number }))
  }, [])
  // const updateWidth: number = (clientWidth + spaceBetween ?? 0) * slideCount - spaceBetween ?? 0
  const initialTranslateValue: number = -(clientWidth + spaceBetween ?? 0) * slideCount
  const viewInitialSlideValue: number = clientWidth * (slidesPerView ?? 1) + (viewSlideWidth ?? 0) * 2
  const pageNation = (num: number) => setParent((conf) => ({ ...conf, currentIndex: currentIndex  + num <= 0 ? -1 : num }))
  const next = () => setParent((conf) => ({ ...conf, currentIndex: currentIndex + 1 }))
  const prev = () => setParent((conf) => ({ ...conf, currentIndex: currentIndex - 1 }))

  const setSlide = (parent: HTMLDivElement) => initialClonChildren(parent)

  const processMoveSlide = () => {
    if (Math.abs(currentIndex) === slideCount) {
      setTimeout(() => {
        setParent((conf) => ({...conf, currentIndex: 0}))
        setTransition(`none`)
        return 60 ?? viewSlideWidth
      }, 0.5 * 1000)
      setTimeout(() => {
        setTransition(`0.5s ease-in-out`)
      }, (0.5 + 0.1) * 1000)
    }
    return -currentIndex * (clientWidth + spaceBetween ?? 0) + (viewSlideWidth ?? 0)
  }


  useEffect(() => {
    setTimeout(() => setAnimated(`animated`), 1000)
  }, [])

  useEffect(() => {
    setdotMoveSlideValue(processMoveSlide())
  }, [currentIndex])

  return {
    currentIndex,
    transition,
    slideCount,
    moveSlideValue,
    processMoveSlide,
    slideBody,
    value: {
      initialTranslateValue,
      viewInitialSlideValue,
      pageNation
    },
    slideControl: {
      animated,
      setSlide,
      next,
      prev
    }
  }
}
