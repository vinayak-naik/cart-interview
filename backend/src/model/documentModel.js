import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please provide a product name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide an product price"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
