import ProductModel from "../models/productModel.js";
import ReviewModel from "../models/reviewModel.js";

const createReview = async (req, res) => {
  try {
    const { rating, comment, isVerifiedPurchase, productId } = req.body;
    const userId = req.user?.id;
    if (!productId || !userId || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product, user, and rating are required.",
      });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const newReview = new ReviewModel({
      user: userId,
      product: productId,
      rating,
      comment,
      isVerifiedPurchase: isVerifiedPurchase || false,
    });

    await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review created successfully.",
      review: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create review.",
    });
  }
};
export default createReview;
