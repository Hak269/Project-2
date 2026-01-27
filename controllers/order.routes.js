const router = require("express").Router()
const Order = require("../models/Order")

router.get('/',(req,res)=>{
    const allOrders = Order.find()
    console.log(allOrders)
    res.render('orders.ejs', {allOrders: allOrders})
})

router.post('/create', async (req,res)=>{
    const addNew = await Order.create(req.body)
    res.redirect("/")
})

router.get('/create',(req,res)=>{
    const recipes = Recipe.find()
    res.render('newOrder.ejs', {recipes: recipes})
})


module.exports = router;
