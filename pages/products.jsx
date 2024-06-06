import React, { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import PopularProductCard from '@/components/PopularProductsCard';
import Footer from '@/components/Footer';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products/create', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        toast.error(data.message);
      }
    };

    fetchProducts();
  }, []);

  // console.log(products);

  return (
    <>
      <Toaster />
      <main className="relative min-h-screen">
        <Navbar />
        <section className="padding">
          <div className="max-container max-sm:mt-12">
            <div className="flex flex-col justify-start gap-5">
              <h2 className="text-4xl font-palanquin font-bold">
                Our <span className="text-coral-red">Auctions</span>
              </h2>
              <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
                Experience top-notch quality and uniqueness with our latest auction items. Discover a world of rare finds, collectibles, and valuable treasures.
              </p>
            </div>

            <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
              {products.map((product) => (
                <PopularProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>
        <section className='bg-black padding-x padding-t pb-8'>
          <Footer />
        </section>
      </main>
    </>
  )
}

export default Products;