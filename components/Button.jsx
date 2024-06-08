import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Button = ({
    label,
    iconUrl,
    backgroundColor,
    textColor,
    borderColor,
    fullWidth,
    href,
    onClick,
    type='button',
}) => {
    const router = useRouter()

    const handleClick = () => {
        if (href) {
            router.push(href)
        } else if (onClick) {
            onClick();
        }
    }

  return (
    <button
        className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
        ${
            backgroundColor
                ? `${backgroundColor} ${textColor} ${borderColor}`
                : "bg-coral-red text-white border-coral-red"
        } rounded-full ${fullWidth && "w-full"}`}
        onClick={handleClick}
        type={type}

    >
        {label}

        {iconUrl && (
            <Image 
                src={iconUrl}
                alt='label'
                className='ml-2 rounded-full bg-white w-5 h-5'
            />
        )}
    </button>
  )
}

export default Button
