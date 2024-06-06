import { shoe8 } from "@/assets/images"
import Button from "@/components/Button"
import Image from "next/image"

const SuperQuality = () => {
  return (
    <section className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
        <div className="flex flex-1 flex-col">
            <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold">
                We Provide You
                <span className="text-coral-red"> Premium </span>
                <span className="text-coral-red">Auction </span> Items
            </h2>
            <p className="mt-4 lg:max-w-lg info-text">
                Ensuring exceptional quality and uniqueness, our meticulously curated auction items are designed to elevate your collection, providing you with unmatched rarity, innovation, and a touch of elegance.
            </p>
            <p className="mt-6 lg:max-w-lg info-text">
                Our dedication to detail and excellence ensures your satisfaction.
            </p>
            <div className="mt-11">
                <Button label='View Details' href='/products' />
            </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
            <Image 
                src={shoe8}
                alt="Product Details"
                width={570}
                height={522}
                className="object-contain"
            />
        </div>
    </section>
  )
}

export default SuperQuality
