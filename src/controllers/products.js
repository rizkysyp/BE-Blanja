const { response } = require(`../middlewares/common`);
const {
  insertData,
  getAll,
  getByToko,
  updateProducts,
  updateData,
  deleteProduct,
  archive,
  activate,
  getDataArchive,
  getDetailProduct,
} = require(`../model/products`);
const cloudinary = require("../config/photo");

const productController = {
  insert: async (req, res, next) => {
    try {
      const { stock, price, status, product_name, category } = req.body;
      const id_toko = req.payload.id;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });

      const data = {
        stock,
        price,
        product_name,
        category,
        photo: image.url,
        id_toko,
      };
      console.log(data);
      await insertData(data);
      return response(res, 200, true, data, "input data success");
    } catch (error) {
      return response(res, 404, false, error, "input data fail");
    }
  },
  getAllData: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const result = await getAll({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, "get products failed");
    }
  },
  getDataToko: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const { id } = req.payload;
      const result = await getByToko({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
        id,
      });
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, " get airlines data failed");
    }
  },
  getDataArchive: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const { id } = req.payload;
      const result = await getDataArchive({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
        id,
      });
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, " get airlines data failed");
    }
  },
  updateProducts: async (req, res, next) => {
    try {
      const id = req.params.id;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });

      const data = {
        id,
        stock: req.body.stock,
        price: req.body.price,
        product_name: req.body.product_name,
        category: req.body.category,
        photo: image.url,
      };

      await updateData(data);
      response(res, 200, true, data, "update data success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "update data failed");
    }
  },
  delete: async (req, res) => {
    try {
      await deleteProduct(req.params.id);
      response(res, 200, true, null, "delete data success");
    } catch (err) {
      return response(res, 404, false, err, "delete data failed");
    }
  },
  detail: async (req, res) => {
    try {
      const result = await getDetailProduct(req.params.id);
      response(res, 200, true, result.rows, "delete data success");
    } catch (err) {
      return response(res, 404, false, err, "delete data failed");
    }
  },
  doArchive: async (req, res) => {
    try {
      await archive(req.params.id);
      response(res, 200, true, null, "archive sukses");
    } catch (err) {
      return response(res, 404, false, err, "arhive failed");
    }
  },
  activate: async (req, res) => {
    try {
      await activate(req.params.id);
      response(res, 200, true, null, "activate sukses");
    } catch (err) {
      return response(res, 404, false, err, "actviate failed");
    }
  },
};

exports.productController = productController;
