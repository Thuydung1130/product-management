const express=require("express");
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")
const multer = require('multer')
const upload = multer()
const validate = require("../../validates/admin/account.validate")
const router=express.Router();
const controller=require("../../controllers/admin/account.controller")
router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);

router.get('/edit/:id',controller.edit);

router.patch('/edit/:id',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch);

module.exports = router;