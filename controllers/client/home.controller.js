const Product=require("../../models/product.model")
const productsHepler=require("../../helpers/products")
//[get] /
module.exports.index=async(req, res) => {
    //lay ra sp noi bat
    const productsFeatured=await Product.find({
        featured:"1",
        delete: false,
        status: "active"
    })
    //console.log(productsFeatured);
    //lay ra sp noi bat
    const newProductsFeatured=productsHepler.priceNewProducts(productsFeatured);
    
    //lay ra san pham moi nhat
    const productsNew=await Product.find({
        delete:false,
        status:"active"
    }).sort({position:"desc"}).limit(6);
    const newProductsNew=productsHepler.priceNewProducts(productsNew);
    //lay ra san pham moi nhat
    //console.log(newProductsNew);
    res.render("Client/pages/home/index",{
        pageTitle:"Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
}