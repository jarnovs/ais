import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="flex bg-white h-16 items-center pl-4">
      <div>
        <Image width={219} height={30} src="/logo_name.png" alt="..." />
      </div>
    </nav>
  )
}

export default Navbar
