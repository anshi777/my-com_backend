import ProductModel from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category");
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Products not found.." });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully..",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error..",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.files && req.files.images?.length > 0) {
      updates.images = req.files.images.map((file) => file.path);
    }

    const product = await ProductModel.findByIdAndUpdate(
      req?.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product Not Found..", success: false });
    }
    return res.status(200).json({
      success: true,
      message: "product updated Successfully...",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error..",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      category,
      reviews,
      rating,
      createdBy,
      inStock,
      discount,
      color,
      badge,
      sizes,
      tags,
    } = req.body;

    const images = req.files?.images?.map((file) => file.path) || [];

    const newProduct = new ProductModel({
      name,
      description,
      price,
      brand,
      category: Array.isArray(category) ? category : [category],
      images,
      reviews,
      rating,
      createdBy,
      inStock,
      discount,
      color,
      badge,
      sizes,
      tags,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getproductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found.." });
    }
    return res.status(200).json({
      success: true,
      message: "Product Fetched successFull...",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error..",
    });
  }
};

export const productDelete = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req?.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully..",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error..",
    });
  }
};
