import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();
    
    const { method } = req;
    
    if (method === "GET") {
        const { productId } = req.query;
        
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: product });
    } else if (method === "DELETE") {
        const { productId } = req.query;
        
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.remove();

        return res.status(200).json({ success: true, data: {} });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}