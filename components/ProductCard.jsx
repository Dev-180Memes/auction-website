import React from 'react'
import Image from 'next/image';

const ProductCard = ({ imgUrl, changeBigImage, bigImg }) => {
    const handleClick = () => {
        if (bigImg !== imgUrl.bigImg) {
            changeBigImage(imgUrl.bigImg);
        }
    };

  return (
    <div
        className={`border-2 rounded-xl ${
            bigImg === imgUrl.bigImg
                ? "border-coral-red"
                : "border-transparent"
        } cursor-pointer max-sm:flex-1`}
        onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <Image 
            src={imgUrl.thumbnail}
            alt='product sample'
            width={127}
            height={103.34}
            className='object-contain'
        />
      </div>
    </div>
  )
}

export default ProductCard
