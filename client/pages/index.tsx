/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { css } from '@emotion/react'
import styles from '../styles/Home.module.css'
import Carousel from '../components'
import CarouselDev from '../components/CaruselDev'

export default function Home() {
  return (
    <div>
      <CarouselDev>
        <div css={box}>
          <Image css={img}
            src="https://askul.c.yimg.jp/resource/c/prod/content/dam/lohaco/bnr/980/221205_muji_bnr_980x310.jpg"
            alt=""
            width={980}
            height={300}
            className={`body`}
          />
        </div>
        <div css={box}>
          <Image
            src="https://askul.c.yimg.jp/resource/c/prod/content/dam/lohaco/bnr/980/221201_clearance_980x310.jpg"
            alt=""
            width={980}
            height={300}
            className={`body`}
          />
        </div>
        <div css={box}>
          <Image
            src="https://askul.c.yimg.jp/resource/c/prod/content/dam/lohaco/bnr/980/rohto_221206_980x310.jpg"
            alt=""
            width={980}
            height={300}
            className={`body`}
          />
        </div>
      </CarouselDev>
    </div>
  )
}

const img = css`
  width: 100%;
  background-color: red;
`


const box = css`
  display: flex;
  max-width: 980px;
  width: 100%;
  color: white;
  height: 300px;
  justify-content: center;
  align-items: center;
`
