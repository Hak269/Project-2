const router = require("express").Router()
const Order = require("../models/Order")
const Recipe = require("../models/Recipe")
const isSignedIn = require('../middleware/is-signed-in');
const isAllowed = require('../middleware/check-role');



router.get('/', isSignedIn, isAllowed(['admin', 'server', 'chef']) ,async(req,res)=>{
    
    const allOrders = await Order.find(req.query).populate('dishes.dish').populate('servedBy')
    console.log(allOrders)
    res.render('./order/orders.ejs', {allOrders: allOrders})
})

router.post('/create', isSignedIn, isAllowed(['admin', 'server']), async (req,res)=>{
    const addNew = await Order.create(req.body)
    res.redirect("/order")
})

router.get('/create', isSignedIn, isAllowed(['admin', 'server']), async (req,res)=>{
    const recipes = await Recipe.find()
    res.render('./order/newOrder.ejs', {recipes: recipes})
})

router.post('/:id/complete', isSignedIn, isAllowed(['admin', 'server']), async(req,res)=>{
    const editted = await Order.findByIdAndUpdate(req.params.id, {status: "Completed"})
    res.redirect('/order')
})

router.get('/:id', isSignedIn, isAllowed(['admin', 'server', 'chef']), async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('dishes.dish').populate('servedBy')
    console.log(order)
    res.render('./order/viewOrder.ejs', {order: order})
})

router.post('/:id/delete', isSignedIn, isAllowed(['admin', 'server']), async(req,res)=>{
    const order = await Order.findByIdAndDelete(req.params.id)
    res.redirect('/order')
})

module.exports = router;
