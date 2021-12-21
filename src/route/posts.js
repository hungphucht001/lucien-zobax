const express = require('express')
const router = express.Router()
const PostsController = require('../app/controllers/PostsController')

router.get("/create",PostsController.create)
router.get("/trash",PostsController.trash)
router.post("/store",PostsController.store)
router.put("/:id",PostsController.update)
router.delete("/:id",PostsController.destroy)
router.get("/:id/edit",PostsController.edit)
router.get("/",PostsController.index)

module.exports = router