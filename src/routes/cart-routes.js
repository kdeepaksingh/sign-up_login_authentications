const express = require('express');
const router = express.Router();
const cartModel = require('../model/cart-model');

router.get('/find', async (req, res) => {
    try {
        const cartList = await cartModel.find({}).sort({ "prodName": 1 });
        console.log(cartList);
        const recordCount = cartList.length;
        res.status(200).send({ status: 200, message: "Fetched All Cart!", recordCount: recordCount, results: cartList });
    } catch (err) {
        res.status(500).send(`Unable To Fetch Cart Details ${err}`);
    }
});

router.post('/add', async (req, res) => {
    try {
        const addCart = new cartModel(req.body);
        console.log(addCart);
        const insertCart = await addCart.save();
        const recordCount = insertCart.length;
        res.status(200).send({ status: 200, message: "Cart Added Successfully!!", recordCount: recordCount, results: insertCart });
    } catch (err) {
        res.status(500).send(`Unable To Add Cart ${err}`);
    }
});


module.exports = router;

