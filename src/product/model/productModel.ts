import { InferSchemaType, Schema, Model, model } from "mongoose"

const productSchema = new Schema({
name: {type: String, required: true},
value: {type: Number, required: true},
amount: {type: Number, required: true},
description: {type: String, required: true},
photo: {type: String},
deletedAt: { type: Date,default: null}
}, {
timestamps: true
}
)

export type Product = InferSchemaType<typeof productSchema>

export const ProductModel: Model<Product> = model('Product', productSchema)