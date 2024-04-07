const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    
    
})


router.post("/reg", (req, res) => {
    userController.add(req, res); 
})

router.post("/log", (req, res) => {
    userController.verify(req, res);
})


module.exports = router;