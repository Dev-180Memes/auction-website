import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();

    const  { method } = req;

    if (method === "GET") {
        // Get the 4 latest products
        const products = await Product.find().sort({ createdAt: -1 }).limit(4);

        return res.status(200).json({ success: true, data: products });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}