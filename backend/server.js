// .env file would be hidden in the open repository, no space
//dotenv is a package that loads environmental var from the .env file into the  process.env object
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
//create express app
const app = express()
const cors = require('cors')
//looks if a req has some body/data sending to the server, is so then parse and attach it to the request object, so we have access to it in the req handler
app.use(cors())
app.use(express.json())
//import the routes
const wishlistRoutes = require('./routes/wishlistRoute')

//set up global middleware
app.use((req,res,next) => {
    console.log(req.url, req.method)
    next()
})

//set up route handler
app.get('/', (req,res)=>{
    res.json({
        message: "welcome to the app!"
    })
})

//instead of using app, use router for all routes starting with /api/wishlist:
app.use('/api/wishlist',wishlistRoutes)
//connect to db, return a promise
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, ()=>{
        console.log("connected to db and listening on port 5000")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

