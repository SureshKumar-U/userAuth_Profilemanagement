const express = require('express')
const router = express.Router()
const {getUserprofile,updateUserProfile}= require("../controllers/profileControllers")

router.get("/",getUserprofile)
router.put("/:id", updateUserProfile)

module.exports = router