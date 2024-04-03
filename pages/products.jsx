import React, { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { Card, Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

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

  console.log(products);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="flex flex-wrap gap-4 mt-5">
        {products && products.map((product) => { 
          const date = new Date(product.start_time);
          const endDate = new Date(product.end_time);

          // Format the date and time
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
          const formattedDateTime = date.toLocaleString('en-US', options);
          const formattedEndDate = endDate.toLocaleString('en-US', options);

          return (
            <Card key={product._id} className='max-w-sm gap-3'>
              <div className="flex flex-col items-center pb-10">
                <Image
                  alt={product.title}
                  height="96"
                  src={product.image_url}
                  width="96"
                  className="mb-3 rounded-full shadow-lg"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-md text-gray-500 mt-2">{product.description}</p>
                <p className="text-md text-gray-500">Starting Price: {product.starting_price}</p>
                <p className="text-md text-gray-500">Current Price: {product.current_price}</p>
                <p className="text-md text-gray-500">Start Time: {formattedDateTime}</p>
                <p className="text-md text-gray-500">End Time: {formattedEndDate}</p>
              </div>
              <Button as={Link} href={`/bid/${product._id}`}>Bid</Button>
            </Card>
        )})}
        
      </div>
    </div>
  )
}

export default Products;