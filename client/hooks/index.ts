/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
const useCarousel = ({
  speed,
  slideCount = 0,
  spaceBetween = 10,
  slidesPerView = 100,
  initialSlide = 1,
  slideWidth = 500,
  autoplay,
}: {
  slideWidth?: number
  spaceBetween?: number
  initialSlide?: number
  slideCount?: number
  speed?: number
  slidesPerView?: number
  autoplay?: number
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionValue, setTransitionValue] = useState('')
  const [moveSlideValue, setdotMoveSlideValue] = useState<number>(slidesPerView)
  const [animated, setAnimated] = useState('')
  const updateWidth = (): number => {
    return (slideWidth + spaceBetween) * slideCount - spaceBetween
  }

  useEffect(() => {
    setTimeout(() => setAnimated(`animated`), 1000)
  }, [])

  useEffect(() => {
    setdotMoveSlideValue(processMoveSlide())
  }, [currentIndex])



  const initialTranslateValue = (): number =>
    -(slideWidth + spaceBetween) * slideCount

  const viewInitialSlideValue = (): number =>
    slideWidth * (initialSlide ?? 1) + (slidesPerView ?? 0) * 2

  const processMoveSlide = () => {
    if (Math.abs(currentIndex) === slideCount) {
      setTimeout(() => {
        setCurrentIndex(0)
        setTransitionValue(`none`)
        return 60 ?? slidesPerView
      }, speed ?? 0.5 * 1000)
      setTimeout(() => {
        setTransitionValue(`0.5s ease-in-out`)
      }, (speed ?? 0.5 + 0.1) * 1000)
    }
    return -currentIndex * (slideWidth + spaceBetween) + slidesPerView
  }

  if (autoplay) {
    useEffect(() => {
      const intarbval = setInterval(() => {
        setCurrentIndex((c) => c + 1)
      }, autoplay)
      return () => clearInterval(intarbval)
    }, [])
  }
  const pageNation = (num: number) =>
    setCurrentIndex(currentIndex + num <= 0 ? -1 : num)

  const next = () => setCurrentIndex(currentIndex + 1)

  const prev = () => setCurrentIndex(currentIndex - 1)

  return {
    currentIndex,
    initialTranslateValue,
    updateWidth,
    next,
    prev,
    moveSlideValue: currentIndex ? moveSlideValue : slidesPerView,
    transitionValue,
    viewInitialSlideValue,
    animated,
    slideCount,
    pageNation,
  }
}

export default useCarousel
