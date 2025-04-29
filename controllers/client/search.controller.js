const Product=require("../../models/product.model");
const productsHepler=require("../../helpers/products")
//[GET] /search
module.exports.index=async(req,res)=>{
    //console.log("ok");
    const keyword=req.query.keyword;
    let newProducts=[];
    if(keyword){
        const regex=new RegExp(keyword,"i");
        const products=await Product.find({
            title:regex,
            delete:false,
            status:"active"
        })
        newProducts=productsHepler.priceNewProducts(products)
    }
    //console.log(newProducts);
    res.render("Client/pages/search/index",{
        pageTitle: "Kết quả tìm kiếm ",
        keyword:keyword,
        products: newProducts
    })
}