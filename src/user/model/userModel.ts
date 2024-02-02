import { InferSchemaType, Schema, Model, model, Types } from "mongoose"

const userSchema = new Schema({
name: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true},
jewelsAmount: {type: Number, default: 0},
products: [{type: Types.ObjectId, ref: 'Product'}],
photo: {type: String},
role: {type: String, enum: ['client', 'admin'], default: 'client'},
deletedAt: { type: Date,default: null}
}, {
timestamps: true
}
)

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)