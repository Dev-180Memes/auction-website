import React from 'react'
import { useState } from 'react'
import { homeProducts, statistics } from '@/constants'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { img1 } from '@/assets/images'
import { arrowRight } from '@/assets/icons'
import Image from 'next/image'

const Hero = () => {
    const [bigImg, setBigImg] = useState(img1);

  return (
    <section className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
        <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28">
            <p className="text-xl font-montserrat text-coral-red">
                Our Exclusive Auction Collection
            </p>

            <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
                <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
                    The New Arrival of
                </span>
                <br />
                <span className="text-coral-red inline-block mt-3">Rare</span> Items
            </h1>
            <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
                Discover unique and valuable items, quality treasures, and one-of-a-kind pieces for your collection. Bid now to secure your rare finds.
            </p>

            <Button label='Start Bidding Now' iconUrl={arrowRight} href={'/products'} />

            <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
                {statistics.map((stat, index) => (
                    <div key={index}>
                        <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
                        <p className="leading-7 font-montserrat text-slate-gray">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
            <Image 
                src={bigImg}
                alt="Product Image"
                width={610}
                height={520}
                className="object-contain"
            />

            <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
                {homeProducts.map((image, index) => (
                    <div key={index}>
                        <ProductCard 
                            index={index}
                            imgUrl={image}
                            changeBigImage={(img) => setBigImg(img)}
                            bigImg={bigImg}
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Hero
