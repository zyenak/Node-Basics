const fs = require('fs').promises; // Using fs.promises for async operations
const path = require('path');
const dataPath = path.join(__dirname, '../data/products.json');

const readJSONFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products.json:', error);
    return []; // Return an empty array if file read fails or is empty
  }
};

const writeJSONFile = async (data) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing products.json:', error);
  }
};

const getAllProducts = async () => {
  return await readJSONFile();
};

const getProductById = async (id) => {
  const products = await readJSONFile();
  return products.find(product => product.id === id);
};

const addProduct = async (product) => {
  const products = await readJSONFile();
  products.push(product);
  await writeJSONFile(products);
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

const deleteProduct = async (id) => {
  const products = await readJSONFile();
  const filteredProducts = products.filter(product => product.id !== id);
  await writeJSONFile(filteredProducts);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
