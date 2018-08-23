const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  imageURL: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  customername: {
    type: String,
    required: false
  },
  customername: {
    type: String,
    required: false
  },
  reviews: []
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
