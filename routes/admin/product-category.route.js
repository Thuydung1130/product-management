const express = require("express");
const multer = require("multer");


//const storageMulter =require("../../helpers/storageMulter")
const router = express.Router();
const upload = multer();
const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")


router.get('/', controller.index);
router.post("/test", (req, res) => {
    res.send("POST /test OK");
});

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
)

//[GEt] /admin/product-category/create
router.get('/create', controller.create);


router.get('/edit/:id', controller.edit);
router.patch(
    '/edit/:id', 
    upload.single("thumbnail"), 
    uploadCloud.upload, 
    validate.createPost, 
    controller.editPatch
);


router.get('/detail/:id', controller.detail);
router.delete('/delete/:id', controller.deleteItem);
module.exports = router;

