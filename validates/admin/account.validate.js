module.exports.createPost=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error",`vui long nhap ten`);
        res.redirect("back");
        return ;
    }
    if(!req.body.email){
        req.flash("error",`vui long nhap email`);
        res.redirect("back");
        return ;
    }
    if(!req.body.password){
        req.flash("error",`vui long nhap mat khau`);
        res.redirect("back");
        return ;
    }
    next();
}

module.exports.editPatch=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error",`vui long nhap ten`);
        res.redirect("back");
        return ;
    }
    if(!req.body.email){
        req.flash("error",`vui long nhap email`);
        res.redirect("back");
        return ;
    }
    
    next();
}