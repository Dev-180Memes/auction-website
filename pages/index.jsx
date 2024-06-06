import React from 'react'
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Products from '@/sections/Products';
import SuperQuality from '@/sections/SuperQuality';
import Services from '@/sections/Services';
import CustomerReviews from '@/sections/CustomerReviews';
import Subscribe from '@/sections/Subscribe';
import Footer from '@/components/Footer';

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
      <section className="padding-x py-10">
        <Services />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
      <section className="bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  )
}

export default Home;