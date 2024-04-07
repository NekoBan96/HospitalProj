const express = require('express');
const uploadHelper = require('../helpers/uploadHelper');
const router = express.Router();

const hospitalModel = require('../models/hospitalsModel')
const devicesModel = require('../models/devicesModel')
const authMiddleware = require('../helpers/authMiddleware')

router.post('/addhospital', authMiddleware, (req, res) => {
    console.log('request add hospital');
    hospitalModel.add(req).then(sucsess => res.status(201).json({ message: 'data in db' }))
})

router.post('/adddevice', authMiddleware, (req, res)=>{
    console.log('request add device');
    devicesModel.add(req).then(result => res.status(201).json({message: 'data in db', id: `${result}`}))
})

router.delete('/deletedevice', authMiddleware, (req, res) => {
    id = req.query.id
    devicesModel.delete(req, id).then(result => res.json({message: "device was delete", element: result}))
})

router.delete('/deletehospital', authMiddleware, (req, res) => {
    id = req.query.id
    hospitalModel.delete(req, id).then(result => res.json({message: "device was delete", element: result}))
})

router.get('/gethospitals', (req, res) => {
    const page = req.query.page;
    skip = page * 10 - 10;
    let limit = 0
    if (page != undefined) { limit = 10; }
    hospitalModel.recent(req, skip, limit).then(result => { res.send(result) })
})

router.get('/getdevices', (req, res) => {
    const page = req.query.page;
    skip = page * 10 - 10;
    let limit = 0
    if (page != undefined) { limit = 10; }
    devicesModel.recent(req, skip, limit).then(result => { res.send(result) })
})

router.get('/getdevicebyhospitalid', (req, res) => {
    const id = req.query.id;
    const page = req.query.page;
    skip = page * 10 - 10;
    let limit = 0
    if (page != undefined) { limit = 10; }
    devicesModel.getByHospitalId(req, id, skip, limit).then(result => { res.send(result) })
})

router.get('/searchhospitalbyname', (req, res) => {
    const page = req.query.page;
    const search = req.query.search;
    skip = page * 10 - 10;
    let limit = 0
    if (page != undefined) { limit = 10; }
    hospitalModel.searchByName(req, skip, limit, search).then(result => {console.log(result); res.send(result)})
})

module.exports = router;