import Product from "../models/Product.js";
import User from "../models/User.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      user: req.user.id 
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { products: product._id }
    });

    res.json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("user", "name email");

    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

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

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};