const Pool = require("./../config/db");

const insertData = (data) => {
  const { product_name, stock, price, category, photo, id_toko } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO products(name,stock,price,category,photo,status,id_toko) VALUES('${product_name}','${stock}','${price}','${category}','${photo}','1','${id_toko}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getAll = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products
      WHERE products.status='1' AND products.name ILIKE ('%${search}%') ORDER BY products.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getDetailProduct = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products WHERE products.id = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const FindStatus = (id) => {
    return new Promise((resolve, reject) =>
      Pool.query(
        `SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products WHERE products.id = '${id}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
  };

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM products WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const getByToko = ({ search, sortBy, sortOrder, limit, offset, id }) => {
  console.log(id);
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products
      WHERE products.status='1' AND products.name ILIKE ('%${search}%') AND products.id_toko = '${id}'ORDER BY products.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getDataArchive = ({ search, sortBy, sortOrder, limit, offset, id }) => {
  console.log(id);
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products
        WHERE products.status='0' AND products.name ILIKE ('%${search}%') AND products.id_toko = '${id}'ORDER BY products.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateData = (data) => {
  const { id, product_name, stock, price, category, photo } = data;
  console.log(data);
  return Pool.query(
    `UPDATE products SET name='${product_name}',stock='${stock}',price='${price}', category='${category}',photo='${photo}' WHERE id='${id}'`
  );
};

const archive = (id) => {
  return Pool.query(`UPDATE products SET status='0' WHERE id = '${id}'`);
};

const activate = (id) => {
  return Pool.query(`UPDATE products SET status='1' WHERE id = '${id}'`);
};

const updateProducts = ({
  id,
  product_name,
  stock,
  price,
  category,
  photo,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE products SET name = COALESCE($2, name), stock = '${stock}' ,price= '${price}'
      ,category = COALESCE($4,category),photo = COALESCE($5,photo) WHERE id = $1`,
      [id, product_name, stock, price, category, photo],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  insertData,
  getAll,
  getByToko,
  updateData,
  updateProducts,
  updateData,
  deleteProduct,
  archive,
  activate,
  getDataArchive,
  getDetailProduct,
};
