const express = require('express')
const router = express.Router()
const PostsController = require('../app/controllers/PostsController')
const multer  = require('multer')
const path = require('path')
const upload = multer({ dest: './src/public/uploads' })


router.get("/create",PostsController.create)
router.get("/trash",PostsController.trash)
router.post("/store", upload.single('image'), PostsController.store)
router.put("/:id",PostsController.update)
router.patch("/:id/restore",PostsController.restore)
router.delete("/:id",PostsController.destroy)
router.delete("/:id/force",PostsController.forceDestroy)
router.get("/:id/edit",PostsController.edit)
router.get("/",PostsController.index)

module.exports = router