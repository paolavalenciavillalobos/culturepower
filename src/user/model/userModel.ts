import { InferSchemaType, Schema, Model, model, Types } from "mongoose"

const userSchema = new Schema({
name: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true},
jewelsAmount: {type: Number},
products: {type: Types.ObjectId, ref: 'Product', required: true },
photo: {type: String},
deletedAt: { type: Date,default: null}
}, {
timestamps: true
}
)

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)