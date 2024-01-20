import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id: Number,
    products: [{ id: { type: Number, ref: 'productsModel' } }]
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel