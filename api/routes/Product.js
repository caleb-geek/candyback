const express = require('express');
const Router = express.Router();
const { checkToken } = require('../middlewares/Auth')
const multer = require('../middlewares/Multer');

const {createProduct,updateProduct,getAllProduct,getProduct,deleteProduct } = require('../controllers/Product');

Router.post('/',  multer, createProduct)
Router.put('/:id',multer, updateProduct)
Router.get('/', getAllProduct)
Router.get('/:id', getProduct)
Router.delete('/:id', deleteProduct)

module.exports = Router;