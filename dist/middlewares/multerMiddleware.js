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

// src/middlewares/multerMiddleware.ts
var multerMiddleware_exports = {};
__export(multerMiddleware_exports, {
  multerMiddleware: () => multerMiddleware
});
module.exports = __toCommonJS(multerMiddleware_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  multerMiddleware
});
