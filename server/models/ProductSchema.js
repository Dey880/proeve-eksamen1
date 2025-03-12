const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

const Product = model("Product", ProductSchema);
module.exports = Product;