import CartManager from '../dao/filesystem/CartManager.js';
import { resolve } from 'path';
import __dirname from '../utils.js';
import { CartModel } from '../dao/db/models/CartModel.js';

const adminCart = new CartManager(resolve(__dirname, 'files', 'carrito.json'));

// Add a new cart
const addCart = async (req, res) => {
  try {
    // Filesystem ACTION
    // const newCart = await adminCart.addCart();

    // Mongoose ACTION
    const cart = { products: [] };
    const newCart = await CartModel.create(cart);
    return res.status(201).json(newCart);
  } catch (err) {
    console.log(err);
  }
};

// Get products from a specific cart
const getCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    // Filesystem ACTION
    // const productsInCart = await adminCart.getCartProducts(cid);

    // Mongoose ACTION
    const productsInCart = await CartModel.findById({ _id: cid });
    return res.status(200).json(productsInCart.products);

    if (productsInCart.msg === 'The cart not exists') {
      return res.status(404).json(productsInCart);
    }
    return res.status(200).json(productsInCart);
  } catch (err) {
    console.log(err);
  }
};

// Add products to a specific cart
const addProductsToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const addNewProductToCart = await adminCart.addProductsToCart(cid, pid);
    if (addNewProductToCart.msg === 'The cart not exists') {
      return res.status(404).json(addNewProductToCart);
    }
    if (addNewProductToCart.msg === 'The product not exists') {
      return res.status(404).json(addNewProductToCart);
    }
    return res.status(200).json(addNewProductToCart);
  } catch (err) {
    console.log(err);
  }
};

export { addCart, getCartProducts, addProductsToCart };
