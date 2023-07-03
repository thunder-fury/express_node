import { useEffect, useMemo, useState } from 'react'
import { css } from '@emotion/react';
import Icon from '../../Icon';
import { Color } from '../../../styles/Variables'
import { form } from '../../../styles/components/atoms/Form';
interface Props {
  name: string
  value?: string
  label?: string
  id?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  attribute?: string
  validateType?: string
}

const Checkbox: React.FC<Props> = ({
  name,
  label,
  id,
  value,
  validateType,
  onChange,
  attribute }) => {
  const [checked, setChecked] = useState(false)
  const setChecking = useMemo(() => {
    return (e: any) => {
      setChecked(e.target.checked);
    };
  }, []);

  return (
    <>
      <label css={form.checkbox.continer} htmlFor={id}>
        <div css={form.checkbox.parent}>
          {checked &&
            <div css={form.checkbox.icon}>
              <Icon w={10} h={10} icon={`check`} color={Color.white} />
            </div>
          }
          <input
            css={form.checkbox.box}
            data-checkebox
            id={id}
            data-validate-type={validateType}
            type={`checkbox`}
            name={name}
            value={value}
            onChange={setChecking}
            className={checked ? 'is-checked' : ''}
          />
        </div>
        {label}
      </label>
    </>
  )
}

const styles = {
  checkbox: {
    continer: css`
      display: flex;
      align-items: center;
      font-size: 1.3rem;
    `,
    parent: css`
      position: relative;
      display: flex;
      justify-content: center;
    `,
    icon: css`
      position: absolute;
    `,
    box: css`
      width: 15px;
      height: 15px;
      border: solid 1px ${Color.gray6};
      &.is-checked {
        background-color: ${Color.black};
      }
    `
  },
}

export default Checkbox;
