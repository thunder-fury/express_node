/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import MainCarousel from '../../components/Carousel'
import Image from 'next/image'
export default function Home() {
  return (
    <div>
      <MainCarousel
        slidesPerView={1}
        viewSlideWidth={900}
        spaceBetween={30}
      >
        <div css={box}>
          <Image css={img}
            src="https://askul.c.yimg.jp/resource/c/prod/content/dam/lohaco/bnr/980/221205_muji_bnr_980x310.jpg"
            alt=""
            width={980}
            height={300}
          />
        </div>
        <div css={box}>
          <Image
            src="https://askul.c.yimg.jp/resource/c/prod/content/dam/lohaco/bnr/980/221201_clearance_980x310.jpg"
            alt=""
            width={980}
            height={300}
          />
        </div>
        <div css={box}>
          <Image
            src="https://askul.c.yimg.jp/resource/c/prod/content/dam/lohaco/bnr/980/rohto_221206_980x310.jpg"
            alt=""
            width={980}
            height={300}
          />
        </div>
      </MainCarousel>
    </div>
  )
}

const img = css`
  width: 100%;
  background-color: red;
`

const box = css`
  display: flex;
  width: 980px;
  color: white;
  height: 300px;
  justify-content: center;
  align-items: center;
`
