import ProductManager from '../dao/filesystem/ProductManager.js';
import { resolve } from 'path';
import __dirname from '../utils.js';
import { ProductModel } from '../dao/db/models/ProductsModel.js';

const adminProducts = new ProductManager(
  resolve(__dirname, 'files', 'productList.json')
);

// Get all products
const getProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    // Filesystem ACTION
    // const products = await adminProducts.getProducts(limit);

    // MONGOOSE ACTION
    const products = await ProductModel.find(limit);
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
    // const product = await adminProducts.getSingleProduct(pid);

    // MONGOOSE ACTION
    const product = await ProductModel.findById({ _id: pid });
    if (product.msg === 'The product not exists') {
      return res.status(404).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

// Real time products example with websockets
const realTimeProducts = (req, res) => {
  let extOptions = {
    title: 'Products Websockets',
  };
  res.render('realTimeProducts', extOptions);
};

export { getProducts, getSingleProduct, realTimeProducts };
