"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/user/service/userService.ts
var userService_exports = {};
__export(userService_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(userService_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var UserService = class {
  constructor(userRepository, productRepository) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
  }
  //LOGICA DA FOTO
  createUser(userData) {
    return __async(this, null, function* () {
      const existingUser = yield this.userRepository.findUserByEmail(userData.email);
      console.log(existingUser);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      userData.password = yield import_bcrypt.default.hash(userData.password, 5);
      const newUser = yield this.userRepository.createUser(userData);
      console.log(userData.role);
      if (!newUser) {
        throw new Error("create user failed");
      }
      return newUser;
    });
  }
  findUserByEmail(email) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("cannot find this user email");
      }
      return user;
    });
  }
  loginUser(loginData) {
    return __async(this, null, function* () {
      try {
        const userLogin = yield this.findUserByEmail(loginData.email);
        if (!userLogin || !userLogin.password) {
          throw new Error("User not found.");
        }
        const userPassword = userLogin.password;
        const validPasswordUser = yield import_bcrypt.default.compare(loginData.password, userPassword);
        if (!validPasswordUser) {
          throw new Error("Invalid email/password.");
        }
        userLogin.password = null;
        delete userLogin.password;
        console.log(userLogin);
        const payload = __spreadValues({}, userLogin);
        const secretKey = process.env.JWT_SECRET_KEY;
        const options = { expiresIn: "1h" };
        const token = import_jsonwebtoken.default.sign(payload, secretKey, options);
        return token;
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getById(id);
      if (!user) {
        throw new Error("cannot find this user");
      }
      return user;
    });
  }
  updateUser(id, dataUpdate) {
    return __async(this, null, function* () {
      const validId = yield this.userRepository.getById(id);
      if (!validId) {
        throw new Error("id is invalid");
      }
      const updated = yield this.userRepository.updateUser(id, dataUpdate);
      if (!updated) {
        throw new Error("User cannot updated");
      }
      return updated;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      const validId = yield this.userRepository.getById(id);
      if (!validId) {
        throw new Error("id is invalid");
      }
      const deleted = yield this.userRepository.softDelete(id);
      if (!deleted) {
        throw new Error("cannot delete this user");
      }
      return deleted;
    });
  }
  //enviar joia
  updateJewelAmount(id, jewelUpdate) {
    return __async(this, null, function* () {
      const validId = yield this.userRepository.getById(id);
      if (!validId) {
        throw new Error("id is invalid");
      }
      const updated = yield this.userRepository.updateJewel(id, jewelUpdate);
      if (!updated) {
        throw new Error("User cannot updated");
      }
      return updated;
    });
  }
  //resgatar produto/atualizar array de produtos em usuario
  updateProductUser(idUser, idProduct) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getById(idUser);
      if (!user) {
        throw new Error("id is invalid");
      }
      const product = yield this.productRepository.getById(idProduct);
      if (!product) {
        throw new Error("Product ID is invalid or does not exist");
      }
      if (product.amount < 1) {
        throw new Error("Product is out of stock");
      }
      const jewelsAmount = user.jewelsAmount;
      if (jewelsAmount < product.value) {
        throw new Error("Insufficient jewels");
      }
      const updateAmount = product.amount - 1;
      const updatedProduct = yield this.productRepository.updateAmount(idProduct, updateAmount);
      if (!updatedProduct) {
        throw new Error("Failed to update product");
      }
      const newJewelsAmount = jewelsAmount - product.value;
      const updatedUserJewels = yield this.userRepository.updateJewel(idUser, { jewelsAmount: newJewelsAmount });
      if (!updatedUserJewels) {
        throw new Error("Failed to update jewels on user");
      }
      const updated = yield this.userRepository.updateProductUser(idUser, idProduct);
      if (!updated) {
        throw new Error("cannot updated Product array from user");
      }
      console.log(updated);
      return updated;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
