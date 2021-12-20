const express = require('express')
const router = express.Router()
const accountsController = require('../app/controllers/AccountsController')

router.post("/login-submit",accountsController.a)
router.get("/login",accountsController.login)

module.exports = router