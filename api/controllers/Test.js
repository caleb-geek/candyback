const Order = require('../../models').Order;
const Product = require('../../models').Product;
const ProductOrders = require('../../models').ProductOrders;

Product.findByPk(2).then(ledger=>{
    ledger.setOrders([1,2]).then(sc=>{
        console.log(sc);
    }).catch((err)=>{
        console.log(err)
    });
}).catch((err)=>{
    console.log(err)
});
