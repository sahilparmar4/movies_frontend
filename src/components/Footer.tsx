import React from 'react'
import { FooterWave1, FooterWave2 } from './image'

const Footer = () => {
  return (
    <>
      <footer className="relative w-full">
        <div className="absolute bottom-0 left-0 w-full">
          <img src={FooterWave1} alt="wave gray" className="w-full h-[111px] md:h-auto" />
        </div>
          <img src={FooterWave2} alt="wave green" className="w-full h-[111px] md:h-auto" />
      </footer>
    </>
  )
}

export default Footer
