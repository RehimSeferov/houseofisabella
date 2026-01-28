const Product = require("../models/Product");


exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: "Məhsul yaradılarkən xəta baş verdi" });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort,
      brand,
      category,
      availability,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};
    if (brand) {
      const brandList = brand.split(",");
      query.brand = { $in: brandList };
    }
    if (category) {
      const categoryList = category.split(",");
      query.category = { $in: categoryList };
    }
    if (availability) {
      const stockList = availability.split(",");
      query.availability = { $in: stockList };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    let sortQuery = {};
    if (sort === "price-asc") sortQuery.price = 1;
    else if (sort === "price-desc") sortQuery.price = -1;
    else if (sort === "name-asc") sortQuery.name = 1;
    else if (sort === "date-desc") sortQuery.createdAt = -1;
    else if (sort === "date-asc") sortQuery.createdAt = 1;
    else sortQuery.createdAt = -1;
    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      products,
    });
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Server xətası" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Məhsul tapılmadı" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xətası" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    res.status(200).json({ message: "Məhsul uğurla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Server xətası" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};
