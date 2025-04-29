const { default: mongoose } = require("mongoose");
const generate=require("../helpers/generate")

const userSchema = new mongoose.Schema(
    {
        fullName:String,
        email: String,
        password: String,
        tokenUser:{
            type:String,
            default:generate.generateRamdonString(20)
        },
        phone: String,
        avatar:String,
        
        status: {
            type:String,
            default:"active"
        },
        delete:{
            type: Boolean,
            default: false
        },
        
        deletedAt: Date
    },{
        timestamps: true
    }
)
const User = mongoose.model("user", userSchema, "users");
module.exports = User;