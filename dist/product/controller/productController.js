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

// src/product/controller/productController.ts
var productController_exports = {};
__export(productController_exports, {
  ProductController: () => ProductController
});
module.exports = __toCommonJS(productController_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductController
});
