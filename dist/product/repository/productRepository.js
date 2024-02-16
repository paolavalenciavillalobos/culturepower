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

// src/product/repository/productRepository.ts
var productRepository_exports = {};
__export(productRepository_exports, {
  ProductRepository: () => ProductRepository
});
module.exports = __toCommonJS(productRepository_exports);
var import_mongoose = require("mongoose");
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
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.productModel.findByIdAndUpdate(id, dataUpdate, { new: true });
      return updated;
    });
  }
  softDeleteProduct(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const deleted = yield this.productModel.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deleted;
    });
  }
  updateAmount(id, amountUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.productModel.findByIdAndUpdate(id, { amount: amountUpdate }, { new: true });
      return updated;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductRepository
});
