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

  // console.log(products);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="flex flex-wrap gap-4 mt-5">
        {products && products.map((product) => {
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
                <p className="text-md text-gray-500">Start Time: {product.start_time.toString().split('T')[0]}</p>
                <p className="text-md text-gray-500">End Time: {product.end_time.toString().split('T')[0]}</p>
              </div>
              <Button as={Link} href={`/bid/${product._id}`}>Bid</Button>
            </Card>
        )})}
      </div>
    </div>
  )
}

export default Products;