import React from 'react'
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';

const Home = () => {
  return (
    <main className='relative'>
      <Navbar />
      <section className='xl:padding-l wide:padding-r padding-b'>
        <Hero />
      </section>
    </main>
  )
}

export default Home;