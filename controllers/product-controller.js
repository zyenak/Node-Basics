const productModel = require('../models/product-model');

const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = { id: Date.now().toString(), ...req.body };
    await productModel.addProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = req.body;
    const success = await productModel.updateProduct(req.params.id, updatedProduct);
    if (success) {
      res.json({ message: 'Product updated' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const patchProduct = async (req, res) => {
  try {
    const updatedFields = req.body;
    const success = await productModel.patchProduct(req.params.id, updatedFields);
    if (success) {
      res.json({ message: 'Product updated' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error patching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
