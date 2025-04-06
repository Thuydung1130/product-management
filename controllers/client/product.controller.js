
const Product=require("../../models/product.model")

//[GET] /products
module.exports.index=async(req, res) => {
    const products=await Product.find({
        status:"active",
        delete: false
    }).sort({position:"desc"});

    const newProducts=products.map(item=>{
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    //console.log(products);
    res.render("Client/pages/products/index",{
        pageTitle:"Danh sach san pham",
        products: newProducts
    });
}

//[GET] /products/detail
module.exports.detail=async(req, res) => {
    
    try {
        
        const find = {
            delete: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    }
    catch (error) {
        
        res.redirect(`/products`)
    }

}
