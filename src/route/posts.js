const express = require('express')
const router = express.Router()
const PostsController = require('../app/controllers/PostsController')

router.get("/store",PostsController.store)
router.get("/",PostsController.index)

module.exports = router