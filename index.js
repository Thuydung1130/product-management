const express = require('express')
const methodOverride=require("method-override");
const bodyParser=require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');


require("dotenv").config();


const database=require("./config/database");
database.connect();

const systemConfig=require("./config/system")

//cau hinh route
const routeAdmin= require("./routes/admin/index.route");
const route= require("./routes/client/index.route");

const app = express()
const port = process.env.PORT;

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended:false}));

//cau hinh pug
app.set("views", `${__dirname}/views`);
app.set("view engine","pug");

//flash
// Sử dụng cookie-parser đúng cách
app.use(cookieParser("JHGJKLKLGFLJK"));

// Sử dụng express-session đúng cách
app.use(session({
    cookie: { maxAge: 60000 } // Thời gian hết hạn session (60 giây)
}));

// Sử dụng flash đúng cách
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash(); // Lưu messages vào res.locals để dùng trong Pug
  next();
});

//flash

// app Locals variable
app.locals.prefixAdmin=systemConfig.prefixAdmin;

//cau hinh file tinh
app.use(express.static(`${__dirname}/public`));

//cau hinh route
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})