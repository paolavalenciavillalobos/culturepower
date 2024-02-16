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

// src/product/model/productModel.ts
var productModel_exports = {};
__export(productModel_exports, {
  ProductModel: () => ProductModel
});
module.exports = __toCommonJS(productModel_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductModel
});
