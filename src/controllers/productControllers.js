import ProductManager from '../dao/filesystem/ProductManager.js';
import { resolve } from 'path';
import __dirname from '../utils.js';

const adminProduct = new ProductManager(
  resolve(__dirname, 'files', 'productList.json')
);

import { ProductModel } from '../dao/db/models/ProductsModel.js';

// Get all products
const getProducts = async (req, res) => {
  try {
    // Filesystem ACTION
    // const products = await adminProduct.getProducts();

    // Mongoose ACTION
    const products = await ProductModel.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

// Get a single product
const getSingleProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    // Filesystem ACTION
    //const product = await adminProduct.getSingleProduct(pid);

    // Mongoose ACTION
    const product = await ProductModel.findById({ _id: pid });
    if (product.msg === 'The product not exists') {
      return res.status(404).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    // Filesystem ACTION
    // const newProduct = await adminProduct.addProduct(productData);

    // Mongoose ACTION
    const newProduct = await ProductModel.create(productData);
    if (
      newProduct.msg ===
      "Denied. You can't use ID property to create a new product"
    ) {
      return res.status(406).json(newProduct);
    }
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    // Filesystem ACTION
    // const productUpdated = await adminProduct.updateProduct(pid, productData);

    // Mongoose ACTION
    const productUpdated = await ProductModel.findByIdAndUpdate(
      { _id: pid },
      productData
    );
    if (
      productUpdated.msg === "Denied. You can't update or insert ID property"
    ) {
      return res.status(406).json(productUpdated);
    }
    if (productUpdated.msg === 'The product not exists') {
      return res.status(404).json(productUpdated);
    }
    return res.status(200).json(productUpdated);
  } catch (err) {
    console.log(err);
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    // Filesystem ACTION
    // const productDeleted = await adminProduct.deleteProduct(pid);

    // Mongoose ACTION
    const productDeleted = await ProductModel.findByIdAndDelete({ _id: pid });
    if (productDeleted.msg === 'The product not exists') {
      return res.status(404).json(productDeleted);
    }
    return res.status(200).json(productDeleted);
  } catch (err) {
    console.log(err);
  }
};

export {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
