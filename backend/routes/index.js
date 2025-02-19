const express = require('express');
const userRoute = require("./user")
const {authMiddleware} = require('../middleware')
const accountRoute = require("./account")
const router = express.Router()

router.use('/user',userRoute)
router.use('/account',authMiddleware,accountRoute)

module.exports = router

