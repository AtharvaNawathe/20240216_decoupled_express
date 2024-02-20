// test.js
const fs = require('fs');
const path = require('path');

function createProduct(req, res) {
    const productData = req.body;
    const productsFolderPath = './Products';

    try {
        if (!fs.existsSync(productsFolderPath)) {
            fs.mkdirSync(productsFolderPath);
        }

        const filename = `product_Details.json`;
        const filePath = path.join(productsFolderPath, filename);

        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(fileData);
        }

        existingData.push(productData);

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

        console.log('Product is created successfully.');
        res.status(200).send('Product is created successfully.');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product.');
    }
}



function insertProduct(req, res) {
    const productData = req.body;
    const productsFolderPath = './Products';

    try {
        const filename = `product_Details.json`;
        const filePath = path.join(productsFolderPath, filename);

        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(fileData);
        } else {
            console.error('Folder or file does not exist. Use createProduct first.');
            res.status(500).send('Folder or file does not exist. Use createProduct first.');
            return;
        }

        existingData.push(productData);

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

        console.log('Product details inserted successfully.');
        res.status(200).send('Product details inserted successfully.');
    } catch (error) {
        console.error('Error inserting product details:', error);
        res.status(500).send('Error inserting product details.');
    }
}

function deleteProduct(req, res) {
  const productId = req.body._id;
  const productsFolderPath = './Products';

  try {
      const filename = `product_Details.json`;
      const filePath = path.join(productsFolderPath, filename);

      if (fs.existsSync(filePath)) {
          let existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          // Find the index of the product with the given id
          const index = existingData.findIndex(product => product._id === productId);

          if (index !== -1) {
              // Remove the product from the array
              existingData.splice(index, 1);

              // Save the updated array back to the file
              fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

              console.log('Product deleted successfully.');
              res.status(200).send('Product deleted successfully.');
          } else {
              console.error('Product with specified id does not exist.');
              res.status(404).send('Product with specified id does not exist.');
          }
      } else {
          console.error('Product file does not exist.');
          res.status(404).send('Product file does not exist.');
      }
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Error deleting product.');
  }
}

function getProductById(req, res) {
    const productId = Number(req.params.id);
  
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid id parameter. Must be a number.' });
    }
  
    const productsFolderPath = './Products';
  
    try {
      const filename = `product_Details.json`;
      const filePath = path.join(productsFolderPath, filename);
  
      if (fs.existsSync(filePath)) {
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
        console.log('productId:', productId);
  
        const product = existingData.find(product => product._id === productId);
  
        if (product) {
          console.log('Product found:', product);
          res.status(200).json(product);
        } else {
          console.error('Product with specified id does not exist.');
          res.status(404).send('Product with specified id does not exist.');
        }
      } else {
        console.error('Product file does not exist.');
        res.status(404).send('Product file does not exist.');
      }
    } catch (error) {
      console.error('Error retrieving product:', error);
      res.status(500).send('Error retrieving product.');
    }
  }

function createOrder(req, res) {
  const orderData = req.body;
  const ordersFolderPath = './Orders';

  try {
      if (!fs.existsSync(ordersFolderPath)) {
          fs.mkdirSync(ordersFolderPath);
      }

      const filename = `orders.json`;
      const filePath = path.join(ordersFolderPath, filename);

      let existingOrders = [];
      if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          existingOrders = JSON.parse(fileData);
      }

      existingOrders.push(orderData);

      fs.writeFileSync(filePath, JSON.stringify(existingOrders, null, 2), 'utf8');

      console.log('Order is created successfully.');
      res.status(200).send('Order is created successfully.');
  } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send('Error creating order.');
  }
}

function cancelOrder(req, res) {
  const orderId = req.body.order_id;
  const ordersFolderPath = './Orders';

  try {
      const filename = `orders.json`;
      const filePath = path.join(ordersFolderPath, filename);

      if (fs.existsSync(filePath)) {
          let existingOrders = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          // Find the index of the order with the given orderId
          const index = existingOrders.findIndex(order => order.order_id === orderId);

          if (index !== -1) {
              // Remove the order from the array
              existingOrders.splice(index, 1);

              // Save the updated array back to the file
              fs.writeFileSync(filePath, JSON.stringify(existingOrders, null, 2), 'utf8');

              console.log('Order canceled successfully.');
              res.status(200).send('Order canceled successfully.');
          } else {
              console.error('Order with specified orderId does not exist.');
              res.status(404).send('Order with specified orderId does not exist.');
          }
      } else {
          console.error('Orders file does not exist.');
          res.status(404).send('Orders file does not exist.');
      }
  } catch (error) {
      console.error('Error canceling order:', error);
      res.status(500).send('Error canceling order.');
  }
}

function updateProduct(req, res) {
    const productId = req.body._id;
    const productsFolderPath = './Products';

    try {
        const filename = `product_Details.json`;
        const filePath = path.join(productsFolderPath, filename);

        if (fs.existsSync(filePath)) {
            let existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Find the index of the product with the given id
            const index = existingData.findIndex(product => product._id === productId);

            if (index !== -1) {
                // Update the product data
                existingData[index] = req.body;

                // Save the updated array back to the file
                fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

                console.log('Product updated successfully.');
                res.status(200).send('Product updated successfully.');
            } else {
                console.error('Product with specified id does not exist.');
                res.status(404).send('Product with specified id does not exist.');
            }
        } else {
            console.error('Product file does not exist.');
            res.status(404).send('Product file does not exist.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product.');
    }
}

const checkout = async (req, res) => {
    try {
        const ordersFilePath = './Orders/orders.json';
        const checkoutFolderPath = './Checkouts';

        // Check if the orders file exists
        if (fs.existsSync(ordersFilePath)) {
            // Read the orders data from the file
            const ordersData = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

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
                    price : order.Total_price,
                    totalPrice: order.Total_price * order.quantity

    
                });
            });

            // Create the Checkouts folder if it doesn't exist
            if (!fs.existsSync(checkoutFolderPath)) {
                fs.mkdirSync(checkoutFolderPath);
            }

            // Create a unique filename for the checkout
            const filename = `checkout_${Date.now()}.json`;
            const checkoutFilePath = path.join(checkoutFolderPath, filename);

            // Write the checkout data to the checkout file
            fs.writeFileSync(checkoutFilePath, JSON.stringify(checkoutData, null, 2), 'utf8');

            console.log('Checkout created successfully.');
            res.status(200).send('Checkout created successfully.');
        } else {
            console.error('Orders file does not exist.');
            res.status(404).send('Orders file does not exist.');
        }
    } catch (error) {
        console.error('Error creating checkout:', error);
        res.status(500).send('Error creating checkout.');
    }
};

module.exports = { createProduct, insertProduct, deleteProduct, getProductById, createOrder, cancelOrder, updateProduct,checkout };