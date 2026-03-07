import Product from "../models/Product.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

/**
 * Create a new product
 * @route POST /api/products
 * @access Private (Admin only)
 */
export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

/**
 * Get all products with search, filter, and pagination
 * @route GET /api/products
 * @access Private
 */
export const getProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find().populate("createdBy", "name email"), req.query)
    .search()
    .filter()
    .sort()
    .paginate();

  const products = await features.query;
  const total = await Product.countDocuments(features.getFilteredCount());

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    currentPage: parseInt(req.query.page) || 1,
    totalPages: Math.ceil(total / (parseInt(req.query.limit) || 10)),
    data: products,
  });
});

/**
 * Get a single product by ID
 * @route GET /api/products/:id
 * @access Private
 */
export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("createdBy", "name email");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * Update a product
 * @route PUT /api/products/:id
 * @access Private (Admin only)
 */
export const updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * Delete a product
 * @route DELETE /api/products/:id
 * @access Private (Admin only)
 */
export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

/**
 * Get product statistics (for dashboard)
 * @route GET /api/products/stats
 * @access Private (Admin only)
 */
export const getProductStats = catchAsync(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const totalStock = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalStock: { $sum: "$stock" },
        totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
      },
    },
  ]);

  const categoryStats = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        totalStock: { $sum: "$stock" },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalStock: totalStock[0]?.totalStock || 0,
      totalValue: totalStock[0]?.totalValue || 0,
      categoryStats,
    },
  });
});

