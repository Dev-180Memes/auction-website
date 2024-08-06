import { useState, useEffect } from 'react';
import PopularProductCard from '@/components/PopularProductsCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () =>{
      const response = await fetch('/api/products/fetch', {
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

  return (
    <section className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red">Latest</span> Auctions
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
        Experience premium quality and freshness with our latest farm-to-table offerings. Discover a world of fresh produce, organic goods, and nature&apos;s finest treasures.
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
        {products.map((product) => (
          <PopularProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  )
}

export default Products
