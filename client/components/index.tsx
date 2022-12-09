import { Children, cloneElement, useState, ReactNode, useRef, useEffect } from 'react'
import { css } from '@emotion/react'
import useCarousel from '../hooks'

const Carousel = ({
  children,
  spaceBetween,
  slidesPerView,
  initialSlide,
  slideWidth,
  customStyle,
  autoplay,
}: {
  children: ReactNode
  spaceBetween?: number
  slidesPerView?: number
  initialSlide?: number
  slideWidth?: number
  customStyle?: { [key: string]: string }
  autoplay?: number
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [slideItemCount, setSlideItemCount] = useState(0)
  const [autoWidth, setAutoWidth] = useState<number>(0)
  const [autoHight, setAutoHight] = useState<number>(0)
  const [childrenList, setChildrenList] = useState<HTMLCollection>()
  const {
    initialTranslateValue,
    next,
    prev,
    moveSlideValue,
    pageNation,
    transitionValue,
    viewInitialSlideValue,
    animated,
    currentIndex,
    slideCount
  } = useCarousel({
    spaceBetween,
    slidesPerView,
    slideWidth: autoWidth ?? slideWidth,
    initialSlide,
    slideCount: slideItemCount,
    autoplay,
  })
  useEffect(() => {
    setSlideItemCount(Number(ref.current?.children.length))
    setAutoWidth(ref.current?.firstElementChild?.clientWidth as number)
    setAutoHight(ref.current?.firstElementChild?.clientHeight as number)
    setChildrenList(ref.current?.children)
  }, [])

  const isCloneElement = (e: Element) => e.classList.contains('clone')
  const arr: Element[] = []
  useEffect(() => {
    Array.prototype.slice.call(ref.current?.children).forEach((e: Element) => {
      if (!isCloneElement(e as Element)) {
        const cloneSlide = e.cloneNode(true) as Element
        cloneSlide.classList.add(`clone`)
        ref.current?.appendChild(cloneSlide)
      }
    })
    Object.entries((ref.current as HTMLDivElement).children)
      .reverse()
      .forEach(([key, e]: [key: string, element: unknown]) => {
        if (!isCloneElement(e as Element)) {
          const cloneSlide: Node = (e as Element)?.cloneNode(true)
          ;(cloneSlide as Element).classList.add(`clone`)
          ref.current?.prepend(cloneSlide)
        }
      })
  }, [])
  if (ref.current?.children) {
    Array.prototype.slice.call(ref.current?.children).forEach((e: Element) => {
      !e.classList.contains('clone') && arr.push(e)
    })
  }
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        position: relative;
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <div css={box(viewInitialSlideValue(), autoHight)}>
          <div
            css={slideInner({
              initialTranslateValue: initialTranslateValue(),
              moveSlideValue: moveSlideValue,
              transition: transitionValue,
            })}
            ref={ref}
            className={animated}
          >
            {children}
          </div>
        </div>
        <div>
          <div css={controller.buttonBox}>
            <button css={controller.button(customStyle)} onClick={() => prev()}>
              ＜
            </button>
            <button css={controller.button(customStyle)} onClick={() => next()}>
              ＞
            </button>
          </div>
          <div css={controller.dotBox}>
            {ref.current?.children &&
              arr.map((e, i) => {
                if (!(e as Element).classList.contains('clone')) {
                  const currentPage =
                    currentIndex < 0 ? currentIndex + slideCount : currentIndex
                  return (
                    <button
                      onClick={() => pageNation(i)}
                      className={`dot-${i}`}
                      key={`dot-${i}`}
                      css={controller.dot(i === currentPage)}
                    />
                  )
                }
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
const box = (viewInitialSlideValue: number, autoHight: number) => css`
  position: relative;
  margin: 0px auto;
  overflow: hidden;
  height: ${autoHight ?? 200}px;
  width: ${viewInitialSlideValue}px;
`
const slideInner = ({
  initialTranslateValue,
  moveSlideValue,
  transition,
}: {
  initialTranslateValue: number
  moveSlideValue: number
  transition: string
}) => css`
  transform: translateX(${initialTranslateValue}px);
  position: absolute;
  top: 0;
  left: ${moveSlideValue}px;
  display: flex;
  gap: 10px;
  &.animated {
    transition: ${transition};
  }
`
const buttonReset = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
`

const controller = {
  dotBox: css`
    margin-top: 5px;
    display: flex;
    gap: 5px;
    justify-content: center;
  `,
  dot: (active: boolean) => css`
    ${buttonReset}
    cursor: pointer;
    background-color: ${active ? `#3a75ff` : `#d3d3d3`};
    width: 10px;
    height: 10px;
    border-radius: 50%;
  `,
  buttonBox: css`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: calc(50% - 30px);
    width: calc(100% - 20px);
    padding: 0 10px;
  `,
  button: (customStyle?: { [key: string]: string }) =>
    customStyle
      ? css`
          ${buttonReset}
        `
      : css`
          ${buttonReset}
          color: white;
          background-color: #b8b8b838;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        `,
}

export default Carousel
