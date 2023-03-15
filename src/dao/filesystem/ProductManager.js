import { readFile, writeFile } from 'fs/promises';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // CRUD STATEMENTS
  // CREATE.- Add product
  addProduct = async (productData) => {
    try {
      if (JSON.stringify(productData).includes('id'))
        return {
          msg: "Denied. You can't use ID property to create a new product",
        };
      const dataDB = await JSON.parse(await readFile(this.path));

      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = productData;

      const newProductData = {
        id: dataDB.length + 1,
        title,
        description,
        code,
        price: Number(price),
        status: Boolean(status),
        stock: Number(stock),
        category,
        thumbnails: Array(thumbnails),
      };
      await dataDB.push(newProductData);
      const newProductAdded = JSON.stringify(dataDB);
      await writeFile(this.path, newProductAdded);
      return { msg: 'New product added successfully' };
    } catch (err) {
      console.log(err);
    }
  };

  // READ.- Get all products
  getProducts = async (limit) => {
    try {
      if (limit !== undefined) {
        const dataDB = await JSON.parse(await readFile(this.path));
        return await dataDB.filter((p) => p.id <= parseInt(limit));
      } else {
        return await JSON.parse(await readFile(this.path));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // READ.- Get a single product
  getSingleProduct = async (pid) => {
    try {
      const dataDB = await JSON.parse(await readFile(this.path));
      const exists = await dataDB.some((p) => p.id === parseInt(pid));
      if (exists) {
        return await dataDB.find((p) => p.id === parseInt(pid));
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE.- Update a product
  updateProduct = async (pid, productData) => {
    try {
      const dataDB = await JSON.parse(await readFile(this.path));
      const exists = await dataDB.some((p) => p.id === parseInt(pid));

      if (exists) {
        if (JSON.stringify(productData).includes('id'))
          return {
            msg: "Denied. You can't update or insert ID property",
          };

        const update = await dataDB.map((p) =>
          p.id === parseInt(pid) ? { ...p, ...productData } : p
        );
        const updateDone = JSON.stringify(update);
        await writeFile(this.path, updateDone);
        return { msg: 'The product was updated successfully' };
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE.- Delete a product
  deleteProduct = async (pid) => {
    try {
      const dataDB = await JSON.parse(await readFile(this.path));
      const exists = await dataDB.some((p) => p.id === parseInt(pid));

      if (exists) {
        const deleted = await dataDB.filter((p) => p.id !== parseInt(pid));
        const deleteDone = JSON.stringify(deleted);
        await writeFile(this.path, deleteDone);
        return { msg: 'The product was deleted successfully' };
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductManager;
