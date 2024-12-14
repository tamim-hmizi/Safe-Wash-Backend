const Product = require("../models/Product");
const Category = require("../models/Category");
const Commande = require("../models/Commande");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, image, description, price, categoryId } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      name,
      image,
      description,
      price,
      category: categoryId,
    });

    const savedProduct = await newProduct.save();
    // Populate category before sending response
    await savedProduct.populate("category"); // Populating category field
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products with populated category
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a product by ID with populated category
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, image, description, price, categoryId } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = categoryId || product.category;

    const updatedProduct = await product.save();
    // Populate category before sending response
    await updatedProduct.populate("category");
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Fetch the product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find all commandes associated with the product
    const commandes = await Commande.find({ product: product._id });

    // Delete all commandes associated with the product
    for (const commande of commandes) {
      await Commande.deleteOne({ _id: commande._id });
    }

    // Delete the product
    await Product.deleteOne({ _id: product._id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
