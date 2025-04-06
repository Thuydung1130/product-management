const { default: mongoose } = require("mongoose");
const slug=require("mongoose-slug-updater");
mongoose.plugin(slug)
const productSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        price:Number,
        discountPercentage:Number,
        stock:Number,
        status:String,
        position:Number,
        slug:{
            type: String,
            slug: "title",
            unique: true
        },
        delete:{
            type: Boolean,
            default: false
        },
        thumbnail:String,
        deletedAt: Date
    },{
        timestamps: true
    }
)
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;