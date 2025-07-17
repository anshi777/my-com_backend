import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    isVerifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ReviewModel = model("reviews", reviewSchema);
export default ReviewModel;
