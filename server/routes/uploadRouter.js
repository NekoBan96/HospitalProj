const express = require('express');
const uploadHelper = require('../helpers/uploadHelper');
const router = express.Router();

const fsp = require('node:fs/promises');

const hospitalModel = require('../models/hospitalsModel')
const devicesModel = require('../models/devicesModel')
const uploadController = require('../controllers/uploadController')
const authMiddleware = require('../helpers/authMiddleware')

router.get('/download', (req, res)=>{
    id = req.query.id
    // const filePath = path.resolve(__dirname + '../helpers/library/123.png');
    res.sendFile(`${id}.pdf`, { root: './library' })
})

router.post('/device', authMiddleware, (req, res) => {
    uploadController.add(req, res)
})



module.exports = router;