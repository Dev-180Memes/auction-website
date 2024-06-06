import React from 'react'
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Products from '@/sections/Products';
import SuperQuality from '@/sections/SuperQuality';

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
      <section className="padding">
        <SuperQuality />
      </section>
    </main>
  )
}

export default Home;