"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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

// src/user/controller/userController.ts
var userController_exports = {};
__export(userController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(userController_exports);

// src/user/validation/createValidatorYup.ts
var yup = __toESM(require("yup"));
var createValidator = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email format."),
  password: yup.string().required("Password is required."),
  photo: yup.string()
});

// src/user/validation/loginValidatorYup.ts
var yup2 = __toESM(require("yup"));
var loginValidator = yup2.object({
  email: yup2.string().required("Email is required").email("Invalid email format."),
  password: yup2.string().required("Password is required.")
});

// src/user/controller/userController.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var UserController = class {
  constructor(userService) {
    this.userService = userService;
  }
  createUser(req, res) {
    return __async(this, null, function* () {
      try {
        console.log(req.file);
        console.log(req.body);
        const { body } = req;
        if (req.file) {
          body.photo = req.file.filename;
        }
        yield createValidator.validate(body, { abortEarly: false });
        const newUser = yield this.userService.createUser(body);
        res.status(200).json(newUser);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  findUserByEmail(req, res) {
    return __async(this, null, function* () {
      try {
        const { email } = req.query;
        const user = yield this.userService.findUserByEmail(email);
        res.status(200).json(user);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  loginUser(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        yield loginValidator.validate(body, { abortEarly: false });
        const loginUser = yield this.userService.loginUser(body);
        res.status(200).json(loginUser);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  getById(req, res) {
    return __async(this, null, function* () {
      try {
        const { headers } = req;
        if (!headers.authorization) {
          throw new Error("token not found");
        }
        const [, token] = headers.authorization.split(" ");
        const tokenDecoded = import_jsonwebtoken.default.decode(token);
        if (typeof tokenDecoded === "string" || !(tokenDecoded == null ? void 0 : tokenDecoded.id)) {
          throw new Error("Invalid token or missing user ID");
        }
        const tokenId = tokenDecoded.id;
        console.log(tokenId);
        req = tokenId;
        const user = yield this.userService.getById(tokenId);
        res.status(200).json(user);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  /*
  async getById(req: Request, res: Response): Promise<void> {
      try{
          const {id} = req.params
          const user =  await this.userService.getById(id)
          res.status(200).json(user)
      }catch(e: any) {
          res.status(500).json(e)
      }
      
  }
  */
  updateUser(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        const updated = yield this.userService.updateUser(id, body);
        res.status(200).json(updated);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  softDelete(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const deleted = yield this.userService.softDelete(id);
        res.status(200).json(deleted);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  //ENVIAR JOIA
  updateJewelAmount(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        const updated = yield this.userService.updateJewelAmount(id, body);
        res.status(200).json(updated);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
  //ATUALIZAR ARRAY DE PRODUCTS DE USUARIO
  updateProductUser(req, res) {
    return __async(this, null, function* () {
      try {
        const { idUser, idProduct } = req.params;
        const updated = yield this.userService.updateProductUser(idUser, idProduct);
        console.log(updated);
        res.status(200).json(updated);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
