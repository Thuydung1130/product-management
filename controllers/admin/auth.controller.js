var md5 = require('md5');
const Account = require("../../models/accounts.model")
const systemConfig = require("../../config/system")
//[GET] /admin/auth/login

module.exports.login = (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }
    else {
        res.render("admin/pages/auth/login", {
            pageTitle: "trang đăng nhập"
        });
    }

}

//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        delete: false
    });
    if (!user) {
        req.flash("error", "email ko ton tai");
        res.redirect("back");
        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "sai mat khau");
        res.redirect("back");
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "tai khoan da bi khoa");
        res.redirect("back");
        return;
    }
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

//[GET] /admin/auth/logout

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}