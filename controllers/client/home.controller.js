//[get] /
module.exports.index=(req, res) => {
    res.render("Client/pages/home/index",{
        pageTitle:"Trang chu"
    });
}