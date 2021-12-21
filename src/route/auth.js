const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')

router.post("/login-submit",authController.loginSubmit)
router.get("/login",authController.login)
router.get("/logout",authController.logout)

module.exports = router

