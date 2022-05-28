require('dotenv').config();
const express = require('express');
require('./db/conn');
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/user-router');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-routes');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors());
app.use(cookieParser());
// app.use(express.json());  // we are not using this method then data will not saved in db only id will be save
app.use(bodyParser.json());  // we are not using this method then data will not saved in db only id will be save

app.use('/userapi', userRouter);
app.use('/userapi', productRouter);
app.use('/userapi', cartRouter);

app.listen(port, () => {
    console.log(`Server is listening the Port No: ${port}`);
})

var x = [1,2,3,4,1,3];

let uniqeElement = [... new Set(x)];

console.log(uniqeElement);
 

 var count = {};

 for(var i=0;i<x.length;i++){
     var num =x[i];
     count[num] = count[num] ? count[num]+1 : 1
 }

 console.log(count);

 