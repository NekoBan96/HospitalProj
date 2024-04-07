const crypto = require("crypto");

const util = require('util')

const { log } = require("console");



const scryptHash = async function (string, salt) {
    const saltInUse = salt || crypto.randomBytes(16).toString('hex');
    const hashBuffer = await util.promisify(crypto.scrypt)(string, saltInUse, 32);
    return `${hashBuffer.toString('hex')}:${saltInUse}`
}

exports.scryptHash = scryptHash;
//hashHelper.scryptHash(string).then(hash => console.log(hash))

exports.scryptVerify = async function(testString, hashAndSalt) {
    const [, salt] = hashAndSalt.split(":")
    return await scryptHash(testString, salt) === hashAndSalt;
}

//hashHelper.scryptVerify(string, '06854781ef2893e2d209833eb8f6e30d22e11af599082c6bae2d9d44fe4d6524:e63f7a8b4d9d6b4acf23dbf4f9a6a883').then(isValid => console.log(isValid))