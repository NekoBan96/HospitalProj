const uploadhelper = require('../helpers/uploadHelper')
const { log } = require('console')
const devicesModel = require('../models/devicesModel')

exports.add = (req, res) => {
    id = req.body.id;

    try {
        devicesModel.getById(id).then(result => {
            console.log(result);
            if (result != null) {
                console.log(5);
                devicesModel.isFileUpload(id).then(() => {
                    uploadhelper.uploadFile(req, res, id)
                    res.status(201).json({message: 'file is uploaded'})
                })
            }
        })
    } catch(err){res.status(500).json({error: err})}
    

}