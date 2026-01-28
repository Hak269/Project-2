const router = require("express").Router()
const Recipe = require("../models/Recipe")
const Inventory = require("../models/Inventory")

router.get('/', async(req,res)=>{
    const recipes = await Recipe.find()
    res.render('recipes.ejs', {recipes: recipes})
})

router.post('/create', async (req,res)=>{
    const recipe = {
    recipeName: req.body.recipeName,
    ingredients: req.body.ingredients,
    price: req.body.price,
    instructions: req.body.instructions
        .split('\n')
        .map(step => step.trim())
        .filter(step => step.length > 0)
    };
    const addNew = await Recipe.create(recipe)
    res.redirect("/")
})

router.get('/create',(req,res)=>{
    const inventory = Inventory.find()
    res.render('newRecipe.ejs', {inventory: inventory})
})


module.exports = router;
