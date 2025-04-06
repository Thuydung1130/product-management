const Product = require("../../models/product.model");

const systemConfig = require("../../config/system")
//[get] /admin/products
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
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

    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);
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
    await Product.updateOne({ _id: id }, { status: status });
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
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { delete: true, deletedAt: new Date() });
            req.flash("success", `Đã xóa thành công ${ids.length()} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, {
                    position: position
                })
            }
            req.flash("success", `Đổi vị trí thành công ${ids.length()} sản phẩm`);
            break;

        default:
            break;
    }
    res.redirect("back");
}

//[DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { delete: true, deletedAt: new Date() });
    res.redirect("back");
}

//[GET] /admin/product/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Them moi san pham"
    })
}

//[POST] /admin/product/createPost
module.exports.createPost = async (req, res) => {

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
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
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

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm ",
            product: product
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
    req.body.position= parseInt(req.body.position);
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({
            _id: req.params.id
        },req.body);
        req.flash("success","Cập nhật thành công")
    } catch (error) {
        req.flash("error","Cập nhật thất bại ")
    }
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