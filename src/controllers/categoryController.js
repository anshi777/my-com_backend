import CategoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, slug } = req.body;
    const existCategory = await CategoryModel.findOne({ name });

    if (existCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category Already existe" });
    }
    const newCategory = new CategoryModel({
      name,
      description,
      slug,
    });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Category Created successful...",
      data: newCategory,
    });
  } catch (error) {
    console.log(error, "category error....");
    return res
      .status(500)
      .json({ success: false, message: "fail to create category ..." });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories) {
      return res
        .status(400)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Get all categories success..",
      data: categories,
    });
  } catch (error) {
    console.log(error, "category error....");
    return res
      .status(500)
      .json({ success: false, message: "fail to create category ..." });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };
    console.log(updates, "dhgh");
    const category = await CategoryModel.findByIdAndUpdate(
      req?.params.id,
      updates,
      { new: true, runValidators: true }
    );
    console.log(category, "hehdubhulkjmk...", req?.params.id, "id...");

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found.." });
    }
    await category.save();
    return res.status(200).json({
      success: true,
      message: "Category Updated successfull..",
      data: category,
    });
  } catch (error) {
    console.log(error, "category error....");
    return res
      .status(500)
      .json({ success: false, message: "fail to create category ..." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req?.params.id, {
      runValidators: true,
    });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "category not found.." });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Category deleted successfull...",
        data: category,
      });
  } catch (error) {
    console.log(error, "category error....");
    return res
      .status(500)
      .json({ success: false, message: "fail to create category ..." });
  }
};
