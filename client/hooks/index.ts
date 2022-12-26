/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
const useCarousel = ({
  speed,
  slideCount = 0,
  spaceBetween = 0,
  slidesPerView = 1,
  initialSlide = 100,
  slideWidth = 500,
  autoplay,
}: {
  speed?: number
  spaceBetween?: number
  slideCount?: number
  slidesPerView?: number
  initialSlide?: number
  slideWidth?: number
  autoplay?: number
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionValue, setTransitionValue] = useState('')
  const [moveSlideValue, setdotMoveSlideValue] = useState<number>(initialSlide)
  const [animated, setAnimated] = useState('')
  // const [slideWidth, setSlideWidth] = useState()
  const [parentElement, setParentElement] = useState<HTMLDivElement>()
  const isCloneElement = (e: Element) => e.classList.contains('clone')
  const settingCarousel = (parent: HTMLDivElement) => {
    setParentElement(parent)
    clonChildren(parent)
  }

  const updateWidth = (): number => (slideWidth + spaceBetween ?? 0) * slideCount - spaceBetween ??0
  const initialTranslateValue = (): number => -(slideWidth + spaceBetween ?? 0) * slideCount
  const viewInitialSlideValue = (): number => slideWidth * (slidesPerView ?? 1) + (initialSlide ?? 0) * 2
  console.log(`updateWidth:`, updateWidth())
  console.log(`clientWidth:`, slideWidth)
  console.log(`slideCount:`, slideCount)
  console.log(`initialTranslateValue:`, initialTranslateValue())
  console.log(`viewInitialSlideValue:`, viewInitialSlideValue())
  useEffect(() => {
    setTimeout(() => setAnimated(`animated`), 1000)
  }, [])

  useEffect(() => {
    setdotMoveSlideValue(processMoveSlide())
  }, [currentIndex])

  const clonChildren = (parent: HTMLDivElement) => {
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
    // useEffect(() => {
    //   // const arr: Element[] = []
    //   // Array.prototype.slice.call(parent?.children).forEach((e: Element) => {
    //   //   !isCloneElement(e) && arr.push(e)
    //   // })
    // },[])
  }

  const processMoveSlide = () => {
    if (Math.abs(currentIndex) === slideCount) {
      setTimeout(() => {
        setCurrentIndex(0)
        setTransitionValue(`none`)
        return 60 ?? initialSlide
      }, speed ?? 0.5 * 1000)
      setTimeout(() => {
        setTransitionValue(`0.5s ease-in-out`)
      }, (speed ?? 0.5 + 0.1) * 1000)
    }
    return -currentIndex * (slideWidth + spaceBetween ?? 0) + initialSlide
  }

  if (autoplay) {
    useEffect(() => {
      const intarbval = setInterval(() => {
        setCurrentIndex((c) => c + 1)
      }, autoplay)
      return () => clearInterval(intarbval)
    }, [])
  }

  const pageNation = (num: number) => setCurrentIndex(currentIndex + num <= 0 ? -1 : num)

  const next = () => setCurrentIndex(currentIndex + 1)

  const prev = () => setCurrentIndex(currentIndex - 1)

  const value = {

  }
  return {
    currentIndex,
    initialTranslateValue,
    viewInitialSlideValue,
    updateWidth,
    moveSlideValue: currentIndex ? moveSlideValue : initialSlide,
    next,
    prev,
    transitionValue,
    animated,
    slideCount,
    pageNation,
    settingCarousel,
    slideLength: parentElement?.children.length
  }
}

export default useCarousel
