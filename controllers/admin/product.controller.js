const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system")
const Account = require("../../models/accounts.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const { tree } = require("../../helpers/createTree")

//[get] /admin/products
module.exports.index = async (req, res) => {

    //daon nay
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        delete: false,

    }
    if (req.query.status) {
        find.status = req.query.status;
    }

    //search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        req.query,
        countProducts
    )


    //pagination
    //sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.posotion = "desc";
    }
    //sort
    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);
    for (const product of products) {
        //lay re thong tin nguoi tao
        const user = await Account.findOne({
            _id: product.createdBy.account_id
        })
        if (user) {
            //console.log(user.fullName);
            product.accountFullname = user.fullName
        }
        //console.log(product.accountFullname);
        //lay ra thong tin ng cap nhat gan nhat
        const updatedBy= product.updatedBy[product.updatedBy.length-1];
        //console.log(updatedBy);
        if(updatedBy){
            const userUpdated=await Account.findOne({
                _id: updatedBy.account_id
            })
            
            updatedBy.accountFullname=userUpdated.fullName;
            //console.log(updatedBy.accountFullname);
        }
        
    }
    res.render("admin/pages/products/index", {
        pageTitle: "Trang tong quan",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
        messages: req.flash(),

    })
}

//[path] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    const updatedBy={
        account_id:res.locals.user.id,
        updateAt: new Date()
    }
    await Product.updateOne({ _id: id }, {
         status: status ,
         $push:{updatedBy:updatedBy}
        });
    // res.render("admin/pages/products/index", { 

    //     messages: req.flash("success","cap nhat trang thai thanh cong") || {} // ✅ Truyền flash messages vào view
    // });
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect("back");
}

//[patch] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    const updatedBy={
        account_id:req.locals.user.id,
        updateAt: new Date()
    }
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "active",
                $push:{updatedBy:updatedBy} 
            });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, {
                 status: "inactive",
                 $push:{updatedBy:updatedBy} 
                });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);

            break;
        case "delete-all":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    delete: true,
                    deletedBy: {
                        account_id: res.locals.user.id,
                        deletedAt: new Date()
                    }
                }
                // { _id: { $in: ids } },
                //  { delete: true, deletedAt: new Date() }
            );
            req.flash("success", `Đã xóa thành công  sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, {
                    position: position,
                    $push:{updatedBy:updatedBy}
                })
            }
            req.flash("success", `Đổi vị trí thành công  sản phẩm`);
            break;

        default:
            break;
    }
    res.redirect("back");
}

//[DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
        { _id: id },
        {
            delete: true,
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
        });
    res.redirect("back");
}

//[GET] /admin/product/create
module.exports.create = async (req, res) => {
    let find = {
        delete: false
    };
    const category = await ProductCategory.find(find)
    const newCategory = tree(category);
    res.render("admin/pages/products/create", {
        pageTitle: "Them moi san pham",
        category: newCategory
    })
}

//[POST] /admin/product/createPost
module.exports.createPost = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end()
    req.body.price = parseInt(req.body.price)
    req.body.discountPercent = parseInt(req.body.discountPercent)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        //console.log(countProducts);
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }
    req.body.createdBy = {
        account_id: res.locals.user.id
    }

    const product = new Product(req.body)
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
//[get] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {

        console.log(req.params.id);
        const find = {
            delete: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);

        const category = await ProductCategory.find({
            delete: false
        })
        const newCategory = tree(category);
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm ",
            product: product,
            category: newCategory
        })
    }
    catch (error) {

        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }


}

//[Patch] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
    //console.log(req.body)

    req.body.price = parseInt(req.body.price)
    req.body.discountPercent = parseInt(req.body.discountPercent)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const updatedBy={
        account_id:res.locals.user.id,
        updateAt: new Date()
    }
    await Product.updateOne({
        _id: req.params.id
    },{
        ...req.body,
        $push:{updatedBy:updatedBy}
    });
    req.flash("success", "Cập nhật thành công")
    // try {
        
    // } catch (error) {
    //     req.flash("error", "Cập nhật thất bại ")
    // }
    res.redirect("back");

}


//[get] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {

        const find = {
            delete: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    }
    catch (error) {

        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }


}