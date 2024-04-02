import Bid from "@/models/Bid";
import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;
    const { productId } = req.query;

    // Get all bids for a specific product
    if (method === "GET") {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const bids = await Bid.find({ product_id: productId });

        return res.status(200).json({ success: true, data: bids });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}