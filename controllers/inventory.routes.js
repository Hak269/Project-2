const router = require("express").Router()
const Inventory = require("../models/Inventory")

router.get('/',(req,res)=>{
    const inventory = Inventory.find()
    res.render('inventory.ejs', {inventory: inventory})
})

router.post('/create', async (req,res)=>{
    
    const inventoryItem = {
        item: req.body.item,
        category: req.body.category,
        quantity: Number(req.body.quantity),
        unit: req.body.unit,
        menueYN: req.body.menuYN === "true"
    };

    const addNew = await Inventory.create(inventoryItem)
    res.redirect("/")
})

router.get('/create',(req,res)=>{
    res.render('newItem.ejs')
})


module.exports = router;