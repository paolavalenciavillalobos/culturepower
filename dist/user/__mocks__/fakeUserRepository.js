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

// src/user/__mocks__/fakeUserRepository.ts
var fakeUserRepository_exports = {};
__export(fakeUserRepository_exports, {
  fakeUserRepository: () => fakeUserRepository
});
module.exports = __toCommonJS(fakeUserRepository_exports);

// src/__mocks__/fakeObjectId.ts
var fakeObjectId = "507f1f77bcf86cd799439011";

// src/user/__mocks__/fakeUser.ts
var fakeUser = {
  _id: fakeObjectId,
  name: "ramdomUser",
  email: "ramdomemail@email.com",
  password: "898494399304",
  jewelsAmount: 3e4,
  products: [],
  photo: "kiejiroirbjkegr.jpg",
  role: "client",
  deletedAt: null,
  createdAt: /* @__PURE__ */ new Date(),
  updatedAt: /* @__PURE__ */ new Date()
};

// src/user/__mocks__/fakeUserRepository.ts
var fakeUserRepository = {
  findUserByEmail() {
    return Promise.resolve(fakeUser);
  },
  getById() {
    return Promise.resolve(fakeUser);
  },
  createUser() {
    return Promise.resolve(fakeUser);
  },
  updateUser() {
    return Promise.resolve(fakeUser);
  },
  updateJewel() {
    return Promise.resolve(fakeUser);
  },
  softDelete() {
    return Promise.resolve(fakeUser);
  },
  updateProductUser() {
    return Promise.resolve(fakeUser);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeUserRepository
});
