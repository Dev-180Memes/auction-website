import mongoose from 'mongoose';

const BidSchema = new mongoose.Schema({
    product_id: {
        type: ObjectId,
        ref: "Product",
    },
    bidder_id: {
        type: ObjectId,
        ref: "Bidder",
    },
    bid_amount: {
        type: Number,
        required: true,
    },
    bid_time: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

const Bid = mongoose.models.Bid || mongoose.model("Bid", BidSchema);

export default Bid;