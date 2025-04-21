const ProductCategory = require("../../models/product-category.model");
const { tree } = require("../../helpers/createTree")
module.exports.category =async(req,res,next)=>{
    const productsCategory = await ProductCategory.find({
        delete:false
    })
    const newproductsCategory = tree(productsCategory);
    res.locals.layoutProductsCategory=newproductsCategory;
    //console.log(newproductsCategory)
    next();
}