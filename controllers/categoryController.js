const Category = require("../models/Category");
const Commande = require("../models/Commande");
const Product = require("../models/Product");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the category", error });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    // Fetch the category by ID
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find all products under this category
    const products = await Product.find({ category: category._id });

    // Loop through each product and delete related commandes and the product
    for (const product of products) {
      const commandes = await Commande.find({ product: product._id });

      // Delete all commandes associated with the product
      for (const commande of commandes) {
        await Commande.deleteOne({ _id: commande._id });
      }

      // Delete the product itself
      await Product.deleteOne({ _id: product._id });
    }

    // Finally, delete the category
    await Category.deleteOne({ _id: category._id });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
