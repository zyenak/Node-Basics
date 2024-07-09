const { productModel } = require('../models');

const getProducts = (req, res) => {
  const products = productModel.getAllProducts();
  res.json(products);
};

const getProductById = (req, res) => {
  const product = productModel.getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = (req, res) => {
  const newProduct = { id: Date.now().toString(), ...req.body };
  productModel.addProduct(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const updatedProduct = req.body;
  productModel.updateProduct(req.params.id, updatedProduct);
  res.json({ message: 'Product updated' });
};

const deleteProduct = (req, res) => {
  productModel.deleteProduct(req.params.id);
  res.json({ message: 'Product deleted' });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
