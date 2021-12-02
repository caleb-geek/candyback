const Order = require('../../models').Order;
const  Product= require('../../models').Product;
const  ProductOrders= require('../../models').ProductOrders;

exports.createOrder = async(req, res) => {

    // Create and save the order
    const savedOrder = await Order.create(req.body, {w: 1}, { returning: true });
  
    // Loop through all the items in req.products
    req.body.products.forEach(async(item) => {
  
      // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
      const product = await Product.findByPk(parseInt(item.id)); 
      if (!product) {
        return res.status(400);
      }
      
  
      // Create a dictionary with which to create the ProductOrder
      const po = {
        orderId: savedOrder.id,
        productId: parseInt(item.id),
      }
  
      // Create and save a productOrder
       await ProductOrders.create(po, { w: 1 }, { returning: true });
    });
  
    // If everything goes well, respond with the order
    return res.status(200).json(savedOrder)
  }

  exports.getAllOrders =async (req, res) => {

    // Get all orders
    const allOrders = await Order.findAll({
  
      // Make sure to include the products
      include: [{
        model: Product,
        as: 'products',
        required: false,
        // Pass in the Product attributes that you want to retrieve
        attributes: ['id', 'name','price','image'],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: ProductOrders,
          as: 'productOrders',
          attributes: ['productId'],
        }
      }
    ]
    });
  
    // If everything goes well respond with the orders
    return res.status(200).json(allOrders)
    //return respondWith(res, 200, ['Returning all orders'], {allOrders});
  }