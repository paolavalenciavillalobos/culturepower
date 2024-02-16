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

// src/product/service/productService.ts
var productService_exports = {};
__export(productService_exports, {
  ProductService: () => ProductService
});
module.exports = __toCommonJS(productService_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductService
});
