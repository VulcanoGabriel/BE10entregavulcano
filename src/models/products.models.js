import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number,
    category: Number,
    status: Boolean,
    id: Number
})

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model("products", productsSchema)

export default productsModel