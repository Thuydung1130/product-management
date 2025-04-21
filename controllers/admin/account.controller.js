var md5 = require('md5');
const Account = require("../../models/accounts.model")
const Role = require("../../models/role.model")
const mongoose = require('mongoose');

const systemConfig = require("../../config/system")
//[GET] /admin/account
module.exports.index = async (req, res) => {
    let find = {
        delete: false
    }
    const records = await Account.find(find).select("-password -token");
    for (const record of records) {
        const role = await Role.findOne({
            delete: false,
            _id: record.role_id
        })
        record.role = role;
    }
    console.log(records);
    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản ",
        records: records
    });
}

//[GET] /admin/account/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        delete: false
    });
    //console.log(roles);
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản ",
        roles: roles
    });
}

//[POST] /admin/account/createPost
module.exports.createPost = async (req, res) => {
    const emailExits = await Account.findOne({
        email: req.body.email,
        delete: false
    })
    if (emailExits) {
        req.flash("error", "email da ton tai");
        res.redirect("back");
    } else {
        req.body.password = md5("req.body.password");
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }

}

//[GET] /admin/account/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        delete: false,
        _id: req.params.id
    }
    try {
        const data = await Account.findOne(find);
        console.log(data);
        const roles = await Role.find({
            delete: false
        })
        res.render("admin/pages/accounts/edit.pug", {
            pageTitle: "Chỉnh sửa tài khoảnkhoản",
            data: data,
            roles: roles
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}


//[PATCH] /admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
    console.log(req.body);
    const id = req.body.id
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
        res.redirect("back");
    }

}