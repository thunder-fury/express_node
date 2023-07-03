import css from "styled-jsx/css"

interface Props {
  name: string
  value: any
  label?: string
  id?: string
  attribute?: string
  validateType?: string
  checkd?: boolean
  v?: string[]
  isBorder?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Checkbox: React.FC<Props> = ({
  name,
  label,
  id,
  value,
  validateType,
  checkd,
  onChange,
  attribute,
  onClick,
  isBorder,
  v }) => {

  return (
    <label
      css={check.label}
      htmlFor={id}
      className={[checkd ? 'is-checked' : '', isBorder && `is-border`].join(``)}
    >
      <div css={check.inner}>
        {checkd ? <div css={check.icon}>  </div> : ''}
        <input
          data-checkebox
          id={id}
          data-validate-type={validateType}
          css={check.element}
          type={`checkbox`}
          name={name}
          defaultChecked={v && v.includes(value)}
          value={value}
          onChange={onChange}
          className={checkd ? 'is-checked' : ''}
          onClick={onClick}
        />
      </div>
      {value}
    </label>
  )
}

export const check = {
  container: css`
    display: flex;
  `,
  label: css`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    width: 100%;
    justify-content: center;
    &.is-border {
      border: solid 1px gray;
    }
    padding: 10px;
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
    &.is-checked {
      background-color: black;
      color: white;
    }
    cursor: pointer;
  `,
  inner: css`
    position: relative;
    display: flex;
    justify-content: center;
  `,
  icon: css`
    position: absolute;
  `,
  element: css`
    width: 15px;
    height: 15px;
    /* border: solid 1px black */
    &:checked {
      /* background-color: #fff;
      border: solid 1px #000 ; */
    }
  `
}

export default Checkbox
