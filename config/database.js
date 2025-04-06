//cat dat mongoose
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL);
//cat dat mongoose

module.exports.connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("susscess");
    }catch(error){
        console.log("error");

    }
}
