
//[get] /
module.exports.index=async(req, res) => {
    
    res.render("Client/pages/home/index",{
        pageTitle:"Trang chủ",
        
    });
}