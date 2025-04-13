const { prefixAdmin } = require("../../config/system")
const ProductCategory=require("../../models/product-category.model");
const systemConfig = require("../../config/system")
const {tree}=require("../../helpers/createTree")
//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    let find = {
        delete: false,

    }
    
    const records = await ProductCategory.find(find)
    const newRecords=tree(records);
    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh muc san pham",
        records: newRecords

    })
}

//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    let find={
        delete: false
    };
    

    const records= await ProductCategory.find(find);
    
    const newRecords=tree(records);
    res.render("admin/pages/product-category/create", {
        pageTitle: "tao Danh muc san pham",
        records: newRecords

    })
}

//[POST] /admin/products-category/create

module.exports.createPost = async (req, res) => {
    console.log(req.body);
    if (req.body.position == "") {
            const countProducts = await ProductCategory.countDocuments();
            //console.log(countProducts);
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position)
        }
    const record = new ProductCategory(req.body)
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}