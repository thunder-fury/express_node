/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { css } from '@emotion/react'
import styles from '../styles/Home.module.css'
import Carousel from '../components'

export default function Home() {
  return (
    <div>
     <Carousel>
        <div css={box}>
          <img
            src="https://dummyimage.com/980x300/acc/fff.gif&text=01"
            alt=""
          />
        </div>
        <div css={box}>
          <img
            src="https://dummyimage.com/980x300/acc/fff.gif&text=02"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  )
}

const box = css`
  display: flex;
  max-width: 980px;
  width: 100%;
  color: white;
  height: 300px;
  justify-content: center;
  align-items: center;
`
