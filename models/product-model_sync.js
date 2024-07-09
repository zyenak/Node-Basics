const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/products.json');

const readJSONFile = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeJSONFile = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllProducts = () => readJSONFile();

const getProductById = (id) => {
  const products = readJSONFile();
  return products.find(product => product.id === id);
};

const addProduct = (product) => {
  const products = readJSONFile();
  products.push(product);
  writeJSONFile(products);
};

const updateProduct = async (id, updatedProduct) => {
  const products = await readJSONFile();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    await writeJSONFile(products);
    return true;
  }
  return false;
};

const patchProduct = async (id, updatedFields) => {
  const products = await readJSONFile();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedFields };
    await writeJSONFile(products);
    return true;
  }
  return false;
};

const deleteProduct = (id) => {
  const products = readJSONFile();
  const filteredProducts = products.filter(product => product.id !== id);
  writeJSONFile(filteredProducts);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
