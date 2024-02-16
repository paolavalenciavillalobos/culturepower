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

// src/product/__mocks__/fakeProductRepository.ts
var fakeProductRepository_exports = {};
__export(fakeProductRepository_exports, {
  fakeProductRepository: () => fakeProductRepository
});
module.exports = __toCommonJS(fakeProductRepository_exports);

// src/__mocks__/fakeObjectId.ts
var fakeObjectId = "507f1f77bcf86cd799439011";

// src/product/__mocks__/fakeProduct.ts
var fakeProduct = {
  _id: fakeObjectId,
  name: "cellphone",
  value: 2e3,
  amount: 3,
  description: "unknown brand",
  photo: "jhhskakkja.jpg",
  deletedAt: null,
  createdAt: /* @__PURE__ */ new Date(),
  updatedAt: /* @__PURE__ */ new Date()
};
var fakeProductsArray = [
  {
    _id: fakeObjectId,
    name: "cellphone",
    value: 2e3,
    amount: 3,
    description: "unknown brand",
    photo: "jhhskakkja.jpg",
    deletedAt: null,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  },
  {
    _id: fakeObjectId,
    name: "cellphone",
    value: 2e3,
    amount: 3,
    description: "unknown brand",
    photo: "jhhskakkja.jpg",
    deletedAt: null,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  },
  {
    _id: fakeObjectId,
    name: "cellphone",
    value: 2e3,
    amount: 3,
    description: "unknown brand",
    photo: "jhhskakkja.jpg",
    deletedAt: null,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  }
];

// src/product/__mocks__/fakeProductRepository.ts
var fakeProductRepository = {
  createProduct() {
    return Promise.resolve(fakeProduct);
  },
  getAll() {
    return Promise.resolve(fakeProductsArray);
  },
  getById() {
    return Promise.resolve(fakeProduct);
  },
  updateProduct() {
    return Promise.resolve(fakeProduct);
  },
  softDeleteProduct() {
    return Promise.resolve(fakeProduct);
  },
  updateAmount() {
    return Promise.resolve(fakeProduct);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeProductRepository
});
