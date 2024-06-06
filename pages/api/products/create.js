import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();
    
    const { method } = req;
    
    if (method === "POST") {
        const {
            seller_id,
            title,
            description,
            starting_price,
            start_time,
            end_time,
            image_url,
        } = req.body;

        if (!seller_id || !title || !description || !starting_price || !start_time || !end_time || !image_url ) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const product = await Product.create({
            seller_id,
            title,
            description,
            starting_price,
            start_time,
            end_time,
            image_url,
        });

        return res.status(201).json({ success: true, data: product });
    } else if (method === "GET") {
        const products = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: products });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}