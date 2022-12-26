import { css } from "@emotion/react"
import { useModal } from "../../hooks/useModal"

const Modal = () => {
  const { isToggle, isDisplay, controller } = useModal()
  return (
    <div>
      <div css={dialog(isDisplay)}>
        <button css={button} onClick={() => controller.close()}>toggle</button>
      </div>
      {/* <button onClick={() => controller.toggle()}>toggle</button> */}
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => controller.open()}>open</button>
    </div>
  )
}

const button = css`
  position: relative;

`

const overLay = (isDisplay: boolean) => css`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.4s 0s, transform 0s 0.4s;
  ${isDisplay &&`
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s 0s, transform 0s 0s;
  `}
`
const dialog = (isDisplay: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.3s, transform 0ms.3s;
  width: 500px;
  height: 500px;
  background-color: white;
  ${isDisplay && `
    opacity: 1;
    transform: scale(1);
  `}
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* pointer-events: none; */
  box-sizing: border-box;
`

export default Modal
