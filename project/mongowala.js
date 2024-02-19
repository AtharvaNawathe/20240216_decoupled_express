/**
 * Implementation of Mongodb database using mongoose library
 * performs crud operations orders and product colletion in mongodb
 * @author - Atharva Nawathe
 */
// using mongoose
const mongoose = require("mongoose");
//getting the mongo uri from the database 
const uri = 'mongodb+srv://root:<password>@cluster0.faue6rn.mongodb.net/MyData?retryWrites=true&w=majority';
//mongodb connetion function
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// defined schema in which the data will be stored
const Product = mongoose.model('Product', {
    _id: Number,
    name: String,
    price: Number,
    brand: String,
    quantity_left: Number,
    description: String,
    category: String,
    deliveryStatus: String
});

// createProduct method for creating product in MyData database
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        await newProduct.save();

        console.log('Product created in MongoDB:', newProduct._id);
        res.status(200).send('Product created in MongoDB.');
    } catch (error) {
        console.error('Error creating product in MongoDB:', error);
        res.status(500).send('Error creating product in MongoDB.');
    }
};

// inserting product into MyData database
const insertProduct = async (req, res) => {
    try {
        const productData = req.body;
        const insertedProduct = await Product.create(productData);

        console.log('Product inserted in MongoDB:', insertedProduct._id);
        res.status(200).send('Product inserted in MongoDB.');
    } catch (error) {
        console.error('Error inserting product in MongoDB:', error);
        res.status(500).send('Error inserting product in MongoDB.');
    }
};
const deleteProduct = async (req, res) => {
    try {
        const productId = req.body._id; 
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (deletedProduct) {
            console.log('Product deleted in MongoDB:', deletedProduct._id);
            res.status(200).send('Product deleted in MongoDB.');
        } else {
            console.error('Product with specified id does not exist in MongoDB.');
            res.status(404).send('Product with specified id does not exist in MongoDB.');
        }
    } catch (error) {
        console.error('Error deleting product in MongoDB:', error);
        res.status(500).send('Error deleting product in MongoDB.');
    }
};
const checkout = async (req, res) => {
    try {
        const orderData = req.body;
        const OrderModel = mongoose.model('Order', {
            
            order_id: Number,
            customer_name: String,
            product_id:Number,
            quantity: Number,
            total_price: Number
        });

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        console.log('Order created in MongoDB:', newOrder._id);
        res.status(200).send('Order created in MongoDB.');
    } catch (error) {
        console.error('Error creating order in MongoDB:', error);
        res.status(500).send('Error creating order in MongoDB.');
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.body.order_id;

       
        const Order = mongoose.model('Order', {
            order_id: Number,
            customer_name: String,
            product_id:Number,
            quantity: Number,
            total_price: Number
        });

        const deletedOrder = await Order.findOneAndDelete({ order_id: orderId });

        if (deletedOrder) {
            console.log('Order canceled in MongoDB:', deletedOrder.order_id);
            res.status(200).send('Order canceled in MongoDB.');
        } else {
            console.error('Order with specified id does not exist in MongoDB.');
            res.status(404).send('Order with specified id does not exist in MongoDB.');
        }
    } catch (error) {
        console.error('Error canceling order in MongoDB:', error);
        res.status(500).send('Error canceling order in MongoDB.');
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id; 

        if (!productId) {
            return res.status(400).json({ error: 'Missing id parameter' });
        }

        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { connectDB, createProduct, insertProduct, deleteProduct, checkout, cancelOrder, getProductById };
