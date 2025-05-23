const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
//[GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        delete: false
    }
    const records = await Role.find(find)
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhom quyen",
        records: records
    });
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/roles/create", {
        pageTitle: "Tao nhom quyen",

    });
}

//[GET] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        let find = {
            _id: id,
            delete: false
        }
        const data = await Role.findOne(find);
        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa nhóm quyền",
            data: data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }

}

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id
        await Role.updateOne({ _id: id }, req.body);
        req.flash("success","Cập nhật nhóm quyên thành công ")
        res.redirect("back");
    } catch (error) {
        req.flash("error","Cập nhật nhóm quyên thất bại")
    }


}


//[GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find={
        delete: false
    };
    const records= await Role.find(find);
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyềnquyền",
        records:records
    })
}

//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch  = async (req, res) => {
    //console.log(req.body);
    const permissions=JSON.parse(req.body.permissions);
    console.log(permissions);
    for (const item of permissions) {
        const id=item.id;
        const permissions=item.permission;
        await Role.updateOne({_id:id},{permissions: permissions});
    }
    req.flash("success","Cập nhật phân quyền thành công");
    res.redirect("back");
}