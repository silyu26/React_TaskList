// All api end points are created here in order to keep the server.js clean
const express = require('express')
//create a router instance because we do not have access to the app in server.js
const router = express.Router()
//import the model
const Wish = require('../models/wishModel')
//import the Controller
 const {
    getAllWishes,
    getWish,
    createWish,
    deleteWish,
    updateWish
 } = require('../controllers/wishController')
//router handler
//get all wishes
router.get("/",getAllWishes)
//get wish by id
router.get("/:id",getWish)
//post a wish
router.post("/",createWish)
///delete a wish
router.delete("/:id",deleteWish)
router.patch("/:id",updateWish)
//export the router
module.exports = router