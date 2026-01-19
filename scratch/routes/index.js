const express = require('express');
const router = express.Router();
let index = require(scratch/views/index.ejs)

router.get("/",function (res,req){
    res.render("index")
})
module.exports = router;