const router = require("express").Router()
const Order = require("../models/Order")
const Recipe = require("../models/Recipe")
const isSignedIn = require('../middleware/is-signed-in');


router.get('/', isSignedIn, async(req,res)=>{
    
    const allOrders = await Order.find(req.query).populate('dishes.dish').populate('servedBy')
    res.render('./order/orders.ejs', {allOrders: allOrders})
})

router.post('/create', isSignedIn, async (req,res)=>{
    const addNew = await Order.create(req.body)
    res.redirect("/order")
})

router.get('/create', isSignedIn, async (req,res)=>{
    const recipes = await Recipe.find()
    res.render('./order/newOrder.ejs', {recipes: recipes})
})

router.post('/:id/complete', isSignedIn, async(req,res)=>{
    const editted = await Order.findByIdAndUpdate(req.params.id, {status: "Completed"})
    res.redirect('/order')
})

router.get('/:id', isSignedIn, async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('dishes.dish').populate('servedBy')
    console.log(order)
    res.render('./order/viewOrder.ejs', {order: order})
})

router.post('/:id/delete', isSignedIn, async(req,res)=>{
    const order = await Order.findByIdAndDelete(req.params.id)
    res.redirect('/order')
})

module.exports = router;
