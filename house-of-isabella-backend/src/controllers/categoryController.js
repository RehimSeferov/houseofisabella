const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Bu kateqoriya artıq var" });
    }

    const category = await Category.create({
      name,
      parentId: parentId || null,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parentId");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
