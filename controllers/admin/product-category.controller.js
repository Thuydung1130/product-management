const { prefixAdmin } = require("../../config/system")
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system")
const { tree } = require("../../helpers/createTree")
//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    let find = {
        delete: false,

    }

    const records = await ProductCategory.find(find)
    const newRecords = tree(records);
    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh muc san pham",
        records: newRecords

    })
}

//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    let find = {
        delete: false
    };
    const records = await ProductCategory.find(find);
    const newRecords = tree(records);
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

//[GET] /admin/product-category/edit/id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ProductCategory.findOne({
            _id: id,
            delete: false
        })
        const records = await ProductCategory.find({
            delete: false
        });
        const newRecords = tree(records);
        res.render("admin/pages/product-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

}

//[PATCH] /admin/product-category/edit/id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    await ProductCategory.updateOne({
        _id: id
    }, req.body);
    res.redirect("back");
}

//[GET] /admin/product-category/detail/:id
module.exports.detail = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    
    const data = await ProductCategory.findOne({
        _id: id,
        delete: false
    })
    const parent=await ProductCategory.findOne({
        _id: data.parent_id,
        delete: false
    })
    if(parent){
        data.parent_id=parent.title
    }
    res.render("admin/pages/product-category/detail", {
        pageTitle: "Chi tiet danh mục sản phẩm",       
        data:data
    })   
}


//[DELATE] /admin/product-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await ProductCategory.updateOne({ _id: id }, { delete: true, deletedAt: new Date() });
    res.redirect("back");
}

