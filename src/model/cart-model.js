const mongoose = require('mongoose');

const cartShema = new mongoose.Schema({
    prodName: {
        type: String,
    },
    totalprice: {
        type: String,
    },
    prodDesc: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const cartModel = new mongoose.model("Cart", cartShema);

module.exports = cartModel;