const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    prodName: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const productModel = new mongoose.model("Product", productShema);

module.exports = productModel;