import Product from "../models/Product.js";
import User from "../models/User.js";

// ✅ Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      createdBy: req.user.id
    });

    // user ke products me push
    await User.findByIdAndUpdate(req.user.id, {
      $push: { products: product._id }
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get All Products (with populate)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("createdBy", "username email");

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get My Products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.user.id
    }).populate("category", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};