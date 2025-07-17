// import ProductModel from "../models/productModel.js";

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await ProductModel.find().populate("category reviews");
//     if (!products) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Products not found.." });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Product fetched successfully..",
//       data: products,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: "internal server Error..",
//         data: error,
//       });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const { _id } = req?.params;
//     const product = await ProductModel.findByIdAndUpdate({ _id, new: true });
//     // const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true,});

//     if (!product) {
//       return res
//         .status(400)
//         .json({ message: "Product Not Found..", success: false });
//     }
//     return res
//       .status(200)
//       .json({
//         success: true,
//         message: "product updated Successfully...",
//         data: product,
//       });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: "internal server Error..",
//         data: error,
//       });
//   }
// };

// export const createproduct = async (req, res) => {
//   try {
//     const {} = req.body;

//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: "internal server Error..",
//         data: error,
//       });
//   }
// };

// export const getproductById = async (req, res) => {
//   try {
//     const { _id } = req?.params;
//     const product = await ProductModel.findById({ _id });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product Not Found.." });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Product Fetched successFull...",
//       data: product,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: "internal server Error..",
//         data: error,
//       });
//   }
// };

// export const productDelete = async (req, res) => {
//   try {
//     const { _id } = res?.params;
//     const product = await ProductModel.findByIdAndDelete({ _id });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Product Deleted Successfully.." });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: "internal server Error..",
//         data: error,
//       });
//   }
// };

import Product from "../models/productModel.js";

// CREATE
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

    const images = req.files.map((file) => file.path);
    console.log("FILES RECEIVED:", req.files);
    console.log("BODY RECEIVED:", req.body);

    const newProduct = new Product({
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

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json({success:true,message:"Products fetched successfully..",data:products});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category "
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, brand, category } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const images = req.files?.map((file) => file.path) || product.images;

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.brand = brand ?? product.brand;
    product.category = category ?? product.category;
    product.images = images;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // (optional) Remove images from Cloudinary — needs `public_id`
    // If you stored public_ids, loop and call cloudinary.uploader.destroy(public_id)

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
