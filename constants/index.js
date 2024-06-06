import { img1, img2, img3, customer1, customer2 } from "@/assets/images"
import { truckFast, shieldTick, support } from "@/assets/icons"

export const navLinks = [
    { href: "/", label: "Home" },
    { href:"/products", label: "Products" },
]

export const homeProducts = [
    {
        thumbnail: img1,
        bigImg: img1
    },
    {
        thumbnail: img2,
        bigImg: img2
    },
    {
        thumbnail: img3,
        bigImg: img3
    }
];

export const statistics = [
    { value: '1k+', label: "Rare Items" },
    { value: '500+', label: "Auction Houses" },
    { value: '250k+', label: 'Bidders' }
];

export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];