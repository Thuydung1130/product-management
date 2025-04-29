const Cart=require("../../models/cart.model")
module.exports.cartId=async(req,res,next)=>{
    if(!req.cookies.cartId){
        //Tao gio hang
        const cart= new Cart({products:[]});
        await cart.save();
        console.log(cart);
        const expiresCookie= 365*24*60*60*1000
        res.cookie("cartId",cart.id,{
            expires:new Date(Date.now()+expiresCookie)
        });
    }else{
        //lay ra thoi
        const cart=await Cart.findOne({
            _id: req.cookies.cartId
        });
        const totalQuantity=cart.products.reduce((sum,item)=>sum+item.quantity,0);
        cart.totalQuantity=totalQuantity;
        res.locals.miniCart=cart;
    }
    next();
}