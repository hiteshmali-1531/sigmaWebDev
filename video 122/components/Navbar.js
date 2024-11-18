"use client"

import Link from "next/link"


function Navbar() {
  return (
    <div className="bg-blue-800 text-white py-2 px-3 text-xl">
      <ul className="flex gap-4 text-sm ">
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/contact'}>Contact</Link>
      </ul>
    </div>
  )
}

export default Navbar
