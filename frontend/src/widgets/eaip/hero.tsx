import React from 'react'
import Image from 'next/image'
import { Fullscreen } from 'lucide-react'

const Hero = () => {
  return (
    <>
    <Image width={1920} height={90} src="/Background.png" alt="Background" style={{ width: "100%" }} />
    <div className="flex flex-col gap-4 p-4 md:p-10">
        <div className="flex flex-col items-center">
            <h1 className="mb-4 text-xs text-center md:text-2xl font-semibold">Electronic Aeronautical Information Publication (eAIP)</h1>
            <Image width={131} height={77} src="/unnamed.png" alt="Logo" className="mb-2" />
            <h1 className="text-xs md:text-xl">Kyrgyz Republic</h1>
            <h1 className="text-xs md:text-xl">Consult NOTAM for Latest Information</h1>
        </div>
    </div>
    </>
  )
}

export default Hero
