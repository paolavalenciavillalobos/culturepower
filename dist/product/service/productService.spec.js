"use strict";
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

// src/product/service/productService.spec.ts
var import_vitest = require("vitest");

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

// src/product/service/productService.spec.ts
var productService = new ProductService(fakeProductRepository);
(0, import_vitest.describe)("ProductService", () => {
  (0, import_vitest.describe)("getById", () => {
    (0, import_vitest.it)("Should return an product", () => __async(exports, null, function* () {
      const product = yield productService.getById(fakeObjectId);
      (0, import_vitest.expect)(product).toEqual(fakeProduct);
    }));
    (0, import_vitest.it)("Should return an error if cannot find an product", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeProductRepository, "getById").mockImplementationOnce(() => Promise.resolve(null));
      (0, import_vitest.expect)(productService.getById(fakeObjectId)).rejects.toThrowError("cannot find this product");
    }));
  });
  (0, import_vitest.describe)("getAll", () => {
    (0, import_vitest.it)("Should return an array of products", () => __async(exports, null, function* () {
      const products = yield productService.getAll();
      (0, import_vitest.expect)(products).toEqual(fakeProductsArray);
    }));
    (0, import_vitest.it)("Should return an error if cannot find any product", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeProductRepository, "getAll").mockImplementationOnce(() => Promise.resolve([]));
      (0, import_vitest.expect)(productService.getAll()).rejects.toThrowError("Dont exist any product yet");
    }));
  });
  (0, import_vitest.describe)("updateProduct", () => {
    (0, import_vitest.it)("Should update a product successfully", () => __async(exports, null, function* () {
      const dataUpdate = {
        name: "new product",
        value: 10,
        amount: 2,
        description: "kjk"
      };
      const updatedProduct = yield productService.updateProduct(fakeObjectId, dataUpdate);
      (0, import_vitest.expect)(updatedProduct).toEqual(fakeProduct);
    }));
    (0, import_vitest.it)("Should throw an error if updateProduct fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeProductRepository, "updateProduct").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(productService.updateProduct(fakeObjectId, fakeProduct)).rejects.toThrow("Product cannot updated");
    }));
  });
  (0, import_vitest.describe)("createProduct", () => {
    (0, import_vitest.it)("Should create a new product", () => __async(exports, null, function* () {
      const dataProduct = {
        name: "nuevoNombreDeUsuario",
        value: 10,
        amount: 2,
        description: "kjk"
      };
      const newProduct = yield productService.createProduct(dataProduct);
      (0, import_vitest.expect)(newProduct).toEqual(fakeProduct);
    }));
  });
  (0, import_vitest.describe)("softDeleteProduct", () => {
    (0, import_vitest.it)("Should return an product", () => __async(exports, null, function* () {
      const existingProduct = yield productService.softDeleteProduct(fakeObjectId);
      (0, import_vitest.expect)(existingProduct).toEqual(fakeProduct);
    }));
    (0, import_vitest.it)("Should throw an error if softDelete fails", () => __async(exports, null, function* () {
      import_vitest.vi.spyOn(fakeProductRepository, "softDeleteProduct").mockResolvedValueOnce(null);
      (0, import_vitest.expect)(productService.softDeleteProduct(fakeObjectId)).rejects.toThrow("cannot delete this product");
    }));
  });
});
