const router = require("express").Router()
const Order = require("../models/Order")

router.get('/',(req,res)=>{
    const allOrders = Order.find()
    res.render('orders.ejs', allOrders)
})

router.post('/new',(req,res)=>{
    const addNew = Order.create(req.body)
    res.redirect("Orders/")
})

router.get('/create',(req,res)=>{
    res.render('orders.ejs')
})


module.exports = router;
