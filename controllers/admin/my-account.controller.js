const md5=require("md5");
const Account=require("../../models/accounts.model")
const mongoose = require('mongoose');

//[GET] /admin/my-account
module.exports.index=async(req, res)=>{
    res.render("admin/pages/my-account/index"),{
        pageTitle:"Thông tin cá nhân"
    }
}
//[GET] /admin/my-account/edit
module.exports.edit=async(req, res)=>{
    res.render("admin/pages/my-account/edit"),{
        pageTitle:"Chỉnh sửa thông tin cá nhân"
    }
}

//[PATCH] /admin/my-account/edit
module.exports.editPatch=async(req, res)=>{
    //console.log(req.body);
    const id = res.locals.user.id
    const emailExits = await Account.findOne({
        email: req.body.email,
        delete: false,
        _id:{ $ne: new mongoose.Types.ObjectId(id) }
    })
    if (emailExits) {
        req.flash("error","email da ton tai");
        res.redirect("back");
    } else {
        
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password;
        }
        await Account.updateOne({ _id: id }, req.body);
        req.flash("success","cap nhat thanh cong");
        
    }
    res.redirect("back")
}