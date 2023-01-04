import { RefObject, useCallback, useEffect, useState } from "react"
import useElementProperty from "./useElementProperty"


const useCarouselSample = <T extends HTMLElement>(
  ref: RefObject<T>,
  { spaceBetween = 0,
    slidesPerView,
    viewSlideWidth
  }: {
    spaceBetween?: number,
    slidesPerView?: number,
    viewSlideWidth?: number,}) => {
  const { targetElementProperty } = useElementProperty(ref)
  const [values, setValues] = useState({
    currentIndex: 0,
    slideCount: 0,
    clientWidth: 0,
    clientHeight: 0,
  })
  // set values
  const { currentIndex, clientWidth, slideCount } = values
  const [moveSlideValue, setdotMoveSlideValue] = useState<number>(1)
  const [transition, setTransition] = useState('')
  const [animated, setAnimated] = useState('')
  useEffect(() => {
  const isCloneElement = (e: Element) => e.classList.contains('clone')
    // Array.prototype.slice.call(ref.current?.children).forEach((e: Element) => {
    //   if (!isCloneElement(e)) {
    //     const cloneSlide = e.cloneNode(true) as Element
    //     cloneSlide.classList.add(`clone`)
    //     ref.current?.appendChild(cloneSlide)
    //   }
    // })
    // ref.current && Object.entries(ref.current.children)
    //   .reverse()
    //   .forEach(([key, e]: [key: string, e: Element]) => {
    //     if (!isCloneElement(e)) {
    //       const cloneSlide: Node = e?.cloneNode(true)
    //       ;(cloneSlide as Element).classList.add(`clone`)
    //       ref.current?.prepend(cloneSlide)
    //     }
    //   })
    setValues((values) => ({ ...values, slideCount: ref.current?.childElementCount as number }))
    setValues((values) => ({ ...values, clientWidth: targetElementProperty(`width`) }))
    setValues((values) => ({ ...values, clientHeight: targetElementProperty(`height`) }))
  }, [])

  const pageNation = (num: number) => setValues((values) => ({ ...values, currentIndex: currentIndex  + num <= 0 ? -1 : num }))
  const next = () => setValues((values) => ({ ...values, currentIndex: currentIndex + 1 }))
  const prev = () => setValues((values) => ({ ...values, currentIndex: currentIndex - 1 }))
  const initialTranslateValue: number = -(clientWidth + spaceBetween ?? 0) * slideCount
  const viewInitialSlideValue: number = clientWidth * (slidesPerView ?? 1) + (viewSlideWidth ?? 0) * 2
  const processMoveSlide = () => {
    if (Math.abs(currentIndex) === slideCount) {
      setTimeout(() => {
        setValues((conf) => ({...conf, currentIndex: 0}))
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
    value: {
      initialTranslateValue,
      viewInitialSlideValue,
      pageNation
    },
    slideControl: {
      animated,
      next,
      prev
    }
  }
}

export default useCarouselSample
