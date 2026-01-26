const router = require("express").Router()
const Order = require("../models/Order")

router.get('/',(req,res)=>{
    const allOrders = Order.find()
    console.log(allOrders)
    res.render('orders.ejs', {allOrders: allOrders})
})

router.post('/create', async (req,res)=>{
    console.log(req.body)
    const addNew = await Order.create(req.body)
    console.log(addNew)
    res.redirect("/")
})

router.get('/create',(req,res)=>{
    res.render('newOrder.ejs')
})


module.exports = router;
