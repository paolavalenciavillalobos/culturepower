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

// src/user/model/userModel.ts
var userModel_exports = {};
__export(userModel_exports, {
  UserModel: () => UserModel
});
module.exports = __toCommonJS(userModel_exports);
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    jewelsAmount: { type: Number, default: 0 },
    products: [{ type: import_mongoose.Types.ObjectId, ref: "Product" }],
    photo: { type: String },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
var UserModel = (0, import_mongoose.model)("User", userSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserModel
});
