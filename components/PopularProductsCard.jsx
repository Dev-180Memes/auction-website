import Image from "next/image";
import { star } from "../assets/icons";
import Link from "next/link";

const PopularProductCard = ({ image_url, title, current_price, _id }) => {
  return (
    <Link 
      href={`/bid/${_id}`} 
      className='flex flex-1 flex-col w-full max-sm:w-full'
    >
      <Image 
        src={image_url} 
        alt={title} 
        width={282}
        height={282}
        className='w-[282px] h-[282px] object-cover rounded-xl' 
      />
      <div className='mt-8 flex justify-start gap-2.5'>
        <Image 
          src={star} 
          alt='rating icon' 
          width={24} 
          height={24} 
        />
        <p className='font-montserrat text-xl leading-normal text-slate-gray'>
          (4.5)
        </p>
      </div>
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin'>
        {title}
      </h3>
      <p className='mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal'>
        ${current_price}
      </p>
    </Link>
  );
};

export default PopularProductCard;
