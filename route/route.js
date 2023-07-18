const router= require('express').Router()
const {signup,bill}=require("../controller/controller")


router.post('/user/signup',signup)
router.post('/user/bill',bill)
module.exports=router