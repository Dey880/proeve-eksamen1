const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes.js');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(process.env.PORT);