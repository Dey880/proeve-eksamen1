const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
});

const Category = model("Category", CategorySchema);
module.exports = Category;