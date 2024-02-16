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

// src/index.ts
var import_express3 = __toESM(require("express"));
var import_dotenv2 = __toESM(require("dotenv"));

// src/database/mongoConnect.ts
var import_mongoose = require("mongoose");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var MongoConnection = class {
  static initialize() {
    try {
      import_mongoose.connection.on("error", (error) => {
        console.log(`connection failed, error ${error}`);
      });
      import_mongoose.connection.on("open", () => {
        console.log(`Successful connection`);
      });
      import_mongoose.connection.on("close", () => {
        console.log(`Disconnect from Mongodb`);
      });
      (0, import_mongoose.connect)(process.env.MONGO_URL);
    } catch (e) {
      console.log(`Failed to connect. Error: ${e}`);
    }
  }
  static finish() {
    import_mongoose.connection.close();
  }
};

// src/user/routes/userRoutes.ts
var import_express = require("express");

// src/product/model/productModel.ts
var import_mongoose2 = require("mongoose");
var productSchema = new import_mongoose2.Schema(
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
var ProductModel = (0, import_mongoose2.model)("Product", productSchema);

// src/product/repository/productRepository.ts
var import_mongoose3 = require("mongoose");
var ProductRepository = class {
  constructor(productModel) {
    this.productModel = productModel;
  }
  createProduct(productData) {
    return __async(this, null, function* () {
      const newProduct = yield this.productModel.create(productData);
      console.log(newProduct);
      return newProduct;
    });
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productModel.find({ deletedAt: null });
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productModel.findById({ _id: id, deletedAt: null });
      return product;
    });
  }
  updateProduct(id, dataUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose3.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.productModel.findByIdAndUpdate(id, dataUpdate, { new: true });
      return updated;
    });
  }
  softDeleteProduct(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose3.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const deleted = yield this.productModel.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deleted;
    });
  }
  updateAmount(id, amountUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose3.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.productModel.findByIdAndUpdate(id, { amount: amountUpdate }, { new: true });
      return updated;
    });
  }
};

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

// src/user/model/userModel.ts
var import_mongoose4 = require("mongoose");
var userSchema = new import_mongoose4.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    jewelsAmount: { type: Number, default: 0 },
    products: [{ type: import_mongoose4.Types.ObjectId, ref: "Product" }],
    photo: { type: String },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
var UserModel = (0, import_mongoose4.model)("User", userSchema);

// src/user/repository/userRepository.ts
var import_mongoose5 = require("mongoose");
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
      if (!(0, import_mongoose5.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.userModel.findByIdAndUpdate(id, dataUpdate, { new: true });
      return updated;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose5.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const deleted = yield this.userModel.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deleted;
    });
  }
  //enviar joias
  updateJewel(id, jewelUpdate) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose5.isValidObjectId)(id)) {
        throw new Error(`error: ${id} is not valid.`);
      }
      const updated = yield this.userModel.findByIdAndUpdate(id, jewelUpdate, { new: true });
      return updated;
    });
  }
  updateProductUser(idUser, idProduct) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose5.isValidObjectId)(idUser)) {
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

// src/user/service/userService.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
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
        const token = import_jsonwebtoken2.default.sign(payload, secretKey, options);
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

// src/user/factory/userFactory.ts
var UserFactory = class {
  static createInstance() {
    const userRepository = new UserRepository(UserModel);
    const productRepository = new ProductRepository(ProductModel);
    const userService = new UserService(userRepository, productRepository);
    const userController = new UserController(userService);
    return userController;
  }
};
var userFactoryModule = UserFactory.createInstance();

// src/middlewares/authenticationMiddleware.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var AuthenticationMiddleware = class {
  static handler(req, res, next) {
    return __async(this, null, function* () {
      const { headers } = req;
      if (!headers.authorization) {
        return res.status(401).json("Token not provided");
      }
      const [, token] = headers.authorization.split(" ");
      try {
        const tokenDecoded = import_jsonwebtoken3.default.verify(token, process.env.JWT_SECRET_KEY);
        console.log(tokenDecoded);
        const tokenDecodedRole = import_jsonwebtoken3.default.decode(token);
        console.log(tokenDecodedRole);
        next();
      } catch (e) {
        res.status(401).json("No authorized");
      }
    });
  }
};

// src/middlewares/multerMiddleware.ts
var import_multer = __toESM(require("multer"));
var import_crypto = require("crypto");
console.log("mensage");
var multerConfig = (0, import_multer.diskStorage)({
  filename(req, file, callback) {
    const extension = file.mimetype.split("/")[1];
    const filename = `${(0, import_crypto.randomUUID)()}.${extension}`;
    console.log(extension, filename);
    callback(null, filename);
  },
  destination(req, file, callback) {
    callback(null, "./uploads");
  }
});
var multerMiddleware = (0, import_multer.default)({ storage: multerConfig });

// src/middlewares/RoleMiddleware.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
var verifyAdmin = (req, res, next) => {
  const { headers } = req;
  if (!headers.authorization) {
    throw new Error("token not found");
  }
  const [, token] = headers.authorization.split(" ");
  const tokenDecoded = import_jsonwebtoken4.default.decode(token);
  console.log("role:", tokenDecoded.role);
  if (!tokenDecoded) {
    throw new Error("cannot decoded token");
  }
  if (tokenDecoded.role === void 0) {
    throw new Error("user role is undefined");
  }
  if (tokenDecoded.role === "admin") {
    next();
  }
  throw new Error("user is not admin");
};

// src/user/routes/userRoutes.ts
var userRoutes = (0, import_express.Router)();
userRoutes.post("/user/create", multerMiddleware.single("photo"), userFactoryModule.createUser.bind(userFactoryModule));
userRoutes.get("/user/findEmail", AuthenticationMiddleware.handler, userFactoryModule.findUserByEmail.bind(userFactoryModule));
userRoutes.post("/user/login", userFactoryModule.loginUser.bind(userFactoryModule));
userRoutes.get("/user/", AuthenticationMiddleware.handler, userFactoryModule.getById.bind(userFactoryModule));
userRoutes.put("/user/:id", AuthenticationMiddleware.handler, multerMiddleware.single("photo"), userFactoryModule.updateUser.bind(userFactoryModule));
userRoutes.put("/user/delete/:id", AuthenticationMiddleware.handler, userFactoryModule.softDelete.bind(userFactoryModule));
userRoutes.put("/user/jewels/:id", AuthenticationMiddleware.handler, verifyAdmin, userFactoryModule.updateJewelAmount.bind(userFactoryModule));
userRoutes.put("/user/:idUser/claims/:idProduct", AuthenticationMiddleware.handler, verifyAdmin, userFactoryModule.updateProductUser.bind(userFactoryModule));

// src/product/routes/productRoutes.ts
var import_express2 = require("express");

// src/product/controller/productController.ts
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

// src/product/service/productService.ts
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

// src/product/factory/productFactory.ts
var ProductFactory = class {
  static createInstance() {
    const productRepository = new ProductRepository(ProductModel);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);
    return productController;
  }
};
var productFactoryModule = ProductFactory.createInstance();

// src/product/routes/productRoutes.ts
var productRoutes = (0, import_express2.Router)();
productRoutes.post("/product/create", productFactoryModule.createProduct.bind(productFactoryModule));
productRoutes.get("/product/list", productFactoryModule.getAll.bind(productFactoryModule));
productRoutes.get("/product/:id", productFactoryModule.getById.bind(productFactoryModule));
productRoutes.put("/product/:id", productFactoryModule.updateProduct.bind(productFactoryModule));
productRoutes.put("/product/delete/:id", productFactoryModule.softDeleteProduct.bind(productFactoryModule));

// src/index.ts
import_dotenv2.default.config();
MongoConnection.initialize();
var app = (0, import_express3.default)();
app.use(import_express3.default.json());
app.use(userRoutes);
app.use(productRoutes);
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
