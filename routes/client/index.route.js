const categoryMiddleware=require("../../middlewares/client/category.middleware")
const cartMiddleware=require("../../middlewares/client/cart.middleware")
const userMiddleware=require("../../middlewares/client/user.middleware")
const settingMiddleware=require("../../middlewares/client/setting.middleware")
const productRoutes =require("./product.route");
const searchRoute=require("./search.route");
const homeRoutes=require("./home.route");
const cartRoute=require("./cart.route");
const checkoutRoute=require("./checkout.route")
const userRoute=require("./user.route")
module.exports=(app)=>{
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);
    app.use(cartMiddleware.cartId);
    app.use(categoryMiddleware.category);
    app.use('/', homeRoutes);
    app.use('/products',productRoutes);
    app.use('/search',searchRoute);
    app.use('/cart',cartRoute);
    app.use('/checkout',checkoutRoute);
    app.use('/user',userRoute);

}