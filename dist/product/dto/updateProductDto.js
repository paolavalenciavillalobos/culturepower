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

// src/product/dto/updateProductDto.ts
var updateProductDto_exports = {};
__export(updateProductDto_exports, {
  UpdateProductDto: () => UpdateProductDto
});
module.exports = __toCommonJS(updateProductDto_exports);
var UpdateProductDto = class {
  constructor(productData) {
    this.name = productData.name, this.value = productData.value, this.amount = productData.amount, this.description = productData.description, this.photo = productData == null ? void 0 : productData.photo;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateProductDto
});
