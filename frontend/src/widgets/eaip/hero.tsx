import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <>
    <Image width={1920} height={90} src="/Background.png" alt="Background" />
    <div className="flex flex-col gap-4 max-w-7xl p-4 md:p-10">
        <div className="flex flex-col items-center">
            <h1 className="mb-4 text-xs text-center md:text-3xl">Aeronautical Information Publication (E-AIP)</h1>
            <Image width={131} height={77} src="/unnamed.png" alt="Logo" />
            <h2 className="text-xs md:text-xl">Kyrgyz Republic</h2>
            <h2 className="text-xs md:text-xl">Consult NOTAM for Latest Information</h2>
        </div>
    </div>
    </>
  )
}

export default Hero
