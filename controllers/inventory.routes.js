const router = require("express").Router()
const Inventory = require("../models/Inventory")

router.get('/',(req,res)=>{
    const inventory = Inventory.find()
    res.render('inventory.ejs', {inventory: inventory})
})

router.post('/create', async (req,res)=>{
    const addNew = await Inventory.create(req.body)
    res.redirect("/")
})

router.get('/create',(req,res)=>{
    res.render('newItem.ejs')
})


module.exports = router;
