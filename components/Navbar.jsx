import React from 'react'
import { Navbar as Nav } from "flowbite-react"
import Link from 'next/link'

const Navbar = () => {
  return (
    <Nav fluid rounded>
      <Nav.Brand as={Link} href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Auction Website</span>
      </Nav.Brand>
      <Nav.Toggle />
      <Nav.Collapse>
        <Nav.Link as={Link} href="/" active>
            Home
        </Nav.Link>
        <Nav.Link as={Link} href="/products">
            Products
        </Nav.Link>
        <Nav.Link as={Link} href="/myItems">
            My Shop
        </Nav.Link>
      </Nav.Collapse>
    </Nav>
  )
}

export default Navbar;