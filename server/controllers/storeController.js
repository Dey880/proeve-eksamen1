const User = require('../models/UserSchema.js');
const Product = require('../models/ProductSchema.js');
const Category = require('../models/CategorySchema.js');
const bcrypt = require('bcrypt');

const authController = {
    createCategory: async (req, res) => {
        const { user, name, description, img } = req.body;
        try {
            const trusted = await User.findById(user);
            if (trusted.role !== 'admin') {
                return res.status(403).json({ message: 'You are not authorized to create a category.' });
            }
            const category = new Category({
                name,
                description,
                img
            });
            await category.save();
            res.status(201).send({ msg: 'Registered successfully', category });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createProduct: async (req, res) => {
        const { user, name, description, price, img, category } = req.body;
        try {
            const trusted = await User.findById(user);
            if (trusted.role !== 'admin') {
                return res.status(403).json({ message: 'You are not authorized to create a product.' });
            }
            const categoryDoc = await Category.findById(category);
            if (!categoryDoc) {
                return res.status(404).json({ msg: 'Category not found.' });
            }
            const newProduct = new Product({
                name,
                description,
                price,
                img,
                category
            });
            await newProduct.save();
            res.status(201).send({ msg: 'Registered successfully', product: newProduct });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).send(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    },
    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ msg: 'Product not found.' });
            }
            res.status(200).send(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    },
    getCategoryById: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ msg: 'Category not found.' });
            }
            res.status(200).send(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, description, price, img } = req.body;
        
        try {
            const trusted = await User.findById(req.user.id);
            if (trusted.role !== 'admin') {
                return res.status(403).json({ message: 'You are not authorized to update products.' });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, description, price, img },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        
        try {
            const trusted = await User.findById(req.user.id);
            if (trusted.role !== 'admin') {
                return res.status(403).json({ message: 'You are not authorized to delete products.' });
            }
            
            const deletedProduct = await Product.findByIdAndDelete(id);
            console.log(deletedProduct);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;