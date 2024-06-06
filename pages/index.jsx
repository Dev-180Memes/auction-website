import React from 'react'
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Products from '@/sections/Products';

const Home = () => {
  return (
    <main className='relative'>
      <Navbar />
      <section className='xl:padding-l wide:padding-r padding-b'>
        <Hero />
      </section>
      <section className="padding">
        <Products />
      </section>
    </main>
  )
}

export default Home;