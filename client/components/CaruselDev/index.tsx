import { css } from "@emotion/react"
import { Children, cloneElement, isValidElement, ReactNode, useRef } from "react"
import useCarouselSample from "../../hooks/useCarouselPro"

const Clone = () => {
  return <div>sadfasdf</div>
}

const CarouselDev = ({ children }: { children: ReactNode }) => {
  const divRef = useRef(null)
  const {
    value,
    slideControl,
    moveSlideValue,
    transition,
    currentIndex,
  } = useCarouselSample(divRef, {})
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          position: relative;
          height: 300px;
        `}
      >
       <div css={css`
          position: absolute;
          left: calc((50% - (${value.viewInitialSlideValue} / 2)));
        `}>
          <div css={box(value.viewInitialSlideValue)}>
            <div
              css={slideInner({
                initialTranslateValue: value.initialTranslateValue,
                moveSlideValue,
                transition
              })}
              className={slideControl.animated}
              ref={divRef}
            >
              {/* {Children.map(children, (item: ReactNode) => {
                console.log(item);
                console.log(isValidElement(item));
                return item;
              })} */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const box = (viewInitialSlideValue: number) => css`
  display: flex ;
  position: relative;
  overflow: hidden;
  height: 300px;
  width: ${viewInitialSlideValue}px;
`
const slideInner = ({
  initialTranslateValue,
  moveSlideValue,
  transition,
  spaceBetween,
}: {
  initialTranslateValue: number
  moveSlideValue?: number
  transition: string
  spaceBetween?: number
  currentIndex?: number
}) => css`
  /* transform: translateX(${initialTranslateValue}px); */
  position: absolute;
  top: 0;
  left: ${moveSlideValue}px;
  display: flex;
  gap: ${spaceBetween}px;
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
export default CarouselDev
