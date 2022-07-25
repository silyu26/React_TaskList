// this file is created because we want to avoid too much code in the wishlistRoute file
// instead, implement the controllers here and call them directly in different routes functions in the Route file
const Wish = require('../models/wishModel') 
const mongoose = require('mongoose')

//get all wishes
const getAllWishes = async (req,res) => {  //sort the output according to there creat date in descending order
    const wishes = await Wish.find({}).sort({statue: -1})// pass in empty {} in find to find all items
    res.status(200).json(wishes)
}
//get a single wish
const getWish = async (req,res) => {
    const {id} = req.params // the bracket is neccessary for th id, otherwise it would cause a castError

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such wish"}) //remember to use return in if to end 
    }
    const wish = await Wish.findById(id)
    if(!wish) {
        return res.status(404).json({error: "No Such Wish"})
    }
    res.status(200).json(wish)
}

//create new wish
const createWish = async (req,res) => {
    const {title, content, statue} = req.body //set the req.body that's to be sent and remember to send it in raw JSON format

    try {
        const wish = await Wish.create({title, content, statue})
        res.status(200).json(wish)// notice wish object does not require to be in brackets  
    } catch (error) { //very important to add (error), otherwise is error undefined and could not be used in Homejs
        res.status(400).json({error: error.message})
    }
}
//delete a wish
const deleteWish = async(req,res) => {
    const {id} = req.params //req.body is sth to be POST, req.params is for the route parameters, here it is the id

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such wish"}) //remember to use return in if to end 
    }
    const wish = await Wish.findByIdAndDelete(id) // also ok to use: findOneAndDelete({_id: id})
    if(!wish) { //ensure there is such a wish
        res.status(400).json({error: "no such wish"})
    }
    res.status(200).json(wish) 
}
//update a wish
const updateWish = async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such wish"}) //remember to use return in if to end 
    }
    const wish = await Wish.findOneAndUpdate({_id: id},{
        ...req.body //this allows all possible req bodies and match to update
    })
    if(!wish) {
        res.status(400).json({error: "no such wish"})
    }
    res.status(200).json(wish)
}
//export it
module.exports = {
    createWish,
    getAllWishes,
    getWish,
    deleteWish,
    updateWish
}