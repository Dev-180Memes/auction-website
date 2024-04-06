import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();
    
    const { method } = req;
    
    if (method === "GET") {
        const { userId } = req.query;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "Please provide a user ID" });
        }
        
        const products = await Product.find({ seller_id: userId });
        
        return res.status(200).json({ success: true, data: products });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}