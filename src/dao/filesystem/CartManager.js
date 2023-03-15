import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import __dirname from '../../utils.js';
import ProductManager from './ProductManager.js';

const adminProduct = new ProductManager(
  resolve(__dirname, 'files', 'productList.json')
);

class CartManager {
  constructor(path) {
    this.path = path;
  }

  // Add a new cart
  addCart = async () => {
    try {
      const data = await JSON.parse(await readFile(this.path));
      const newCart = {
        id: data.length + 1,
        products: [],
      };
      await data.push(newCart);
      const newCartAdded = JSON.stringify(data);
      await writeFile(this.path, newCartAdded);
      return { msg: 'New cart added successfully' };
    } catch (err) {
      console.log(err);
    }
  };

  // Get products from a specific cart
  getCartProducts = async (cid) => {
    try {
      const data = await JSON.parse(await readFile(this.path));
      const exists = await data.some((p) => p.id === parseInt(cid));
      if (exists) {
        const cartSelected = await data.find((p) => p.id === parseInt(cid));
        return cartSelected.products;
      } else {
        return { msg: 'The cart not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add products to products array in specific cart
  addProductsToCart = async (cid, pid) => {
    try {
      const cartsDB = await JSON.parse(await readFile(this.path));
      const cartExists = await cartsDB.some((p) => p.id === parseInt(cid));
      if (cartExists) {
        const productsDB = await adminProduct.getProducts();
        const productExists = await productsDB.some(
          (p) => p.id === parseInt(pid)
        );
        if (productExists) {
          //
          const cartSelected = await cartsDB.find(
            (p) => p.id === parseInt(cid)
          );

          const productAlreadyInCart = await cartSelected.products.some(
            (p) => p.product === parseInt(pid)
          );

          if (productAlreadyInCart) {
            const productInCart = await cartSelected.products.find(
              (p) => p.product === parseInt(pid)
            );
            const quantity = (await productInCart.quantity) + 1;
            const updateQuantity = await cartSelected.products.map((p) =>
              p.product === parseInt(pid) ? { ...p, quantity } : p
            );
            cartSelected.products = updateQuantity;
            const cartsUpdated = await cartsDB.map((p) =>
              p.id === parseInt(cid) ? { ...cartSelected } : p
            );
            const newData = JSON.stringify(cartsUpdated);
            await writeFile(this.path, newData);
            return {
              msg: 'The product already exists in cart. Product quantity updated successfully',
            };
          } else {
            const productToAdd = { product: parseInt(pid), quantity: 1 };
            cartSelected.products.push(productToAdd);
            const productAddedToCart = await cartsDB.map((p) =>
              p.id === parseInt(cid) ? { ...p, ...cartSelected } : p
            );
            const newData = JSON.stringify(productAddedToCart);
            await writeFile(this.path, newData);
            return { msg: 'New product added successfully to cart products' };
          }
        } else {
          return { msg: 'The product not exists' };
        }
      } else {
        return { msg: 'The cart not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default CartManager;
