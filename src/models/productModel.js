import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category:{ type: String },
    reviews:{ type: Number },
    createdBy:{ type:String },
    // category: [
    //   { type: Schema.Types.ObjectId, ref: "category", required: true },
    // ],
    // reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
    // createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
    brand: { type: String, required: true },
    inStock: { type: Boolean, default: false },
    discount: { type: Number },
    color: { type: String },
    badge: { type: String },
    sizes: [{ type: String }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    category: { type: [String], required: true },
    totalSold: { type: Number, default: 0 },

    meta: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

const ProductModel = model("product", productSchema);
export default ProductModel;
