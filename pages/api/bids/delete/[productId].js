import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();
    
    const { method } = req;
    
    if (method === "DELETE") {
        const { productId } = req.query;
    
        if (!productId) {
            return res.status(400).json({ success: false, message: "Please provide a product id" });
        }
    
        const product = await Product.findById(productId);
    
        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }
    
        const result = await Product.findByIdAndDelete(productId);
    
        if (!result) {
            return res.status(400).json({ success: false, message: "Failed to delete product" });
        }
    
        return res.status(200).json({ success: true, message: "Product deleted" });
    }
    
    res.status(400).json({ success: false });
}
