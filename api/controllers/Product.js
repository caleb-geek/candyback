const fs = require('fs');
const Product = require('../../models').Product;


//Create Product
exports.createProduct = (req,res) => {
  const url = req.protocol + '://' + req.get('host');
  const {name,price,tag,details} = JSON.parse(req.body.values)
  
    return Product.create({name:name,price:price,tag:tag,details:details,image: url + '/images/' + req.file.filename})
      .then((product)=>{
        return res.status(201).json(product);
      }).catch((err) => {
        return res.status(400).json({message:err.message})
      })
  }

  // Update Product
exports.updateProduct = async(req,res) => {
  const product = await Product.findByPk(parseInt(req.params.id))
  const {name,price,tag,details} = JSON.parse(req.body.values)
  
  const filename = product.dataValues.image.split('/images/')[1];
  const url = req.protocol + '://' + req.get('host');

  if(req.file){
    //Delete image from folder
    fs.unlink('images/'+filename, ()=>{
      return Product.update({name:name,price:price,tag:tag,details:details,image:url + '/images/' + req.file.filename},
      {
        where:{
          id:req.params.id
        }})
        .then(()=>{
          return res.status(200).json({message:"Product updated succesfully"})
        }).catch((err) => {
          return res.status(400).json({message:err.message})
        })
    })
   
  }else{
    return Product.update({name:name,price:price,tag:tag,details:details},
    {
      where:{
        id:req.params.id
      }})
      .then(()=>{
        return res.status(200).json({message:"Product updated succesfully"})
      }).catch((err) => {
        return res.status(400).json({message:err.message})
      })
  }
 
   
   }

   // view all products
exports.getAllProduct = (req,res) => {
    return Product.findAll()
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
  }

  //Get a specific product
exports.getProduct = (req, res) => {
  return Product.findByPk(req.params.id).then(product => {
    res.status(200).json(product)
  })
}

//Delete Product

exports.deleteProduct =async (req,res) => {
  const product = await Product.findByPk(parseInt(req.params.id))
  const filename = product.dataValues.image.split('/images/')[1];
  fs.unlink('images/' + filename,()=>{
    return Product.destroy({
      where: {
         id: req.params.id
       }})
       .then(()=>{
         res.status(200).json({message:"Product has been deleted"})
       })
       .catch((err)=>{
         res.status(404).json({error:err})
       })
  })
 
}