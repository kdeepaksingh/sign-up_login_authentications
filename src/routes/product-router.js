const express = require('express');
const router = express.Router();
const productModel = require('../model/product-model');

// //base url path: http://localhost:8000/userapi/add


// GET ALL Products 

router.get('/find', async (req, res) => {
    try {
        const productList = await productModel.find({}).sort({ "prodName": 1 });
        console.log(productList);
        const recordCount = productList.length;
        res.status(200).send({ status: 200, message: "Fetched All Products!", recordCount: recordCount, results: productList });
    } catch (err) {
        res.status(500).send(`Unable To Fetch Products Details ${err}`);
    }
});

// GET Specific Products

router.get('/find/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const specificProduct = await productModel.find({ _id }).sort({ "prodName": 1 });
        recordCount = specificProduct.length;
        res.status(200).send({ status: 200, message: "Fetched Perticular Products!", recordCount: recordCount, results: specificProduct });
    } catch (err) {
        res.status(500).send(`Unable to find this Products ${err}`);
    }
});

// post Products Details

router.post('/add', async (req, res) => {
    try {
        const addProduct = new productModel(req.body);
        console.log(addProduct);
        const insertProduct = await addProduct.save();
        const recordCount = insertProduct.length;
        res.status(200).send({ status: 200, message: "Product Added Successfully!!", recordCount: recordCount, results: insertProduct });
    } catch (err) {
        res.status(500).send(`Unable To Add Product ${err}`);
    }
});

// Update perticular Product  Deatils

router.patch('/update/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateProduct = await productModel.findByIdAndUpdate(_id, req.body, { new: true });
        const recordCount = updateProduct.length;
        res.status(200).send({ status: 200, message: "Product Updated Successfully!", recordCount: recordCount, result: updateProduct })
    } catch (err) {
        res.status(500).send(`Error in Updated Product ${err}`);
    }
});

// Remove perticular Product  Deatils

router.delete('/remove/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const removeProduct = await productModel.findByIdAndDelete({ _id });
        const recordCount = removeProduct.length;
        res.status(200).send({ status: 200, message: "Product Is Deleted Successfully!", recordCount: recordCount, result: removeProduct });
    } catch (err) {
        res.status(500).send(`Error in Product Deletion ${err}`);
    }
});

module.exports = router;

