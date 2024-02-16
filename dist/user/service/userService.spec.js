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

// src/user/service/userService.ts
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

// src/user/service/userService.spec.ts
var import_vitest = require("vitest");
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_config = require("dotenv/config");
var userService = new UserService(fakeUserRepository, fakeProductRepository);
(0, import_vitest.describe)("UserService", () => {
  (0, import_vitest.describe)("getById", () => {
    (0, import_vitest.it)("Should return an user", () => __async(exports, null, function* () {
      const user = yield userService.getById(fakeObjectId);
      (0, import_vitest.expect)(user).toEqual(fakeUser);
    }));
    (0, import_vitest.it)("Should return an error if cannot find an user", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "getById").mockImplementationOnce(() => Promise.resolve(null));
      (0, import_vitest.expect)(userService.getById(fakeObjectId)).rejects.toThrowError("cannot find this user");
    }));
  });
  (0, import_vitest.describe)("findUserByEmail", () => {
    (0, import_vitest.it)("should return an email", () => __async(exports, null, function* () {
      const newEmail = "nuevoCorreoElectronico@example.com";
      const usuario = yield userService.findUserByEmail(newEmail);
      (0, import_vitest.expect)(usuario == null ? void 0 : usuario.email).toEqual(fakeUser.email);
    }));
    (0, import_vitest.it)("Should return an error if cannot find an email", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "findUserByEmail").mockImplementationOnce(() => Promise.resolve(null));
      (0, import_vitest.expect)(userService.findUserByEmail(fakeUser.email)).rejects.toThrowError("cannot find this user email");
    }));
  });
  (0, import_vitest.describe)("updateUser", () => {
    (0, import_vitest.it)("Should update a user successfully", () => __async(exports, null, function* () {
      const dataUpdate = {
        name: "nuevoNombreDeUsuario",
        email: "nuevoCorreoElectronico@example.com"
      };
      const updatedUser = yield userService.updateUser(fakeObjectId, dataUpdate);
      (0, import_vitest.expect)(updatedUser).toEqual(fakeUser);
    }));
    (0, import_vitest.it)("Should throw an error if updateUser fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "updateUser").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(userService.updateUser(fakeObjectId, fakeUser)).rejects.toThrow("User cannot updated");
    }));
  });
  (0, import_vitest.describe)("createUser", () => {
    (0, import_vitest.it)("Should return an user", () => __async(exports, null, function* () {
      const dataUser = {
        name: "nuevoNombreDeUsuario",
        email: "nuevoCorreoElectronico@example.com",
        password: "8777898"
      };
      import_vitest.vi.spyOn(fakeUserRepository, "findUserByEmail").mockResolvedValueOnce(null);
      const newUser = yield userService.createUser(dataUser);
      (0, import_vitest.expect)(newUser).toEqual(fakeUser);
    }));
    (0, import_vitest.it)("Should throw an error if createUser fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "findUserByEmail").mockResolvedValueOnce(null);
      import_vitest.vi.spyOn(fakeUserRepository, "createUser").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(userService.createUser(fakeUser)).rejects.toThrow("create user failed");
    }));
  });
  (0, import_vitest.describe)("softDelete", () => {
    (0, import_vitest.it)("Should return an user", () => __async(exports, null, function* () {
      const existingUser = yield userService.softDelete(fakeObjectId);
      (0, import_vitest.expect)(existingUser).toEqual(fakeUser);
    }));
    (0, import_vitest.it)("Should throw an error if softDelete fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "softDelete").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(userService.softDelete(fakeObjectId)).rejects.toThrow("cannot delete this user");
    }));
  });
  (0, import_vitest.describe)("updateJewelAmount", () => {
    (0, import_vitest.it)("Should update a user jewels amount successfully", () => __async(exports, null, function* () {
      const jewelsAmount = { jewelsAmount: 10 };
      const updatedJewelsAmount = yield userService.updateJewelAmount(fakeObjectId, jewelsAmount);
      (0, import_vitest.expect)(updatedJewelsAmount).toEqual(fakeUser);
    }));
    (0, import_vitest.it)("Should throw an error if updateJewelsAmount fails", () => __async(exports, null, function* () {
      const jewelsAmount = { jewelsAmount: 10 };
      import_vitest.vi.spyOn(fakeUserRepository, "updateJewel").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(userService.updateJewelAmount(fakeObjectId, jewelsAmount)).rejects.toThrow("User cannot updated");
    }));
  });
  (0, import_vitest.describe)("loginUser", () => {
    (0, import_vitest.it)("Should login an user", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(import_bcrypt2.default, "compare").mockResolvedValueOnce(true);
      const loginUser = yield userService.loginUser(fakeUser);
      (0, import_vitest.expect)(loginUser).toBeDefined();
    }));
    (0, import_vitest.it)("Should throw an error if loginUser fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "findUserByEmail").mockRejectedValueOnce(new Error("error"));
      (0, import_vitest.expect)(userService.loginUser(fakeUser)).rejects.toThrow("error");
    }));
  });
  (0, import_vitest.describe)("updateProductUser", () => {
    (0, import_vitest.it)("Should update array product user", () => __async(exports, null, function* () {
      const updateProductUser = yield userService.updateProductUser(fakeObjectId, fakeObjectId);
      (0, import_vitest.expect)(updateProductUser).toEqual(fakeUser);
    }));
    (0, import_vitest.it)("Should throw an error if updateProductUser fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeUserRepository, "updateProductUser").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(userService.updateProductUser(fakeObjectId, fakeObjectId)).rejects.toThrow("cannot updated Product array from user");
    }));
  });
});
