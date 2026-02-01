const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in');


router.get('/', isSignedIn, (req,res)=>{
    res.redirect('/order')
})
module.exports = router;
