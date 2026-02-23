import Category from "../models/Category.js";

// ✅ Create Category (admin only)
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};