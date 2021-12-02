const express = require('express');
const Router = express.Router();
const { checkToken } = require('../middlewares/Auth')
const {createOrder,getAllOrders } = require('../controllers/Order');



Router.post('/', createOrder)
Router.get('/', getAllOrders)





module.exports = Router;