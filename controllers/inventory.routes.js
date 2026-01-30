const router = require("express").Router()
const Inventory = require("../models/Inventory")

router.get('/',async (req,res)=>{
    const inventory = await Inventory.find()
    res.render('inventory.ejs', {inventory: inventory})
})

router.post('/create', async (req,res)=>{
    
    const inventoryItem = {
        item: req.body.item,
        category: req.body.category,
        quantity: Number(req.body.quantity),
        unit: req.body.unit,
        menuYN: req.body.menuYN === "true"
    };

    const addNew = await Inventory.create(inventoryItem)
    res.redirect("/")
})

router.get('/create',(req,res)=>{
    res.render('newItem.ejs')
})

router.get('/:id/edit', async(req,res)=>{
    const item = await Inventory.findById(req.params.id)
    res.render('./editItem.ejs', {item: item})
})

router.post('/:id/edit', async(req,res)=>{
    const inventoryItem = {
        item: req.body.item,
        category: req.body.category,
        quantity: Number(req.body.quantity),
        unit: req.body.unit,
        menuYN: req.body.menuYN === "true"
    };
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, inventoryItem)
    res.redirect('/inventory')
})

router.get('/:id', async(req,res)=>{
    const item = await Inventory.findById(req.params.id)
    res.render('./viewItem.ejs', {item: item})
})

router.post('/:id/delete', async(req,res)=>{
    const item = await Inventory.findByIdAndDelete(req.params.id)
    res.redirect('/inventory')
})

module.exports = router;