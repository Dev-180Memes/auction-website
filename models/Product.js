import mongoose, { ObjectId } from "mongoose";

const ProductSchema = new mongoose.Schema({
    seller_id: {
        type: ObjectId,
        ref: "Seller",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    starting_price: {
        type: Number,
        required: true,
    },
    current_price: {
        type: Number,
        required: false,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    image_url: {
        type: String,
    },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;