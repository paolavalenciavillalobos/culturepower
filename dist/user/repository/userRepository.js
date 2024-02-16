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

// src/user/repository/userRepository.ts
var userRepository_exports = {};
__export(userRepository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(userRepository_exports);
var import_mongoose = require("mongoose");
var UserRepository = class {
  constructor(userModel) {
    this.userModel = userModel;
  }
  createUser(userData) {
    return __async(this, null, function* () {
      const newUser = yield this.userModel.create(userData);
      return newUser;
    });
  }
  findUserByEmail(email) {
    return __async(this, null, function* () {
      const user = yield this.userModel.findOne({ email });
      return user;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const user = yield this.userModel.findById({ _id: id, deletedAt: null });
      return user;
    });
  }
  updateUser(id, dataUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.userModel.findByIdAndUpdate(id, dataUpdate, { new: true });
      return updated;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const deleted = yield this.userModel.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deleted;
    });
  }
  //enviar joias
  updateJewel(id, jewelUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.userModel.findByIdAndUpdate(id, jewelUpdate, { new: true });
      return updated;
    });
  }
  updateProductUser(idUser, idProduct) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(idUser)) {
        throw new Error(`error: ${idUser} is not valid.`);
      }
      const updatedUser = yield this.userModel.findByIdAndUpdate(
        idUser,
        { $push: { products: idProduct } },
        { new: true }
      );
      console.log(updatedUser);
      return updatedUser;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});
