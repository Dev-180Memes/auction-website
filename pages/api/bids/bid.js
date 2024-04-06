import Bid from "@/models/Bid";
import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();
    
    const { method } = req;
    
    if (method === "POST") {
        const {
            bidder_id,
            product_id,
            bid_amount,
            bid_time,
        } = req.body;

        if (!bidder_id || !product_id || !bid_amount || !bid_time) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        // Fetch all bids for the product
        const bids = await Bid.find({ product_id });

        // If there are no bids, get products start price
        if (bids.length === 0) {
            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }

            // Make sure bidder is not the owner of the product
            if (product.seller_id.toString() === bidder_id) {
                return res.status(400).json({ success: false, message: "You can't bid on your own product" });
            }

            // Check to make sure the end time has not passed
            if (new Date(product.end_time) < new Date()) {
                // Set active to inactive
                product.status = "inactive";
                await product.save();

                return res.status(400).json({ success: false, message: "Product auction has ended" });
            }

            // Check if bid amount is greater than starting price
            if (bid_amount < product.starting_price) {
                return res.status(400).json({ success: false, message: "Bid amount should be greater than starting price" });
            }
        } else {
            // Get the highest bid
            const highestBid = bids.reduce((prev, current) => (prev.bid_amount > current.bid_amount) ? prev : current);
            // Check if bid amount is greater than highest bid
            if (bid_amount <= highestBid.bid_amount) {
                return res.status(400).json({ success: false, message: "Bid amount should be greater than highest bid" });
            }
        }

        const bid = await Bid.create({
            bidder_id,
            product_id,
            bid_amount,
            bid_time,
        });

        // Update product current price to bid_amount
        const product = await Product.findById(product_id);
        product.current_price = bid_amount;
        await product.save();

        // Add bidders details to response data
        await bid.populate("bidder_id");

        return res.status(201).json({ success: true, data: bid });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}