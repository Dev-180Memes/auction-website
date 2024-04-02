import Bid from "@/models/Bid";
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

        const bid = await Bid.create({
            bidder_id,
            product_id,
            bid_amount,
            bid_time,
        });

        return res.status(201).json({ success: true, data: bid });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}