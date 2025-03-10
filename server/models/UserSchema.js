const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String },
    role: { type: String, required: true, default: "user" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = model("User", UserSchema);
module.exports = User;