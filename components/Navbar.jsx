import React from 'react'
import { Navbar as Nav } from "flowbite-react"
import Link from 'next/link'
import { hamburger } from '@/assets/icons'
import { logo } from '@/assets/images'
import Image from 'next/image'
import { navLinks } from '@/constants'

const Navbar = () => {
  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link href="/">
          <Image 
            src={logo}
            alt="logo"
            width={50}
            className='m-0 w-[50px]'
          />
        </Link>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className='font-monteserrat leading-normal text-lg text-slate-gray'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
          <Link href='/myItems'>My Shop</Link>
          <span>/</span>
          <Link href='/list'>Sell</Link>
        </div>
        <div className="hidden max-lg:block">
          <Image 
            src={hamburger}
            alt="hamburger icon"
            width={25}
            height={25}
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar;