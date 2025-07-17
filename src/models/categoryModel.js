import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: "category" }, 
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const CategoryModel = model("category", categorySchema);
export default CategoryModel;
