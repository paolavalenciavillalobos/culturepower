"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/product/routes/productRoutes.ts
var productRoutes_exports = {};
__export(productRoutes_exports, {
  productRoutes: () => productRoutes
});
module.exports = __toCommonJS(productRoutes_exports);
var import_express = require("express");

// src/product/controller/productController.ts
var ProductController = class {
  constructor(productService) {
    this.productService = productService;
  }
  createProduct(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        const newProduct = yield this.productService.createProduct(body);
        console.log(newProduct);
        res.status(200).json(newProduct);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  }
  getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const user = yield this.productService.getAll();
        res.status(200).json(user);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  }
  getById(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const user = yield this.productService.getById(id);
        res.status(200).json(user);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  }
  updateProduct(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        const updated = yield this.productService.updateProduct(id, body);
        res.status(200).json(updated);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  }
  softDeleteProduct(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const deleted = yield this.productService.softDeleteProduct(id);
        res.status(200).json(deleted);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  }
};

// src/product/model/productModel.ts
var import_mongoose = require("mongoose");
var productSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
var ProductModel = (0, import_mongoose.model)("Product", productSchema);

// src/product/repository/productRepository.ts
var import_mongoose2 = require("mongoose");
var ProductRepository = class {
  constructor(productModel) {
    this.productModel = productModel;
  }
  createProduct(productData) {
    return __async(this, null, function* () {
      const newProduct = yield this.productModel.create(productData);
      console.log(newProduct);
      return newProduct;
    });
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productModel.find({ deletedAt: null });
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productModel.findById({ _id: id, deletedAt: null });
      return product;
    });
  }
  updateProduct(id, dataUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.productModel.findByIdAndUpdate(id, dataUpdate, { new: true });
      return updated;
    });
  }
  softDeleteProduct(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const deleted = yield this.productModel.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deleted;
    });
  }
  updateAmount(id, amountUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.productModel.findByIdAndUpdate(id, { amount: amountUpdate }, { new: true });
      return updated;
    });
  }
};

// src/product/service/productService.ts
var ProductService = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  createProduct(productData) {
    return __async(this, null, function* () {
      const newProduct = yield this.productRepository.createProduct(productData);
      console.log(newProduct);
      return newProduct;
    });
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productRepository.getAll();
      if (products.length === 0) {
        throw new Error("Dont exist any product yet");
      }
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productRepository.getById(id);
      if (!product) {
        throw new Error("cannot find this product");
      }
      return product;
    });
  }
  updateProduct(id, dataUpdate) {
    return __async(this, null, function* () {
      const validId = yield this.productRepository.getById(id);
      if (!validId) {
        throw new Error("id is invalid");
      }
      const updated = yield this.productRepository.updateProduct(id, dataUpdate);
      if (!updated) {
        throw new Error("Product cannot updated");
      }
      return updated;
    });
  }
  softDeleteProduct(id) {
    return __async(this, null, function* () {
      const validId = yield this.productRepository.getById(id);
      if (!validId) {
        throw new Error("id is invalid");
      }
      const deleted = yield this.productRepository.softDeleteProduct(id);
      if (!deleted) {
        throw new Error("cannot delete this product");
      }
      return deleted;
    });
  }
};

// src/product/factory/productFactory.ts
var ProductFactory = class {
  static createInstance() {
    const productRepository = new ProductRepository(ProductModel);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);
    return productController;
  }
};
var productFactoryModule = ProductFactory.createInstance();

// src/product/routes/productRoutes.ts
var productRoutes = (0, import_express.Router)();
productRoutes.post("/product/create", productFactoryModule.createProduct.bind(productFactoryModule));
productRoutes.get("/product/list", productFactoryModule.getAll.bind(productFactoryModule));
productRoutes.get("/product/:id", productFactoryModule.getById.bind(productFactoryModule));
productRoutes.put("/product/:id", productFactoryModule.updateProduct.bind(productFactoryModule));
productRoutes.put("/product/delete/:id", productFactoryModule.softDeleteProduct.bind(productFactoryModule));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productRoutes
});
