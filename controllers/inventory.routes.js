const router = require("express").Router()
const Inventory = require("../models/Inventory")
const isSignedIn = require('../middleware/is-signed-in');
const isAllowed = require('../middleware/check-role');

router.get('/', isSignedIn, isAllowed(['admin', 'accountant']), async (req,res)=>{
    const inventory = await Inventory.find(req.query)
    res.render('./inventory/inventory.ejs', {inventory: inventory})
})

router.post('/create', isSignedIn, isAllowed(['admin', 'accountant']), async (req,res)=>{
    
    const inventoryItem = {
        item: req.body.item,
        category: req.body.category,
        quantity: Number(req.body.quantity),
        unit: req.body.unit,
        menuYN: req.body.menuYN === "true"
    };

    const addNew = await Inventory.create(inventoryItem)
    res.redirect("/inventory")
})

router.get('/create', isSignedIn, isAllowed(['admin', 'accountant']), (req,res)=>{
    res.render('./inventory/newItem.ejs')
})

router.get('/:id/edit', isSignedIn, isAllowed(['admin', 'accountant']), async(req,res)=>{
    const item = await Inventory.findById(req.params.id)
    res.render('./inventory/editItem.ejs', {item: item})
})

router.post('/:id/edit', isSignedIn, isAllowed(['admin', 'accountant']), async(req,res)=>{
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

router.get('/:id', isSignedIn, isAllowed(['admin', 'accountant']), async(req,res)=>{
    const item = await Inventory.findById(req.params.id)
    res.render('./inventory/viewItem.ejs', {item: item})
})

router.post('/:id/delete', isSignedIn, isAllowed(['admin', 'accountant']), async(req,res)=>{
    const item = await Inventory.findByIdAndDelete(req.params.id)
    res.redirect('/inventory')
})

module.exports = router;