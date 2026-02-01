const router = require("express").Router()
const Recipe = require("../models/Recipe")
const Inventory = require("../models/Inventory")
const isSignedIn = require('../middleware/is-signed-in');
const isAllowed = require('../middleware/check-role');


router.get('/', isSignedIn, isAllowed(['admin', 'chef']), async(req,res)=>{
    const recipes = await Recipe.find().populate("ingredients")
    console.log(recipes)
    res.render('./recipe/recipes.ejs', {recipes: recipes})
})

router.post('/create', isSignedIn, isAllowed(['admin', 'chef']) ,async (req,res)=>{
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
    res.redirect("/recipe")
})

router.get('/create', isSignedIn, isAllowed(['admin', 'chef']), async (req,res)=>{
    const inventory = await Inventory.find()
    res.render('./recipe/newRecipe.ejs', {inventory: inventory})
})


router.get('/:id/edit', isSignedIn, isAllowed(['admin', 'chef']), async(req,res)=>{
    const inventory = await Inventory.find()
    const recipe = await Recipe.findById(req.params.id).populate('ingredients')
    res.render('./recipe/EditRecipe.ejs', {recipe: recipe, inventory: inventory})
})

router.post('/:id/edit', isSignedIn, isAllowed(['admin', 'chef']), async(req,res)=>{
    const recipe = {
    recipeName: req.body.recipeName,
    ingredients: req.body.ingredients,
    price: req.body.price,
    instructions: req.body.instructions
        .split('\n')
        .map(step => step.trim())
        .filter(step => step.length > 0)
    };
    const editted = await Recipe.findByIdAndUpdate(req.params.id, recipe)
    res.redirect('/recipe')
})

router.get('/:id', isSignedIn, isAllowed(['admin', 'chef']), async(req,res)=>{
    const recipe = await Recipe.findById(req.params.id).populate('ingredients')
    res.render('./recipe/viewRecipe.ejs', {recipe: recipe})
})

router.post('/:id/delete', isSignedIn, isAllowed(['admin', 'chef']), async(req,res)=>{
    const recipe = await Recipe.findByIdAndDelete(req.params.id)
    res.redirect('/recipe')
})

module.exports = router;
