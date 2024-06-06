import { img1, img2, img3, customer1, customer2 } from "@/assets/images"
import { truckFast, shieldTick, support, facebook, twitter, instagram } from "@/assets/icons"

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

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];

export const footerLinks = [
    {
        title: "Auctions",
        links: [
            { name: "Current Auctions", link: "/" },
            { name: "Upcoming Auctions", link: "/" },
            { name: "Past Auctions", link: "/" },
            { name: "Featured Items", link: "/" },
            { name: "Auction Calendar", link: "/" },
            { name: "Auction Houses", link: "/" },
        ],
    },
    {
        title: "Support",
        links: [
            { name: "About Us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How It Works", link: "/" },
            { name: "Privacy Policy", link: "/" },
            { name: "Terms & Conditions", link: "/" },
        ],
    },
    {
        title: "Contact Us",
        links: [
            { name: "support@auctionplatform.com", link: "mailto:support@auctionplatform.com" },
            { name: "+1234567890", link: "tel:+1234567890" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];