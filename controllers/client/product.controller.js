
const Product=require("../../models/product.model")
const ProductCategory=require("../../models/product-category.model")
const productsHepler=require("../../helpers/products")
const productsCategoryHepler=require("../../helpers/productCategory")
//[GET] /products
module.exports.index=async(req, res) => {
    const products=await Product.find({
        status:"active",
        delete: false
    }).sort({position:"desc"});

    const newProducts=productsHepler.priceNewProducts(products);
    //console.log(products);
    res.render("Client/pages/products/index",{
        pageTitle:"Danh sach san pham",
        products: newProducts
    });
}

//[GET] /products/detail/:slugProduct
module.exports.detail=async(req, res) => {
    
    try {
        
        const find = {
            delete: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        const product = await Product.findOne(find);
        //console.log(product);
        if(product.product_category_id){
            const category=await ProductCategory.findOne({
                _id:product.product_category_id,
                status: "active",
                delete: false
            })
            product.category=category;
        }
        product.priceNew=productsHepler.priceNewProduct(product);
        res.render("Client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    }
    catch (error) {
        
        res.redirect(`/products`)
    }

}

//[GET] /products/:slugCategory
module.exports.category=async(req, res) => {
    const category=await ProductCategory.findOne({
        slug: req.params.slugCategory,
        delete: false
    })

    
    const listSubCategory=await productsCategoryHepler.getSubCategory(category.id);
    const listSubCategoryId=listSubCategory.map(item=>item.id);
    const products= await Product.find({
        product_category_id: {$in: [category.id,...listSubCategoryId]},
        delete:false
    }).sort({position:"desc"});
    const newProducts=productsHepler.priceNewProducts(products);
    res.render("Client/pages/products/index",{
        pageTitle: category.title,
        products: newProducts
    });
    

}

