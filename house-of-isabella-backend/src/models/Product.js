const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true }, 
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    availability: {
      type: String,
      default: "In stock",
      enum: ["In stock", "Out of stock"],
    },
    color: { type: String },
    material: { type: String },
    isNewProduct: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
