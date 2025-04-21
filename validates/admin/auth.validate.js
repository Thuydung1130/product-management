module.exports.loginPost=(req,res,next)=>{
    if(!req.body.email){
        req.flash("error",`vui long nhap email`);
        res.redirect("back");
        return ;
    }
    if(!req.body.password){
        req.flash("error",`vui long nhap password`);
        res.redirect("back");
        return ;
    }
    
    next();
}