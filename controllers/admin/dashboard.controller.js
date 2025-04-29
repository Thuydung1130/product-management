const ProductCategory=require("../../models/product-category.model")
const Products=require("../../models/product.model")
const Account=require("../../models/accounts.model")
const User=require("../../models/user.model")
//[GET] /admin/dashboard

module.exports.dashboard=async(req, res) => {
    const statstic={
        categoryProduct:{
            total:0,
            active:0,
            inactive:0,
        },
        product:{
            total: 0,
            active:0,
            inactive:0
        },
        account:{
            total: 0,
            active:0,
            inactive:0
        },
        user:{
            total: 0,
            active:0,
            inactive:0,
        }
    }
    statstic.categoryProduct.total=await ProductCategory.countDocuments({
        delete:false
    })
    statstic.categoryProduct.active=await ProductCategory.countDocuments({
        delete:false,
        status: "active"
    })
    statstic.categoryProduct.inactive=await ProductCategory.countDocuments({
        delete:false,
        status: "inactive"
    })

    statstic.product.total=await Products.countDocuments({
        delete:false
    })
    statstic.product.active=await Products.countDocuments({
        delete:false,
        status: "active"
    })
    statstic.product.inactive=await Products.countDocuments({
        delete:false,
        status: "inactive"
    })

    statstic.account.total=await Account.countDocuments({
        delete:false
    })
    statstic.account.active=await Account.countDocuments({
        delete:false,
        status: "active"
    })
    statstic.account.inactive=await Account.countDocuments({
        delete:false,
        status: "inactive"
    })


    statstic.user.total=await User.countDocuments({
        delete:false
    })
    statstic.user.active=await User.countDocuments({
        delete:false,
        status: "active"
    })
    statstic.user.inactive=await User.countDocuments({
        delete:false,
        status: "inactive"
    })
    res.render("admin/pages/dashboard/index",{
        pageTitle: "trang tong quan",
        statstic:statstic
    });
}