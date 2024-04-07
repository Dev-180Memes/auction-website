import Product from '@/models/Product';
import Bid from '@/models/Bid';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { createPayment } from '@/utils/createPayment';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === 'GET') {
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Please provide a product id' });
        }

        const bids = await Bid.find({ product_id: productId });

        if (bids.length === 0) {
            return res.status(400).json({ success: false, message: 'There where no bids on this product' })
        }

        const highestBid = bids.reduce((prev, current) => (prev.bid_amount > current.bid_amount) ? prev : current);

        // Find the user who made the highest bid
        const user = await User.findById(highestBid.bidder_id);
        const product = await Product.findById(highestBid.product_id).populate('seller_id');

        // Send email with encrypted payment link to the highest bidder
        const body = {
            amount: highestBid.bid_amount,
            email: product.seller_id.email,
            title: product.title,
            buyer_email: user.email
        }

        const result = await createPayment(body);

        const paymentLink = result.paymentLink.url

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Cogratulations you won the auction',
            text: `You won the auction for ${product.title} with a bid of $${highestBid.bid_amount}. Please click the link below to make payment ${paymentLink}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(500).json({ success: false, message: 'An error occured while sending the email' });
            } else {
                return res.status(200).json({ success: true, message: 'Email sent successfully' });
            }
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid request method' });
    }
}