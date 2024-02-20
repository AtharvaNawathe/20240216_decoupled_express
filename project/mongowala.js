/**
 * Implementation of Mongodb database using mongoose library
 * performs crud operations orders and product colletion in mongodb
 * @author - Atharva Nawathe
 */
// using mongoose
const mongoose = require("mongoose");
//getting the mongo uri from the database 
const uri = 'mongodb+srv://root:root@mongodata.dzpt4un.mongodb.net/test?retryWrites=true&w=majority';
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
});

const Order = mongoose.model('Order', {
    order_id: Number,
    customer_name: String,
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

        // Check if a product with the same ID already exists
        const existingProduct = await Product.findOne({ _id: productData._id });

        if (existingProduct) {
            console.error('Error: Product with the specified ID already exists.');
            res.status(400).send('Error: Product with the specified ID already exists.');
        } else {
            const insertedProduct = await Product.create(productData);

            console.log('Product inserted in MongoDB:', insertedProduct._id);
            res.status(200).send('Product inserted in MongoDB.');
        }
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

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        // Use the Product model to update the product in MongoDB
        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });

        if (updatedProduct) {
            console.log('Product updated in MongoDB:', updatedProduct);
            res.status(200).json(updatedProduct);
        } else {
            console.error('Product with specified id does not exist in MongoDB.');
            res.status(404).send('Product with specified id does not exist in MongoDB.');
        }
    } catch (error) {
        console.error('Error updating product in MongoDB:', error);
        res.status(500).send('Error updating product in MongoDB.');
    }
};


const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        // Check if an order with the same ID already exists
        const existingOrder = await Order.findOne({ order_id: orderData.order_id });

        if (existingOrder) {
            console.error('Error: Order with the specified ID already exists.');
            res.status(400).send('Error: Order with the specified ID already exists.');
        } else {
            const newOrder = new Order(orderData);
            await newOrder.save();

            console.log('Order created in MongoDB:', newOrder._id);
            res.status(200).send('Order created in MongoDB.');
        }
    } catch (error) {
        console.error('Error creating order in MongoDB:', error);
        res.status(500).send('Error creating order in MongoDB.');
    }
};



const cancelOrder = async (req, res) => {
    try {
        const orderId = req.body.order_id;

        // No need to define the Order model here

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



const checkoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            productId: {
                type: Number,
                default: 0,
            },
            quantity: {
                type: Number,
                default: 0,
            },
            totalPrice: {
                type: Number,
                default: null,
            },
        },
    ],
});

// Create the Checkout model
const Checkout = mongoose.model('Checkout', checkoutSchema);

const checkout = async (req, res) => {
    try {
        // Assuming the JSON data is sent in the request body
        const ordersData = req.body.orders;

        if (!ordersData || !Array.isArray(ordersData)) {
            return res.status(400).send('Invalid or missing orders data in the request body.');
        }

        // Create a new checkout data structure
        const checkoutData = {
            date: new Date(),
            products: []
        };

        // Populate the checkout data with products from orders
        ordersData.forEach(order => {
            checkoutData.products.push({
                productId: order.product_id,
                quantity: order.quantity,
                totalPrice: order.price * order.quantity
                // Add other product-related information as needed
            });
        });

        // Save the checkout data to the MongoDB collection
        const newCheckout = await Checkout.create(checkoutData);

        console.log('Checkout created in MongoDB:', newCheckout._id);

        console.log('Checkout created successfully.');
        res.status(200).send('Checkout created successfully.');
    } catch (error) {
        console.error('Error creating checkout:', error);
        res.status(500).send('Error creating checkout.');
    }
};





module.exports = { connectDB, createProduct, insertProduct, deleteProduct, checkout, updateProduct, createOrder, cancelOrder, getProductById };
