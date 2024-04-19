const jwt = require('jsonwebtoken')
const {secret} = require('../config') //нужно создать строку с секретом

module.exports = function (req, res, next) {
    if  (req.method === 'OPTIONS') {next()}
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {                                                           //проверка на наличие токена
            return res.status(403).json({messaage: 'person is not authorized'})
        }
    const decodedData = jwt.verify(token, secret)
    req.use = decodedData;
    next()
    } catch (err) {
        console.log(err);
        res.status(403).json({messaage: 'person is not authorized'})
    }
};

